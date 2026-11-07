import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { showAlert } from "../ui/AlertDialog";
import { useColors } from "../../theme/colors";
import { MentionInput, mentionsToPlain } from "../mentions/MentionInput";
import { ModalKeyboardView } from "../ui/ModalKeyboardView";
import { useRefineSms } from "../../services/gql/sms/sms.service";
import { useAuth } from "../../context/AuthContext";

type Picked = { uri: string; base64: string; mimeType: string };

/**
 * "Edit with AI" for a pending bank SMS: add details and/or a receipt image and the AI
 * re-reads the SMS with them, or just try again. The suggestion is updated, not added.
 */
export function SmsRefineSheet({
  smsId,
  visible,
  onClose,
  onDone,
}: {
  smsId: string;
  visible: boolean;
  onClose: () => void;
  /** Called after the suggestion has been updated. */
  onDone?: () => void;
}) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const { refineSms, loading } = useRefineSms();
  const [text, setText] = useState("");
  const [image, setImage] = useState<Picked | null>(null);
  const [running, setRunning] = useState<"apply" | "retry" | null>(null);

  const reset = () => {
    setText("");
    setImage(null);
    setRunning(null);
  };
  const close = () => {
    if (loading) return;
    reset();
    onClose();
  };

  const pick = async (source: "camera" | "library") => {
    const perm =
      source === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      showAlert({
        title: "Permission required",
        message: source === "camera" ? "Allow camera access to take a photo." : "Allow photo access to pick an image.",
      });
      return;
    }
    const opts: ImagePicker.ImagePickerOptions = { mediaTypes: ["images"], quality: 0.85, base64: true };
    const res =
      source === "camera" ? await ImagePicker.launchCameraAsync(opts) : await ImagePicker.launchImageLibraryAsync(opts);
    if (res.canceled) return;
    const a = res.assets[0];
    if (!a.base64) {
      showAlert({ title: "Error", message: "Could not read the image." });
      return;
    }
    setImage({ uri: a.uri, base64: a.base64, mimeType: a.mimeType ?? "image/jpeg" });
  };

  const run = async (mode: "apply" | "retry") => {
    setRunning(mode);
    try {
      await refineSms(smsId, mode === "apply" ? { text: text.trim(), image: image ?? undefined } : {});
      reset();
      onDone?.();
      onClose();
    } catch (err: any) {
      setRunning(null);
      showAlert({ title: "AI couldn't update it", message: err?.message ?? "Something went wrong." });
    }
  };

  const canApply = !!mentionsToPlain(text).trim() || !!image;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={close}>
      <ModalKeyboardView fillColor={C.surfaceLow} style={{ justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.45)" }}
          activeOpacity={1}
          onPress={close}
        />
        <View
          style={{
            backgroundColor: C.surfaceLow,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 20,
            paddingBottom: Math.max(insets.bottom, 16) + 8,
            gap: 14,
          }}
        >
          <View className="flex-row items-center gap-2">
            <DynamicIcon name="sparkles" size={18} color={C.primary} />
            <Text className="text-[17px] font-bold text-on-surface flex-1">Edit with AI</Text>
            <TouchableOpacity onPress={close} disabled={loading} accessibilityLabel="Close">
              <DynamicIcon name="x" size={20} color={C.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
          <Text className="text-[13px] text-on-surface-variant">
            Add what the SMS doesn't say, or a receipt. The AI reads them with the SMS; the amount and time stay as
            the bank sent them.
          </Text>

          <MentionInput
            value={text}
            onChange={setText}
            placeholder="e.g. team lunch, split with @Rony"
            maxLength={1000}
            editable={!loading}
            minHeight={80}
            maxHeight={180}
          />

          {image ? (
            <View className="flex-row items-center gap-3">
              <Image source={{ uri: image.uri }} style={{ width: 56, height: 56, borderRadius: 12 }} />
              <Text className="flex-1 text-[13px] text-on-surface-variant">Image attached</Text>
              <TouchableOpacity onPress={() => setImage(null)} disabled={loading} accessibilityLabel="Remove image">
                <DynamicIcon name="trash-2" size={18} color={C.onSurfaceVariant} />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row gap-2">
              {(["camera", "library"] as const).map((src) => (
                <TouchableOpacity
                  key={src}
                  onPress={() => pick(src)}
                  disabled={loading}
                  activeOpacity={0.75}
                  className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl py-2.5"
                  style={{ backgroundColor: `${C.outlineVariant}33` }}
                >
                  <DynamicIcon name={src === "camera" ? "camera" : "image"} size={15} color={C.onSurfaceVariant} />
                  <Text className="text-[13px] font-semibold text-on-surface-variant">
                    {src === "camera" ? "Take photo" : "Add image"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => run("retry")}
              disabled={loading}
              activeOpacity={0.75}
              className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl py-3"
              style={{ backgroundColor: `${C.primary}1f` }}
            >
              {running === "retry" ? (
                <ActivityIndicator size="small" color={C.primary} />
              ) : (
                <DynamicIcon name="refresh-cw" size={15} color={C.primary} />
              )}
              <Text className="text-[14px] font-semibold" style={{ color: C.primary }}>
                Try again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => run("apply")}
              disabled={loading || !canApply}
              activeOpacity={0.75}
              className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl py-3"
              style={{ backgroundColor: C.primaryBright, opacity: canApply ? 1 : 0.5 }}
            >
              {running === "apply" ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <DynamicIcon name="sparkles" size={15} color="#fff" />
              )}
              <Text className="text-[14px] font-semibold" style={{ color: "#fff" }}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalKeyboardView>
    </Modal>
  );
}

/** Whether AI features are switched on for the app (hides the AI entry points when not). */
export function useAiEnabled(): boolean {
  const { appSettings } = useAuth();
  return appSettings?.ai?.enabled !== false;
}

/** ✨ button that opens {@link SmsRefineSheet} for one SMS; renders nothing when AI is off. */
export function SmsRefineButton({
  smsId,
  disabled,
  onDone,
  className = "items-center justify-center rounded-xl px-3 py-2.5",
}: {
  smsId: string;
  disabled?: boolean;
  onDone?: () => void;
  className?: string;
}) {
  const C = useColors();
  const [open, setOpen] = useState(false);
  if (!useAiEnabled()) return null;
  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        disabled={disabled}
        activeOpacity={0.75}
        className={className}
        style={{ backgroundColor: `${C.primary}1f` }}
        accessibilityLabel="Edit with AI"
      >
        <DynamicIcon name="sparkles" size={16} color={C.primary} />
      </TouchableOpacity>
      <SmsRefineSheet smsId={smsId} visible={open} onClose={() => setOpen(false)} onDone={onDone} />
    </>
  );
}

/** "Edit with AI" and "Try again", labelled, for the SMS review screen. */
export function SmsRefineActions({ smsId, onDone }: { smsId: string; onDone?: () => void }) {
  const C = useColors();
  const [open, setOpen] = useState(false);
  const { refineSms, loading } = useRefineSms();
  const enabled = useAiEnabled();
  if (!enabled) return null;

  const retry = async () => {
    try {
      await refineSms(smsId, {});
      onDone?.();
    } catch (err: any) {
      showAlert({ title: "AI couldn't update it", message: err?.message ?? "Something went wrong." });
    }
  };

  const btn = "flex-1 flex-row items-center justify-center gap-1.5 rounded-xl py-2.5";
  return (
    <View className="flex-row gap-2">
      <TouchableOpacity onPress={() => setOpen(true)} disabled={loading} activeOpacity={0.75} className={btn} style={{ backgroundColor: `${C.primary}1f` }}>
        <DynamicIcon name="sparkles" size={15} color={C.primary} />
        <Text className="text-[13px] font-semibold" style={{ color: C.primary }}>Edit with AI</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={retry} disabled={loading} activeOpacity={0.75} className={btn} style={{ backgroundColor: `${C.primary}1f` }}>
        {loading ? <ActivityIndicator size="small" color={C.primary} /> : <DynamicIcon name="refresh-cw" size={15} color={C.primary} />}
        <Text className="text-[13px] font-semibold" style={{ color: C.primary }}>Try again</Text>
      </TouchableOpacity>
      <SmsRefineSheet smsId={smsId} visible={open} onClose={() => setOpen(false)} onDone={onDone} />
    </View>
  );
}
