import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "@/components/Icon";
import { showAlert } from "@/components/ui/AlertDialog";
import { UserAvatar } from "@/components/UserAvatar";
import { uploadMedia } from "@/lib/media-upload";
import { useCreatePerson, useGetPeople } from "@/services/gql/people/people.service";
import { useColors } from "@/theme/colors";

type ContactsModule = typeof import("expo-contacts");

type Row = { id: string; name: string; phone: string | null; email: string | null; hasImage: boolean };

// Last 10 digits: "+91 98765 43210" and "098765 43210" are the same number.
const phoneKey = (p?: string | null) => (p ? p.replace(/\D/g, "").slice(-10) : "");

/** Loaded on demand so builds without the native module still start (they show an update hint). */
async function loadContactsModule(): Promise<ContactsModule | null> {
  try {
    return await import("expo-contacts");
  } catch {
    return null;
  }
}

/** Pick contacts to add as people: name, phone, email and photo come along. */
export default function ImportContactsScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);
  const { people } = useGetPeople({ limit: 1000 });
  const { createPerson } = useCreatePerson();

  const [mod, setMod] = useState<ContactsModule | null>(null);
  const [state, setState] = useState<"loading" | "unavailable" | "denied" | "ready">("loading");
  const [rows, setRows] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const Contacts = await loadContactsModule();
      if (!Contacts || !(await Contacts.isAvailableAsync().catch(() => false))) return setState("unavailable");
      const perm = await Contacts.requestPermissionsAsync();
      if (!perm.granted) return setState("denied");
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails, Contacts.Fields.ImageAvailable],
        sort: Contacts.SortTypes.FirstName,
      });
      setMod(Contacts);
      setRows(
        data
          .filter((c) => c.name?.trim())
          .map((c) => ({
            id: c.id ?? c.name,
            name: c.name.trim(),
            phone: c.phoneNumbers?.[0]?.number ?? null,
            email: c.emails?.[0]?.email ?? null,
            hasImage: !!c.imageAvailable,
          })),
      );
      setState("ready");
    })();
  }, []);

  // Already in Pika: same phone number, or same name when there is no phone.
  const existing = useMemo(() => {
    const phones = new Set((people ?? []).map((p) => phoneKey(p.phone)).filter(Boolean));
    const names = new Set((people ?? []).map((p) => p.name.trim().toLowerCase()));
    return (r: Row) => (r.phone ? phones.has(phoneKey(r.phone)) : false) || names.has(r.name.toLowerCase());
  }, [people]);

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    const digits = q.replace(/\D/g, "");
    return q
      ? rows.filter((r) => r.name.toLowerCase().includes(q) || (digits.length >= 3 && phoneKey(r.phone).includes(digits)))
      : rows;
  }, [rows, search]);

  const toggle = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const save = async () => {
    if (!mod) return;
    setSaving(true);
    let added = 0;
    try {
      for (const r of rows.filter((x) => selected.has(x.id))) {
        let avatar: string | null = null;
        if (r.hasImage) {
          try {
            const full = await mod.getContactByIdAsync(r.id, [mod.Fields.Image]);
            const uri = full?.image?.uri;
            if (uri) avatar = (await uploadMedia(uri, `person-${Date.now()}.jpg`, "image/jpeg", r.name)).id;
          } catch {
            // A photo that can't be read just means no avatar.
          }
        }
        await createPerson({ data: { name: r.name, phone: r.phone, email: r.email, avatar } });
        added++;
      }
      router.back();
    } catch (err: any) {
      showAlert({
        title: added ? `Added ${added}, then failed` : "Could not add",
        message: err?.message ?? "Something went wrong.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-surface">
      <View style={{ paddingTop: topPad }} className="px-5 pb-3 bg-surface gap-3">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full items-center justify-center bg-surface-mid"
          >
            <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface">From contacts</Text>
        </View>
        {state === "ready" && (
          <View className="flex-row items-center gap-2.5 px-3.5 rounded-xl bg-surface-mid" style={{ height: 44 }}>
            <DynamicIcon name="search" size={16} color={C.outlineVariant} />
            <TextInput
              className="flex-1 text-[14px] text-on-surface"
              placeholder="Search name or number…"
              placeholderTextColor={C.onSurfaceVariant}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        )}
      </View>

      {state === "loading" && <ActivityIndicator style={{ marginTop: 40 }} color={C.primary} />}
      {state === "unavailable" && (
        <Text className="px-6 pt-10 text-center text-[14px] text-on-surface-variant">
          Importing contacts needs the latest version of the app.
        </Text>
      )}
      {state === "denied" && (
        <View className="items-center px-6 pt-10 gap-3">
          <Text className="text-center text-[14px] text-on-surface-variant">
            Pika needs permission to read your contacts.
          </Text>
          <TouchableOpacity onPress={() => Linking.openSettings()}>
            <Text className="text-[14px] font-semibold" style={{ color: C.primary }}>
              Open settings
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {state === "ready" && (
        <FlatList
          data={shown}
          keyExtractor={(r) => r.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item: r }) => {
            const already = existing(r);
            const on = selected.has(r.id);
            return (
              <TouchableOpacity
                onPress={() => !already && toggle(r.id)}
                disabled={already}
                activeOpacity={0.75}
                className="flex-row items-center gap-3 py-2.5"
                style={{ opacity: already ? 0.45 : 1 }}
              >
                <UserAvatar id={r.id} name={r.name} size={36} radius={18} />
                <View className="flex-1">
                  <Text className="text-[14px] font-semibold text-on-surface" numberOfLines={1}>
                    {r.name}
                  </Text>
                  <Text className="text-[12px] text-on-surface-variant" numberOfLines={1}>
                    {already ? "Already in Pika" : r.phone ?? r.email ?? ""}
                  </Text>
                </View>
                {!already && (
                  <View
                    className="w-5 h-5 rounded-md items-center justify-center"
                    style={{
                      backgroundColor: on ? C.primaryBright : "transparent",
                      borderWidth: on ? 0 : 1.5,
                      borderColor: C.outlineVariant,
                    }}
                  >
                    {on && <DynamicIcon name="check" size={13} color="#fff" />}
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}

      {state === "ready" && selected.size > 0 && (
        <View className="absolute left-0 right-0 bottom-0 px-4 pt-3 bg-surface" style={{ paddingBottom: insets.bottom + 12 }}>
          <TouchableOpacity
            onPress={save}
            disabled={saving}
            activeOpacity={0.8}
            className="flex-row items-center justify-center gap-2 rounded-xl py-3.5"
            style={{ backgroundColor: C.primaryBright }}
          >
            {saving && <ActivityIndicator size="small" color="#fff" />}
            <Text className="text-[15px] font-semibold text-white">
              Add {selected.size} {selected.size === 1 ? "person" : "people"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
