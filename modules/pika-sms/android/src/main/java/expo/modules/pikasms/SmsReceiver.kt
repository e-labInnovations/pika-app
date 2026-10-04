package expo.modules.pikasms

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.provider.Telephony

/**
 * Receives every incoming SMS (even with the app closed), keeps the ones from bank
 * and wallet senders, queues them and schedules an upload. Does no network work
 * itself: a receiver only gets a few seconds.
 */
class SmsReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    if (intent.action != Telephony.Sms.Intents.SMS_RECEIVED_ACTION) return
    val store = SmsStore(context)
    if (!store.enabled) return

    val parts = Telephony.Sms.Intents.getMessagesFromIntent(intent) ?: return
    // A long SMS arrives as several parts from the same sender; join them.
    val items = parts.filterNotNull()
      .groupBy { it.originatingAddress ?: "" }
      .filterKeys { store.matchesSender(it) }
      .map { (sender, msgs) ->
        val body = msgs.joinToString("") { it.messageBody ?: "" }
        val at = msgs.minOf { it.timestampMillis }
        QueuedSms(QueuedSms.keyFor(sender, body, at), sender, body, at)
      }
    if (items.isEmpty()) return

    store.enqueue(items)
    SmsUploadWorker.schedule(context)
  }
}
