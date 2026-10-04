package expo.modules.pikasms

import android.content.Context
import androidx.work.BackoffPolicy
import androidx.work.Constraints
import androidx.work.CoroutineWorker
import androidx.work.ExistingWorkPolicy
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkerParameters
import androidx.work.workDataOf
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.util.concurrent.TimeUnit

/**
 * Sends a notification reply (POST /api/sms/:id/reply) or Add (POST /api/sms/:id/confirm)
 * and replaces the notification with the outcome.
 */
class SmsActionWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {

  enum class Action { REPLY, CONFIRM }

  override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
    val ctx = applicationContext
    val smsId = inputData.getString(KEY_ID) ?: return@withContext Result.failure()
    val action = Action.valueOf(inputData.getString(KEY_ACTION) ?: return@withContext Result.failure())
    val original = runCatching { JSONObject(inputData.getString(KEY_SUMMARY) ?: "{}") }.getOrDefault(JSONObject())
    val store = SmsStore(ctx)
    val apiUrl = store.apiUrl
    val token = store.token
    if (apiUrl.isNullOrBlank() || token.isNullOrBlank()) {
      SmsNotifier.notifySignedOut(ctx)
      return@withContext Result.success()
    }

    val (path, body) = when (action) {
      Action.REPLY -> "reply" to JSONObject().put("text", inputData.getString(KEY_TEXT) ?: "")
      Action.CONFIRM -> "confirm" to JSONObject()
    }
    val conn = (URL("${apiUrl.trimEnd('/')}/api/sms/$smsId/$path").openConnection() as HttpURLConnection).apply {
      requestMethod = "POST"
      connectTimeout = 15_000
      // The reply goes through the AI.
      readTimeout = 90_000
      doOutput = true
      setRequestProperty("Content-Type", "application/json")
      setRequestProperty("Authorization", "JWT $token")
    }
    try {
      conn.outputStream.use { it.write(body.toString().toByteArray()) }
      val code = conn.responseCode
      val text = (if (code in 200..299) conn.inputStream else conn.errorStream)?.bufferedReader()?.use { it.readText() } ?: "{}"
      val json = runCatching { JSONObject(text) }.getOrDefault(JSONObject())
      when {
        code == 200 && action == Action.CONFIRM -> {
          SmsNotifier.notifyResult(ctx, smsId, "Added: ${original.optString("title")} · ${SmsNotifier.money(original)}", "Saved in Pika")
          Result.success()
        }
        code == 200 -> {
          val summary = json.optJSONObject("summary") ?: original
          val category = summary.optString("category").takeIf { it.isNotBlank() && it != "null" }
          if (json.optString("status") == "added") {
            SmsNotifier.notifyResult(
              ctx, smsId,
              "Added: ${summary.optString("title")} · ${SmsNotifier.money(summary)}",
              category ?: "Saved in Pika",
            )
          } else {
            summary.put("complete", json.optBoolean("complete"))
            val hint = if (json.optBoolean("complete")) "Tap Add, or tap to edit" else "Needs a category. Tap to finish"
            SmsNotifier.notifySuggestion(ctx, smsId, summary, listOfNotNull(category, hint).joinToString(" · "))
          }
          Result.success()
        }
        code == 401 || code == 403 -> { SmsNotifier.notifySignedOut(ctx); Result.success() }
        // Already confirmed or dismissed elsewhere: nothing left to do.
        code == 409 -> { SmsNotifier.cancel(ctx, smsId); Result.success() }
        code >= 500 && runAttemptCount < 2 -> Result.retry()
        else -> {
          val message = json.optJSONArray("errors")?.optJSONObject(0)?.optString("message")
          SmsNotifier.notifyResult(
            ctx, smsId, "Couldn't process: ${original.optString("title")}",
            message?.takeIf { it.isNotBlank() } ?: "Tap to review it in Pika", "pika://sms/$smsId",
          )
          Result.success()
        }
      }
    } catch (e: Exception) {
      if (runAttemptCount < 2) Result.retry()
      else {
        SmsNotifier.notifyResult(ctx, smsId, "Couldn't send: ${original.optString("title")}", "Tap to review it in Pika", "pika://sms/$smsId")
        Result.success()
      }
    } finally {
      conn.disconnect()
    }
  }

  companion object {
    private const val KEY_ID = "id"
    private const val KEY_ACTION = "action"
    private const val KEY_SUMMARY = "summary"
    private const val KEY_TEXT = "text"

    fun enqueue(context: Context, action: Action, smsId: String, summary: String, text: String?) {
      val request = OneTimeWorkRequestBuilder<SmsActionWorker>()
        .setInputData(workDataOf(KEY_ID to smsId, KEY_ACTION to action.name, KEY_SUMMARY to summary, KEY_TEXT to text))
        .setConstraints(Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build())
        .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 15, TimeUnit.SECONDS)
        .build()
      // One action per SMS at a time; a new reply replaces one still waiting.
      WorkManager.getInstance(context).enqueueUniqueWork("pika-sms-action-$smsId", ExistingWorkPolicy.REPLACE, request)
    }
  }
}
