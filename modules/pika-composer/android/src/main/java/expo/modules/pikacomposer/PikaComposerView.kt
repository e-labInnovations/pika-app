package expo.modules.pikacomposer

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.graphics.Color
import android.text.Editable
import android.text.InputFilter
import android.text.InputType
import android.text.SpannableStringBuilder
import android.text.Spanned
import android.text.TextWatcher
import android.util.TypedValue
import android.view.Gravity
import android.view.MotionEvent
import android.view.inputmethod.InputMethodManager
import androidx.appcompat.widget.AppCompatEditText
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import kotlin.math.roundToInt

/**
 * A multiline text field where `@` mentions are chips (avatar + name) inside the text.
 *
 * JS and native exchange the text as a string with `@[Name](type:id)` tokens. Native
 * owns the text while the user types; a `value` from JS is applied only when JS has seen
 * the latest change (`mostRecentEventCount`), so typing never round-trips.
 */
class PikaComposerView(context: Context, appContext: AppContext) :
  ExpoView(context, appContext), MentionSpan.Host {

  private val onChangeValue by EventDispatcher<Map<String, Any?>>()
  private val onMentionQuery by EventDispatcher<Map<String, Any?>>()
  private val onContentSizeChange by EventDispatcher<Map<String, Any?>>()
  private val onFocusChange by EventDispatcher<Map<String, Any?>>()

  override val density: Float = context.resources.displayMetrics.density
  override var primaryColor: Int = Color.parseColor("#4d8eff")

  private var visuals: Map<String, ChipVisual> = emptyMap()
  private var maxLength: Int? = null
  private var lastValue = ""
  /** Changes this view has reported; JS echoes back the count it has seen. */
  private var eventCount = 0
  private var jsEventCount = 0
  private var pendingValue: String? = null
  private var lastQuery: String? = null
  private var queryReported = false
  private var lastHeight = -1
  /** True while native changes the text itself (setValue, token conversion). */
  private var applying = false
  /** Set at the end of init: the EditText reports selection changes while it is built. */
  private var ready = false

  private val edit: AppCompatEditText = object : AppCompatEditText(context) {
    override fun onSelectionChanged(selStart: Int, selEnd: Int) {
      super.onSelectionChanged(selStart, selEnd)
      reportQuery(this)
    }

    override fun onTextContextMenuItem(id: Int): Boolean {
      if (id == android.R.id.copy || id == android.R.id.cut) {
        val text = text ?: return super.onTextContextMenuItem(id)
        val from = minOf(selectionStart, selectionEnd).coerceAtLeast(0)
        val to = maxOf(selectionStart, selectionEnd).coerceAtLeast(0)
        if (from == to) return super.onTextContextMenuItem(id)
        // Copy chips as tokens so pasting them back gives chips again.
        val clip = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        clip.setPrimaryClip(ClipData.newPlainText(null, serialize(text.subSequence(from, to))))
        if (id == android.R.id.cut) text.delete(from, to)
        return true
      }
      return super.onTextContextMenuItem(id)
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
      // Let a long text scroll inside the field rather than the sheet around it.
      if (canScrollVertically(1) || canScrollVertically(-1)) parent?.requestDisallowInterceptTouchEvent(true)
      return super.onTouchEvent(event)
    }
  }

  private val lengthFilter = InputFilter { source, start, end, dest, dstart, dend ->
    val max = maxLength
    if (max == null || applying) return@InputFilter null
    val next = SpannableStringBuilder(dest).replace(dstart, dend, source, start, end)
    if (serialize(next).length <= max) null else ""
  }

  private val watcher = object : TextWatcher {
    override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) = Unit
    override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) = Unit
    override fun afterTextChanged(s: Editable) {
      if (applying) return
      if (Mentions.containsToken(s)) convertTokens(s)
      reportValue()
      reportQuery(edit)
      reportHeightSoon()
    }
  }

  private val measureAndLayout = Runnable {
    measure(
      MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY),
    )
    layout(left, top, right, bottom)
  }

  init {
    edit.background = null
    edit.setPadding(0, 0, 0, 0)
    edit.gravity = Gravity.TOP or Gravity.START
    edit.inputType = InputType.TYPE_CLASS_TEXT or
      InputType.TYPE_TEXT_FLAG_MULTI_LINE or
      InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
    edit.isSingleLine = false
    edit.setHorizontallyScrolling(false)
    edit.setLineSpacing(3f * density, 1f)
    edit.isVerticalScrollBarEnabled = true
    edit.setTextSize(TypedValue.COMPLEX_UNIT_SP, 15f)
    edit.filters = arrayOf(lengthFilter)
    edit.addTextChangedListener(watcher)
    edit.setOnFocusChangeListener { _, focused ->
      onFocusChange(mapOf("focused" to focused))
      reportQuery(edit)
    }
    addView(edit, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))
    ready = true
  }

  // ── Layout: React Native sizes this view; lay the EditText out to fill it ──────────

  override fun requestLayout() {
    super.requestLayout()
    // React Native ignores native layout requests; run the pass ourselves.
    @Suppress("SENSELESS_COMPARISON")
    if (measureAndLayout != null) post(measureAndLayout)
  }

  override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    edit.measure(
      MeasureSpec.makeMeasureSpec(r - l, MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(b - t, MeasureSpec.EXACTLY),
    )
    edit.layout(0, 0, r - l, b - t)
    if (changed) reportHeightSoon()
  }

  // ── Props ──────────────────────────────────────────────────────────────────────

  fun setValue(value: String) {
    pendingValue = value
  }

  fun setMostRecentEventCount(count: Int?) {
    jsEventCount = count ?: 0
  }

  /**
   * Applies `value` from JS after all props of an update are set. A value from JS that
   * has not seen the latest typed change is stale (the user typed on meanwhile) and is
   * ignored, like React Native's TextInput.
   */
  fun applyPendingValue() {
    val value = pendingValue ?: return
    pendingValue = null
    if (value == lastValue || jsEventCount < eventCount) return
    applying = true
    try {
      edit.setText(build(value))
      edit.setSelection(edit.text?.length ?: 0)
    } finally {
      applying = false
    }
    lastValue = value
    reportQuery(edit)
    reportHeightSoon()
  }

  fun setEntities(raw: Map<String, Map<String, Any?>>) {
    visuals = raw.mapValues { (_, v) ->
      ChipVisual(
        imageUrl = (v["imageUrl"] as? String)?.takeIf { it.isNotBlank() },
        svg = (v["svg"] as? String)?.takeIf { it.isNotBlank() },
        color = parseWebColor(v["color"] as? String),
        bgColor = parseWebColor(v["bgColor"] as? String),
      )
    }
    redraw()
  }

  fun setPlaceholder(text: String?) {
    edit.hint = text
  }

  fun setPlaceholderColor(color: String?) {
    parseWebColor(color)?.let { edit.setHintTextColor(it) }
  }

  fun setTextColor(color: String?) {
    parseWebColor(color)?.let { edit.setTextColor(it) }
  }

  fun setPrimaryColor(color: String?) {
    primaryColor = parseWebColor(color) ?: primaryColor
    edit.highlightColor = (primaryColor and 0x00FFFFFF) or (0x44 shl 24)
    redraw()
  }

  fun setFontSize(size: Double?) {
    edit.setTextSize(TypedValue.COMPLEX_UNIT_SP, (size ?: 15.0).toFloat())
    reportHeightSoon()
  }

  fun setEditable(editable: Boolean?) {
    val on = editable != false
    edit.isFocusable = on
    edit.isFocusableInTouchMode = on
    edit.isCursorVisible = on
    if (!on) edit.clearFocus()
  }

  fun setMaxLength(max: Int?) {
    maxLength = max?.takeIf { it > 0 }
  }

  // ── Functions ──────────────────────────────────────────────────────────────────

  /** Replaces the `@query` before the cursor (if any) with a chip and a space. */
  fun insertMention(type: String, id: String, name: String) {
    val text = edit.text ?: return
    val cursor = edit.selectionEnd.coerceAtLeast(0)
    val query = Mentions.mentionQuery(text, cursor)
    val start = if (query != null) cursor - query.length - 1 else cursor
    val chip = SpannableStringBuilder().also { appendChip(it, Mention(type, id, name.trim())) }.append(' ')
    text.replace(start, cursor, chip)
    edit.setSelection((start + chip.length).coerceAtMost(text.length))
  }

  fun focus() {
    edit.requestFocus()
    val imm = context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
    imm.showSoftInput(edit, InputMethodManager.SHOW_IMPLICIT)
  }

  fun blur() {
    val imm = context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
    imm.hideSoftInputFromWindow(edit.windowToken, 0)
    edit.clearFocus()
  }

  // ── MentionSpan.Host ───────────────────────────────────────────────────────────

  override fun visualFor(m: Mention): ChipVisual? = visuals["${m.type}:${m.id}"]

  override fun redraw() {
    edit.invalidate()
  }

  // ── Text model ─────────────────────────────────────────────────────────────────

  private fun appendChip(sb: SpannableStringBuilder, m: Mention) {
    val at = sb.length
    sb.append(Mentions.CHIP_CHAR)
    sb.setSpan(MentionSpan(m, this), at, at + 1, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
  }

  private fun build(value: String): SpannableStringBuilder {
    val sb = SpannableStringBuilder()
    for (p in Mentions.parse(value)) {
      when (p) {
        is Piece.Text -> sb.append(p.text)
        is Piece.Token -> appendChip(sb, p.mention)
      }
    }
    return sb
  }

  /** Text with chips written back as tokens; a stray chip character is dropped. */
  private fun serialize(text: CharSequence): String {
    val spans = (text as? Spanned)?.getSpans(0, text.length, MentionSpan::class.java).orEmpty()
    val at = spans.associateBy { (text as Spanned).getSpanStart(it) }
    val out = StringBuilder()
    for (i in text.indices) {
      val span = at[i]
      when {
        span != null -> out.append(Mentions.tokenText(span.mention))
        text[i] != Mentions.CHIP_CHAR -> out.append(text[i])
      }
    }
    return out.toString()
  }

  /** Turns typed or pasted `@[Name](type:id)` text into chips. */
  private fun convertTokens(s: Editable) {
    val plain = s.toString()
    applying = true
    try {
      val cursor = edit.selectionEnd
      var newCursor = cursor
      // Replace from the end so earlier offsets stay valid.
      for ((range, mention) in Mentions.tokenRanges(plain).asReversed()) {
        val chip = SpannableStringBuilder().also { appendChip(it, mention) }
        s.replace(range.first, range.last + 1, chip)
        if (cursor > range.last) newCursor -= range.last - range.first
      }
      edit.setSelection(newCursor.coerceIn(0, s.length))
    } finally {
      applying = false
    }
  }

  // ── Events ─────────────────────────────────────────────────────────────────────

  private fun reportValue() {
    val value = serialize(edit.text ?: "")
    if (value == lastValue) return
    lastValue = value
    eventCount++
    onChangeValue(mapOf("value" to value, "eventCount" to eventCount))
  }

  private fun reportQuery(view: AppCompatEditText) {
    if (!ready) return
    val text = view.text ?: return
    val query =
      if (view.hasFocus() && view.selectionStart == view.selectionEnd) Mentions.mentionQuery(text, view.selectionEnd)
      else null
    if (queryReported && query == lastQuery) return
    queryReported = true
    lastQuery = query
    onMentionQuery(mapOf("query" to query))
  }

  private fun reportHeightSoon() {
    post {
      val layout = edit.layout ?: return@post
      val px = layout.height + edit.compoundPaddingTop + edit.compoundPaddingBottom
      val dp = (px / density).roundToInt()
      if (dp == lastHeight) return@post
      lastHeight = dp
      onContentSizeChange(mapOf("height" to dp))
    }
  }
}
