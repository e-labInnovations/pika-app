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

import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";
import {
  useTextToTransaction,
  useImageToTransaction,
} from "../../services/gql/ai/ai.service";
import type {
  CategoryFieldsFragment,
  AccountFieldsFragment,
  PersonFieldsFragment,
  TagFieldsFragment,
} from "../../services/gql/types/graphql";
import type { TxType } from "./CategoryPickerSheet";
import type { TxFormValues } from "./TransactionForm";
import { useFormatMoney } from "../../lib/format-currency";

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
  ) => void;
}

// ── Analysis preview component ────────────────────────────────────────────────

function AnalysisPreview({
  data,
  onRetry,
}: {
  data: AITransactionData;
  onRetry: () => void;
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const typeColor =
    data.type === "income"
      ? "#10b981"
      : data.type === "transfer"
        ? "#6366f1"
        : "#ef4444";

  const formattedDate = data.date
    ? (() => {
        const d = new Date(data.date);
        const date = d.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const time = d.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        });
        return `${date} · ${time}`;
      })()
    : null;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {/* Transaction card */}
      <View
        style={{
          borderRadius: 16,
          backgroundColor: C.surfaceMid,
          padding: 14,
          gap: 10,
        }}
      >
        {/* Title + Amount */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", color: C.onSurface }}
              numberOfLines={2}
            >
              {data.title}
            </Text>
            {formattedDate ? (
              <Text
                style={{
                  fontSize: 12,
                  color: C.onSurfaceVariant,
                  marginTop: 2,
                }}
              >
                {formattedDate}
              </Text>
            ) : null}
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: typeColor,
                letterSpacing: -0.5,
              }}
            >
              {data.amount != null
                ? fmt(parseFloat(String(data.amount)))
                : "—"}
            </Text>
            <View
              style={{
                marginTop: 4,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
                backgroundColor: `${typeColor}20`,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  textTransform: "uppercase",
                  color: typeColor,
                }}
              >
                {data.type}
              </Text>
            </View>
          </View>
        </View>

        {/* Category */}
        {data.category ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor:
                  data.category.bgColor ??
                  `${data.category.color ?? "#f59e0b"}22`,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicIcon
                name={data.category.icon ?? "folder"}
                size={14}
                color={data.category.color ?? "#f59e0b"}
              />
            </View>
            <Text
              style={{ fontSize: 13, color: C.onSurface, fontWeight: "500" }}
            >
              {data.category.name}
            </Text>
          </View>
        ) : null}

        {/* Account */}
        {data.account ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: data.account.bgColor ?? "#6366f122",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicIcon
                name={data.account.icon ?? "wallet"}
                size={14}
                color={data.account.color ?? "#6366f1"}
              />
            </View>
            <Text
              style={{ fontSize: 13, color: C.onSurface, fontWeight: "500" }}
            >
              {data.account.name}
            </Text>
            {data.toAccount ? (
              <>
                <DynamicIcon
                  name="arrow-right"
                  size={14}
                  color={C.onSurfaceVariant}
                />
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    backgroundColor: data.toAccount.bgColor ?? "#6366f122",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DynamicIcon
                    name={data.toAccount.icon ?? "wallet"}
                    size={14}
                    color={data.toAccount.color ?? "#6366f1"}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: C.onSurface,
                    fontWeight: "500",
                  }}
                >
                  {data.toAccount.name}
                </Text>
              </>
            ) : null}
          </View>
        ) : null}

        {/* Person */}
        {data.person ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: "#8b5cf622",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicIcon name="user" size={14} color="#8b5cf6" />
            </View>
            <Text
              style={{ fontSize: 13, color: C.onSurface, fontWeight: "500" }}
            >
              {data.person.name}
            </Text>
          </View>
        ) : null}

        {/* Tags */}
        {data.tags && data.tags.length > 0 ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {data.tags.map((tag, i) => (
              <View
                key={tag.id ?? tag.name ?? i}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 10,
                  backgroundColor: tag.bgColor ?? `${tag.color ?? "#64748b"}22`,
                }}
              >
                <DynamicIcon
                  name={tag.icon ?? "tag"}
                  size={10}
                  color={tag.color ?? "#64748b"}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "600",
                    color: tag.color ?? "#64748b",
                  }}
                >
                  {tag.name}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Note */}
        {data.note ? (
          <Text
            style={{
              fontSize: 13,
              color: C.onSurfaceVariant,
              fontStyle: "italic",
            }}
            numberOfLines={3}
          >
            {data.note}
          </Text>
        ) : null}
      </View>

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
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: C.outlineVariant,
          }}
        >
          <DynamicIcon name="rotate-ccw" size={13} color={C.onSurfaceVariant} />
          <Text style={{ fontSize: 12, color: C.onSurfaceVariant }}>
            Re-analyze
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ── Main sheet ────────────────────────────────────────────────────────────────

export function AIAssistantSheet({ visible, onClose, onUseDetails }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();

  const [tab, setTab] = useState<"text" | "receipt">("text");
  const [textInput, setTextInput] = useState("");
  const [image, setImage] = useState<{
    uri: string;
    base64: string;
    mimeType: string;
  } | null>(null);
  const [result, setResult] = useState<AITransactionData | null>(null);
  const [attachImage, setAttachImage] = useState(true);

  const { textToTransaction, loading: textLoading } = useTextToTransaction();
  const { imageToTransaction, loading: imageLoading } = useImageToTransaction();
  const analyzing = textLoading || imageLoading;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const resetState = () => {
    setTab("text");
    setTextInput("");
    setImage(null);
    setResult(null);
    setAttachImage(true);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handlePickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        "Permission required",
        "Allow access to your photo library to pick a receipt.",
      );
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
      Alert.alert("Error", "Could not read image data.");
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
        if (!textInput.trim()) return;
        const res = await textToTransaction(textInput.trim());
        const data = res.data?.textToTransaction?.data;
        if (!data) throw new Error("No result from AI.");
        setResult(data as AITransactionData);
      } else {
        if (!image) return;
        const res = await imageToTransaction(image.base64, image.mimeType);
        const data = res.data?.imageToTransaction?.data;
        if (!data) throw new Error("No result from AI.");
        setResult(data as AITransactionData);
      }
    } catch (err: any) {
      Alert.alert(
        "Analysis failed",
        err?.message ?? "Could not analyze. Please try again.",
      );
    }
  };

  const handleUseDetails = () => {
    if (!result) return;
    const imageAttachment =
      attachImage && image && tab === "receipt" ? image : undefined;
    onUseDetails(aiDataToFormValues(result), imageAttachment);
    handleClose();
  };

  const handleReject = () => setResult(null);

  // ── Derived ─────────────────────────────────────────────────────────────────

  const canAnalyze =
    tab === "text" ? textInput.trim().length > 0 : image !== null;

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
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#7c3aed22",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicIcon name="bot" size={20} color="#7c3aed" />
            </View>
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
              <TextInput
                value={textInput}
                onChangeText={setTextInput}
                multiline
                numberOfLines={Platform.OS === "ios" ? undefined : 6}
                style={{
                  minHeight: 140,
                  maxHeight: 220,
                  backgroundColor: C.surfaceMid,
                  borderRadius: 14,
                  padding: 14,
                  fontSize: 15,
                  color: C.onSurface,
                  textAlignVertical: "top",
                }}
                placeholderTextColor={C.outlineVariant}
                placeholder={
                  "Paste SMS, receipt text, or describe your transaction…\n\ne.g. Paid 450 for dinner at Zomato using HDFC card"
                }
                editable={!analyzing}
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

            {/* Receipt tab — image selected */}
            {tab === "receipt" && image && !result && (
              <View style={{ gap: 10 }}>
                <View style={{ position: "relative" }}>
                  <Image
                    source={{ uri: image.uri }}
                    style={{
                      width: Dimensions.get("window").width - 40,
                      height: 200,
                      borderRadius: 14,
                    }}
                    resizeMode="cover"
                  />
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
                  onPress={handlePickImage}
                  activeOpacity={0.75}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#7c3aed",
                      fontWeight: "600",
                    }}
                  >
                    Change image
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Attach image checkbox — receipt tab only */}
            {result && tab === "receipt" && image && (
              <TouchableOpacity
                onPress={() => setAttachImage((v) => !v)}
                activeOpacity={0.75}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    borderWidth: 1.5,
                    borderColor: attachImage ? "#7c3aed" : C.outlineVariant,
                    backgroundColor: attachImage ? "#7c3aed" : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {attachImage && (
                    <DynamicIcon name="check" size={12} color="#fff" />
                  )}
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: C.onSurface,
                    fontWeight: "500",
                  }}
                >
                  Attach receipt image to transaction
                </Text>
              </TouchableOpacity>
            )}

            {/* Analysis result */}
            {result && <AnalysisPreview data={result} onRetry={handleReject} />}
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
                    paddingVertical: 14,
                    borderRadius: 14,
                    backgroundColor:
                      canAnalyze && !analyzing
                        ? "#7c3aed"
                        : `${C.outlineVariant}60`,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {analyzing ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <DynamicIcon
                      name="sparkles"
                      size={16}
                      color={canAnalyze ? "#fff" : C.onSurfaceVariant}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "700",
                      color:
                        canAnalyze && !analyzing ? "#fff" : C.onSurfaceVariant,
                    }}
                  >
                    {analyzing ? "Analyzing…" : "Analyze"}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={handleReject}
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
                    Reject
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleUseDetails}
                  activeOpacity={0.8}
                  style={{
                    flex: 2,
                    paddingVertical: 14,
                    borderRadius: 14,
                    backgroundColor: "#7c3aed",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <DynamicIcon name="check" size={16} color="#fff" />
                  <Text
                    style={{ fontSize: 15, fontWeight: "700", color: "#fff" }}
                  >
                    Use Details
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
