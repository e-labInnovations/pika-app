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
import androidx.core.content.ContextCompat
import org.json.JSONArray

/**
 * "₹45.00 · Hotel Akshay — tap to review", opening the app's pending SMS screen.
 * Every notify() is behind canNotify(), hence the MissingPermission suppression.
 */
@SuppressLint("MissingPermission")
object SmsNotifier {
  private const val CHANNEL = "sms_capture"
  private const val SIGNED_OUT_ID = 41_000
  private const val SUMMARY_ID = 41_001
  private const val MAX_SEPARATE = 3

  fun notifyPending(context: Context, results: JSONArray) {
    val pending = (0 until results.length())
      .map { results.getJSONObject(it) }
      .filter { it.optString("status") == "pending" && it.has("summary") }
    if (pending.isEmpty() || !canNotify(context)) return
    ensureChannel(context)
    val nm = NotificationManagerCompat.from(context)

    if (pending.size > MAX_SEPARATE) {
      nm.notify(SUMMARY_ID, base(context, "${pending.size} bank SMS to review", "Tap to confirm them in Pika").build())
      return
    }
    for (r in pending) {
      val s = r.getJSONObject("summary")
      val sign = if (s.optString("type") == "income") "+" else ""
      val title = "$sign₹${s.optString("amount")} · ${s.optString("title")}"
      nm.notify(r.optString("id").hashCode(), base(context, title, "Tap to review").build())
    }
  }

  fun notifySignedOut(context: Context) {
    if (!canNotify(context)) return
    ensureChannel(context)
    NotificationManagerCompat.from(context).notify(
      SIGNED_OUT_ID,
      base(context, "Bank SMS waiting", "Open Pika to sign in again; they'll sync then").build(),
    )
  }

  private fun base(context: Context, title: String, text: String): NotificationCompat.Builder {
    val open = Intent(Intent.ACTION_VIEW, Uri.parse("pika://sms")).setPackage(context.packageName)
      .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
    val pi = PendingIntent.getActivity(context, 0, open, PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT)
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
