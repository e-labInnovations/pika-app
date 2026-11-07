package expo.modules.pikacomposer

/** An entity tagged in the text, written as `@[Name](type:id)`. */
data class Mention(val type: String, val id: String, val name: String)

sealed interface Piece {
  data class Text(val text: String) : Piece
  data class Token(val mention: Mention) : Piece
}

/**
 * The text format shared with JS and the server: plain text with `@[Name](type:id)`
 * tokens (see the server's `tagged-entities.ts`). Pure Kotlin, no Android types.
 */
object Mentions {
  /** One character stands for each chip in the editor. */
  const val CHIP_CHAR = '￼'

  private val TOKEN = Regex("""@\[([^\]\n]{1,80})\]\((person|account|category|tag):([A-Za-z0-9_-]{1,64})\)""")
  private val UNSAFE_NAME = Regex("""[\[\]\n]""")

  fun tokenText(m: Mention): String = "@[${m.name.replace(UNSAFE_NAME, " ")}](${m.type}:${m.id})"

  fun containsToken(s: CharSequence): Boolean = TOKEN.containsMatchIn(s)

  /** Where each token sits in [s], in order. */
  fun tokenRanges(s: String): List<Pair<IntRange, Mention>> =
    TOKEN.findAll(s).map { m ->
      val (name, type, id) = m.destructured
      m.range to Mention(type, id, name.trim())
    }.toList()

  fun parse(s: String): List<Piece> {
    val out = mutableListOf<Piece>()
    var at = 0
    for (m in TOKEN.findAll(s)) {
      if (m.range.first > at) out += Piece.Text(s.substring(at, m.range.first))
      val (name, type, id) = m.destructured
      out += Piece.Token(Mention(type, id, name.trim()))
      at = m.range.last + 1
    }
    if (at < s.length) out += Piece.Text(s.substring(at))
    return out
  }

  fun serialize(pieces: List<Piece>): String =
    pieces.joinToString("") { if (it is Piece.Text) it.text else tokenText((it as Piece.Token).mention) }

  /**
   * The word being typed after "@" at [cursor]: from an "@" that starts the text or
   * follows whitespace, up to the cursor, with no whitespace or chip in between.
   * Null when the cursor is not in such a word.
   */
  fun mentionQuery(text: CharSequence, cursor: Int): String? {
    if (cursor < 0 || cursor > text.length) return null
    var i = cursor - 1
    while (i >= 0) {
      val c = text[i]
      if (c == '@') {
        return if (i == 0 || text[i - 1].isWhitespace()) text.subSequence(i + 1, cursor).toString() else null
      }
      if (c.isWhitespace() || c == CHIP_CHAR) return null
      i--
    }
    return null
  }
}
