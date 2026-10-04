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
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone
import java.util.concurrent.TimeUnit

/**
 * Sends queued SMS to POST /api/sms/ingest. WorkManager runs it when there is a
 * network, survives reboots, and retries with backoff. The server de-duplicates, so
 * sending a message twice is harmless; a message leaves the queue only once the
 * server has accepted it.
 */
class SmsUploadWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {

  override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
    val store = SmsStore(applicationContext)
    val apiUrl = store.apiUrl
    val token = store.token
    if (!store.enabled || apiUrl.isNullOrBlank() || token.isNullOrBlank()) return@withContext Result.success()

    val batch = store.queue().take(BATCH)
    if (batch.isEmpty()) return@withContext Result.success()

    val payload = JSONObject().put("messages", JSONArray().apply {
      batch.forEach {
        put(JSONObject().put("sender", it.sender).put("body", it.body).put("receivedAt", iso(it.receivedAt)))
      }
    })

    val conn = (URL(apiUrl.trimEnd('/') + "/api/sms/ingest").openConnection() as HttpURLConnection).apply {
      requestMethod = "POST"
      connectTimeout = 15_000
      readTimeout = 60_000
      doOutput = true
      setRequestProperty("Content-Type", "application/json")
      setRequestProperty("Authorization", "JWT $token")
    }
    try {
      conn.outputStream.use { it.write(payload.toString().toByteArray()) }
      when (val code = conn.responseCode) {
        200 -> {
          val body = conn.inputStream.bufferedReader().use { it.readText() }
          val results = JSONObject(body).optJSONArray("results") ?: JSONArray()
          store.remove(batch.map { it.key })
          SmsNotifier.notifyPending(applicationContext, results)
          if (store.queue().isNotEmpty()) schedule(applicationContext)
          Result.success()
        }
        // Session expired or revoked: keep the queue, the app re-sends once it has a new token.
        401, 403 -> {
          SmsNotifier.notifySignedOut(applicationContext)
          Result.success()
        }
        // Bad input would fail forever; drop the batch rather than block the queue.
        400 -> { store.remove(batch.map { it.key }); Result.success() }
        else -> if (code >= 500) Result.retry() else Result.failure()
      }
    } catch (e: Exception) {
      Result.retry()
    } finally {
      conn.disconnect()
    }
  }

  companion object {
    private const val BATCH = 100
    private const val WORK_NAME = "pika-sms-upload"

    fun schedule(context: Context) {
      val request = OneTimeWorkRequestBuilder<SmsUploadWorker>()
        .setConstraints(Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build())
        .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 30, TimeUnit.SECONDS)
        .build()
      // APPEND_OR_REPLACE: an SMS arriving mid-upload still gets its own run afterwards.
      WorkManager.getInstance(context).enqueueUniqueWork(WORK_NAME, ExistingWorkPolicy.APPEND_OR_REPLACE, request)
    }

    private fun iso(ms: Long): String =
      SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US).apply { timeZone = TimeZone.getTimeZone("UTC") }.format(Date(ms))
  }
}
