package expo.modules.pikasms

import android.content.Context
import android.content.SharedPreferences
import org.json.JSONArray
import org.json.JSONObject

/** One SMS waiting to be sent to the server. */
data class QueuedSms(val key: String, val sender: String, val body: String, val receivedAt: Long) {
  fun toJson(): JSONObject = JSONObject()
    .put("key", key).put("sender", sender).put("body", body).put("receivedAt", receivedAt)

  companion object {
    fun fromJson(o: JSONObject) =
      QueuedSms(o.getString("key"), o.getString("sender"), o.getString("body"), o.getLong("receivedAt"))

    /** Stable per message, so the same SMS seen by the receiver and the inbox scan queues once. */
    fun keyFor(sender: String, body: String, receivedAt: Long) =
      "${sender.uppercase()}|${receivedAt / 60_000}|${body.hashCode()}"
  }
}

/**
 * Config the JS side hands over (API URL, session token, sender filter, on/off) and
 * the queue of SMS not yet accepted by the server. App-private SharedPreferences: the
 * receiver and the worker run without the JS runtime, so they can't reach SecureStore.
 */
class SmsStore(context: Context) {
  private val prefs: SharedPreferences =
    context.applicationContext.getSharedPreferences("pika_sms", Context.MODE_PRIVATE)

  var enabled: Boolean
    get() = prefs.getBoolean("enabled", false)
    set(v) = prefs.edit().putBoolean("enabled", v).apply()

  var apiUrl: String?
    get() = prefs.getString("apiUrl", null)
    set(v) = prefs.edit().putString("apiUrl", v).apply()

  var token: String?
    get() = prefs.getString("token", null)
    set(v) = prefs.edit().putString("token", v).apply()

  var senders: List<String>
    get() = prefs.getString("senders", "")!!.split(',').map { it.trim() }.filter { it.isNotEmpty() }
    set(v) = prefs.edit().putString("senders", v.joinToString(",")).apply()

  /** When the last inbox scan ran, so the next one only reads newer messages. */
  var lastInboxScan: Long
    get() = prefs.getLong("lastInboxScan", 0L)
    set(v) = prefs.edit().putLong("lastInboxScan", v).apply()

  fun matchesSender(address: String?): Boolean {
    if (address.isNullOrBlank()) return false
    val a = address.uppercase()
    return senders.any { a.contains(it.uppercase()) }
  }

  @Synchronized
  fun queue(): List<QueuedSms> {
    val arr = JSONArray(prefs.getString("queue", "[]"))
    return (0 until arr.length()).map { QueuedSms.fromJson(arr.getJSONObject(it)) }
  }

  /** Adds messages not already queued. Returns how many were new. */
  @Synchronized
  fun enqueue(items: List<QueuedSms>): Int {
    val current = queue().toMutableList()
    val keys = current.map { it.key }.toHashSet()
    val fresh = items.filter { keys.add(it.key) }
    if (fresh.isEmpty()) return 0
    current.addAll(fresh)
    // Bounded: if the server is unreachable for weeks, keep the newest.
    val kept = current.sortedBy { it.receivedAt }.takeLast(MAX_QUEUE)
    save(kept)
    return fresh.size
  }

  @Synchronized
  fun remove(keys: Collection<String>) {
    if (keys.isEmpty()) return
    val drop = keys.toHashSet()
    save(queue().filterNot { drop.contains(it.key) })
  }

  private fun save(items: List<QueuedSms>) {
    val arr = JSONArray()
    items.forEach { arr.put(it.toJson()) }
    prefs.edit().putString("queue", arr.toString()).apply()
  }

  companion object {
    const val MAX_QUEUE = 500
  }
}
