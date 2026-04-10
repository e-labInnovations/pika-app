import { router, useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { showAlert } from "../../../../components/ui/AlertDialog";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../../../../components/Icon";
import { Skeleton } from "../../../../components/ui/Skeleton";
import { AccountAvatar } from "../../../../components/AccountAvatar";
import { UserAvatar } from "../../../../components/UserAvatar";
import { useFormatMoney } from "../../../../lib/format-currency";
import { resolveMediaUrl } from "../../../../lib/media-upload";
import {
  useGetTransaction,
  useDeleteTransaction,
} from "../../../../services/gql/transactions/transactions.service";
import {
  Transaction_type,
  type TransactionAttachmentFieldsFragment,
} from "../../../../services/gql/types/graphql";
import { useColors } from "../../../../theme/colors";
import { LinkedTransactionsCard } from "../../../../components/transaction/LinkedTransactionsCard";

const { width: SCREEN_W } = Dimensions.get("window");

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number | null | undefined): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(mimeType: string | null | undefined): boolean {
  return !!mimeType?.startsWith("image/");
}

function formatDateTime(iso: string | null | undefined): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }) + " · " + new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function TransactionDetailSkeleton({ insets }: { insets: { bottom: number } }) {
  const C = useColors();
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: Math.max(insets.bottom, 16) + 24, gap: 12 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="rounded-2xl items-center py-8 gap-4" style={{ backgroundColor: C.surfaceMid }}>
        <Skeleton width={64} height={64} radius={20} />
        <View className="items-center gap-2">
          <Skeleton width={50} height={22} radius={10} />
          <Skeleton width={160} height={16} />
          <Skeleton width={110} height={36} />
        </View>
        <View className="flex-row gap-2">
          <Skeleton width={80} height={26} radius={12} />
          <Skeleton width={70} height={26} radius={12} />
        </View>
      </View>
      <View className="rounded-2xl p-4 gap-4" style={{ backgroundColor: C.surfaceMid }}>
        {[1, 2, 3].map((i) => (
          <View key={i} className="gap-1.5">
            <Skeleton width="25%" height={10} />
            <Skeleton width="60%" height={14} />
          </View>
        ))}
      </View>
      <Skeleton width="100%" height={52} radius={16} />
    </ScrollView>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────

function Divider() {
  const C = useColors();
  return <View className="mx-4" style={{ height: 1, backgroundColor: C.outlineVariant + "28" }} />;
}

// ── Section label + content block ─────────────────────────────────────────────

function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="px-4 py-3 gap-1.5">
      <Text className="text-[10px] font-bold uppercase tracking-[0.7px] text-on-surface-variant">
        {label}
      </Text>
      {children}
    </View>
  );
}

// ── Full-screen image viewer with zoom ────────────────────────────────────────

function AttachmentViewer({
  attachment,
  onClose,
}: {
  attachment: TransactionAttachmentFieldsFragment;
  onClose: () => void;
}) {
  const url = resolveMediaUrl(attachment.url);
  const scrollRef = useRef<ScrollView>(null);

  return (
    <Modal visible animationType="fade" transparent onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.95)" }}>
        {/* Close */}
        <TouchableOpacity
          style={{ position: "absolute", top: 56, right: 20, zIndex: 10 }}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <View style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 20, padding: 8 }}>
            <DynamicIcon name="x" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Zoomable image */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          maximumZoomScale={4}
          minimumZoomScale={1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          centerContent
          bouncesZoom
        >
          {url && (
            <Image
              source={{ uri: url }}
              style={{ width: SCREEN_W, height: SCREEN_W }}
              resizeMode="contain"
            />
          )}
        </ScrollView>

        {/* Caption */}
        {attachment.filename && (
          <View style={{ paddingBottom: 40, paddingHorizontal: 24, alignItems: "center" }}>
            <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, textAlign: "center" }}>
              {attachment.filename}
              {attachment.filesize ? `  ·  ${formatBytes(attachment.filesize)}` : ""}
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
}

// ── Attachments grid ──────────────────────────────────────────────────────────

function AttachmentsCard({ attachments }: { attachments: TransactionAttachmentFieldsFragment[] }) {
  const C = useColors();
  const [viewing, setViewing] = useState<TransactionAttachmentFieldsFragment | null>(null);
  const itemSize = (SCREEN_W - 32 - 16 - 8) / 3;

  return (
    <>
      <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
        <SectionBlock label={`Attachments (${attachments.length})`}>
          <View className="flex-row flex-wrap gap-2 mt-1">
            {attachments.map((att) => {
              const url = resolveMediaUrl(att.url);
              const img = isImage(att.mimeType);
              return (
                <TouchableOpacity
                  key={att.id}
                  onPress={() => {
                    if (img) { setViewing(att); }
                    else if (url) { Linking.openURL(url); }
                  }}
                  activeOpacity={0.8}
                  style={{
                    width: itemSize, height: itemSize, borderRadius: 12,
                    overflow: "hidden", backgroundColor: C.surfaceHigh,
                    alignItems: "center", justifyContent: "center",
                  }}
                >
                  {img && url ? (
                    <Image source={{ uri: url }} style={{ width: itemSize, height: itemSize }} resizeMode="cover" />
                  ) : (
                    <View style={{ alignItems: "center", gap: 4 }}>
                      <View style={{ backgroundColor: "#ef444420", borderRadius: 10, padding: 10 }}>
                        <DynamicIcon name="file-text" size={20} color="#ef4444" />
                      </View>
                      <Text style={{ fontSize: 9, color: C.onSurfaceVariant, textAlign: "center", paddingHorizontal: 4 }} numberOfLines={2}>
                        {att.filename ?? "File"}
                      </Text>
                      <Text style={{ fontSize: 8, color: C.primary, fontWeight: "600" }}>Open</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </SectionBlock>
      </View>
      {viewing && <AttachmentViewer attachment={viewing} onClose={() => setViewing(null)} />}
    </>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function TransactionDetailScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: tx, loading, error, refetch } = useGetTransaction(id);
  const { deleteTransaction, loading: deleting } = useDeleteTransaction();
  const fmt = useFormatMoney();

  const amount = tx ? parseFloat(tx.amount) : 0;
  const isIncome = tx?.type === Transaction_type.income;
  const isTransfer = tx?.type === Transaction_type.transfer;

  const amountColor = isIncome ? "#10b981" : isTransfer ? "#6366f1" : "#ef4444";
  const typeLabel = isIncome ? "Income" : isTransfer ? "Transfer" : "Expense";
  const typeIcon = isIncome ? "arrow-down-left" : isTransfer ? "arrow-right-left" : "arrow-up-right";

  const catBg = tx?.category?.bgColor ?? `${tx?.category?.color ?? "#f59e0b"}22`;
  const catColor = tx?.category?.color ?? "#f59e0b";

  const formattedDate = tx?.date
    ? new Date(tx.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : null;
  const formattedTime = tx?.date
    ? new Date(tx.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : null;
  const createdAt = formatDateTime(tx?.createdAt);
  const updatedAt = formatDateTime(tx?.updatedAt);
  const showUpdated = tx?.updatedAt && tx.updatedAt !== tx.createdAt;

  const attachments = tx?.attachments ?? [];

  const handleDelete = () => {
    showAlert({
      title: "Delete Transaction",
      message: `Delete "${tx?.title}"? This cannot be undone.`,
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete", style: "destructive",
          onPress: async () => {
            try { await deleteTransaction(id); router.back(); }
            catch (err: any) { showAlert({ title: "Error", message: err?.message ?? "Could not delete transaction." }); }
          },
        },
      ],
    });
  };

  return (
    <View className="flex-1 bg-surface">
      {/* Header */}
      <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
          >
            <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface" numberOfLines={1}>
            {loading && !tx ? "Loading…" : (tx?.title ?? "Transaction")}
          </Text>
          {tx && (
            <TouchableOpacity
              onPress={() => router.push(`/history/${id}/edit`)}
              activeOpacity={0.7}
              className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
            >
              <DynamicIcon name="pencil" size={17} color={C.onSurface} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading && !tx ? (
        <TransactionDetailSkeleton insets={insets} />
      ) : error ? (
        <View className="flex-1 items-center justify-center gap-4 px-6">
          <Text className="text-[15px] text-on-surface-variant text-center">Could not load transaction.</Text>
          <TouchableOpacity onPress={() => refetch()} activeOpacity={0.75} className="px-4 py-2 rounded-xl bg-surface-mid">
            <Text className="text-[14px] font-semibold text-on-surface">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : tx ? (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: Math.max(insets.bottom, 16) + 24, gap: 12 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Hero ── */}
          <View className="rounded-2xl items-center py-8 gap-3" style={{ backgroundColor: C.surfaceMid }}>
            {/* Category icon */}
            <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: catBg, alignItems: "center", justifyContent: "center" }}>
              <DynamicIcon name={tx.category?.icon ?? "receipt"} size={28} color={catColor} />
            </View>

            {/* Type pill */}
            <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: `${amountColor}20` }}>
              <DynamicIcon name={typeIcon} size={12} color={amountColor} />
              <Text style={{ fontSize: 12, fontWeight: "700", color: amountColor }}>{typeLabel}</Text>
            </View>

            {/* Title + amount + category */}
            <View className="items-center gap-0.5 px-6">
              <Text className="text-[15px] font-bold text-on-surface text-center" numberOfLines={2}>{tx.title}</Text>
              <Text style={{ fontSize: 38, fontWeight: "900", color: amountColor, letterSpacing: -0.5, marginTop: 2 }}>
                {fmt(amount)}
              </Text>
              {tx.category && (
                <Text className="text-[12px] text-on-surface-variant">{tx.category.name}</Text>
              )}
            </View>

            {/* Tags */}
            {(tx.tags?.length ?? 0) > 0 && (
              <View className="flex-row flex-wrap gap-1.5 justify-center px-6">
                {tx.tags!.map((tag) => (
                  <View
                    key={tag.id}
                    className="flex-row items-center gap-1 px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: tag.bgColor ?? `${tag.color ?? C.outlineVariant}22` }}
                  >
                    <DynamicIcon name={tag.icon} size={11} color={tag.color ?? C.outlineVariant} />
                    <Text style={{ fontSize: 12, color: tag.color ?? C.outlineVariant, fontWeight: "600" }}>{tag.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* ── Date & Time ── */}
          <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
            <View className="flex-row">
              <View className="flex-1 px-4 py-3.5 gap-1">
                <Text className="text-[10px] font-bold uppercase tracking-[0.7px] text-on-surface-variant">Date</Text>
                <Text className="text-[13px] font-semibold text-on-surface">{formattedDate}</Text>
              </View>
              <View style={{ width: 1, backgroundColor: C.outlineVariant + "28" }} />
              <View className="flex-1 px-4 py-3.5 gap-1">
                <Text className="text-[10px] font-bold uppercase tracking-[0.7px] text-on-surface-variant">Time</Text>
                <Text className="text-[13px] font-semibold text-on-surface">{formattedTime}</Text>
              </View>
            </View>
          </View>

          {/* ── Account(s) ── */}
          <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
            {isTransfer && tx.toAccount ? (
              <>
                <SectionBlock label="From">
                  <View className="flex-row items-center gap-2.5">
                    <AccountAvatar avatarUrl={tx.account.avatar?.url} icon={tx.account.icon} bgColor={tx.account.bgColor} iconColor={tx.account.color} name={tx.account.name} size={32} />
                    <Text className="text-[14px] font-semibold text-on-surface">{tx.account.name}</Text>
                  </View>
                </SectionBlock>
                <Divider />
                <SectionBlock label="To">
                  <View className="flex-row items-center gap-2.5">
                    <AccountAvatar avatarUrl={tx.toAccount.avatar?.url} icon={tx.toAccount.icon} bgColor={tx.toAccount.bgColor} iconColor={tx.toAccount.color} name={tx.toAccount.name} size={32} />
                    <Text className="text-[14px] font-semibold text-on-surface">{tx.toAccount.name}</Text>
                  </View>
                </SectionBlock>
              </>
            ) : (
              <SectionBlock label="Account">
                <View className="flex-row items-center gap-2.5">
                  <AccountAvatar avatarUrl={tx.account.avatar?.url} icon={tx.account.icon} bgColor={tx.account.bgColor} iconColor={tx.account.color} name={tx.account.name} size={32} />
                  <Text className="text-[14px] font-semibold text-on-surface">{tx.account.name}</Text>
                </View>
              </SectionBlock>
            )}
          </View>

          {/* ── Person ── */}
          {tx.person && (
            <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
              <SectionBlock label="Person">
                <View className="flex-row items-center gap-3">
                  <UserAvatar id={tx.person.id} name={tx.person.name} avatarUrl={tx.person.avatar?.url} size={40} radius={20} />
                  <View className="flex-1 min-w-0">
                    <Text className="text-[14px] font-bold text-on-surface" numberOfLines={1}>{tx.person.name}</Text>
                    {tx.person.email && (
                      <Text className="text-[12px] text-on-surface-variant" numberOfLines={1}>{tx.person.email}</Text>
                    )}
                    {tx.person.phone && (
                      <Text className="text-[12px] text-on-surface-variant" numberOfLines={1}>{tx.person.phone}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => router.push(`/people/${tx.person!.id}`)}
                    activeOpacity={0.7}
                    className="w-8 h-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: C.surfaceHigh }}
                  >
                    <DynamicIcon name="arrow-right" size={14} color={C.onSurfaceVariant} />
                  </TouchableOpacity>
                </View>
              </SectionBlock>
            </View>
          )}

          {/* ── Note ── */}
          {tx.note && (
            <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
              <SectionBlock label="Note">
                <Text className="text-[13px] text-on-surface leading-[20px]">{tx.note}</Text>
              </SectionBlock>
            </View>
          )}

          {/* ── Attachments ── */}
          {attachments.length > 0 && <AttachmentsCard attachments={attachments} />}

          {/* ── Linked Transactions ── */}
          <LinkedTransactionsCard transactionId={id} />

          {/* ── Timestamps ── */}
          <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surfaceMid }}>
            <SectionBlock label="Added">
              <Text className="text-[13px] font-medium text-on-surface">{createdAt}</Text>
            </SectionBlock>
            {showUpdated && (
              <>
                <Divider />
                <SectionBlock label="Last updated">
                  <Text className="text-[13px] font-medium text-on-surface">{updatedAt}</Text>
                </SectionBlock>
              </>
            )}
          </View>

          {/* ── Delete ── */}
          <TouchableOpacity
            onPress={handleDelete}
            disabled={deleting}
            activeOpacity={0.75}
            className="flex-row items-center justify-center gap-2 p-4 rounded-2xl bg-surface-mid"
          >
            {deleting ? (
              <ActivityIndicator size="small" color={C.tertiary} />
            ) : (
              <>
                <DynamicIcon name="trash-2" size={17} color={C.tertiary} />
                <Text className="text-[14px] font-semibold text-tertiary">Delete Transaction</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      ) : null}
    </View>
  );
}
