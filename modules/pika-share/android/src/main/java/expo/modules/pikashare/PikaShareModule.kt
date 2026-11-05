package expo.modules.pikashare

import android.app.Activity
import android.content.Intent
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.util.concurrent.Executors

/**
 * Receives content shared into Pika from other apps.
 *
 * Share intents arrive on the launch intent (cold start, picked up in OnCreate or the
 * first OnActivityEntersForeground, whichever has an activity) or via OnNewIntent
 * (app already running; MainActivity is singleTask). Each one is read on a background
 * thread, held as the single pending share, and announced with `onShare`. JS reads
 * `getPendingShare()` on mount for shares that landed before it subscribed.
 */
class PikaShareModule : Module() {
  private val context get() = requireNotNull(appContext.reactContext) { "React context unavailable" }
  private val io = Executors.newSingleThreadExecutor()

  private var nextId = 0
  private var pending: Map<String, Any?>? = null

  override fun definition() = ModuleDefinition {
    Name("PikaShare")

    Events("onShare")

    OnCreate {
      io.execute { runCatching { ShareReader.pruneOld(context) } }
      appContext.currentActivity?.let { handle(it, it.intent) }
    }

    // Cold start: the activity may not exist yet when the module is created.
    OnActivityEntersForeground {
      appContext.currentActivity?.let { handle(it, it.intent) }
    }

    OnNewIntent { intent ->
      appContext.currentActivity?.let { activity ->
        // Make the new intent the activity's own, so a later recreate sees the
        // consumed version rather than the stale launch intent.
        activity.intent = intent
        handle(activity, intent)
      }
    }

    Function("getPendingShare") { synchronized(this@PikaShareModule) { pending } }

    Function("clearPendingShare") { id: Int ->
      synchronized(this@PikaShareModule) {
        if (pending?.get("id") == id) pending = null
      }
    }

    OnDestroy { io.shutdown() }
  }

  private fun handle(activity: Activity, intent: Intent?) {
    if (intent == null || !ShareReader.isShareIntent(intent)) return
    // Copy the extras we need, then mark the intent consumed so rotation or a
    // process restore doesn't replay this share. The read itself keeps the
    // original intent (and its URI grant) alive.
    val snapshot = Intent(intent)
    intent.action = CONSUMED_ACTION
    val source = runCatching { activity.referrer?.host }.getOrNull()

    io.execute {
      val result = runCatching { ShareReader.read(context, snapshot, source) }
        .getOrElse { ShareResult.ErrorShare("Couldn't read the shared file.", source) }
        ?: return@execute
      val map = synchronized(this) {
        toMap(++nextId, result).also { pending = it }
      }
      sendEvent("onShare", map)
    }
  }

  private fun toMap(id: Int, result: ShareResult): Map<String, Any?> = when (result) {
    is ShareResult.FileShare -> mapOf(
      "id" to id,
      "type" to "file",
      "uri" to "file://${result.file.absolutePath}",
      "mimeType" to result.mimeType,
      "name" to result.name,
    )
    is ShareResult.TextShare -> mapOf("id" to id, "type" to "text", "text" to result.text)
    is ShareResult.ErrorShare -> mapOf(
      "id" to id,
      "type" to "error",
      "message" to result.message,
      "source" to result.source,
    )
  }

  companion object {
    private const val CONSUMED_ACTION = "com.elabins.pika.SHARE_CONSUMED"
  }
}
