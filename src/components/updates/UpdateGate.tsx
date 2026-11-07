/**
 * Checks for updates on start (production Android app only) and shows:
 * - a mandatory APK or OTA update: a full-screen view there is no way past;
 * - an optional APK: a sheet with the notes, Update and Later;
 * - an OTA update downloaded in the background: a small Restart banner.
 * `checkForUpdatesNow()` runs the same check from Settings.
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, AppState, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { showAlert } from "../ui/AlertDialog";
import {
  applyOtaNow,
  checkForUpdate,
  installApk,
  reloadApp,
  selfUpdateEnabled,
  skipVersion,
  useUpdatePending,
  type UpdateDecision,
} from "../../lib/updates";
import { useColors } from "../../theme/colors";

type Shown = Exclude<UpdateDecision, { kind: "none" }>;

let showDecision: ((d: Shown) => void) | null = null;

const FIRST_CHECK_MS = 4000;
const RECHECK_MS = 30 * 60 * 1000;

/** Manual check from Settings: shows the update, or says it is up to date. */
export async function checkForUpdatesNow(): Promise<void> {
  if (!selfUpdateEnabled) {
    showAlert({ title: "Updates", message: "Updates are only checked in the release app." });
    return;
  }
  try {
    const d = await checkForUpdate(true);
    if (d.kind === "none") showAlert({ title: "Up to date", message: "You have the latest version of Pika." });
    else showDecision?.(d);
  } catch (e: any) {
    showAlert({ title: "Couldn't check for updates", message: e?.message ?? "Try again later." });
  }
}

export function UpdateGate() {
  const [decision, setDecision] = useState<Shown | null>(null);
  const isUpdatePending = useUpdatePending();
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    showDecision = setDecision;
    if (!selfUpdateEnabled) return () => void (showDecision = null);

    // Not straight away (the splash screen is up and the network may not be ready yet),
    // and again whenever the app comes back to the foreground, at most every 30 minutes.
    let last = 0;
    let busy = false;
    const check = () => {
      if (busy || Date.now() - last < RECHECK_MS) return;
      busy = true;
      checkForUpdate()
        .then((d) => {
          last = Date.now();
          if (d.kind !== "none") setDecision((cur) => cur ?? d);
        })
        .catch(() => {}) // offline: the next foreground tries again
        .finally(() => {
          busy = false;
        });
    };
    const first = setTimeout(check, FIRST_CHECK_MS);
    const sub = AppState.addEventListener("change", (state) => state === "active" && check());
    return () => {
      clearTimeout(first);
      sub.remove();
      showDecision = null;
    };
  }, []);

  const mandatory = decision?.kind === "ota" || (decision?.kind === "apk" && decision.mandatory);

  return (
    <>
      {decision && (
        <UpdateView decision={decision} mandatory={mandatory} onClose={() => setDecision(null)} />
      )}
      {selfUpdateEnabled && isUpdatePending && !decision && !bannerDismissed && (
        <RestartBanner onDismiss={() => setBannerDismissed(true)} />
      )}
    </>
  );
}

function UpdateView({ decision, mandatory, onClose }: { decision: Shown; mandatory: boolean; onClose: () => void }) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isUpdatePending = useUpdatePending();

  const isApk = decision.kind === "apk";
  const title = isApk ? `Pika ${decision.apk.version} (build ${decision.apk.versionCode})` : "Update required";
  const notes = isApk ? decision.apk.notes : decision.message;

  const run = useCallback(async () => {
    setError(null);
    setProgress(0);
    try {
      if (decision.kind === "apk") {
        await installApk(decision.apk.url, decision.apk.versionCode, setProgress);
        // The installer is open now. A mandatory update stays on screen until it is installed.
        setProgress(null);
        if (!mandatory) onClose();
      } else {
        await applyOtaNow(isUpdatePending);
      }
    } catch (e: any) {
      setProgress(null);
      setError(e?.message ?? "Something went wrong.");
    }
  }, [decision, mandatory, onClose, isUpdatePending]);

  // A mandatory OTA applies itself straight away (once; Retry after that).
  const autoRan = useRef(false);
  useEffect(() => {
    if (decision.kind !== "ota" || autoRan.current) return;
    autoRan.current = true;
    run();
  }, [decision, run]);

  const later = async () => {
    if (decision.kind === "apk") await skipVersion(decision.apk.versionCode).catch(() => {});
    onClose();
  };

  const busy = progress !== null;
  const body = (
    <View style={{ gap: 14 }}>
      <View className="flex-row items-center gap-3">
        <View className="w-11 h-11 rounded-2xl items-center justify-center" style={{ backgroundColor: `${C.primary}22` }}>
          <DynamicIcon name={mandatory ? "shield-alert" : "download"} size={22} color={C.primary} />
        </View>
        <View className="flex-1">
          <Text className="text-[17px] font-bold text-on-surface">{title}</Text>
          <Text className="text-[13px] text-on-surface-variant">
            {mandatory ? "This update is required to keep using Pika." : "A new version is available."}
          </Text>
        </View>
      </View>

      {notes ? (
        <ScrollView style={{ maxHeight: 220 }} className="rounded-xl bg-surface-mid px-3 py-2.5">
          <Text className="text-[13px] text-on-surface leading-5">{notes}</Text>
        </ScrollView>
      ) : null}

      {busy && (
        <View style={{ gap: 6 }}>
          <View className="h-2 rounded-full bg-surface-high overflow-hidden">
            <View style={{ width: `${Math.round((progress ?? 0) * 100)}%`, height: "100%", backgroundColor: C.primary }} />
          </View>
          <Text className="text-[12px] text-on-surface-variant">
            {isApk ? `Downloading… ${Math.round((progress ?? 0) * 100)}%` : "Updating…"}
          </Text>
        </View>
      )}
      {error && <Text className="text-[13px]" style={{ color: "#ef4444" }}>{error}</Text>}

      <View className="flex-row gap-2">
        {!mandatory && (
          <TouchableOpacity
            onPress={later}
            disabled={busy}
            activeOpacity={0.8}
            className="flex-1 items-center rounded-xl py-3"
            style={{ backgroundColor: `${C.outlineVariant}33` }}
          >
            <Text className="text-[14px] font-semibold text-on-surface-variant">Later</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={run}
          disabled={busy}
          activeOpacity={0.85}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-3"
          style={{ backgroundColor: C.primary, opacity: busy ? 0.6 : 1 }}
        >
          {busy && <ActivityIndicator size="small" color="#fff" />}
          <Text className="text-[14px] font-semibold" style={{ color: "#fff" }}>
            {error ? "Retry" : isApk ? "Update" : "Update now"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (mandatory) {
    return (
      <Modal visible animationType="fade" onRequestClose={() => {}}>
        <View
          className="flex-1 justify-center px-6 bg-surface"
          style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
          {body}
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible transparent animationType="slide" onRequestClose={() => !busy && onClose()}>
      <View className="flex-1 justify-end bg-black/45">
        <View
          className="bg-surface-low rounded-t-3xl px-5 pt-5"
          style={{ paddingBottom: Math.max(insets.bottom, 16) + 8 }}
        >
          {body}
        </View>
      </View>
    </Modal>
  );
}

function RestartBanner({ onDismiss }: { onDismiss: () => void }) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  return (
    <View
      pointerEvents="box-none"
      style={{ position: "absolute", left: 12, right: 12, top: insets.top + 8 }}
    >
      <View className="flex-row items-center gap-3 rounded-2xl px-4 py-3 bg-surface-high" style={{ elevation: 6 }}>
        <DynamicIcon name="sparkles" size={18} color={C.primary} />
        <Text className="flex-1 text-[13px] text-on-surface">An update is ready.</Text>
        <TouchableOpacity onPress={() => reloadApp().catch(() => {})} activeOpacity={0.8}>
          <Text className="text-[13px] font-bold" style={{ color: C.primary }}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDismiss} accessibilityLabel="Dismiss">
          <DynamicIcon name="x" size={16} color={C.onSurfaceVariant} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
