package expo.modules.pikacomposer

import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.RectF
import android.graphics.Typeface
import android.text.style.ReplacementSpan
import kotlin.math.max
import kotlin.math.roundToInt

/**
 * Draws one tagged entity as a pill: round avatar (photo, icon or initials) and name.
 * It covers a single [Mentions.CHIP_CHAR], so the cursor cannot enter it and one
 * Backspace removes it.
 */
class MentionSpan(
  val mention: Mention,
  private val host: Host,
) : ReplacementSpan() {
  interface Host {
    val density: Float
    val primaryColor: Int
    fun visualFor(m: Mention): ChipVisual?
    fun redraw()
  }

  private val d get() = host.density
  private val padStart get() = 2f * d
  private val padEnd get() = 9f * d
  private val gap get() = 5f * d
  private val margin get() = 2f * d
  private val vPad get() = 2f * d

  private fun namePaint(base: Paint) = Paint(base).apply {
    isAntiAlias = true
    typeface = Typeface.create(base.typeface, Typeface.BOLD)
    color = host.primaryColor
  }

  /** Avatar diameter: the text's own height, so lines keep their size. */
  private fun avatarSize(base: Paint): Int {
    val fm = base.fontMetrics
    return (fm.descent - fm.ascent).roundToInt()
  }

  override fun getSize(paint: Paint, text: CharSequence?, start: Int, end: Int, fm: Paint.FontMetricsInt?): Int {
    val avatar = avatarSize(paint)
    if (fm != null) {
      val base = paint.fontMetricsInt
      // Room for the pill's padding above and below the text.
      val extra = (vPad + margin).roundToInt()
      fm.ascent = base.ascent - extra
      fm.top = minOf(base.top, fm.ascent)
      fm.descent = base.descent + extra
      fm.bottom = max(base.bottom, fm.descent)
    }
    val w = margin + padStart + avatar + gap + namePaint(paint).measureText(mention.name) + padEnd + margin
    return w.roundToInt()
  }

  override fun draw(
    canvas: Canvas,
    text: CharSequence?,
    start: Int,
    end: Int,
    x: Float,
    top: Int,
    y: Int,
    bottom: Int,
    paint: Paint,
  ) {
    val avatar = avatarSize(paint)
    val fm = paint.fontMetrics
    val name = namePaint(paint)
    val left = x + margin
    val pillTop = y + fm.ascent - vPad
    val pillBottom = y + fm.descent + vPad
    val right = left + padStart + avatar + gap + name.measureText(mention.name) + padEnd
    val r = (pillBottom - pillTop) / 2f

    val bg = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = withAlpha(host.primaryColor, 0x22) }
    canvas.drawRoundRect(RectF(left, pillTop, right, pillBottom), r, r, bg)

    val cx = left + padStart + avatar / 2f
    val cy = (pillTop + pillBottom) / 2f
    drawAvatar(canvas, cx, cy, avatar, paint)

    canvas.drawText(mention.name, left + padStart + avatar + gap, y.toFloat(), name)
  }

  private fun drawAvatar(canvas: Canvas, cx: Float, cy: Float, size: Int, base: Paint) {
    val v = host.visualFor(mention)
    val radius = size / 2f
    val fill = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = v?.bgColor ?: withAlpha(host.primaryColor, 0x33) }

    v?.imageUrl?.let { url ->
      Avatars.photo(url, size) { host.redraw() }?.let {
        canvas.drawBitmap(it, cx - radius, cy - radius, null)
        return
      }
    }
    canvas.drawCircle(cx, cy, radius, fill)
    v?.svg?.let { svg ->
      val icon = (size * 0.62f).roundToInt()
      Avatars.icon(svg, icon)?.let {
        canvas.drawBitmap(it, cx - icon / 2f, cy - icon / 2f, null)
        return
      }
    }
    val label = Paint(base).apply {
      isAntiAlias = true
      typeface = Typeface.create(base.typeface, Typeface.BOLD)
      textSize = size * 0.42f
      color = v?.color ?: host.primaryColor
      textAlign = Paint.Align.CENTER
    }
    val lfm = label.fontMetrics
    canvas.drawText(initialsOf(mention.name), cx, cy - (lfm.ascent + lfm.descent) / 2f, label)
  }

  private fun withAlpha(color: Int, alpha: Int) = (color and 0x00FFFFFF) or (alpha shl 24)
}
