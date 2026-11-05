package expo.modules.pikashare

import android.content.ClipData
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.provider.OpenableColumns
import android.webkit.MimeTypeMap
import androidx.core.content.IntentCompat
import java.io.File
import java.io.IOException
import java.util.UUID

/** What a share intent turned into, after any file has been copied to our cache. */
sealed class ShareResult {
  data class FileShare(val file: File, val mimeType: String, val name: String?) : ShareResult()
  data class TextShare(val text: String) : ShareResult()
  data class ErrorShare(val message: String, val source: String?) : ShareResult()
}

private class TooLargeException : IOException()

/**
 * Turns an ACTION_SEND / ACTION_SEND_MULTIPLE intent into a [ShareResult].
 *
 * The shared file is copied into `cacheDir/shares` straight away, because the read
 * permission a provider grants (Google Photos, WhatsApp) is tied to the incoming
 * intent and may lapse before JS gets round to reading it. JS only ever sees our
 * own `file://` copy.
 */
object ShareReader {
  const val MAX_BYTES = 20L * 1024 * 1024
  private const val MAX_AGE_MS = 24L * 60 * 60 * 1000

  fun isShareIntent(intent: Intent?): Boolean =
    intent?.action == Intent.ACTION_SEND || intent?.action == Intent.ACTION_SEND_MULTIPLE

  fun read(context: Context, intent: Intent, source: String?): ShareResult? {
    if (!isShareIntent(intent)) return null

    val uris = streamUris(intent)
    var failure: ShareResult.ErrorShare? = null

    for (uri in uris) {
      val mime = resolveMime(context, intent, uri) ?: continue
      if (!isSupported(mime)) continue
      try {
        val file = copyToCache(context, uri, mime)
        return ShareResult.FileShare(file, mime, displayName(context, uri))
      } catch (e: SecurityException) {
        failure = ShareResult.ErrorShare(
          "Pika isn't allowed to read this file" + (source?.let { " from $it" } ?: "") + ".",
          source,
        )
      } catch (e: TooLargeException) {
        failure = ShareResult.ErrorShare("The file is larger than 20 MB.", source)
      } catch (e: Exception) {
        failure = ShareResult.ErrorShare("Couldn't read the shared file.", source)
      }
    }

    val text = intent.getCharSequenceExtra(Intent.EXTRA_TEXT)?.toString()?.trim()
      ?: intent.getStringExtra(Intent.EXTRA_SUBJECT)?.trim()
    if (!text.isNullOrEmpty()) return ShareResult.TextShare(text)

    if (failure != null) return failure
    if (uris.isNotEmpty()) {
      return ShareResult.ErrorShare("Pika can only use images, PDFs and text.", source)
    }
    return null
  }

  /** Deletes cached shares older than a day. */
  fun pruneOld(context: Context) {
    val dir = File(context.cacheDir, "shares")
    val cutoff = System.currentTimeMillis() - MAX_AGE_MS
    dir.listFiles()?.forEach { if (it.lastModified() < cutoff) it.delete() }
  }

  private fun streamUris(intent: Intent): List<Uri> {
    val out = LinkedHashSet<Uri>()
    if (intent.action == Intent.ACTION_SEND_MULTIPLE) {
      IntentCompat.getParcelableArrayListExtra(intent, Intent.EXTRA_STREAM, Uri::class.java)
        ?.let { out.addAll(it) }
    } else {
      IntentCompat.getParcelableExtra(intent, Intent.EXTRA_STREAM, Uri::class.java)
        ?.let { out.add(it) }
    }
    intent.clipData?.let { clip: ClipData ->
      for (i in 0 until clip.itemCount) clip.getItemAt(i).uri?.let { out.add(it) }
    }
    return out.toList()
  }

  private fun isSupported(mime: String) = mime.startsWith("image/") || mime == "application/pdf"

  /** Provider type, else the intent's own type if specific, else from the extension. */
  private fun resolveMime(context: Context, intent: Intent, uri: Uri): String? {
    val fromResolver = try { context.contentResolver.getType(uri) } catch (e: Exception) { null }
    if (fromResolver != null && !fromResolver.contains('*')) return fromResolver
    val fromIntent = intent.type
    if (fromIntent != null && !fromIntent.contains('*')) return fromIntent
    val ext = MimeTypeMap.getFileExtensionFromUrl(uri.toString())?.lowercase()
    val fromExt = ext?.let { MimeTypeMap.getSingleton().getMimeTypeFromExtension(it) }
    // A wildcard image type (e.g. "image/*") is still usable: the AI reads the bytes.
    return fromExt ?: fromResolver?.takeIf { it.startsWith("image/") }?.let { "image/jpeg" }
      ?: fromIntent?.takeIf { it.startsWith("image/") }?.let { "image/jpeg" }
  }

  private fun copyToCache(context: Context, uri: Uri, mime: String): File {
    val dir = File(context.cacheDir, "shares").apply { mkdirs() }
    val ext = if (mime == "application/pdf") "pdf"
      else MimeTypeMap.getSingleton().getExtensionFromMimeType(mime) ?: "jpg"
    val dest = File(dir, "${UUID.randomUUID()}.$ext")
    try {
      val input = context.contentResolver.openInputStream(uri)
        ?: throw IOException("No stream for $uri")
      input.use { inp ->
        dest.outputStream().use { out ->
          val buf = ByteArray(64 * 1024)
          var total = 0L
          while (true) {
            val n = inp.read(buf)
            if (n < 0) break
            total += n
            if (total > MAX_BYTES) throw TooLargeException()
            out.write(buf, 0, n)
          }
        }
      }
      return dest
    } catch (e: Throwable) {
      dest.delete()
      throw e
    }
  }

  private fun displayName(context: Context, uri: Uri): String? = try {
    context.contentResolver.query(uri, arrayOf(OpenableColumns.DISPLAY_NAME), null, null, null)
      ?.use { c -> if (c.moveToFirst()) c.getString(0) else null }
  } catch (e: Exception) {
    null
  }
}
