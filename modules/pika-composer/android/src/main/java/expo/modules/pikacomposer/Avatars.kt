package expo.modules.pikacomposer

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.BitmapShader
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Shader
import android.os.Handler
import android.os.Looper
import android.util.LruCache
import com.caverock.androidsvg.SVG
import java.net.HttpURLConnection
import java.net.URL
import java.util.concurrent.Executors

/** How a chip looks, sent from JS per `type:id`. */
data class ChipVisual(
  val imageUrl: String?,
  val svg: String?,
  val color: Int?,
  val bgColor: Int?,
)

/** Parses web colors: #RGB, #RRGGBB, #RRGGBBAA (alpha last, unlike Android). */
fun parseWebColor(s: String?): Int? {
  val h = s?.trim()?.removePrefix("#") ?: return null
  if (!h.all { it.isDigit() || it.lowercaseChar() in 'a'..'f' }) return null
  return when (h.length) {
    3 -> Color.rgb(
      (h[0].toString().repeat(2)).toInt(16),
      (h[1].toString().repeat(2)).toInt(16),
      (h[2].toString().repeat(2)).toInt(16),
    )
    6 -> Color.rgb(h.substring(0, 2).toInt(16), h.substring(2, 4).toInt(16), h.substring(4, 6).toInt(16))
    8 -> Color.argb(
      h.substring(6, 8).toInt(16),
      h.substring(0, 2).toInt(16),
      h.substring(2, 4).toInt(16),
      h.substring(4, 6).toInt(16),
    )
    else -> null
  }
}

/** Initials as the app shows them: first letter of the first two words. */
fun initialsOf(name: String): String =
  name.split(" ").filter { it.isNotBlank() }.take(2).joinToString("") { it.first().uppercase() }.ifEmpty { "?" }

/**
 * Round avatar bitmaps for chips. Photos download once on a background thread and are
 * kept in memory; Lucide icons render from SVG. [onLoaded] runs on the main thread
 * when a photo arrives so the editor can redraw.
 */
object Avatars {
  private val cache = object : LruCache<String, Bitmap>(8 * 1024 * 1024) {
    override fun sizeOf(key: String, value: Bitmap) = value.byteCount
  }
  private val inFlight = mutableSetOf<String>()
  private val failed = mutableSetOf<String>()
  private val io = Executors.newFixedThreadPool(2)
  private val main = Handler(Looper.getMainLooper())

  /** Photo for [url] at [size] px, or null while loading / on failure. */
  fun photo(url: String, size: Int, onLoaded: () -> Unit): Bitmap? {
    val key = "p|$url|$size"
    cache.get(key)?.let { return it }
    synchronized(inFlight) {
      if (url in failed || !inFlight.add(key)) return null
    }
    io.execute {
      val bmp = runCatching { circle(download(url, size), size) }.getOrNull()
      synchronized(inFlight) {
        inFlight.remove(key)
        if (bmp == null) failed.add(url)
      }
      if (bmp != null) {
        cache.put(key, bmp)
        main.post(onLoaded)
      }
    }
    return null
  }

  /** A complete SVG document (colors already set by JS), [size] px square, cached. */
  fun icon(svg: String, size: Int): Bitmap? {
    val key = "i|${svg.hashCode()}|${svg.length}|$size"
    cache.get(key)?.let { return it }
    val bmp = runCatching {
      val doc = SVG.getFromString(svg)
      doc.documentWidth = size.toFloat()
      doc.documentHeight = size.toFloat()
      Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888).also { doc.renderToCanvas(Canvas(it)) }
    }.getOrNull() ?: return null
    cache.put(key, bmp)
    return bmp
  }

  private fun download(url: String, size: Int): Bitmap {
    val conn = URL(url).openConnection() as HttpURLConnection
    conn.connectTimeout = 10_000
    conn.readTimeout = 15_000
    try {
      val bytes = conn.inputStream.use { it.readBytes() }
      val bounds = BitmapFactory.Options().apply { inJustDecodeBounds = true }
      BitmapFactory.decodeByteArray(bytes, 0, bytes.size, bounds)
      var sample = 1
      while (bounds.outWidth / (sample * 2) >= size && bounds.outHeight / (sample * 2) >= size) sample *= 2
      return BitmapFactory.decodeByteArray(bytes, 0, bytes.size, BitmapFactory.Options().apply { inSampleSize = sample })
        ?: error("not an image")
    } finally {
      conn.disconnect()
    }
  }

  private fun circle(src: Bitmap, size: Int): Bitmap {
    val out = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888)
    val scale = size / minOf(src.width, src.height).toFloat()
    val shader = BitmapShader(src, Shader.TileMode.CLAMP, Shader.TileMode.CLAMP).apply {
      val m = android.graphics.Matrix()
      m.setScale(scale, scale)
      m.postTranslate((size - src.width * scale) / 2f, (size - src.height * scale) / 2f)
      setLocalMatrix(m)
    }
    Canvas(out).drawCircle(size / 2f, size / 2f, size / 2f, Paint(Paint.ANTI_ALIAS_FLAG).apply { this.shader = shader })
    return out
  }
}
