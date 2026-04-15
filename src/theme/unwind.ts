import { useColors } from "./colors";

/**
 * Helper to get Expo Stack header options that match the current theme.
 * Uses the centralized color palette from colors.ts/global.css.
 */
export const useThemedHeaderOptions = () => {
  const C = useColors();

  return {
    headerStyle: {
      backgroundColor: C.surface,
    },
    headerTintColor: C.onSurface,
    headerTitleStyle: {
      color: C.onSurface,
      fontSize: 17,
      fontWeight: "700" as const,
    },
    headerShadowVisible: false,
    headerBlurEffect: "systemChromeMaterial" as const, // iOS blur
    headerTransparent: false,
  };
};
