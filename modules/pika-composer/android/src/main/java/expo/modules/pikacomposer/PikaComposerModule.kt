package expo.modules.pikacomposer

import expo.modules.kotlin.functions.Queues
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

/** Text field with inline mention chips; see [PikaComposerView]. */
class PikaComposerModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("PikaComposer")

    View(PikaComposerView::class) {
      Events("onChangeValue", "onMentionQuery", "onContentSizeChange", "onFocusChange")

      Prop("value") { view: PikaComposerView, value: String? -> view.setValue(value ?: "") }
      Prop("mostRecentEventCount") { view: PikaComposerView, value: Int? -> view.setMostRecentEventCount(value) }
      Prop("entities") { view: PikaComposerView, value: Map<String, Map<String, Any?>>? ->
        view.setEntities(value ?: emptyMap())
      }
      Prop("placeholder") { view: PikaComposerView, value: String? -> view.setPlaceholder(value) }
      Prop("placeholderColor") { view: PikaComposerView, value: String? -> view.setPlaceholderColor(value) }
      Prop("textColor") { view: PikaComposerView, value: String? -> view.setTextColor(value) }
      Prop("primaryColor") { view: PikaComposerView, value: String? -> view.setPrimaryColor(value) }
      Prop("fontSize") { view: PikaComposerView, value: Double? -> view.setFontSize(value) }
      Prop("editable") { view: PikaComposerView, value: Boolean? -> view.setEditable(value) }
      Prop("maxLength") { view: PikaComposerView, value: Int? -> view.setMaxLength(value) }

      OnViewDidUpdateProps { view: PikaComposerView -> view.applyPendingValue() }

      AsyncFunction("insertMention") { view: PikaComposerView, type: String, id: String, name: String ->
        view.insertMention(type, id, name)
      }.runOnQueue(Queues.MAIN)
      AsyncFunction("focus") { view: PikaComposerView -> view.focus() }.runOnQueue(Queues.MAIN)
      AsyncFunction("blur") { view: PikaComposerView -> view.blur() }.runOnQueue(Queues.MAIN)
    }
  }
}
