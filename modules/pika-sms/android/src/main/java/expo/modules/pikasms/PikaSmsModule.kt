package expo.modules.pikasms

import android.Manifest
import android.content.pm.PackageManager
import android.provider.Telephony
import androidx.core.content.ContextCompat
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class SmsConfig : Record {
  @Field var enabled: Boolean = false
  @Field var apiUrl: String? = null
  @Field var token: String? = null
  @Field var senders: List<String> = emptyList()
}

/**
 * JS bridge. JS keeps the native side's config current (on login, on app start, when
 * the toggle changes); everything after that — receiving, queueing, uploading,
 * notifying — runs natively without the JS runtime.
 */
class PikaSmsModule : Module() {
  private val context get() = requireNotNull(appContext.reactContext) { "React context unavailable" }
  private val store get() = SmsStore(context)

  override fun definition() = ModuleDefinition {
    Name("PikaSms")

    Function("configure") { config: SmsConfig ->
      store.enabled = config.enabled
      store.apiUrl = config.apiUrl
      store.token = config.token
      store.senders = config.senders
    }

    Function("getStatus") {
      mapOf(
        "enabled" to store.enabled,
        "hasToken" to !store.token.isNullOrBlank(),
        "senders" to store.senders,
        "queued" to store.queue().size,
        "lastInboxScan" to store.lastInboxScan.toDouble(),
        "canReceive" to granted(Manifest.permission.RECEIVE_SMS),
        "canRead" to granted(Manifest.permission.READ_SMS),
      )
    }

    /** Uploads whatever is queued, now (still waits for a network). */
    Function("syncNow") {
      SmsUploadWorker.schedule(context)
    }

    /**
     * Queues inbox messages from known senders received after `sinceMs` (or after the
     * previous scan), catching SMS that arrived while the receiver could not run —
     * the app force-stopped, or before capture was switched on. Returns how many
     * were newly queued.
     */
    Function("scanInbox") { sinceMs: Double? ->
      if (!granted(Manifest.permission.READ_SMS)) return@Function 0
      val now = System.currentTimeMillis()
      // First scan ever: only the last few days, never the whole inbox.
      val since = sinceMs?.toLong() ?: store.lastInboxScan.takeIf { it > 0 } ?: (now - FIRST_SCAN_WINDOW_MS)
      val found = mutableListOf<QueuedSms>()
      context.contentResolver.query(
        Telephony.Sms.Inbox.CONTENT_URI,
        arrayOf(Telephony.Sms.ADDRESS, Telephony.Sms.BODY, Telephony.Sms.DATE),
        "${Telephony.Sms.DATE} > ?",
        arrayOf(since.toString()),
        "${Telephony.Sms.DATE} ASC",
      )?.use { c ->
        while (c.moveToNext()) {
          val sender = c.getString(0) ?: continue
          if (!store.matchesSender(sender)) continue
          val body = c.getString(1) ?: continue
          val at = c.getLong(2)
          found.add(QueuedSms(QueuedSms.keyFor(sender, body, at), sender, body, at))
        }
      }
      store.lastInboxScan = now
      val added = store.enqueue(found)
      if (added > 0) SmsUploadWorker.schedule(context)
      added
    }
  }

  companion object {
    private const val FIRST_SCAN_WINDOW_MS = 3L * 24 * 60 * 60 * 1000
  }

  private fun granted(permission: String) =
    ContextCompat.checkSelfPermission(context, permission) == PackageManager.PERMISSION_GRANTED
}
