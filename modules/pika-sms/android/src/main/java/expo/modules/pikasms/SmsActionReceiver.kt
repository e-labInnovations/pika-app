package expo.modules.pikasms

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import androidx.core.app.RemoteInput
import org.json.JSONObject

/**
 * Reply / Add tapped on an SMS notification. Swaps the notification to "Sending…" right
 * away (otherwise the inline reply keeps spinning) and leaves the network call to
 * SmsActionWorker, which runs even if the app is closed.
 */
class SmsActionReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    val smsId = intent.getStringExtra(EXTRA_ID) ?: return
    val summary = intent.getStringExtra(EXTRA_SUMMARY) ?: "{}"
    val title = runCatching { JSONObject(summary) }.getOrNull()
      ?.let { "${SmsNotifier.money(it)} · ${it.optString("title")}" } ?: "Bank SMS"

    when (intent.action) {
      ACTION_REPLY -> {
        val text = RemoteInput.getResultsFromIntent(intent)?.getCharSequence(KEY_REPLY)?.toString()?.trim()
        if (text.isNullOrEmpty()) return
        SmsNotifier.notifySending(context, smsId, title)
        SmsActionWorker.enqueue(context, SmsActionWorker.Action.REPLY, smsId, summary, text)
      }
      ACTION_CONFIRM -> {
        SmsNotifier.notifySending(context, smsId, title)
        SmsActionWorker.enqueue(context, SmsActionWorker.Action.CONFIRM, smsId, summary, null)
      }
    }
  }

  companion object {
    const val ACTION_REPLY = "expo.modules.pikasms.REPLY"
    const val ACTION_CONFIRM = "expo.modules.pikasms.CONFIRM"
    const val EXTRA_ID = "smsId"
    const val EXTRA_SUMMARY = "summary"
    const val KEY_REPLY = "reply_text"
  }
}
