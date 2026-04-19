/**
 * Shared form for Add and Edit transaction screens.
 */
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showAlert } from "../ui/AlertDialog";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { AccountAvatar } from "../AccountAvatar";
import { UserAvatar } from "../UserAvatar";
import { DateTimePicker } from "./DateTimePicker";
import { AttachSourceSheet } from "./AttachSourceSheet";
import { CategoryPickerSheet, type TxType } from "./CategoryPickerSheet";
import { AccountPickerSheet } from "./AccountPickerSheet";
import { PersonPickerSheet } from "./PersonPickerSheet";
import { TagPickerSheet } from "./TagPickerSheet";
import { TxTypeSelector, TX_TYPE_COLORS } from "./TxTypeSelector";
import {
  type CategoryFieldsFragment,
  type AccountFieldsFragment,
  type PersonFieldsFragment,
  type TagFieldsFragment,
  Transaction_type_MutationInput,
} from "../../services/gql/types/graphql";
import { uploadMedia, resolveMediaUrl } from "../../lib/media-upload";
import { useColors } from "../../theme/colors";
import { useAuth } from "../../context/AuthContext";
import {
  usePredictCategory,
  useSuggestCategory,
  type PredictedCategory,
  type SuggestedCategory,
} from "../../services/gql/ai/ai.service";

// ── Types ─────────────────────────────────────────────────────────────────────

/** A server-side attachment that already exists on the transaction */
export type ExistingAttachment = {
  id: string;
  url: string | null;
  mimeType: string | null;
  filename: string | null;
};

type LocalAttachment = {
  /** Stable local ID — never changes, immune to array mutations */
  localId: string;
  /** Local file URI (new) or resolved server URL (existing) */
  uri: string;
  filename: string | null;
  mimeType: string | null;
  /**
   * undefined = still uploading (new item)
   * string    = server media doc ID (uploaded or pre-existing)
   * null      = upload failed
   */
  mediaId?: string | null;
};

export type TxFormValues = {
  title: string;
  amount: string;
  date: Date;
  type: TxType;
  category: CategoryFieldsFragment | null;
  account: AccountFieldsFragment | null;
  toAccount: AccountFieldsFragment | null;
  person: PersonFieldsFragment | null;
  tags: TagFieldsFragment[];
  note: string;
  /** Full attachment data for items already on the server (edit mode) */
  existingAttachments: ExistingAttachment[];
};

export type TxFormProps = {
  initialValues: TxFormValues;
  onSubmit: (values: TxFormValues, attachmentIds: string[]) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  title: string;
  saving: boolean;
  /** Called when the user taps the AI assistant button in the header */
  onAIPress?: () => void;
  /** Local attachments to seed on mount and begin uploading immediately (e.g. AI receipt image) */
  seedAttachments?: { uri: string; mimeType: string; filename: string }[];
};

// ── Type mutation map ─────────────────────────────────────────────────────────

const TX_MUTATION_TYPE: Record<TxType, Transaction_type_MutationInput> = {
  expense: Transaction_type_MutationInput.expense,
  income: Transaction_type_MutationInput.income,
  transfer: Transaction_type_MutationInput.transfer,
};

// ── Picker row wrapper ────────────────────────────────────────────────────────

function PickerRow({
  label,
  onPress,
  children,
  rightIcon = "chevron-right",
}: {
  label: string;
  onPress: () => void;
  children: React.ReactNode;
  rightIcon?: string;
}) {
  const C = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 14, paddingVertical: 12 }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5, color: C.onSurfaceVariant, marginBottom: 3 }}>
          {label}
        </Text>
        {children}
      </View>
      <DynamicIcon name={rightIcon} size={16} color={C.outlineVariant} />
    </TouchableOpacity>
  );
}

// ── Attachment thumbnail ──────────────────────────────────────────────────────

const THUMB_SIZE = 88;

function AttachmentThumb({ att, onRemove }: { att: LocalAttachment; onRemove: () => void }) {
  const C = useColors();
  const uploading = att.mediaId === undefined;
  const failed = att.mediaId === null;
  const isImg = (att.mimeType ?? "").startsWith("image/");
  const SIZE = THUMB_SIZE;
  return (
    <View style={{ width: SIZE, height: SIZE, borderRadius: 12, overflow: "hidden", backgroundColor: C.surfaceHigh }}>
      {isImg ? (
        <Image source={{ uri: att.uri }} style={{ width: SIZE, height: SIZE }} resizeMode="cover" />
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 3 }}>
          <DynamicIcon name="file-text" size={22} color={C.onSurfaceVariant} />
          <Text style={{ fontSize: 9, color: C.onSurfaceVariant, textAlign: "center", paddingHorizontal: 4 }} numberOfLines={2}>
            {att.filename}
          </Text>
        </View>
      )}
      {uploading ? (
        <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      ) : (
        <TouchableOpacity
          onPress={onRemove}
          activeOpacity={0.8}
          style={{
            position: "absolute", top: 4, right: 4,
            width: 20, height: 20, borderRadius: 10,
            backgroundColor: failed ? "rgba(239,68,68,0.8)" : "rgba(0,0,0,0.55)",
            alignItems: "center", justifyContent: "center",
          }}
        >
          <DynamicIcon name="x" size={11} color="#fff" />
        </TouchableOpacity>
      )}
      {att.mediaId && (
        <View style={{ position: "absolute", bottom: 4, right: 4, width: 16, height: 16, borderRadius: 8, backgroundColor: "#10b981", alignItems: "center", justifyContent: "center" }}>
          <DynamicIcon name="check" size={9} color="#fff" />
        </View>
      )}
    </View>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function TransactionForm({ initialValues, onSubmit, onCancel, submitLabel, title, saving, onAIPress, seedAttachments }: TxFormProps) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const [values, setValues] = useState<TxFormValues>(initialValues);
  // Seed from existing (edit mode) — they already have a mediaId (their server doc id)
  const [attachments, setAttachments] = useState<LocalAttachment[]>(() =>
    initialValues.existingAttachments.map((a) => ({
      localId: `existing-${a.id}`,
      uri: resolveMediaUrl(a.url) ?? "",
      filename: a.filename,
      mimeType: a.mimeType,
      mediaId: a.id, // already on server — treated as "done"
    })),
  );

  // Seed attachments from AI (e.g. receipt image) — upload immediately on mount
  useEffect(() => {
    if (!seedAttachments?.length) return;
    const newItems: LocalAttachment[] = seedAttachments.map((a, i) => ({
      localId: `seed-${Date.now()}-${i}`,
      uri: a.uri,
      filename: a.filename,
      mimeType: a.mimeType,
    }));
    setAttachments((prev) => [...prev, ...newItems]);

    (async () => {
      for (const item of newItems) {
        try {
          const media = await uploadMedia(
            item.uri,
            item.filename ?? `receipt-${Date.now()}.jpg`,
            item.mimeType ?? "image/jpeg",
            item.filename ?? undefined,
          );
          setAttachments((prev) =>
            prev.map((a) => (a.localId === item.localId ? { ...a, mediaId: media.id } : a)),
          );
        } catch {
          showAlert({ title: "Upload failed", message: `Could not upload receipt image.` });
          setAttachments((prev) =>
            prev.map((a) => (a.localId === item.localId ? { ...a, mediaId: null } : a)),
          );
        }
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sheet visibility
  const [showCategory, setShowCategory] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showToAccount, setShowToAccount] = useState(false);
  const [showPerson, setShowPerson] = useState(false);
  const [showTags, setShowTags] = useState(false);

  // AI category suggestion state — the explicit Suggest button routes through
  // the user's preferred backend (minilm | gemini). See settings/ai.tsx.
  const { settings } = useAuth();
  const categoryAiMethod = (settings?.categoryAiMethod as "minilm" | "gemini" | null | undefined) ?? "minilm";

  const { suggestCategory, loading: suggesting } = useSuggestCategory();
  const [suggestedCategory, setSuggestedCategory] = useState<SuggestedCategory | null>(null);

  // AI category prediction state (debounced, local MiniLM-backed)
  const { predictCategory } = usePredictCategory();
  const [predictedCategory, setPredictedCategory] = useState<PredictedCategory | null>(null);
  const predictReqIdRef = React.useRef(0);
  const dismissedPredictionTitleRef = React.useRef<string | null>(null);

  const runSuggest = async (forceMethod?: "minilm" | "gemini") => {
    const title = values.title.trim();
    if (title.length < 3) return;
    try {
      const res = await suggestCategory({
        type: values.type,
        title,
        amount: values.amount.trim() || undefined,
        date: values.date.toISOString(),
        note: values.note.trim() || undefined,
        personId: values.person?.id,
        forceMethod,
      });
      const cat = (res.data?.suggestCategory?.category ?? null) as SuggestedCategory | null;
      if (cat) {
        setSuggestedCategory(cat);
        return;
      }

      // No match — if we just tried MiniLM, let the user escalate to Gemini
      // for this one request without changing their saved preference.
      const triedMethod = forceMethod ?? categoryAiMethod;
      if (triedMethod === "minilm") {
        showAlert({
          title: "No local match",
          message:
            "The local model couldn't confidently match a category. Try Gemini for a smarter guess?",
          buttons: [
            { text: "Cancel", style: "cancel" },
            { text: "Try Gemini", onPress: () => runSuggest("gemini") },
          ],
        });
      } else {
        showAlert({
          title: "No suggestion",
          message: "Couldn't find a matching category.",
        });
      }
    } catch (e: any) {
      showAlert({ title: "Couldn't suggest", message: e?.message ?? "Suggestion failed." });
    }
  };

  const handleSuggestCategory = () => runSuggest();

  const applySuggestedCategory = () => {
    if (!suggestedCategory) return;
    set("category", suggestedCategory);
    setSuggestedCategory(null);
  };

  // ── Debounced local prediction ──
  // Fires ~500ms after the user stops typing (or changes type).
  // Auto-fills the category row when there's a high-confidence local match,
  // and only when the user hasn't already picked one. The "Predicted" chip
  // stays visible so the user can tell it wasn't their choice.
  useEffect(() => {
    const title = values.title.trim();

    // Clear any stale prediction if preconditions fail
    if (title.length < 3) {
      setPredictedCategory(null);
      return;
    }
    if (dismissedPredictionTitleRef.current === title) return;

    // Don't predict if the user has already picked a category that isn't one we auto-filled
    if (values.category && values.category.id !== predictedCategory?.id) {
      setPredictedCategory(null);
      return;
    }

    const reqId = ++predictReqIdRef.current;
    const handle = setTimeout(async () => {
      try {
        const res = await predictCategory({ type: values.type, title });
        if (reqId !== predictReqIdRef.current) return; // superseded
        const cat = (res.data?.predictCategory?.category ?? null) as PredictedCategory | null;
        if (!cat) return;
        // Auto-fill only if the category slot is empty
        setValues((v) =>
          v.category ? v : { ...v, category: cat },
        );
        setPredictedCategory(cat);
      } catch {
        // swallow — prediction is best-effort
      }
    }, 500);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.title, values.type]);

  const dismissPrediction = () => {
    dismissedPredictionTitleRef.current = values.title.trim();
    setPredictedCategory(null);
    // If the field still holds the auto-filled pick, clear it so the user can start fresh
    setValues((v) => (v.category && v.category.id === predictedCategory?.id ? { ...v, category: null } : v));
  };

  const set = <K extends keyof TxFormValues>(key: K, val: TxFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const typeColor = TX_TYPE_COLORS[values.type];
  const isTransfer = values.type === "transfer";

  // Block save while any attachment is still uploading (mediaId === undefined)
  const anyUploading = attachments.some((a) => a.mediaId === undefined);

  const canSave =
    values.title.trim().length > 0 &&
    values.amount.trim().length > 0 &&
    !isNaN(parseFloat(values.amount)) &&
    values.account !== null &&
    (!isTransfer || values.toAccount !== null) &&
    values.category !== null &&
    !anyUploading &&
    !saving;

  const handleTypeChange = (t: TxType) => {
    setValues((v) => ({
      ...v,
      type: t,
      category: null,                              // each type has its own categories
      person: t === "transfer" ? null : v.person,  // transfers don't have a person
      toAccount: t !== "transfer" ? null : v.toAccount,
    }));
  };

  // ── Attachment helpers ────────────────────────────────────────────────────

  const [attachSourceOpen, setAttachSourceOpen] = useState(false);

  /** Upload a freshly-picked set of local assets, flipping mediaId as they complete. */
  const uploadNewItems = async (items: LocalAttachment[]) => {
    setAttachments((prev) => [...prev, ...items]);
    for (const item of items) {
      try {
        const media = await uploadMedia(
          item.uri,
          item.filename ?? `file-${Date.now()}`,
          item.mimeType ?? "application/octet-stream",
          item.filename ?? undefined,
        );
        setAttachments((prev) =>
          prev.map((a) => (a.localId === item.localId ? { ...a, mediaId: media.id } : a)),
        );
      } catch {
        showAlert({ title: "Upload failed", message: `Could not upload ${item.filename}.` });
        setAttachments((prev) =>
          prev.map((a) => (a.localId === item.localId ? { ...a, mediaId: null } : a)),
        );
      }
    }
  };

  const pickPhotos = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      showAlert({ title: "Permission required", message: "Allow access to your photo library to add attachments." });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.85,
    });
    if (result.canceled) return;

    const stamp = Date.now();
    const newItems: LocalAttachment[] = result.assets.map((a, i) => ({
      localId: `${stamp}-${i}`,
      uri: a.uri,
      filename: a.fileName ?? `attachment-${stamp}-${i}.jpg`,
      mimeType: a.mimeType ?? "image/jpeg",
    }));
    await uploadNewItems(newItems);
  };

  const pickDocuments = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true,
      });
      if (res.canceled) return;

      const stamp = Date.now();
      const newItems: LocalAttachment[] = res.assets.map((a, i) => ({
        localId: `${stamp}-${i}`,
        uri: a.uri,
        filename: a.name ?? `document-${stamp}-${i}`,
        mimeType: a.mimeType ?? "application/octet-stream",
      }));
      await uploadNewItems(newItems);
    } catch (e: any) {
      showAlert({ title: "Error", message: e?.message ?? "Could not pick document." });
    }
  };

  const removeAttachment = (localId: string) => {
    setAttachments((prev) => prev.filter((a) => a.localId !== localId));
  };

  const handleSubmit = async () => {
    if (!canSave) return;
    // Collect all successfully uploaded/pre-existing attachment IDs
    const allIds = attachments
      .filter((a) => typeof a.mediaId === "string")
      .map((a) => a.mediaId as string);
    await onSubmit(values, allIds);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.surface }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={{ paddingTop: topPad, paddingHorizontal: 20, paddingBottom: 12, backgroundColor: C.surface }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity
            onPress={onCancel}
            activeOpacity={0.7}
            style={{ width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: C.surfaceMid }}
          >
            <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text style={{ flex: 1, fontSize: 20, fontWeight: "900", letterSpacing: -0.5, color: C.onSurface }}>
            {title}
          </Text>
          {onAIPress && (
            <TouchableOpacity
              onPress={onAIPress}
              activeOpacity={0.75}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#7c3aed22",
              }}
            >
              <DynamicIcon name="sparkles" size={18} color="#7c3aed" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, gap: 10 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Type selector (matches Categories page style) ── */}
        <TxTypeSelector value={values.type} onChange={handleTypeChange} />

        {/* ── Amount + Title ── */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, overflow: "hidden" }}>
          <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6 }}>
            <Text style={{ fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5, color: C.onSurfaceVariant, marginBottom: 4 }}>
              Amount *
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <View style={{ backgroundColor: `${typeColor}22`, borderRadius: 8, padding: 6 }}>
                <DynamicIcon name={values.type === "income" ? "arrow-down-left" : values.type === "transfer" ? "arrow-right-left" : "arrow-up-right"} size={14} color={typeColor} />
              </View>
              <TextInput
                value={values.amount}
                onChangeText={(v) => set("amount", v)}
                style={{ flex: 1, fontSize: 28, fontWeight: "800", color: typeColor, letterSpacing: -0.5 }}
                placeholderTextColor={`${typeColor}60`}
                placeholder="0.00"
                keyboardType="decimal-pad"
                returnKeyType="next"
              />
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: `${C.outlineVariant}40`, marginHorizontal: 16 }} />
          <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 14 }}>
            <Text style={{ fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5, color: C.onSurfaceVariant, marginBottom: 4 }}>
              Title *
            </Text>
            <TextInput
              value={values.title}
              onChangeText={(v) => set("title", v)}
              style={{ fontSize: 16, color: C.onSurface }}
              placeholderTextColor={C.outlineVariant}
              placeholder="e.g. Grocery shopping"
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>
        </View>

        {/* ── Date & Time ── */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, overflow: "hidden", padding: 14 }}>
          <Text style={{ fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5, color: C.onSurfaceVariant, marginBottom: 8 }}>
            Date & Time
          </Text>
          <DateTimePicker value={values.date} onChange={(d) => set("date", d)} />
        </View>

        {/* ── Category ── */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, overflow: "hidden" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <PickerRow label="Category *" onPress={() => setShowCategory(true)}>
                {values.category ? (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: values.category.bgColor ?? `${values.category.color ?? "#f59e0b"}22`, alignItems: "center", justifyContent: "center" }}>
                      <DynamicIcon name={values.category.icon ?? "folder"} size={14} color={values.category.color ?? "#f59e0b"} />
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: "600", color: C.onSurface }}>{values.category.name}</Text>
                    {predictedCategory && values.category.id === predictedCategory.id && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 3,
                          paddingLeft: 6,
                          paddingRight: 2,
                          paddingVertical: 2,
                          borderRadius: 999,
                          backgroundColor: `${C.primary}18`,
                        }}
                      >
                        <DynamicIcon name="sparkles" size={9} color={C.primary} />
                        <Text style={{ fontSize: 9, fontWeight: "800", color: C.primary, letterSpacing: 0.4, textTransform: "uppercase" }}>
                          Predicted
                        </Text>
                        <TouchableOpacity
                          onPress={(e) => {
                            e.stopPropagation();
                            dismissPrediction();
                          }}
                          hitSlop={6}
                          style={{ paddingHorizontal: 3, paddingVertical: 1 }}
                          accessibilityLabel="Dismiss prediction"
                        >
                          <DynamicIcon name="x" size={10} color={C.primary} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ) : (
                  <Text style={{ fontSize: 14, color: C.outlineVariant }}>Select category…</Text>
                )}
              </PickerRow>
            </View>
            <TouchableOpacity
              onPress={handleSuggestCategory}
              disabled={suggesting || values.title.trim().length < 3}
              activeOpacity={0.75}
              accessibilityLabel="Suggest category"
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
                borderRadius: 999,
                opacity: values.title.trim().length < 3 ? 0.45 : 1,
              }}
            >
              {suggesting ? (
                <ActivityIndicator size="small" color="#7c3aed" />
              ) : (
                <DynamicIcon name="sparkles" size={18} color="#7c3aed" />
              )}
            </TouchableOpacity>
          </View>

          {suggestedCategory && (
            <LinearGradient
              colors={["#7c3aed22", "#db277722", "#f59e0b22"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderTopWidth: 1,
                borderTopColor: `${C.outlineVariant}40`,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                }}
              >
                <DynamicIcon name="sparkles" size={14} color="#7c3aed" />
                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 7,
                    backgroundColor: suggestedCategory.bgColor ?? `${suggestedCategory.color ?? "#f59e0b"}22`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DynamicIcon name={suggestedCategory.icon ?? "folder"} size={12} color={suggestedCategory.color ?? "#f59e0b"} />
                </View>
                <Text style={{ flex: 1, fontSize: 13, fontWeight: "600", color: C.onSurface }} numberOfLines={1}>
                  {suggestedCategory.name}
                </Text>
                <TouchableOpacity onPress={applySuggestedCategory} activeOpacity={0.8}>
                  <LinearGradient
                    colors={["#7c3aed", "#db2777"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 }}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "700", color: "#fff" }}>Apply</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSuggestedCategory(null)}
                  activeOpacity={0.75}
                  style={{ padding: 4 }}
                >
                  <DynamicIcon name="x" size={14} color={C.onSurfaceVariant} />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          )}
        </View>

        {/* ── Account(s) ── */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, overflow: "hidden" }}>
          <PickerRow label={isTransfer ? "From Account *" : "Account *"} onPress={() => setShowAccount(true)}>
            {values.account ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <AccountAvatar avatarUrl={values.account.avatar?.url} icon={values.account.icon} bgColor={values.account.bgColor} iconColor={values.account.color} name={values.account.name} size={28} />
                <Text style={{ fontSize: 14, fontWeight: "600", color: C.onSurface }}>{values.account.name}</Text>
              </View>
            ) : (
              <Text style={{ fontSize: 14, color: C.outlineVariant }}>Select account…</Text>
            )}
          </PickerRow>

          {isTransfer && (
            <>
              <View style={{ height: 1, backgroundColor: `${C.outlineVariant}40`, marginHorizontal: 14 }} />
              <PickerRow label="To Account *" onPress={() => setShowToAccount(true)}>
                {values.toAccount ? (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <AccountAvatar avatarUrl={values.toAccount.avatar?.url} icon={values.toAccount.icon} bgColor={values.toAccount.bgColor} iconColor={values.toAccount.color} name={values.toAccount.name} size={28} />
                    <Text style={{ fontSize: 14, fontWeight: "600", color: C.onSurface }}>{values.toAccount.name}</Text>
                  </View>
                ) : (
                  <Text style={{ fontSize: 14, color: C.outlineVariant }}>Select destination…</Text>
                )}
              </PickerRow>
            </>
          )}
        </View>

        {/* ── Person (hidden for transfer) ── */}
        {!isTransfer && (
          <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, overflow: "hidden" }}>
            <PickerRow label="Person" onPress={() => setShowPerson(true)}>
              {values.person ? (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <UserAvatar id={values.person.id} name={values.person.name} avatarUrl={values.person.avatar?.url} size={28} radius={14} />
                  <Text style={{ fontSize: 14, fontWeight: "600", color: C.onSurface }}>{values.person.name}</Text>
                </View>
              ) : (
                <Text style={{ fontSize: 14, color: C.outlineVariant }}>Optional person…</Text>
              )}
            </PickerRow>
          </View>
        )}

        {/* ── Tags ── */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, overflow: "hidden" }}>
          <PickerRow label="Tags" onPress={() => setShowTags(true)}>
            {values.tags.length > 0 ? (
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
                {values.tags.map((tag, i) => (
                  <View key={tag.id ?? tag.name ?? i} style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, backgroundColor: tag.bgColor ?? `${tag.color ?? C.primary}22` }}>
                    {tag.icon ? <DynamicIcon name={tag.icon} size={11} color={tag.color ?? C.primary} /> : null}
                    <Text style={{ fontSize: 12, fontWeight: "600", color: tag.color ?? C.primary }}>{tag.name}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={{ fontSize: 14, color: C.outlineVariant }}>Add tags…</Text>
            )}
          </PickerRow>
        </View>

        {/* ── Note ── */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, overflow: "hidden" }}>
          <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 }}>
            <Text style={{ fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5, color: C.onSurfaceVariant }}>
              Note
            </Text>
          </View>
          <TextInput
            value={values.note}
            onChangeText={(v) => set("note", v)}
            style={{ fontSize: 14, color: C.onSurface, paddingHorizontal: 16, paddingBottom: 14, minHeight: 60 }}
            placeholderTextColor={C.outlineVariant}
            placeholder="Add a note…"
            multiline
            returnKeyType="done"
            autoCorrect={false}
          />
        </View>

        {/* ── Attachments ── */}
        <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, overflow: "hidden", padding: 14 }}>
          <Text style={{ fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5, color: C.onSurfaceVariant, marginBottom: 10 }}>
            {`Attachments${attachments.length > 0 ? ` · ${attachments.length}` : ""}`}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {/* All attachments (existing pre-seeded + newly picked) */}
            {attachments.map((att) => (
              <AttachmentThumb
                key={att.localId}
                att={att}
                onRemove={() => removeAttachment(att.localId)}
              />
            ))}
            {/* Add button */}
            <TouchableOpacity
              onPress={() => setAttachSourceOpen(true)}
              activeOpacity={0.75}
              style={{
                width: THUMB_SIZE, height: THUMB_SIZE, borderRadius: 14,
                borderWidth: 1.5, borderStyle: "dashed",
                borderColor: C.outlineVariant,
                alignItems: "center", justifyContent: "center", gap: 4,
              }}
            >
              <DynamicIcon name="plus" size={22} color={C.outlineVariant} />
              <Text style={{ fontSize: 10, color: C.outlineVariant, fontWeight: "600" }}>Add</Text>
            </TouchableOpacity>
          </View>
          {anyUploading && (
            <Text style={{ fontSize: 11, color: "#f59e0b", marginTop: 8 }}>Uploading…</Text>
          )}
        </View>
      </ScrollView>

      {/* Save button */}
      <View style={{ paddingHorizontal: 16, paddingBottom: Math.max(insets.bottom, 16) + 4, paddingTop: 12, backgroundColor: C.surface }}>
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.85}
          disabled={!canSave}
          style={{
            flexDirection: "row", alignItems: "center", justifyContent: "center",
            gap: 8, paddingVertical: 16, borderRadius: 16,
            backgroundColor: canSave ? typeColor : `${C.outlineVariant}55`,
          }}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <DynamicIcon name="check" size={18} color={canSave ? "#fff" : C.outlineVariant} />
              <Text style={{ fontSize: 15, fontWeight: "700", color: canSave ? "#fff" : C.outlineVariant }}>
                {submitLabel}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* ── Pickers ── */}
      <CategoryPickerSheet
        visible={showCategory}
        onClose={() => setShowCategory(false)}
        selectedId={values.category?.id ?? null}
        onSelect={(cat) => set("category", cat)}
        txType={values.type}
      />
      <AccountPickerSheet
        visible={showAccount}
        onClose={() => setShowAccount(false)}
        selectedId={values.account?.id ?? null}
        onSelect={(acc) => set("account", acc)}
        title={isTransfer ? "From Account" : "Account"}
        excludeId={values.toAccount?.id}
      />
      <AccountPickerSheet
        visible={showToAccount}
        onClose={() => setShowToAccount(false)}
        selectedId={values.toAccount?.id ?? null}
        onSelect={(acc) => set("toAccount", acc)}
        title="To Account"
        excludeId={values.account?.id}
      />
      <PersonPickerSheet
        visible={showPerson}
        onClose={() => setShowPerson(false)}
        selectedId={values.person?.id ?? null}
        onSelect={(p) => set("person", p)}
      />
      <TagPickerSheet
        visible={showTags}
        onClose={() => setShowTags(false)}
        selectedIds={values.tags.map((t) => t.id)}
        onApply={(tags) => set("tags", tags)}
      />
      <AttachSourceSheet
        visible={attachSourceOpen}
        onClose={() => setAttachSourceOpen(false)}
        onPickPhotos={pickPhotos}
        onPickDocuments={pickDocuments}
      />
    </KeyboardAvoidingView>
  );
}

// ── Export mutation helpers ───────────────────────────────────────────────────

/**
 * For optional relation / text fields:
 * - On create we omit (undefined) so Payload uses its default / leaves unset.
 * - On update we send null to explicitly clear a previously-set value —
 *   undefined would be treated as "no change" and the old value would persist.
 */
function baseFields(v: TxFormValues, attachmentIds: string[], mode: "create" | "update") {
  const clearable = <T,>(val: T | null | undefined): T | null | undefined =>
    val ?? (mode === "update" ? null : undefined);

  return {
    title: v.title.trim(),
    amount: v.amount.trim(),
    date: v.date.toISOString(),
    category: v.category?.id ?? undefined,
    account: v.account?.id,
    toAccount: clearable(v.toAccount?.id),
    person: clearable(v.person?.id),
    tags: v.tags.map((t) => t.id),
    note: clearable(v.note.trim() || undefined),
    attachments:
      attachmentIds.length > 0 ? attachmentIds : mode === "update" ? [] : undefined,
  };
}

/** Use for createTransaction */
export function formValuesToMutationInput(v: TxFormValues, attachmentIds: string[] = []) {
  return { ...baseFields(v, attachmentIds, "create"), type: TX_MUTATION_TYPE[v.type] };
}

/** Use for updateTransaction (different type enum) */
export function formValuesToUpdateInput(v: TxFormValues, attachmentIds: string[] = []) {
  type UpdateType = import("../../services/gql/types/graphql").TransactionUpdate_type_MutationInput;
  const t = v.type as unknown as UpdateType;
  return { ...baseFields(v, attachmentIds, "update"), type: t };
}
