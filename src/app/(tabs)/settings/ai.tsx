import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Modal,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { API_URL } from "../../../lib/constants";
import { showAlert } from "../../../components/ui/AlertDialog";
import { DynamicIcon } from "../../../components/Icon";
import { Skeleton } from "../../../components/ui/Skeleton";
import { useAuth } from "../../../context/AuthContext";
import { useColors } from "../../../theme/colors";
import {
  useGetUserSettings,
  useUpdateUserSettings,
} from "../../../services/gql/user-settings/user-settings.service";
import {
  useGetMcpApiKeys,
  useCreateMcpApiKey,
  useUpdateMcpApiKey,
  useDeleteMcpApiKey,
} from "../../../services/gql/mcp-api-keys/mcp-api-keys.service";
import type { McpApiKeyFieldsFragment } from "../../../services/gql/types/graphql";

// ── Types ─────────────────────────────────────────────────────────────────────

type CrudPerms = { find: boolean; create: boolean; update: boolean; delete: boolean };
type PermissionsState = {
  accounts: CrudPerms;
  people: CrudPerms;
  categories: CrudPerms;
  tags: CrudPerms;
  transactions: CrudPerms;
  transactionLinks: CrudPerms;
  reminders: CrudPerms;
  userSettings: { find: boolean; update: boolean };
  payload_mcp_tool: {
    getDashboardSummary: boolean;
    getMonthlyCategories: boolean;
    getMonthlyTags: boolean;
    getCurrentUser: boolean;
    getMonthlyPeople: boolean;
  };
  payload_mcp_resource: {
    currencies: boolean;
    currency: boolean;
    timezones: boolean;
    timezone: boolean;
  };
};

const FULL_PERMISSIONS: PermissionsState = {
  accounts: { find: true, create: true, update: true, delete: true },
  people: { find: true, create: true, update: true, delete: true },
  categories: { find: true, create: true, update: true, delete: true },
  tags: { find: true, create: true, update: true, delete: true },
  transactions: { find: true, create: true, update: true, delete: true },
  transactionLinks: { find: true, create: true, update: true, delete: true },
  reminders: { find: true, create: true, update: true, delete: true },
  userSettings: { find: true, update: true },
  payload_mcp_tool: {
    getDashboardSummary: true,
    getMonthlyCategories: true,
    getMonthlyTags: true,
    getCurrentUser: true,
    getMonthlyPeople: true,
  },
  payload_mcp_resource: {
    currencies: true,
    currency: true,
    timezones: true,
    timezone: true,
  },
};

const EMPTY_PERMISSIONS: PermissionsState = {
  accounts: { find: false, create: false, update: false, delete: false },
  people: { find: false, create: false, update: false, delete: false },
  categories: { find: false, create: false, update: false, delete: false },
  tags: { find: false, create: false, update: false, delete: false },
  transactions: { find: false, create: false, update: false, delete: false },
  transactionLinks: { find: false, create: false, update: false, delete: false },
  reminders: { find: false, create: false, update: false, delete: false },
  userSettings: { find: false, update: false },
  payload_mcp_tool: {
    getDashboardSummary: false,
    getMonthlyCategories: false,
    getMonthlyTags: false,
    getCurrentUser: false,
    getMonthlyPeople: false,
  },
  payload_mcp_resource: {
    currencies: false,
    currency: false,
    timezones: false,
    timezone: false,
  },
};

function keyToPermissions(key: McpApiKeyFieldsFragment): PermissionsState {
  return {
    accounts: {
      find: key.accounts?.find ?? false,
      create: key.accounts?.create ?? false,
      update: key.accounts?.update ?? false,
      delete: key.accounts?.delete ?? false,
    },
    people: {
      find: key.people?.find ?? false,
      create: key.people?.create ?? false,
      update: key.people?.update ?? false,
      delete: key.people?.delete ?? false,
    },
    categories: {
      find: key.categories?.find ?? false,
      create: key.categories?.create ?? false,
      update: key.categories?.update ?? false,
      delete: key.categories?.delete ?? false,
    },
    tags: {
      find: key.tags?.find ?? false,
      create: key.tags?.create ?? false,
      update: key.tags?.update ?? false,
      delete: key.tags?.delete ?? false,
    },
    transactions: {
      find: key.transactions?.find ?? false,
      create: key.transactions?.create ?? false,
      update: key.transactions?.update ?? false,
      delete: key.transactions?.delete ?? false,
    },
    transactionLinks: {
      find: key.transactionLinks?.find ?? false,
      create: key.transactionLinks?.create ?? false,
      update: key.transactionLinks?.update ?? false,
      delete: key.transactionLinks?.delete ?? false,
    },
    reminders: {
      find: key.reminders?.find ?? false,
      create: key.reminders?.create ?? false,
      update: key.reminders?.update ?? false,
      delete: key.reminders?.delete ?? false,
    },
    userSettings: {
      find: key.userSettings?.find ?? false,
      update: key.userSettings?.update ?? false,
    },
    payload_mcp_tool: {
      getDashboardSummary: key.payload_mcp_tool?.getDashboardSummary ?? false,
      getMonthlyCategories: key.payload_mcp_tool?.getMonthlyCategories ?? false,
      getMonthlyTags: key.payload_mcp_tool?.getMonthlyTags ?? false,
      getCurrentUser: key.payload_mcp_tool?.getCurrentUser ?? false,
      getMonthlyPeople: key.payload_mcp_tool?.getMonthlyPeople ?? false,
    },
    payload_mcp_resource: {
      currencies: key.payload_mcp_resource?.currencies ?? false,
      currency: key.payload_mcp_resource?.currency ?? false,
      timezones: key.payload_mcp_resource?.timezones ?? false,
      timezone: key.payload_mcp_resource?.timezone ?? false,
    },
  };
}

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ label, topPad }: { label: string; topPad?: boolean }) {
  return (
    <Text
      className="text-[11px] font-bold uppercase tracking-[0.8px] text-on-surface-variant px-1"
      style={{ marginTop: topPad ? 12 : 4, marginBottom: 4 }}
    >
      {label}
    </Text>
  );
}

// ── Permissions editor ────────────────────────────────────────────────────────

const CRUD_COLLECTIONS: { key: keyof PermissionsState; label: string; icon: string; color: string }[] = [
  { key: "transactions", label: "Transactions", icon: "receipt", color: "#10b981" },
  { key: "accounts", label: "Accounts", icon: "wallet", color: "#f59e0b" },
  { key: "categories", label: "Categories", icon: "folder", color: "#6366f1" },
  { key: "tags", label: "Tags", icon: "tag", color: "#3b82f6" },
  { key: "people", label: "People", icon: "users", color: "#ec4899" },
  { key: "transactionLinks", label: "Tx Links", icon: "link", color: "#8b5cf6" },
  { key: "reminders", label: "Reminders", icon: "bell", color: "#f97316" },
];

function PermissionsEditor({
  permissions,
  onChange,
}: {
  permissions: PermissionsState;
  onChange: (p: PermissionsState) => void;
}) {
  const C = useColors();

  const updateCrud = (
    key: keyof PermissionsState,
    field: keyof CrudPerms,
    val: boolean,
  ) => {
    onChange({
      ...permissions,
      [key]: { ...(permissions[key] as CrudPerms), [field]: val },
    });
  };

  const updateUserSettings = (field: "find" | "update", val: boolean) => {
    onChange({ ...permissions, userSettings: { ...permissions.userSettings, [field]: val } });
  };

  const updateTool = (field: keyof PermissionsState["payload_mcp_tool"], val: boolean) => {
    onChange({ ...permissions, payload_mcp_tool: { ...permissions.payload_mcp_tool, [field]: val } });
  };

  const updateResource = (field: keyof PermissionsState["payload_mcp_resource"], val: boolean) => {
    onChange({ ...permissions, payload_mcp_resource: { ...permissions.payload_mcp_resource, [field]: val } });
  };

  const selectAll = () => onChange(FULL_PERMISSIONS);
  const clearAll = () => onChange(EMPTY_PERMISSIONS);

  return (
    <View style={{ gap: 12 }}>
      {/* Select all / Clear all */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity
          onPress={selectAll}
          activeOpacity={0.7}
          style={{
            flex: 1,
            paddingVertical: 8,
            borderRadius: 10,
            alignItems: "center",
            backgroundColor: `${C.primary}18`,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "700", color: C.primary }}>
            Select All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={clearAll}
          activeOpacity={0.7}
          style={{
            flex: 1,
            paddingVertical: 8,
            borderRadius: 10,
            alignItems: "center",
            backgroundColor: C.surfaceHigh,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "700", color: C.onSurfaceVariant }}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Collections table header */}
      <View
        style={{
          borderRadius: 14,
          overflow: "hidden",
          backgroundColor: C.surfaceHigh,
        }}
      >
        {/* Header row */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: C.surfaceHighest,
          }}
        >
          <Text style={{ flex: 1, fontSize: 10, fontWeight: "700", color: C.onSurfaceVariant, textTransform: "uppercase" }}>
            Collection
          </Text>
          {(["find", "create", "update", "delete"] as const).map((op) => (
            <Text
              key={op}
              style={{ width: 46, fontSize: 10, fontWeight: "700", color: C.onSurfaceVariant, textAlign: "center", textTransform: "uppercase" }}
            >
              {op.charAt(0).toUpperCase()}
            </Text>
          ))}
        </View>

        {/* Collection rows */}
        {CRUD_COLLECTIONS.map((col, i) => {
          const perms = permissions[col.key] as CrudPerms;
          return (
            <View key={col.key}>
              {i > 0 && (
                <View style={{ height: 1, backgroundColor: `${C.outlineVariant}20`, marginHorizontal: 12 }} />
              )}
              <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 10 }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      backgroundColor: `${col.color}18`,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DynamicIcon name={col.icon} size={13} color={col.color} />
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: "600", color: C.onSurface }}>
                    {col.label}
                  </Text>
                </View>
                {(["find", "create", "update", "delete"] as const).map((op) => (
                  <View key={op} style={{ width: 46, alignItems: "center" }}>
                    <Switch
                      value={perms[op]}
                      onValueChange={(val) => updateCrud(col.key, op, val)}
                      trackColor={{ false: C.outlineVariant + "60", true: `${C.primary}80` }}
                      thumbColor={perms[op] ? C.primary : C.surfaceHighest}
                      style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                    />
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        {/* User Settings row (find + update only) */}
        <View style={{ height: 1, backgroundColor: `${C.outlineVariant}20`, marginHorizontal: 12 }} />
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 10 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{ width: 26, height: 26, borderRadius: 8, backgroundColor: "#64748b18", alignItems: "center", justifyContent: "center" }}>
              <DynamicIcon name="settings" size={13} color="#64748b" />
            </View>
            <Text style={{ fontSize: 12, fontWeight: "600", color: C.onSurface }}>Settings</Text>
          </View>
          <View style={{ width: 46, alignItems: "center" }}>
            <Switch
              value={permissions.userSettings.find}
              onValueChange={(val) => updateUserSettings("find", val)}
              trackColor={{ false: C.outlineVariant + "60", true: `${C.primary}80` }}
              thumbColor={permissions.userSettings.find ? C.primary : C.surfaceHighest}
              style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            />
          </View>
          <View style={{ width: 46 }} />
          <View style={{ width: 46, alignItems: "center" }}>
            <Switch
              value={permissions.userSettings.update}
              onValueChange={(val) => updateUserSettings("update", val)}
              trackColor={{ false: C.outlineVariant + "60", true: `${C.primary}80` }}
              thumbColor={permissions.userSettings.update ? C.primary : C.surfaceHighest}
              style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            />
          </View>
          <View style={{ width: 46 }} />
        </View>
      </View>

      {/* MCP Tools */}
      <View style={{ borderRadius: 14, overflow: "hidden", backgroundColor: C.surfaceHigh }}>
        <View style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: C.surfaceHighest }}>
          <Text style={{ fontSize: 10, fontWeight: "700", color: C.onSurfaceVariant, textTransform: "uppercase" }}>
            MCP Tools
          </Text>
        </View>
        {(
          [
            { key: "getDashboardSummary", label: "Dashboard Summary" },
            { key: "getMonthlyCategories", label: "Monthly Categories" },
            { key: "getMonthlyTags", label: "Monthly Tags" },
            { key: "getCurrentUser", label: "Current User" },
            { key: "getMonthlyPeople", label: "Monthly People" },
          ] as const
        ).map((tool, i) => (
          <View key={tool.key}>
            {i > 0 && <View style={{ height: 1, backgroundColor: `${C.outlineVariant}20`, marginHorizontal: 12 }} />}
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 11 }}>
              <Text style={{ flex: 1, fontSize: 12, fontWeight: "600", color: C.onSurface }}>{tool.label}</Text>
              <Switch
                value={permissions.payload_mcp_tool[tool.key]}
                onValueChange={(val) => updateTool(tool.key, val)}
                trackColor={{ false: C.outlineVariant + "60", true: `${C.primary}80` }}
                thumbColor={permissions.payload_mcp_tool[tool.key] ? C.primary : C.surfaceHighest}
                style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] }}
              />
            </View>
          </View>
        ))}
      </View>

      {/* MCP Resources */}
      <View style={{ borderRadius: 14, overflow: "hidden", backgroundColor: C.surfaceHigh }}>
        <View style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: C.surfaceHighest }}>
          <Text style={{ fontSize: 10, fontWeight: "700", color: C.onSurfaceVariant, textTransform: "uppercase" }}>
            MCP Resources
          </Text>
        </View>
        {(
          [
            { key: "currencies", label: "Currencies" },
            { key: "currency", label: "Currency by Code" },
            { key: "timezones", label: "Timezones" },
            { key: "timezone", label: "Timezone by ID" },
          ] as const
        ).map((res, i) => (
          <View key={res.key}>
            {i > 0 && <View style={{ height: 1, backgroundColor: `${C.outlineVariant}20`, marginHorizontal: 12 }} />}
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 11 }}>
              <Text style={{ flex: 1, fontSize: 12, fontWeight: "600", color: C.onSurface }}>{res.label}</Text>
              <Switch
                value={permissions.payload_mcp_resource[res.key]}
                onValueChange={(val) => updateResource(res.key, val)}
                trackColor={{ false: C.outlineVariant + "60", true: `${C.primary}80` }}
                thumbColor={permissions.payload_mcp_resource[res.key] ? C.primary : C.surfaceHighest}
                style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// ── Create/Edit key sheet ─────────────────────────────────────────────────────

interface KeyFormSheetProps {
  visible: boolean;
  userId: string;
  editKey?: McpApiKeyFieldsFragment | null;
  onClose: () => void;
  onCreated?: (apiKey: string) => void;
}

function KeyFormSheet({ visible, userId, editKey, onClose, onCreated }: KeyFormSheetProps) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const { createKey, loading: creating } = useCreateMcpApiKey();
  const { updateKey, loading: updating } = useUpdateMcpApiKey();

  const isEdit = !!editKey;
  const saving = creating || updating;

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<PermissionsState>(FULL_PERMISSIONS);

  useEffect(() => {
    if (!visible) return;
    if (editKey) {
      setLabel(editKey.label ?? "");
      setDescription(editKey.description ?? "");
      setPermissions(keyToPermissions(editKey));
    } else {
      setLabel("");
      setDescription("");
      setPermissions(FULL_PERMISSIONS);
    }
  }, [visible, editKey?.id]);

  const handleSave = async () => {
    if (saving) return;
    const data = {
      label: label.trim() || undefined,
      description: description.trim() || undefined,
      user: isEdit ? undefined : userId,
      accounts: permissions.accounts,
      people: permissions.people,
      categories: permissions.categories,
      tags: permissions.tags,
      transactions: permissions.transactions,
      transactionLinks: permissions.transactionLinks,
      reminders: permissions.reminders,
      userSettings: permissions.userSettings,
      payload_mcp_tool: permissions.payload_mcp_tool,
      payload_mcp_resource: permissions.payload_mcp_resource,
    };

    try {
      if (isEdit && editKey) {
        await updateKey(editKey.id, data);
        onClose();
      } else {
        const result = await createKey({ ...data, user: userId });
        const newApiKey = (result.data as any)?.createPayloadMcpApiKey?.apiKey;
        onClose();
        if (newApiKey && onCreated) {
          onCreated(newApiKey);
        }
      }
    } catch (err: any) {
      showAlert({
        title: "Error",
        message:
          err?.graphQLErrors?.[0]?.message ??
          err?.message ??
          "Could not save API key.",
      });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: C.surface }}>
        {/* Handle */}
        <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}>
          <View style={{ width: 40, height: 4, borderRadius: 99, backgroundColor: C.outlineVariant }} />
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
          <Text style={{ flex: 1, fontSize: 20, fontWeight: "900", color: C.onSurface, letterSpacing: -0.5 }}>
            {isEdit ? "Edit API Key" : "New API Key"}
          </Text>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={{ padding: 4 }}>
            <DynamicIcon name="x" size={22} color={C.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: Math.max(insets.bottom, 16) + 80,
            gap: 16,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Label */}
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.7, color: C.onSurfaceVariant, paddingHorizontal: 4 }}>
              Label
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                borderRadius: 14,
                backgroundColor: C.surfaceMid,
                height: 48,
              }}
            >
              <TextInput
                value={label}
                onChangeText={setLabel}
                placeholder="e.g. Claude Desktop"
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1, fontSize: 15, color: C.onSurface }}
                placeholderTextColor={C.onSurfaceVariant + "80"}
              />
            </View>
          </View>

          {/* Description */}
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.7, color: C.onSurfaceVariant, paddingHorizontal: 4 }}>
              Description
            </Text>
            <View
              style={{
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderRadius: 14,
                backgroundColor: C.surfaceMid,
                minHeight: 80,
              }}
            >
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Optional description..."
                multiline
                autoCapitalize="none"
                autoCorrect={false}
                style={{ fontSize: 15, color: C.onSurface, minHeight: 56 }}
                placeholderTextColor={C.onSurfaceVariant + "80"}
              />
            </View>
          </View>

          {/* Permissions */}
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.7, color: C.onSurfaceVariant, paddingHorizontal: 4 }}>
              Permissions
            </Text>
            <PermissionsEditor permissions={permissions} onChange={setPermissions} />
          </View>
        </ScrollView>

        {/* Save button */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 16,
            paddingBottom: Math.max(insets.bottom, 16) + 4,
            paddingTop: 12,
            backgroundColor: C.surface,
          }}
        >
          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            activeOpacity={0.85}
            style={{
              backgroundColor: C.primary,
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 8,
            }}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <DynamicIcon name={isEdit ? "check" : "plus"} size={16} color="#fff" />
                <Text style={{ fontSize: 15, fontWeight: "700", color: "#fff" }}>
                  {isEdit ? "Save Changes" : "Create API Key"}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── API key reveal sheet ──────────────────────────────────────────────────────

function ApiKeyRevealSheet({
  visible,
  apiKey,
  onClose,
}: {
  visible: boolean;
  apiKey: string;
  onClose: () => void;
}) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const Clipboard = await import("expo-clipboard");
      await Clipboard.setStringAsync(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showAlert({ title: "Copy failed", message: "Could not copy to clipboard." });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: C.surface }}>
        {/* Handle */}
        <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}>
          <View style={{ width: 40, height: 4, borderRadius: 99, backgroundColor: C.outlineVariant }} />
        </View>

        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: "900", color: C.onSurface, letterSpacing: -0.5 }}>
            API Key Created
          </Text>
          <Text style={{ fontSize: 13, color: C.onSurfaceVariant, marginTop: 4 }}>
            Copy and save this key — it won't be shown again.
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 12, gap: 12 }}>
          {/* Warning banner */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#f59e0b18",
              borderRadius: 14,
              padding: 14,
            }}
          >
            <DynamicIcon name="triangle-alert" size={18} color="#f59e0b" />
            <Text style={{ flex: 1, fontSize: 13, color: "#f59e0b", fontWeight: "600" }}>
              This is the only time your key will be visible.
            </Text>
          </View>

          {/* Key display */}
          <View
            style={{
              backgroundColor: C.surfaceMid,
              borderRadius: 14,
              padding: 16,
              gap: 10,
            }}
          >
            <Text
              selectable
              style={{
                fontSize: 13,
                fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
                color: C.onSurface,
                letterSpacing: 0.5,
              }}
            >
              {apiKey}
            </Text>
            <TouchableOpacity
              onPress={handleCopy}
              activeOpacity={0.75}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: copied ? "#10b98120" : `${C.primary}18`,
              }}
            >
              <DynamicIcon
                name={copied ? "check" : "copy"}
                size={14}
                color={copied ? "#10b981" : C.primary}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: copied ? "#10b981" : C.primary,
                }}
              >
                {copied ? "Copied!" : "Copy to clipboard"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Done button */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 16,
            paddingBottom: Math.max(insets.bottom, 16) + 4,
            paddingTop: 12,
            backgroundColor: C.surface,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.85}
            style={{
              backgroundColor: C.primary,
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#fff" }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── MCP key card ──────────────────────────────────────────────────────────────

function McpKeyCard({
  apiKey,
  onEdit,
}: {
  apiKey: McpApiKeyFieldsFragment;
  onEdit: () => void;
}) {
  const C = useColors();
  const { updateKey, loading: toggling } = useUpdateMcpApiKey();
  const { deleteKey } = useDeleteMcpApiKey();
  const [expanded, setExpanded] = useState(false);

  const isEnabled = apiKey.enableAPIKey ?? false;

  const handleToggle = async (val: boolean) => {
    try {
      await updateKey(apiKey.id, { enableAPIKey: val });
    } catch (err: any) {
      showAlert({
        title: "Error",
        message: err?.graphQLErrors?.[0]?.message ?? err?.message ?? "Could not update key.",
      });
    }
  };

  const handleDelete = () => {
    showAlert({
      title: "Delete API Key",
      message: `Delete "${apiKey.label || "this key"}"? This cannot be undone.`,
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteKey(apiKey.id);
            } catch (err: any) {
              showAlert({
                title: "Error",
                message: err?.graphQLErrors?.[0]?.message ?? err?.message ?? "Could not delete key.",
              });
            }
          },
        },
      ],
    });
  };

  // Summarize enabled permissions
  const enabledCollections = [
    apiKey.accounts?.find && "Accounts",
    apiKey.transactions?.find && "Transactions",
    apiKey.people?.find && "People",
    apiKey.categories?.find && "Categories",
    apiKey.tags?.find && "Tags",
    apiKey.reminders?.find && "Reminders",
    apiKey.transactionLinks?.find && "Tx Links",
  ].filter(Boolean) as string[];

  return (
    <View
      style={{
        backgroundColor: C.surfaceMid,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Top row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 14,
          gap: 12,
        }}
      >
        {/* Status indicator + icon */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: isEnabled ? `${C.primary}18` : C.surfaceHigh,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DynamicIcon
            name="key"
            size={18}
            color={isEnabled ? C.primary : C.onSurfaceVariant}
          />
        </View>

        {/* Label + description */}
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            style={{ fontSize: 14, fontWeight: "700", color: C.onSurface }}
            numberOfLines={1}
          >
            {apiKey.label || "Unnamed Key"}
          </Text>
          {apiKey.description ? (
            <Text
              style={{ fontSize: 11, color: C.onSurfaceVariant, marginTop: 1 }}
              numberOfLines={1}
            >
              {apiKey.description}
            </Text>
          ) : (
            <Text style={{ fontSize: 11, color: C.onSurfaceVariant + "80", marginTop: 1 }}>
              {new Date(apiKey.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          )}
        </View>

        {/* Enable toggle */}
        {toggling ? (
          <ActivityIndicator size="small" color={C.primary} />
        ) : (
          <Switch
            value={isEnabled}
            onValueChange={handleToggle}
            trackColor={{ false: C.outlineVariant + "60", true: `${C.primary}80` }}
            thumbColor={isEnabled ? C.primary : C.surfaceHighest}
          />
        )}
      </View>

      {/* Permission pills summary */}
      {enabledCollections.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 5,
            paddingHorizontal: 16,
            paddingBottom: 10,
          }}
        >
          {enabledCollections.map((name) => (
            <View
              key={name}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 6,
                backgroundColor: `${C.primary}12`,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: "600", color: C.primary }}>
                {name}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Divider */}
      <View style={{ height: 1, backgroundColor: `${C.outlineVariant}20`, marginHorizontal: 16 }} />

      {/* Actions row */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => setExpanded((v) => !v)}
          activeOpacity={0.7}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            paddingVertical: 12,
          }}
        >
          <DynamicIcon
            name={expanded ? "chevron-up" : "shield"}
            size={13}
            color={C.onSurfaceVariant}
          />
          <Text style={{ fontSize: 12, fontWeight: "600", color: C.onSurfaceVariant }}>
            {expanded ? "Hide" : "Permissions"}
          </Text>
        </TouchableOpacity>

        <View style={{ width: 1, backgroundColor: `${C.outlineVariant}20` }} />

        <TouchableOpacity
          onPress={onEdit}
          activeOpacity={0.7}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            paddingVertical: 12,
          }}
        >
          <DynamicIcon name="pencil" size={13} color={C.onSurfaceVariant} />
          <Text style={{ fontSize: 12, fontWeight: "600", color: C.onSurfaceVariant }}>
            Edit
          </Text>
        </TouchableOpacity>

        <View style={{ width: 1, backgroundColor: `${C.outlineVariant}20` }} />

        <TouchableOpacity
          onPress={handleDelete}
          activeOpacity={0.7}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            paddingVertical: 12,
          }}
        >
          <DynamicIcon name="trash-2" size={13} color="#ef4444" />
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#ef4444" }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>

      {/* Expanded permissions view */}
      {expanded && (
        <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: `${C.outlineVariant}20` }}>
          <PermissionsEditor
            permissions={keyToPermissions(apiKey)}
            onChange={() => {}}
          />
        </View>
      )}
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function AiSettingsScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { user } = useAuth();
  const { data: userSettings, loading: settingsLoading } = useGetUserSettings(user?.id);
  const { updateUserSettings } = useUpdateUserSettings();
  const { keys, loading: keysLoading } = useGetMcpApiKeys(user?.id);

  // Gemini key state
  const [geminiKey, setGeminiKey] = useState("");
  const [savingGemini, setSavingGemini] = useState(false);

  // Modals
  const [showCreate, setShowCreate] = useState(false);
  const [editKey, setEditKey] = useState<McpApiKeyFieldsFragment | null>(null);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  useEffect(() => {
    if (userSettings) {
      setGeminiKey(userSettings.geminiApiKey ?? "");
    }
  }, [userSettings?.id, userSettings?.geminiApiKey]);

  const savedGemini = userSettings?.geminiApiKey ?? "";
  const geminiChanged = geminiKey !== savedGemini;

  const handleSaveGemini = async () => {
    if (!userSettings?.id || savingGemini) return;
    setSavingGemini(true);
    try {
      await updateUserSettings({ id: userSettings.id, data: { geminiApiKey: geminiKey } });
    } catch (err: any) {
      showAlert({
        title: "Error",
        message: err?.graphQLErrors?.[0]?.message ?? err?.message ?? "Failed to save.",
      });
    } finally {
      setSavingGemini(false);
    }
  };

  const loading = settingsLoading && !userSettings;

  return (
    <View style={{ flex: 1, backgroundColor: C.surface }}>
      {/* Header */}
      <View style={{ paddingTop: topPad, paddingHorizontal: 20, paddingBottom: 12, backgroundColor: C.surface }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={{
              width: 36,
              height: 36,
              borderRadius: 99,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: C.surfaceMid,
            }}
          >
            <DynamicIcon name="chevron-left" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text style={{ flex: 1, fontSize: 20, fontWeight: "900", letterSpacing: -0.5, color: C.onSurface }}>
            AI Settings
          </Text>
        </View>
      </View>

      {loading ? (
        /* Skeleton */
        <View style={{ paddingHorizontal: 16, gap: 8 }}>
          <View style={{ height: 8 }} />
          <Skeleton height={11} width="25%" radius={6} />
          <View style={{ height: 2 }} />
          <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, padding: 16, gap: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Skeleton width={36} height={36} radius={10} />
              <View style={{ flex: 1, gap: 6 }}>
                <Skeleton width="40%" height={13} />
                <Skeleton width="60%" height={11} />
              </View>
            </View>
            <Skeleton height={46} radius={12} />
          </View>
          <View style={{ height: 12 }} />
          <Skeleton height={11} width="30%" radius={6} />
          <View style={{ height: 2 }} />
          <Skeleton height={80} radius={16} />
          <Skeleton height={80} radius={16} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: Math.max(insets.bottom, 16) + 24,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Gemini API Key ──────────────────────────────────────────────── */}
          <SectionLabel label="Gemini API Key" />
          <View style={{ borderRadius: 16, backgroundColor: C.surfaceMid, padding: 16, gap: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: "#8b5cf620",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DynamicIcon name="sparkles" size={17} color="#8b5cf6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: C.onSurface }}>
                  Gemini API Key
                </Text>
                <Text style={{ fontSize: 12, color: C.onSurfaceVariant }}>
                  Powers AI transaction parsing
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingHorizontal: 12,
                borderRadius: 12,
                backgroundColor: C.surfaceHigh,
                height: 46,
              }}
            >
              <TextInput
                value={geminiKey}
                onChangeText={setGeminiKey}
                placeholder="AIzaSy..."
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                style={{ flex: 1, fontSize: 14, color: C.onSurface }}
                placeholderTextColor={C.onSurfaceVariant + "80"}
              />
              {geminiChanged && (
                <TouchableOpacity
                  onPress={handleSaveGemini}
                  disabled={savingGemini}
                  activeOpacity={0.75}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 8,
                    backgroundColor: C.primary,
                  }}
                >
                  {savingGemini ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <DynamicIcon name="check" size={13} color="#fff" />
                      <Text style={{ fontSize: 12, fontWeight: "700", color: "#fff" }}>Save</Text>
                    </>
                  )}
                </TouchableOpacity>
              )}
            </View>

            <Text style={{ fontSize: 11, color: C.onSurfaceVariant, opacity: 0.7, paddingHorizontal: 2 }}>
              Stored securely on your account
            </Text>
          </View>

          {/* ── MCP API Keys ────────────────────────────────────────────────── */}
          <SectionLabel label="MCP API Keys" topPad />

          {/* Info banner */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 10,
              backgroundColor: `${C.primary}10`,
              borderRadius: 14,
              padding: 13,
              marginBottom: 10,
            }}
          >
            <DynamicIcon name="info" size={15} color={C.primary} style={{ marginTop: 1 }} />
            <Text style={{ flex: 1, fontSize: 12, color: C.primary, lineHeight: 18 }}>
              MCP API keys let AI assistants like Claude access your Pika data through the Model Context Protocol.
            </Text>
          </View>

          {/* Keys list */}
          {keysLoading && !keys ? (
            <View style={{ gap: 10 }}>
              <Skeleton height={90} radius={16} />
              <Skeleton height={90} radius={16} />
            </View>
          ) : keys && keys.length > 0 ? (
            <View style={{ gap: 10 }}>
              {keys.map((k) => (
                <McpKeyCard
                  key={k.id}
                  apiKey={k}
                  onEdit={() => setEditKey(k)}
                />
              ))}
            </View>
          ) : (
            <View
              style={{
                borderRadius: 16,
                backgroundColor: C.surfaceMid,
                padding: 20,
                alignItems: "center",
                gap: 6,
              }}
            >
              <DynamicIcon name="key" size={28} color={C.outlineVariant} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: C.onSurfaceVariant }}>
                No API keys yet
              </Text>
              <Text style={{ fontSize: 12, color: C.onSurfaceVariant, opacity: 0.7, textAlign: "center" }}>
                Create a key to connect an AI assistant to your Pika account.
              </Text>
            </View>
          )}

          {/* Add key button */}
          <TouchableOpacity
            onPress={() => setShowCreate(true)}
            activeOpacity={0.75}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingVertical: 14,
              borderRadius: 16,
              marginTop: 10,
              backgroundColor: `${C.primary}15`,
              borderWidth: 1.5,
              borderColor: `${C.primary}30`,
              borderStyle: "dashed",
            }}
          >
            <DynamicIcon name="plus" size={16} color={C.primary} />
            <Text style={{ fontSize: 14, fontWeight: "700", color: C.primary }}>
              Create API Key
            </Text>
          </TouchableOpacity>

          {/* MCP Setup Guide link */}
          <TouchableOpacity
            onPress={() => Linking.openURL(`${API_URL}/mcp-setup`)}
            activeOpacity={0.75}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingVertical: 13,
              paddingHorizontal: 14,
              borderRadius: 14,
              marginTop: 8,
              backgroundColor: C.surfaceHigh,
            }}
          >
            <DynamicIcon name="book-open" size={15} color={C.onSurfaceVariant} />
            <Text style={{ flex: 1, fontSize: 13, fontWeight: "600", color: C.onSurface }}>
              MCP Setup Guide
            </Text>
            <DynamicIcon name="external-link" size={13} color={C.onSurfaceVariant} />
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Create key sheet */}
      <KeyFormSheet
        visible={showCreate}
        userId={user?.id ?? ""}
        onClose={() => setShowCreate(false)}
        onCreated={(key) => setRevealedKey(key)}
      />

      {/* Edit key sheet */}
      <KeyFormSheet
        visible={!!editKey}
        userId={user?.id ?? ""}
        editKey={editKey}
        onClose={() => setEditKey(null)}
      />

      {/* Reveal new key sheet */}
      <ApiKeyRevealSheet
        visible={!!revealedKey}
        apiKey={revealedKey ?? ""}
        onClose={() => setRevealedKey(null)}
      />
    </View>
  );
}
