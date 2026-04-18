import React, { useEffect } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../../theme/colors";

// ── Types ─────────────────────────────────────────────────────────────────────

export type AlertButton = {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
};

export type ShowAlertOptions = {
  title: string;
  message?: string;
  buttons?: AlertButton[];
};

// ── Global imperative API ─────────────────────────────────────────────────────

let _show: ((opts: ShowAlertOptions) => void) | null = null;

/**
 * Show a Pika-style alert dialog from anywhere — no hook needed.
 * Requires <AlertProvider> to be mounted at the root.
 */
export function showAlert(opts: ShowAlertOptions) {
  _show?.(opts);
}

// ── Internal dialog state hook ────────────────────────────────────────────────

type DialogState = ShowAlertOptions & { visible: boolean };

function useDialogState(): [DialogState, (opts: ShowAlertOptions) => void] {
  const [state, setState] = React.useState<DialogState>({
    visible: false,
    title: "",
  });

  const dismiss = React.useCallback(
    () => setState((s) => ({ ...s, visible: false })),
    [],
  );

  const show = React.useCallback(
    (opts: ShowAlertOptions) => {
      const buttons: AlertButton[] = (opts.buttons ?? [{ text: "OK" }]).map(
        (b) => ({
          ...b,
          onPress: () => {
            dismiss();
            b.onPress?.();
          },
        }),
      );
      setState({
        visible: true,
        title: opts.title,
        message: opts.message,
        buttons,
      });
    },
    [dismiss],
  );

  return [{ ...state, _dismiss: dismiss } as any, show];
}

// ── AlertProvider — mount once at app root ────────────────────────────────────

export function AlertProvider() {
  const [state, show] = useDialogState();

  useEffect(() => {
    _show = show;
    return () => {
      _show = null;
    };
  }, [show]);

  return <AlertDialog {...state} onRequestClose={(state as any)._dismiss} />;
}

// ── Dialog component ──────────────────────────────────────────────────────────

interface AlertDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  onRequestClose?: () => void;
}

export function AlertDialog({
  visible,
  title,
  message,
  buttons = [{ text: "OK" }],
  onRequestClose,
}: AlertDialogProps) {
  const C = useColors();

  const cancelBtn = buttons.find((b) => b.style === "cancel");
  const otherBtns = buttons.filter((b) => b.style !== "cancel");
  const stackButtons = !cancelBtn && otherBtns.length > 2;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onRequestClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: C.surfaceLow,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {/* Content */}
          <View style={{ padding: 24, gap: 8 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: C.onSurface,
                textAlign: "center",
              }}
            >
              {title}
            </Text>
            {message ? (
              <Text
                style={{
                  fontSize: 14,
                  color: C.onSurfaceVariant,
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                {message}
              </Text>
            ) : null}
          </View>

          {/* Divider */}
          <View
            style={{ height: 1, backgroundColor: `${C.outlineVariant}40` }}
          />

          {/* Buttons */}
          <View style={{ flexDirection: stackButtons ? "column" : "row" }}>
            {cancelBtn && (
              <TouchableOpacity
                onPress={cancelBtn.onPress}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  paddingVertical: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRightWidth: otherBtns.length > 0 ? 1 : 0,
                  borderRightColor: `${C.outlineVariant}40`,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: C.onSurfaceVariant,
                  }}
                >
                  {cancelBtn.text}
                </Text>
              </TouchableOpacity>
            )}
            {otherBtns.map((btn, i) => (
              <TouchableOpacity
                key={i}
                onPress={btn.onPress}
                activeOpacity={0.7}
                style={{
                  flex: stackButtons ? undefined : 1,
                  paddingVertical: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopWidth: stackButtons || (!cancelBtn && i > 0) ? 1 : 0,
                  borderTopColor: `${C.outlineVariant}40`,
                  borderLeftWidth:
                    !stackButtons && (cancelBtn || i > 0) ? 1 : 0,
                  borderLeftColor: `${C.outlineVariant}40`,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: btn.style === "destructive" ? "#ef4444" : C.primary,
                  }}
                >
                  {btn.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}
