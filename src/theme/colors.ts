import { useColorScheme } from "react-native";

export type Colors = {
  surface:               string;
  surfaceLow:            string;
  surfaceMid:            string;
  surfaceHigh:           string;
  surfaceHighest:        string;
  primary:               string;
  primaryBright:         string;
  secondary:             string;
  secondaryContainer:    string;
  onSecondaryContainer:  string;
  tertiary:              string;
  tertiaryContainer:     string;
  onTertiaryContainer:   string;
  onSurface:             string;
  onSurfaceVariant:      string;
  outline:               string;
  outlineVariant:        string;
};

export const darkColors: Colors = {
  surface:               "#0d1322",
  surfaceLow:            "#151b2b",
  surfaceMid:            "#191f2f",
  surfaceHigh:           "#242a3a",
  surfaceHighest:        "#2f3445",

  primary:               "#adc6ff",
  primaryBright:         "#4d8eff",

  secondary:             "#4edea3",
  secondaryContainer:    "#00a572",
  onSecondaryContainer:  "#00311f",

  tertiary:              "#ffb2b7",
  tertiaryContainer:     "#ff516a",
  onTertiaryContainer:   "#5b0017",

  onSurface:             "#dde2f7",
  onSurfaceVariant:      "#c2c6d6",

  outline:               "#8c909f",
  outlineVariant:        "#424754",
};

export const lightColors: Colors = {
  surface:               "#f4f6ff",
  surfaceLow:            "#ebeef9",
  surfaceMid:            "#ffffff",
  surfaceHigh:           "#e5e8f5",
  surfaceHighest:        "#d9dcf0",

  primary:               "#4d8eff",
  primaryBright:         "#1a52d4",

  secondary:             "#00875a",
  secondaryContainer:    "#d0f5e8",
  onSecondaryContainer:  "#003922",

  tertiary:              "#c20030",
  tertiaryContainer:     "#ffe0e4",
  onTertiaryContainer:   "#3d0010",

  onSurface:             "#0d1322",
  onSurfaceVariant:      "#454b62",

  outline:               "#6b7082",
  outlineVariant:        "#d0d4e4",
};

export function useColors(): Colors {
  const scheme = useColorScheme();
  return scheme === "dark" ? darkColors : lightColors;
}
