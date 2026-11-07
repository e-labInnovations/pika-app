import { forwardRef, type ComponentType, type Ref } from "react";
import { Platform, type NativeSyntheticEvent, type ViewProps } from "react-native";
import { requireNativeView, requireOptionalNativeModule } from "expo";

/** How a chip looks, keyed by `type:id`. Colors are web hex (#RRGGBB or #RRGGBBAA). */
export type ChipVisual = {
  imageUrl?: string | null;
  /** A complete SVG document, colors included. */
  svg?: string | null;
  color?: string | null;
  bgColor?: string | null;
};

export type PikaComposerProps = ViewProps & {
  /** Text with `@[Name](type:id)` tokens. Applied only when it differs from what the view last reported. */
  value: string;
  /** The latest `eventCount` JS has received; a value from a stale render is ignored. */
  mostRecentEventCount: number;
  entities: Record<string, ChipVisual>;
  placeholder?: string;
  placeholderColor?: string;
  textColor?: string;
  primaryColor?: string;
  fontSize?: number;
  editable?: boolean;
  /** Counted on the serialised text, tokens included. */
  maxLength?: number;
  onChangeValue?: (e: NativeSyntheticEvent<{ value: string; eventCount: number }>) => void;
  onMentionQuery?: (e: NativeSyntheticEvent<{ query: string | null }>) => void;
  onContentSizeChange?: (e: NativeSyntheticEvent<{ height: number }>) => void;
  onFocusChange?: (e: NativeSyntheticEvent<{ focused: boolean }>) => void;
};

export type PikaComposerHandle = {
  insertMention(type: string, id: string, name: string): Promise<void>;
  focus(): Promise<void>;
  blur(): Promise<void>;
};

/** Android-only native view; null elsewhere and in builds without the module (old dev client). */
const NativeView: ComponentType<PikaComposerProps & { ref?: Ref<PikaComposerHandle> }> | null =
  Platform.OS === "android" && requireOptionalNativeModule("PikaComposer") ? requireNativeView("PikaComposer") : null;

export const isPikaComposerAvailable = NativeView != null;

export const PikaComposer = forwardRef<PikaComposerHandle, PikaComposerProps>(function PikaComposer(props, ref) {
  if (!NativeView) return null;
  return <NativeView {...props} ref={ref} />;
});
