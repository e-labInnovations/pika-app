import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DynamicIcon } from "../Icon";
import { showAlert } from "../ui/AlertDialog";
import { OriginalSms } from "../sms/OriginalSms";
import { canQuickConfirm, toPreview, useSmsLookups, type SmsLookups } from "../sms/preview";
import { TransactionPreviewCard } from "../transaction/TransactionPreviewCard";
import { smsCaptureAvailable } from "../../lib/sms-capture";
import {
  useConfirmSms,
  useDismissSms,
  usePendingSms,
  type PendingSms,
} from "../../services/gql/sms/sms.service";
import { useColors } from "../../theme/colors";

const DECK_SIZE = 10;
const GAP = 10;
// Home's scroll content has 16px side padding; leave room to peek at the next card.
const PEEK = 28;
const UNDO_MS = 4000;

function DeckCard({
  sms,
  find,
  width,
  busy,
  onAdd,
  onDismiss,
}: {
  sms: PendingSms;
  find: SmsLookups;
  width: number;
  busy: boolean;
  onAdd: () => void;
  onDismiss: () => void;
}) {
  const C = useColors();
  const quick = canQuickConfirm(sms);
  const edit = () => router.push(`/sms/${sms.id}`);

  return (
    <View style={{ width }}>
      <TouchableOpacity activeOpacity={0.85} onPress={edit}>
        <TransactionPreviewCard data={toPreview(sms, find)} missing={{ category: true, account: true }} compact>
          <OriginalSms sms={sms} collapsedLines={2} />
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={onDismiss}
              disabled={busy}
              activeOpacity={0.75}
              className="items-center justify-center rounded-xl px-3 py-2.5"
              style={{ backgroundColor: `${C.outlineVariant}33` }}
              accessibilityLabel="Dismiss"
            >
              <DynamicIcon name="x" size={16} color={C.onSurfaceVariant} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={edit}
              disabled={busy}
              activeOpacity={0.75}
              className="flex-1 items-center justify-center rounded-xl py-2.5"
              style={{ backgroundColor: quick ? `${C.primary}1f` : C.primaryBright }}
            >
              <Text className="text-[13px] font-semibold" style={{ color: quick ? C.primary : "#fff" }}>
                {quick ? "Edit" : "Review"}
              </Text>
            </TouchableOpacity>
            {quick && (
              <TouchableOpacity
                onPress={onAdd}
                disabled={busy}
                activeOpacity={0.75}
                className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl py-2.5"
                style={{ backgroundColor: C.primaryBright }}
              >
                {busy ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <DynamicIcon name="check" size={15} color="#fff" />
                )}
                <Text className="text-[13px] font-semibold" style={{ color: "#fff" }}>
                  Add
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TransactionPreviewCard>
      </TouchableOpacity>
    </View>
  );
}

/**
 * Pending bank SMS as a horizontal deck of AI-style cards on Home. Add confirms the
 * suggestion as is, Edit opens the review form, ✕ dismisses (with undo).
 */
export function SmsDeck() {
  const C = useColors();
  const { width: screen } = useWindowDimensions();
  const cardWidth = screen - 32 - PEEK;
  const { items, total } = usePendingSms(DECK_SIZE);
  const find = useSmsLookups();
  const { confirmSms } = useConfirmSms();
  const { dismissSms } = useDismissSms();
  const [busyId, setBusyId] = useState<string | null>(null);
  // Dismissed on screen but not yet on the server, so Undo can bring them back.
  const [hidden, setHidden] = useState<string[]>([]);
  const [undo, setUndo] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commitDismiss = (id: string) => {
    dismissSms(id)
      .catch((err: any) => {
        setHidden((h) => h.filter((x) => x !== id));
        showAlert({ title: "Could not dismiss", message: err?.message ?? "Something went wrong." });
      });
  };

  const dismiss = (id: string) => {
    // A second dismissal commits the first right away; only the latest can be undone.
    if (timer.current && undo) {
      clearTimeout(timer.current);
      commitDismiss(undo);
    }
    setHidden((h) => [...h, id]);
    setUndo(id);
    timer.current = setTimeout(() => {
      commitDismiss(id);
      setUndo(null);
      timer.current = null;
    }, UNDO_MS);
  };

  const undoDismiss = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setHidden((h) => h.filter((x) => x !== undo));
    setUndo(null);
  };

  // Leaving Home mid-undo still dismisses.
  const pendingUndo = useRef<string | null>(null);
  pendingUndo.current = undo;
  useEffect(
    () => () => {
      if (timer.current && pendingUndo.current) {
        clearTimeout(timer.current);
        commitDismiss(pendingUndo.current);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const add = async (id: string) => {
    setBusyId(id);
    try {
      await confirmSms(id);
    } catch (err: any) {
      showAlert({ title: "Could not add", message: err?.message ?? "Something went wrong." });
    } finally {
      setBusyId(null);
    }
  };

  const visible = items.filter((s) => !hidden.includes(s.id));
  const remaining = total - hidden.length;
  if (!smsCaptureAvailable || (remaining <= 0 && !undo)) return null;

  return (
    <View className="gap-2">
      <View className="flex-row items-center">
        <DynamicIcon name="message-square-text" size={15} color={C.primaryBright} />
        <Text className="flex-1 ml-1.5 text-[14px] font-semibold text-on-surface">
          Bank SMS · {remaining} to review
        </Text>
        <TouchableOpacity onPress={() => router.push("/sms")} hitSlop={8}>
          <Text className="text-[13px] font-semibold" style={{ color: C.primary }}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {visible.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + GAP}
          decelerationRate="fast"
          contentContainerStyle={{ gap: GAP, paddingRight: PEEK }}
          style={{ marginHorizontal: -16 }}
        >
          {/* With the gap after it, lines the first card up with Home's 16px padding. */}
          <View style={{ width: 16 - GAP }} />
          {visible.map((sms) => (
            <DeckCard
              key={sms.id}
              sms={sms}
              find={find}
              width={cardWidth}
              busy={busyId === sms.id}
              onAdd={() => add(sms.id)}
              onDismiss={() => dismiss(sms.id)}
            />
          ))}
          {remaining > visible.length && (
            <TouchableOpacity
              onPress={() => router.push("/sms")}
              activeOpacity={0.8}
              className="items-center justify-center rounded-2xl bg-surface-mid gap-2"
              style={{ width: 120 }}
            >
              <DynamicIcon name="arrow-right" size={20} color={C.primary} />
              <Text className="text-[13px] font-semibold text-center" style={{ color: C.primary }}>
                See all {remaining}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}

      {undo && (
        <View className="flex-row items-center rounded-xl bg-surface-mid px-4 py-2.5">
          <Text className="flex-1 text-[13px] text-on-surface">SMS dismissed</Text>
          <TouchableOpacity onPress={undoDismiss} hitSlop={8}>
            <Text className="text-[13px] font-bold" style={{ color: C.primary }}>
              Undo
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
