import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

/**
 * A `Modal` opens in its own window, which Android draws edge-to-edge and never resizes
 * for the keyboard, so a bottom sheet's lower rows end up behind it. Put this directly
 * inside the `Modal` (it fills the screen) and the content shrinks to sit above the
 * keyboard instead.
 *
 * On Android the sheet only moves back down once the keyboard has finished hiding. Pass
 * the sheet's background as `fillColor` and the keyboard's area is painted that color
 * meanwhile, so the screen behind the modal doesn't flash through as the keyboard
 * slides away.
 */
export function ModalKeyboardView({
  children,
  style,
  fillColor,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  fillColor?: string;
}) {
  const keyboard = useKeyboardHeight(!!fillColor);
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[{ flex: 1 }, style]}
      >
        {children}
      </KeyboardAvoidingView>
      {fillColor && keyboard > 0 ? (
        <View
          pointerEvents="none"
          style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: keyboard, backgroundColor: fillColor }}
        />
      ) : null}
    </View>
  );
}

/** Height of the open keyboard, 0 once it has hidden. */
function useKeyboardHeight(enabled: boolean): number {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const show = Keyboard.addListener("keyboardDidShow", (e) => setHeight(e.endCoordinates.height));
    const hide = Keyboard.addListener("keyboardDidHide", () => setHeight(0));
    return () => {
      show.remove();
      hide.remove();
    };
  }, [enabled]);
  return height;
}
