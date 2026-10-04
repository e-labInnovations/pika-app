/**
 * AI Assistant bottom sheet for text-to-transaction and image-to-transaction.
 *
 * Flow:
 *  1. User types a description OR picks a receipt image.
 *  2. Tap "Analyze" → calls the appropriate GraphQL mutation.
 *  3. A compact preview of the parsed transaction is shown.
 *  4. "Use Details" → parent receives the raw AI data object.
 *  5. "Reject" / "Re-analyze" → reset / retry.
 */

import * as DocumentPicker from "expo-document-picker";
import { EncodingType, readAsStringAsync } from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import {
  EntityComposer,
  composerIsEmpty,
  emptyComposer,
  serializeComposer,
  type ComposerValue,
} from "./EntityComposer";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { showAlert } from "../ui/AlertDialog";
import { useColors } from "../../theme/colors";
import {
  useTextToTransaction,
  useImageToTransaction,
} from "../../services/gql/ai/ai.service";
import { useCreateTransaction } from "../../services/gql/transactions/transactions.service";
import type {
  CategoryFieldsFragment,
  AccountFieldsFragment,
  PersonFieldsFragment,
  TagFieldsFragment,
} from "../../services/gql/types/graphql";
import type { TxType } from "./CategoryPickerSheet";
import { type TxFormValues, formValuesToMutationInput } from "./TransactionForm";
import { uploadMedia } from "../../lib/media-upload";
import { TransactionPreviewCard } from "./TransactionPreviewCard";

const AI_GRADIENT = ["#7c3aed", "#db2777", "#f59e0b"] as const;
const AI_GRADIENT_SMALL = ["#7c3aed", "#db2777"] as const;

// ── AI data shape returned by the mutations ───────────────────────────────────

export interface AITransactionData {
  title: string;
  amount: number;
  type: TxType;
  date: string;
  note?: string;
  category?: CategoryFieldsFragment | null;
  account?: AccountFieldsFragment | null;
  toAccount?: AccountFieldsFragment | null;
  person?: PersonFieldsFragment | null;
  tags?: TagFieldsFragment[];
  /** Friends' shares when the AI detected a split (people already resolved) */
  shares?: { person: PersonFieldsFragment | null; amount: string }[];
}

/** File name for an uploaded receipt, with the right extension for images and PDFs. */
export function receiptFilename(mimeType: string): string {
  return `receipt-${Date.now()}.${mimeType === "application/pdf" ? "pdf" : "jpg"}`;
}

const isPdf = (mimeType?: string) => mimeType === "application/pdf";

/** Stand-in for an image preview when the receipt is a PDF. */
function PdfTile({ size, dim }: { size: number; dim?: boolean }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        backgroundColor: "#ef444422",
        alignItems: "center",
        justifyContent: "center",
        opacity: dim ? 0.35 : 1,
      }}
    >
      <DynamicIcon name="file-text" size={size * 0.45} color="#ef4444" />
    </View>
  );
}

// ── Helper: map AI result → TxFormValues partial ──────────────────────────────

export function aiDataToFormValues(
  data: AITransactionData,
): Partial<TxFormValues> {
  return {
    title: data.title ?? "",
    amount: data.amount != null ? String(parseFloat(String(data.amount))) : "",
    type: data.type ?? "expense",
    date: data.date ? new Date(data.date) : new Date(),
    category: (data.category as CategoryFieldsFragment) ?? null,
    account: (data.account as AccountFieldsFragment) ?? null,
    toAccount: (data.toAccount as AccountFieldsFragment) ?? null,
    person: (data.person as PersonFieldsFragment) ?? null,
    // Always set: direct "Create" builds the payload from these values, which reads shares
    shares: (data.shares ?? [])
      .filter((s) => s.person)
      .map((s) => ({ person: s.person as PersonFieldsFragment, amount: String(s.amount) })),
    tags: (data.tags as TagFieldsFragment[]) ?? [],
    note: data.note ?? "",
  };
}

// ── Props ─────────────────────────────────────────────────────────────────────

export type AIImageAttachment = {
  uri: string;
  base64: string;
  mimeType: string;
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onUseDetails: (
    values: Partial<TxFormValues>,
    image?: AIImageAttachment,
    promptId?: string,
  ) => void;
  /** Fired after a transaction is created via the "Create" shortcut */
  onCreated?: () => void;
  /** Which tab to open on. Ignored if initialText/initialImage is provided. */
  initialTab?: "text" | "receipt";
  /** Pre-fill the text tab with this string and open straight to analyze */
  initialText?: string;
  /** Pre-load the receipt tab with this image */
  initialImage?: { uri: string; base64: string; mimeType: string };
}

// ── Analysis preview component ────────────────────────────────────────────────

function AnalysisPreview({
  data,
  onRetry,
  analyzing,
}: {
  data: AITransactionData;
  onRetry: () => void;
  analyzing: boolean;
}) {
  const C = useColors();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <TransactionPreviewCard data={data} />

      {/* Status row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <DynamicIcon name="circle-check" size={16} color="#10b981" />
          <Text style={{ fontSize: 13, color: C.onSurfaceVariant }}>
            AI Analysis Complete
          </Text>
        </View>
        <TouchableOpacity
          onPress={onRetry}
          activeOpacity={0.75}
          disabled={analyzing}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: C.outlineVariant,
            opacity: analyzing ? 0.5 : 1,
          }}
        >
          {analyzing ? (
            <ActivityIndicator size="small" color={C.onSurfaceVariant} style={{ width: 13, height: 13 }} />
          ) : (
            <DynamicIcon name="rotate-ccw" size={13} color={C.onSurfaceVariant} />
          )}
          <Text style={{ fontSize: 12, color: C.onSurfaceVariant }}>
            {analyzing ? "Analyzing…" : "Re-analyze"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ── Main sheet ────────────────────────────────────────────────────────────────

export function AIAssistantSheet({ visible, onClose, onUseDetails, onCreated, initialTab, initialText, initialImage }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();

  const [tab, setTab] = useState<"text" | "receipt">("text");
  const [composer, setComposer] = useState<ComposerValue>(emptyComposer());
  // Optional note typed with a receipt (e.g. "split with @Rony")
  const [receiptNote, setReceiptNote] = useState<ComposerValue>(emptyComposer());
  const [image, setImage] = useState<{
    uri: string;
    base64: string;
    mimeType: string;
  } | null>(null);
  const [result, setResult] = useState<AITransactionData | null>(null);
  const [promptId, setPromptId] = useState<string | null>(null);
  const [attachImage, setAttachImage] = useState(true);
  const [creating, setCreating] = useState(false);

  const { textToTransaction, loading: textLoading } = useTextToTransaction();
  const { imageToTransaction, loading: imageLoading } = useImageToTransaction();
  const { createTransaction } = useCreateTransaction();
  const analyzing = textLoading || imageLoading;

  // Apply pre-filled content from share intent / home card when sheet opens
  React.useEffect(() => {
    if (!visible) return;
    if (initialImage) {
      setTab("receipt");
      setImage(initialImage);
      setResult(null);
    } else if (initialText) {
      setTab("text");
      setComposer(emptyComposer(initialText));
      setResult(null);
    } else if (initialTab) {
      setTab(initialTab);
      setResult(null);
    }
  }, [visible, initialText, initialImage, initialTab]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const resetState = () => {
    setTab("text");
    setComposer(emptyComposer());
    setReceiptNote(emptyComposer());
    setImage(null);
    setResult(null);
    setPromptId(null);
    setAttachImage(true);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handlePickPdf = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: true });
    if (res.canceled) return;
    const asset = res.assets[0];
    try {
      const base64 = await readAsStringAsync(asset.uri, { encoding: EncodingType.Base64 });
      setImage({ uri: asset.uri, base64, mimeType: "application/pdf" });
      setResult(null);
    } catch {
      showAlert({ title: "Error", message: "Could not read the PDF." });
    }
  };

  const handlePickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      showAlert({ title: "Permission required", message: "Allow access to your photo library to pick a receipt." });
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.85,
      base64: true,
    });
    if (res.canceled) return;
    const asset = res.assets[0];
    if (!asset.base64) {
      showAlert({ title: "Error", message: "Could not read image data." });
      return;
    }
    setImage({
      uri: asset.uri,
      base64: asset.base64,
      mimeType: asset.mimeType ?? "image/jpeg",
    });
    setResult(null);
  };

  const handleAnalyze = async () => {
    try {
      if (tab === "text") {
        const text = serializeComposer(composer);
        if (!text) return;
        const res = await textToTransaction(text);
        const data = res.data?.textToTransaction?.data;
        if (!data) throw new Error("No result from AI.");
        setResult(data as AITransactionData);
        setPromptId(res.data?.textToTransaction?.promptId ?? null);
      } else {
        if (!image) return;
        const note = serializeComposer(receiptNote);
        const res = await imageToTransaction(image.base64, image.mimeType, undefined, note || undefined);
        const data = res.data?.imageToTransaction?.data;
        if (!data) throw new Error("No result from AI.");
        setResult(data as AITransactionData);
        setPromptId(res.data?.imageToTransaction?.promptId ?? null);
      }
    } catch (err: any) {
      const msg =
        err?.graphQLErrors?.[0]?.message ??
        err?.networkError?.message ??
        err?.message ??
        "Could not analyze. Please try again.";
      showAlert({ title: "Analysis failed", message: msg });
    }
  };

  const handleUseDetails = () => {
    if (!result) return;
    const imageAttachment =
      attachImage && image && tab === "receipt" ? image : undefined;
    onUseDetails(aiDataToFormValues(result), imageAttachment, promptId ?? undefined);
    handleClose();
  };

  const handleCreateDirect = async () => {
    if (!result) return;
    if (!canCreateDirect) return;
    setCreating(true);
    try {
      const values = aiDataToFormValues(result) as TxFormValues;
      let attachmentIds: string[] = [];
      if (attachImage && image && tab === "receipt") {
        const media = await uploadMedia(
          image.uri,
          receiptFilename(image.mimeType),
          image.mimeType,
        );
        attachmentIds = [media.id];
      }
      await createTransaction(
        { data: formValuesToMutationInput(values, attachmentIds) },
        promptId ?? undefined,
      );
      resetState();
      onClose();
      onCreated?.();
    } catch (err: any) {
      const msg =
        err?.graphQLErrors?.[0]?.message ??
        err?.networkError?.message ??
        err?.message ??
        "Could not create transaction.";
      showAlert({ title: "Create failed", message: msg });
    } finally {
      setCreating(false);
    }
  };

  const handleReject = () => setResult(null);

  // ── Derived ─────────────────────────────────────────────────────────────────

  const canAnalyze =
    tab === "text" ? !composerIsEmpty(composer) : image !== null;

  const canCreateDirect = (() => {
    if (!result) return false;
    const hasTitle = !!result.title?.trim();
    const hasAmount =
      result.amount != null && !isNaN(parseFloat(String(result.amount))) && parseFloat(String(result.amount)) > 0;
    const hasAccount = !!result.account?.id;
    const hasCategory = !!result.category?.id;
    const hasToAccount = result.type !== "transfer" || !!result.toAccount?.id;
    return hasTitle && hasAmount && hasAccount && hasCategory && hasToAccount;
  })();

  // ── Render ───────────────────────────────────────────────────────────────────

  const SHEET_HEIGHT = Dimensions.get("window").height * 0.6;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
          activeOpacity={1}
          onPress={handleClose}
        />
        <View
          style={{
            backgroundColor: C.surfaceLow,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            height: SHEET_HEIGHT,
            paddingBottom: Math.max(insets.bottom, 16),
          }}
        >
          {/* Handle */}
          <View
            style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}
          >
            <View
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                backgroundColor: C.outlineVariant,
              }}
            />
          </View>

          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 12,
              gap: 12,
            }}
          >
            <LinearGradient
              colors={AI_GRADIENT}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicIcon name="bot" size={20} color="#fff" />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "700", color: C.onSurface }}
              >
                AI Transaction Assistant
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: C.onSurfaceVariant,
                  marginTop: 1,
                }}
              >
                Describe or snap a receipt to auto-fill
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleClose}
              activeOpacity={0.7}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: C.surfaceMid,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicIcon name="x" size={16} color={C.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          {!result && (
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginBottom: 12,
                borderRadius: 12,
                backgroundColor: C.surfaceMid,
                padding: 3,
              }}
            >
              {(["text", "receipt"] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => {
                    setTab(t);
                    setResult(null);
                  }}
                  activeOpacity={0.75}
                  style={{
                    flex: 1,
                    paddingVertical: 8,
                    borderRadius: 10,
                    alignItems: "center",
                    backgroundColor: tab === t ? C.surfaceHigh : "transparent",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <DynamicIcon
                      name={t === "text" ? "message-square-text" : "image"}
                      size={14}
                      color={tab === t ? C.onSurface : C.onSurfaceVariant}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "600",
                        color: tab === t ? C.onSurface : C.onSurfaceVariant,
                        textTransform: "capitalize",
                      }}
                    >
                      {t === "text" ? "Text" : "Receipt"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Body */}
          <ScrollView
            style={{ flex: 1, paddingHorizontal: 20 }}
            contentContainerStyle={{ paddingBottom: 8 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Text tab */}
            {tab === "text" && !result && (
              <EntityComposer
                value={composer}
                onChange={setComposer}
                editable={!analyzing}
                minHeight={140}
                placeholder={"Paste SMS or describe the transaction…\ne.g. Paid 45 for coffee from @Federal, @Rony 25 split"}
              />
            )}

            {/* Receipt tab — no image yet */}
            {tab === "receipt" && !image && !result && (
              <TouchableOpacity
                onPress={handlePickImage}
                activeOpacity={0.75}
                style={{
                  borderRadius: 16,
                  borderWidth: 1.5,
                  borderStyle: "dashed",
                  borderColor: C.outlineVariant,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 36,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#7c3aed22",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DynamicIcon name="image-plus" size={22} color="#7c3aed" />
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: C.onSurface,
                  }}
                >
                  Select Receipt Image
                </Text>
                <Text style={{ fontSize: 13, color: C.onSurfaceVariant }}>
                  Choose from your photo library
                </Text>
              </TouchableOpacity>
            )}
            {tab === "receipt" && !image && !result && (
              <TouchableOpacity
                onPress={handlePickPdf}
                activeOpacity={0.75}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 14 }}
              >
                <DynamicIcon name="file-text" size={15} color="#7c3aed" />
                <Text style={{ fontSize: 13, color: "#7c3aed", fontWeight: "600" }}>
                  Or choose a PDF (FedMobile, PhonePe receipt…)
                </Text>
              </TouchableOpacity>
            )}

            {/* Receipt tab — image selected */}
            {tab === "receipt" && image && !result && (
              <View style={{ gap: 10 }}>
                <View style={{ position: "relative" }}>
                  {isPdf(image.mimeType) ? (
                    <View
                      style={{
                        height: 120,
                        borderRadius: 14,
                        backgroundColor: C.surfaceMid,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                        paddingHorizontal: 16,
                      }}
                    >
                      <PdfTile size={56} />
                      <Text style={{ flex: 1, fontSize: 14, fontWeight: "600", color: C.onSurface }}>
                        PDF receipt
                      </Text>
                    </View>
                  ) : (
                    <Image
                      source={{ uri: image.uri }}
                      style={{
                        width: Dimensions.get("window").width - 40,
                        height: 200,
                        borderRadius: 14,
                      }}
                      resizeMode="cover"
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => setImage(null)}
                    activeOpacity={0.8}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: "rgba(0,0,0,0.55)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DynamicIcon name="x" size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={isPdf(image.mimeType) ? handlePickPdf : handlePickImage}
                  activeOpacity={0.75}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#7c3aed",
                      fontWeight: "600",
                    }}
                  >
                    {isPdf(image.mimeType) ? "Change PDF" : "Change image"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Receipt tab — optional note with tags, e.g. a split */}
            {tab === "receipt" && image && !result && (
              <View style={{ marginTop: 10 }}>
                <EntityComposer
                  value={receiptNote}
                  onChange={setReceiptNote}
                  editable={!analyzing}
                  minHeight={56}
                  placeholder="Optional note, e.g. split with @Rony"
                />
              </View>
            )}

            {/* Analysis result */}
            {result && <AnalysisPreview data={result} onRetry={handleAnalyze} analyzing={analyzing} />}

            {/* Attach image card — shown below AI result for receipt tab */}
            {result && tab === "receipt" && image && (
              <TouchableOpacity
                onPress={() => setAttachImage((v) => !v)}
                activeOpacity={0.75}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 10,
                  borderRadius: 14,
                  backgroundColor: C.surfaceMid,
                  marginTop: 4,
                  marginBottom: 4,
                }}
              >
                {/* Thumbnail with check badge */}
                <View style={{ position: "relative" }}>
                  {isPdf(image.mimeType) ? (
                    <PdfTile size={56} dim={!attachImage} />
                  ) : (
                    <Image
                      source={{ uri: image.uri }}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 10,
                        opacity: attachImage ? 1 : 0.35,
                      }}
                      resizeMode="cover"
                    />
                  )}
                  {attachImage && (
                    <View
                      style={{
                        position: "absolute",
                        bottom: -5,
                        right: -5,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: "#7c3aed",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 2,
                        borderColor: C.surfaceMid,
                      }}
                    >
                      <DynamicIcon name="check" size={10} color="#fff" />
                    </View>
                  )}
                </View>

                {/* Labels */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: C.onSurface,
                    }}
                  >
                    {isPdf(image.mimeType) ? "Attach receipt PDF" : "Attach receipt image"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      color: C.onSurfaceVariant,
                      marginTop: 2,
                    }}
                  >
                    {attachImage
                      ? `${isPdf(image.mimeType) ? "PDF" : "Image"} will be saved with transaction`
                      : `Tap to attach ${isPdf(image.mimeType) ? "PDF" : "image"}`}
                  </Text>
                </View>

                {/* Checkbox */}
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    borderWidth: 1.5,
                    borderColor: attachImage ? "#7c3aed" : C.outlineVariant,
                    backgroundColor: attachImage ? "#7c3aed" : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {attachImage && (
                    <DynamicIcon name="check" size={13} color="#fff" />
                  )}
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>

          {/* Footer buttons */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              paddingHorizontal: 20,
              paddingTop: 12,
            }}
          >
            {!result ? (
              <>
                <TouchableOpacity
                  onPress={handleClose}
                  activeOpacity={0.75}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: 14,
                    backgroundColor: C.surfaceMid,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: C.onSurfaceVariant,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAnalyze}
                  activeOpacity={0.8}
                  disabled={!canAnalyze || analyzing}
                  style={{
                    flex: 2,
                    borderRadius: 14,
                    overflow: "hidden",
                    opacity: canAnalyze && !analyzing ? 1 : 0.55,
                  }}
                >
                  <LinearGradient
                    colors={AI_GRADIENT}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      paddingVertical: 14,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    {analyzing ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <DynamicIcon name="sparkles" size={16} color="#fff" />
                    )}
                    <Text style={{ fontSize: 15, fontWeight: "700", color: "#fff" }}>
                      {analyzing ? "Analyzing…" : "Analyze"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={handleReject}
                  activeOpacity={0.75}
                  disabled={creating}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: 14,
                    backgroundColor: C.surfaceMid,
                    alignItems: "center",
                    opacity: creating ? 0.5 : 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: C.onSurfaceVariant,
                    }}
                  >
                    Reject
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleUseDetails}
                  activeOpacity={0.8}
                  disabled={creating}
                  style={{
                    flex: 1.3,
                    paddingVertical: 14,
                    borderRadius: 14,
                    backgroundColor: C.surfaceMid,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 6,
                    opacity: creating ? 0.5 : 1,
                  }}
                >
                  <DynamicIcon name="pencil" size={14} color={C.onSurface} />
                  <Text style={{ fontSize: 14, fontWeight: "700", color: C.onSurface }}>
                    Review
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCreateDirect}
                  activeOpacity={0.8}
                  disabled={!canCreateDirect || creating}
                  accessibilityLabel="Create transaction directly"
                  style={{
                    flex: 1.5,
                    borderRadius: 14,
                    overflow: "hidden",
                    opacity: canCreateDirect && !creating ? 1 : 0.55,
                  }}
                >
                  <LinearGradient
                    colors={AI_GRADIENT_SMALL}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      paddingVertical: 14,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    {creating ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <DynamicIcon name="check" size={16} color="#fff" />
                    )}
                    <Text style={{ fontSize: 14, fontWeight: "700", color: "#fff" }}>
                      {creating ? "Creating…" : "Create"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
