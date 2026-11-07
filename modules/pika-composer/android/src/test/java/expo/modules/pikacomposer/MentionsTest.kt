package expo.modules.pikacomposer

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class MentionsTest {
  @Test
  fun roundTripsTextAndTokens() {
    val s = "lunch with @[Rony](person:abc-1) and @[Food](category:x)"
    val pieces = Mentions.parse(s)
    assertEquals(
      listOf(
        Piece.Text("lunch with "),
        Piece.Token(Mention("person", "abc-1", "Rony")),
        Piece.Text(" and "),
        Piece.Token(Mention("category", "x", "Food")),
      ),
      pieces,
    )
    assertEquals(s, Mentions.serialize(pieces))
  }

  @Test
  fun adjacentTokens() {
    val s = "@[A](tag:1)@[B](tag:2)"
    assertEquals(2, Mentions.parse(s).size)
    assertEquals(s, Mentions.serialize(Mentions.parse(s)))
  }

  @Test
  fun unknownTypeStaysText() {
    assertEquals(listOf(Piece.Text("@[a](foo:1)")), Mentions.parse("@[a](foo:1)"))
  }

  @Test
  fun namesWithBracketsAreCleaned() {
    assertEquals("@[a b ](tag:1)", Mentions.tokenText(Mention("tag", "1", "a[b]")))
  }

  @Test
  fun mentionQuery() {
    assertEquals("ro", Mentions.mentionQuery("hi @ro", 6))
    assertEquals("", Mentions.mentionQuery("@", 1))
    assertNull(Mentions.mentionQuery("a@b", 3))
    assertNull(Mentions.mentionQuery("@ro x", 5))
    assertNull(Mentions.mentionQuery("x￼@", 3))
    assertEquals("r", Mentions.mentionQuery("x @r more", 4))
  }
}
