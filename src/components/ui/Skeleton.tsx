import React, { useEffect, useRef } from "react";
import { Animated, type ViewStyle } from "react-native";
import { useColors } from "../../theme/colors";

type Props = {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
  style?: ViewStyle;
};

/**
 * Animated skeleton block with a pulse opacity effect.
 * Uses theme surface colors so it adapts to light / dark mode.
 */
export function Skeleton({ width, height = 14, radius = 8, style }: Props) {
  const C = useColors();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: C.surfaceHighest,
          opacity,
        },
        style,
      ]}
    />
  );
}
