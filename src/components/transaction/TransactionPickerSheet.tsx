import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";
import { useFormatMoney } from "../../lib/format-currency";
import { useGetTransactions } from "../../services/gql/transactions/transactions.service";
import {
  Transaction_type,
  TransactionLink_type_MutationInput,
  type TransactionFieldsFragment,
} from "../../services/gql/types/graphql";

// ── Types ─────────────────────────────────────────────────────────────────────

export type LinkType = TransactionLink_type_MutationInput;

export const LINK_TYPE_META: Record<
  LinkType,
  { label: string; color: string; icon: string }
> = {
  repaid:     { label: "Repaid",     color: "#10b981", icon: "circle-check" },
  returned:   { label: "Returned",   color: "#06b6d4", icon: "undo-2"       },
  duplicate:  { label: "Duplicate",  color: "#f59e0b", icon: "copy"         },
  correction: { label: "Correction", color: "#8b5cf6", icon: "pencil-line"  },
};

export interface TransactionPickerResult {
  transaction: TransactionFieldsFragment;
  linkType: LinkType;
}

interface Props {
  visible: boolean;
  /** The current transaction id — excluded from the search results */
  excludeId: string;
  /** IDs already linked — excluded from results */
  excludeIds?: string[];
  onConfirm: (result: TransactionPickerResult) => void;
  onClose: () => void;
}

const SHEET_HEIGHT = Dimensions.get("window").height * 0.82;
const PAGE_SIZE = 20;

// ── Mini transaction row ──────────────────────────────────────────────────────

function TxRow({
  tx,
  selected,
  onPress,
}: {
  tx: TransactionFieldsFragment;
  selected: boolean;
  onPress: () => void;
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const amount = parseFloat(tx.amount);
  const isIncome = tx.type === Transaction_type.income;
  const isTransfer = tx.type === Transaction_type.transfer;
  const amountColor = isIncome ? "#10b981" : isTransfer ? "#6366f1" : "#ef4444";
  const catBg = tx.category?.bgColor ?? `${tx.category?.color ?? "#f59e0b"}22`;
  const catColor = tx.category?.color ?? "#f59e0b";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: selected ? `${C.primary}12` : "transparent",
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
          name={tx.category?.icon ?? "receipt"}
          size={17}
          color={catColor}
        />
      </View>

      {/* Info */}
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text
          style={{ fontSize: 13, fontWeight: "600", color: C.onSurface }}
          numberOfLines={1}
        >
          {tx.title}
        </Text>
        <Text
          style={{ fontSize: 11, color: C.onSurfaceVariant, marginTop: 1 }}
          numberOfLines={1}
        >
          {tx.account.name} ·{" "}
          {new Date(tx.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </Text>
      </View>

      {/* Amount + check */}
      <View style={{ alignItems: "flex-end", gap: 3 }}>
        <Text style={{ fontSize: 13, fontWeight: "700", color: amountColor }}>
          {fmt(amount)}
        </Text>
        {selected && (
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: C.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicIcon name="check" size={10} color="#fff" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ── Main sheet ────────────────────────────────────────────────────────────────

export function TransactionPickerSheet({
  visible,
  excludeId,
  excludeIds = [],
  onConfirm,
  onClose,
}: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [selected, setSelected] = useState<TransactionFieldsFragment | null>(null);
  const [linkType, setLinkType] = useState<LinkType>(
    TransactionLink_type_MutationInput.repaid,
  );

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setAppliedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const where = appliedSearch.trim()
    ? { OR: [{ title: { contains: appliedSearch.trim() } }] }
    : undefined;

  const { transactions, loading } = useGetTransactions({
    limit: PAGE_SIZE,
    sort: "-date",
    where,
  });

  const filtered = (transactions ?? []).filter(
    (tx) => tx.id !== excludeId && !excludeIds.includes(tx.id),
  );

  const handleClose = () => {
    setSearch("");
    setAppliedSearch("");
    setSelected(null);
    setLinkType(TransactionLink_type_MutationInput.repaid);
    onClose();
  };

  const handleConfirm = () => {
    if (!selected) return;
    onConfirm({ transaction: selected, linkType });
    handleClose();
  };

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
            inset: 0,
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
          <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}>
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
              paddingTop: 10,
              paddingBottom: 12,
              gap: 10,
            }}
          >
            <Text style={{ flex: 1, fontSize: 16, fontWeight: "700", color: C.onSurface }}>
              Link Transaction
            </Text>
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

          {/* Search */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginHorizontal: 16,
              marginBottom: 12,
              paddingHorizontal: 12,
              height: 40,
              borderRadius: 12,
              backgroundColor: C.surfaceMid,
            }}
          >
            <DynamicIcon name="search" size={15} color={C.outlineVariant} />
            <TextInput
              style={{ flex: 1, fontSize: 14, color: C.onSurface }}
              placeholder="Search transactions…"
              placeholderTextColor={C.outlineVariant}
              value={search}
              onChangeText={setSearch}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
                <DynamicIcon name="x" size={14} color={C.outlineVariant} />
              </TouchableOpacity>
            )}
          </View>

          {/* Link type selector */}
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              gap: 6,
              marginBottom: 12,
            }}
          >
            {(Object.keys(LINK_TYPE_META) as LinkType[]).map((lt) => {
              const { label, color } = LINK_TYPE_META[lt];
              const active = linkType === lt;
              return (
                <TouchableOpacity
                  key={lt}
                  onPress={() => setLinkType(lt)}
                  activeOpacity={0.75}
                  style={{
                    flex: 1,
                    paddingVertical: 6,
                    borderRadius: 10,
                    alignItems: "center",
                    backgroundColor: active ? `${color}22` : C.surfaceMid,
                    borderWidth: active ? 1 : 0,
                    borderColor: `${color}55`,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: active ? color : C.onSurfaceVariant,
                    }}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: `${C.outlineVariant}28`, marginHorizontal: 16, marginBottom: 4 }} />

          {/* List */}
          {loading && !transactions ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator color={C.primary} />
            </View>
          ) : filtered.length === 0 ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 6 }}>
              <DynamicIcon name="search-x" size={28} color={C.outlineVariant} />
              <Text style={{ fontSize: 13, color: C.onSurfaceVariant }}>
                No transactions found
              </Text>
            </View>
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item, index }) => (
                <>
                  {index > 0 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: `${C.outlineVariant}22`,
                        marginHorizontal: 16,
                      }}
                    />
                  )}
                  <TxRow
                    tx={item}
                    selected={selected?.id === item.id}
                    onPress={() =>
                      setSelected((prev) =>
                        prev?.id === item.id ? null : item,
                      )
                    }
                  />
                </>
              )}
            />
          )}

          {/* Confirm button */}
          <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
            <TouchableOpacity
              onPress={handleConfirm}
              activeOpacity={0.8}
              disabled={!selected}
              style={{
                paddingVertical: 14,
                borderRadius: 14,
                backgroundColor: selected ? C.primary : `${C.outlineVariant}60`,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <DynamicIcon
                name="link"
                size={16}
                color={selected ? "#fff" : C.onSurfaceVariant}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: selected ? "#fff" : C.onSurfaceVariant,
                }}
              >
                {selected
                  ? `Link as "${LINK_TYPE_META[linkType].label}"`
                  : "Select a transaction"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
