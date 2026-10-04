package expo.modules.pikasms

import android.Manifest
import android.annotation.SuppressLint
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.app.RemoteInput
import androidx.core.content.ContextCompat
import org.json.JSONArray
import org.json.JSONObject

/**
 * "₹45.00 · Hotel Akshay": tap to review, Reply to describe it in words ("lunch with
 * @Rony, split"), Add when the suggestion is already complete. Every notify() is behind
 * canNotify(), hence the MissingPermission suppression.
 */
@SuppressLint("MissingPermission")
object SmsNotifier {
  private const val CHANNEL = "sms_capture"
  private const val SIGNED_OUT_ID = 41_000
  private const val SUMMARY_ID = 41_001
  private const val MAX_SEPARATE = 3

  fun notificationId(smsId: String) = smsId.hashCode()

  fun notifyPending(context: Context, results: JSONArray) {
    val all = (0 until results.length()).map { results.getJSONObject(it) }.filter { it.has("summary") }
    // "auto": confirmed on arrival because the merchant is trusted.
    val pending = all.filter { it.optString("status") == "pending" }
    val auto = all.filter { it.optString("status") == "auto" }
    if ((pending.isEmpty() && auto.isEmpty()) || !canNotify(context)) return
    ensureChannel(context)
    val nm = NotificationManagerCompat.from(context)

    for (r in auto) {
      val s = r.getJSONObject("summary")
      val title = "Added: ${s.optString("title")} · ${money(s)}"
      nm.notify(notificationId(r.optString("id")), base(context, title, "Added automatically. Undo from Home").build())
    }
    if (pending.isEmpty()) return

    if (pending.size > MAX_SEPARATE) {
      nm.notify(SUMMARY_ID, base(context, "${pending.size} bank SMS to review", "Tap to confirm them in Pika").build())
      return
    }
    for (r in pending) {
      val id = r.optString("id")
      nm.notify(notificationId(id), suggestion(context, id, r.getJSONObject("summary"), "Tap to review, or reply with what it was").build())
    }
  }

  /** A pending SMS again (after a "review" reply), with Reply and, when complete, Add. */
  fun notifySuggestion(context: Context, smsId: String, summary: JSONObject, text: String) {
    if (!canNotify(context)) return
    ensureChannel(context)
    NotificationManagerCompat.from(context).notify(notificationId(smsId), suggestion(context, smsId, summary, text).build())
  }

  fun notifyResult(context: Context, smsId: String, title: String, text: String, uri: String = "pika://sms") {
    if (!canNotify(context)) return
    ensureChannel(context)
    NotificationManagerCompat.from(context).notify(notificationId(smsId), base(context, title, text, uri).build())
  }

  /** Replaces the notification while a reply or Add is being sent (stops the inline reply spinner). */
  fun notifySending(context: Context, smsId: String, title: String) {
    if (!canNotify(context)) return
    ensureChannel(context)
    NotificationManagerCompat.from(context).notify(
      notificationId(smsId),
      base(context, title, "Sending…", "pika://sms/$smsId").setOnlyAlertOnce(true).setSilent(true).build(),
    )
  }

  fun cancel(context: Context, smsId: String) = NotificationManagerCompat.from(context).cancel(notificationId(smsId))

  fun notifySignedOut(context: Context) {
    if (!canNotify(context)) return
    ensureChannel(context)
    NotificationManagerCompat.from(context).notify(
      SIGNED_OUT_ID,
      base(context, "Bank SMS waiting", "Open Pika to sign in again; they'll sync then").build(),
    )
  }

  fun money(summary: JSONObject): String {
    val sign = if (summary.optString("type") == "income") "+" else ""
    return "$sign₹${summary.optString("amount")}"
  }

  private fun suggestion(context: Context, smsId: String, summary: JSONObject, text: String): NotificationCompat.Builder {
    val title = "${money(summary)} · ${summary.optString("title")}"
    val builder = base(context, title, text, "pika://sms/$smsId").addAction(replyAction(context, smsId, summary))
    if (summary.optBoolean("complete")) builder.addAction(addAction(context, smsId, summary))
    return builder
  }

  private fun replyAction(context: Context, smsId: String, summary: JSONObject): NotificationCompat.Action {
    val input = RemoteInput.Builder(SmsActionReceiver.KEY_REPLY).setLabel("What was it? e.g. lunch with @Rony, split").build()
    // RemoteInput needs a mutable PendingIntent so the system can add the typed text.
    val flags = PendingIntent.FLAG_UPDATE_CURRENT or (if (Build.VERSION.SDK_INT >= 31) PendingIntent.FLAG_MUTABLE else 0)
    val pi = PendingIntent.getBroadcast(context, requestCode(smsId, 1), actionIntent(context, SmsActionReceiver.ACTION_REPLY, smsId, summary), flags)
    return NotificationCompat.Action.Builder(0, "Reply", pi)
      .addRemoteInput(input)
      .setAllowGeneratedReplies(false)
      .setSemanticAction(NotificationCompat.Action.SEMANTIC_ACTION_REPLY)
      .build()
  }

  private fun addAction(context: Context, smsId: String, summary: JSONObject): NotificationCompat.Action {
    val pi = PendingIntent.getBroadcast(
      context,
      requestCode(smsId, 2),
      actionIntent(context, SmsActionReceiver.ACTION_CONFIRM, smsId, summary),
      PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
    )
    return NotificationCompat.Action.Builder(0, "Add", pi).build()
  }

  private fun actionIntent(context: Context, action: String, smsId: String, summary: JSONObject) =
    Intent(context, SmsActionReceiver::class.java)
      .setAction(action)
      .putExtra(SmsActionReceiver.EXTRA_ID, smsId)
      .putExtra(SmsActionReceiver.EXTRA_SUMMARY, summary.toString())

  private fun requestCode(smsId: String, action: Int) = smsId.hashCode() * 31 + action

  private fun base(context: Context, title: String, text: String, uri: String = "pika://sms"): NotificationCompat.Builder {
    val open = Intent(Intent.ACTION_VIEW, Uri.parse(uri)).setPackage(context.packageName)
      .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
    val pi = PendingIntent.getActivity(context, uri.hashCode(), open, PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT)
    return NotificationCompat.Builder(context, CHANNEL)
      .setSmallIcon(smallIcon(context))
      .setContentTitle(title)
      .setContentText(text)
      .setContentIntent(pi)
      .setAutoCancel(true)
      .setPriority(NotificationCompat.PRIORITY_DEFAULT)
  }

  // expo-notifications generates `notification_icon` from app.config; fall back to the launcher icon.
  private fun smallIcon(context: Context): Int {
    val id = context.resources.getIdentifier("notification_icon", "drawable", context.packageName)
    return if (id != 0) id else context.applicationInfo.icon
  }

  private fun canNotify(context: Context): Boolean =
    Build.VERSION.SDK_INT < 33 ||
      ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED

  private fun ensureChannel(context: Context) {
    if (Build.VERSION.SDK_INT < 26) return
    val nm = context.getSystemService(NotificationManager::class.java)
    if (nm.getNotificationChannel(CHANNEL) == null) {
      nm.createNotificationChannel(
        NotificationChannel(CHANNEL, "Bank SMS", NotificationManager.IMPORTANCE_DEFAULT).apply {
          description = "New transactions read from bank and wallet SMS"
        },
      )
    }
  }
}
