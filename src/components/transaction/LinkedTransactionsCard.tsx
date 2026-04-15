// cspell:ignore Swipeable
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import { showAlert } from "../ui/AlertDialog";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";
import { useFormatMoney } from "../../lib/format-currency";
import {
  useGetTransactionLinks,
  useCreateTransactionLink,
  useDeleteTransactionLink,
} from "../../services/gql/transaction-links/transaction-links.service";
import {
  Transaction_type,
  TransactionLink_type,
  type TransactionLinkFieldsFragment,
} from "../../services/gql/types/graphql";
import {
  TransactionPickerSheet,
  LINK_TYPE_META,
  type TransactionPickerResult,
} from "./TransactionPickerSheet";

// ── Link type metadata (colors / icons) ───────────────────────────────────────

function getLinkTypeMeta(type: TransactionLink_type) {
  return (
    LINK_TYPE_META[type as unknown as keyof typeof LINK_TYPE_META] ?? {
      label: type,
      color: "#64748b",
      icon: "link",
    }
  );
}

// ── Swipe unlink action ────────────────────────────────────────────────────────

function UnlinkAction({
  progress,
  onUnlink,
}: {
  progress: SharedValue<number>;
  onUnlink: () => void;
}) {
  const C = useColors();
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [72, 0]) }],
  }));
  return (
    <Reanimated.View style={[style, { width: 72 }]}>
      <TouchableOpacity
        onPress={onUnlink}
        activeOpacity={0.8}
        style={{
          flex: 1,
          backgroundColor: `${C.tertiary}22`,
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <DynamicIcon name="unlink" size={16} color={C.tertiary} />
        <Text style={{ fontSize: 11, color: C.tertiary, fontWeight: "700" }}>
          Unlink
        </Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
}

// ── Single linked transaction row ─────────────────────────────────────────────

function LinkedRow({
  link,
  currentId,
  openRef,
  onRemove,
}: {
  link: TransactionLinkFieldsFragment;
  currentId: string;
  openRef: React.MutableRefObject<SwipeableMethods | null>;
  onRemove: () => void;
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const swipeRef = useRef<SwipeableMethods>(null);

  const other = link.from.id === currentId ? link.to : link.from;
  const isSource = link.from.id === currentId;

  const amount = parseFloat(other.amount);
  const isIncome = other.type === Transaction_type.income;
  const isTransfer = other.type === Transaction_type.transfer;
  const amountColor = isIncome ? "#10b981" : isTransfer ? "#6366f1" : "#ef4444";
  const catBg =
    other.category?.bgColor ?? `${other.category?.color ?? "#f59e0b"}22`;
  const catColor = other.category?.color ?? "#f59e0b";

  const { label, color, icon } = getLinkTypeMeta(link.type);

  return (
    <ReanimatedSwipeable
      ref={swipeRef}
      friction={2}
      rightThreshold={40}
      overshootRight={false}
      onSwipeableWillOpen={() => {
        if (openRef.current && openRef.current !== swipeRef.current) {
          openRef.current.close();
        }
        openRef.current = swipeRef.current;
      }}
      renderRightActions={(progress) => (
        <UnlinkAction
          progress={progress}
          onUnlink={() => {
            swipeRef.current?.close();
            onRemove();
          }}
        />
      )}
    >
      <TouchableOpacity
        onPress={() => router.push(`/transactions/${other.id}`)}
        activeOpacity={0.75}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: C.surfaceMid,
        }}
      >
        {/* Category icon */}
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: catBg,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DynamicIcon
            name={other.category?.icon ?? "receipt"}
            size={17}
            color={catColor}
          />
        </View>

        {/* Info */}
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text
            style={{ fontSize: 13, fontWeight: "600", color: C.onSurface }}
            numberOfLines={1}
          >
            {other.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 6,
                backgroundColor: `${color}18`,
              }}
            >
              <DynamicIcon name={icon} size={9} color={color} />
              <Text style={{ fontSize: 10, fontWeight: "700", color }}>
                {label}
              </Text>
            </View>
            <Text style={{ fontSize: 10, color: C.onSurfaceVariant }}>
              {isSource ? "→" : "←"}{" "}
              {new Date(other.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>

        {/* Amount */}
        <Text style={{ fontSize: 13, fontWeight: "700", color: amountColor }}>
          {fmt(amount)}
        </Text>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
}

// ── Main card ─────────────────────────────────────────────────────────────────

interface Props {
  transactionId: string;
}

export function LinkedTransactionsCard({ transactionId }: Props) {
  const C = useColors();
  const [showPicker, setShowPicker] = useState(false);
  const openSwipeable = useRef<SwipeableMethods | null>(null);

  const { links, loading } = useGetTransactionLinks(transactionId);
  const { createLink, loading: creating } = useCreateTransactionLink();
  const { deleteLink } = useDeleteTransactionLink();

  const handleLink = async (result: TransactionPickerResult) => {
    try {
      await createLink({
        from: transactionId,
        to: result.transaction.id,
        type: result.linkType,
      });
    } catch (err: any) {
      const msg =
        err?.graphQLErrors?.[0]?.message ??
        err?.message ??
        "Could not create link.";
      showAlert({ title: "Link failed", message: msg });
    }
  };

  const handleRemove = (link: TransactionLinkFieldsFragment) => {
    showAlert({
      title: "Remove link",
      message: "Remove this transaction link?",
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteLink(link.id);
            } catch (err: any) {
              showAlert({
                title: "Error",
                message:
                  err?.graphQLErrors?.[0]?.message ??
                  err?.message ??
                  "Could not remove link.",
              });
            }
          },
        },
      ],
    });
  };

  const linkedIds = (links ?? []).flatMap((l) => [l.from.id, l.to.id]);

  return (
    <>
      <View
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: C.surfaceMid }}
      >
        {/* Section header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: links && links.length > 0 ? 4 : 12,
          }}
        >
          <View style={{ flex: 1, gap: 1 }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: 0.7,
                color: C.onSurfaceVariant,
              }}
            >
              Linked Transactions
            </Text>
            {!loading && links && links.length > 0 && (
              <Text style={{ fontSize: 11, color: C.onSurfaceVariant }}>
                {links.length} link{links.length !== 1 ? "s" : ""}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            disabled={creating}
            activeOpacity={0.75}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              backgroundColor: `${C.primary}18`,
            }}
          >
            {creating ? (
              <ActivityIndicator size="small" color={C.primary} />
            ) : (
              <DynamicIcon name="link" size={13} color={C.primary} />
            )}
            <Text style={{ fontSize: 12, fontWeight: "700", color: C.primary }}>
              Link
            </Text>
          </TouchableOpacity>
        </View>

        {/* Loading state */}
        {loading && !links && (
          <View style={{ paddingVertical: 20, alignItems: "center" }}>
            <ActivityIndicator size="small" color={C.outlineVariant} />
          </View>
        )}

        {/* Rows */}
        {links && links.length > 0 && (
          <>
            <View
              style={{
                height: 1,
                backgroundColor: `${C.outlineVariant}28`,
                marginHorizontal: 16,
              }}
            />
            {links.map((link, i) => (
              <React.Fragment key={link.id}>
                {i > 0 && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: `${C.outlineVariant}22`,
                      marginHorizontal: 16,
                    }}
                  />
                )}
                <LinkedRow
                  link={link}
                  currentId={transactionId}
                  openRef={openSwipeable}
                  onRemove={() => handleRemove(link)}
                />
              </React.Fragment>
            ))}
          </>
        )}

        {/* Empty state (not loading, no links) */}
        {!loading && (!links || links.length === 0) && (
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: 14,
              gap: 2,
            }}
          >
            <Text style={{ fontSize: 12, color: C.onSurfaceVariant }}>
              No linked transactions yet.
            </Text>
            <Text style={{ fontSize: 11, color: `${C.onSurfaceVariant}80` }}>
              Link related transactions like repayments or corrections.
            </Text>
          </View>
        )}
      </View>

      <TransactionPickerSheet
        visible={showPicker}
        excludeId={transactionId}
        excludeIds={linkedIds}
        onConfirm={handleLink}
        onClose={() => setShowPicker(false)}
      />
    </>
  );
}
