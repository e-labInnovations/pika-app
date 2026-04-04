import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../../../../components/Icon";
import { Skeleton } from "../../../../components/ui/Skeleton";
import { UserAvatar } from "../../../../components/UserAvatar";
import { uploadMedia } from "../../../../lib/media-upload";
import {
  useGetPerson,
  useUpdatePerson,
  useDeletePerson,
} from "../../../../services/gql/people/people.service";
import { type mutationPersonUpdateInput } from "../../../../services/gql/types/graphql";
import { useColors } from "../../../../theme/colors";

function EditPersonSkeleton({ insets }: { insets: { bottom: number } }) {
  const C = useColors();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: Math.max(insets.bottom, 16) + 24,
        gap: 12,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Avatar skeleton */}
      <View className="rounded-2xl items-center py-8" style={{ backgroundColor: C.surfaceMid }}>
        <Skeleton width={88} height={88} radius={44} />
      </View>
      {/* Fields skeleton */}
      <View className="rounded-2xl p-4 gap-4" style={{ backgroundColor: C.surfaceMid }}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} className="gap-1.5">
            <Skeleton width="25%" height={10} />
            <Skeleton width="100%" height={44} radius={12} />
          </View>
        ))}
      </View>
      {/* Delete button skeleton */}
      <Skeleton width="100%" height={52} radius={16} />
    </ScrollView>
  );
}

function FormField({
  label,
  required,
  style,
  ...props
}: {
  label: string;
  required?: boolean;
  style?: StyleProp<TextStyle>;
} & Omit<React.ComponentProps<typeof TextInput>, "style">) {
  const C = useColors();
  return (
    <View className="gap-1.5">
      <Text className="text-[12px] font-semibold uppercase tracking-[0.5px] text-on-surface-variant">
        {label}
        {required && <Text className="text-tertiary"> *</Text>}
      </Text>
      <TextInput
        className="text-[14px] text-on-surface px-4 py-3 rounded-xl"
        style={[{ backgroundColor: C.surfaceHigh }, style as any]}
        placeholderTextColor={C.outlineVariant}
        {...props}
      />
    </View>
  );
}

export default function EditPersonScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: person, loading: loadingPerson } = useGetPerson(id);
  const { updatePerson } = useUpdatePerson();
  const { deletePerson } = useDeletePerson();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (person) {
      setName(person.name ?? "");
      setEmail(person.email ?? "");
      setPhone(person.phone ?? "");
      setDescription(person.description ?? "");
      setCurrentAvatarUrl(person.avatar?.url ?? null);
    }
  }, [person]);

  const handlePickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });
    if (result.canceled || !result.assets?.[0]) return;
    setAvatarUri(result.assets[0].uri);
    setAvatarRemoved(false);
  };

  const handleRemoveAvatar = () => {
    setAvatarUri(null);
    setAvatarRemoved(true);
  };

  const handleSave = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setSaving(true);
    try {
      const data: mutationPersonUpdateInput = {
        name: trimmedName,
        email: email.trim() || null,
        phone: phone.trim() || null,
        description: description.trim() || null,
      };

      if (avatarUri) {
        setUploading(true);
        const ext = avatarUri.split(".").pop() ?? "jpg";
        const uploaded = await uploadMedia(
          avatarUri,
          `person-${Date.now()}.${ext}`,
          "image/jpeg",
          trimmedName,
        );
        data.avatar = uploaded.id;
        setUploading(false);
      } else if (avatarRemoved) {
        data.avatar = null;
      }

      await updatePerson({ id, data });
      router.back();
    } catch (err: any) {
      setUploading(false);
      Alert.alert("Error", err?.message ?? "Could not update person.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Person",
      `Are you sure you want to delete "${name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              await deletePerson(id);
              router.replace("/people");
            } catch (err: any) {
              Alert.alert("Error", err?.message ?? "Could not delete person.");
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  const isBusy = saving || uploading || deleting;
  const displayAvatarUrl = avatarUri ?? (avatarRemoved ? null : currentAvatarUrl);
  const hasAvatar = !!(avatarUri ?? (!avatarRemoved && currentAvatarUrl));

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
          <Text className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface">
            Edit Person
          </Text>
          <TouchableOpacity
            onPress={handleSave}
            disabled={!name.trim() || isBusy}
            activeOpacity={0.75}
            className="px-4 py-2 rounded-xl"
            style={{
              backgroundColor: C.primary,
              opacity: !name.trim() || isBusy ? 0.4 : 1,
            }}
          >
            {saving || uploading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-[14px] font-bold text-white">Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {loadingPerson && !person ? (
        <EditPersonSkeleton insets={insets} />
      ) : null}

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: Math.max(insets.bottom, 16) + 24,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={loadingPerson && !person ? { display: "none" } : undefined}
      >
        {/* Avatar */}
        <View
          className="rounded-2xl items-center py-8"
          style={{ backgroundColor: C.surfaceMid }}
        >
          <View>
            <UserAvatar
              id={id}
              name={name || "?"}
              avatarUrl={displayAvatarUrl}
              size={88}
            />
            {uploading && (
              <View
                className="absolute inset-0 rounded-full items-center justify-center"
                style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
              >
                <ActivityIndicator color="#fff" size="small" />
              </View>
            )}
            {!uploading && (
              <TouchableOpacity
                onPress={handlePickAvatar}
                activeOpacity={0.8}
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full items-center justify-center"
                style={{ backgroundColor: C.primary }}
              >
                <DynamicIcon name="camera" size={14} color="#fff" />
              </TouchableOpacity>
            )}
            {hasAvatar && !uploading && (
              <TouchableOpacity
                onPress={handleRemoveAvatar}
                activeOpacity={0.8}
                className="absolute top-0 right-0 w-6 h-6 rounded-full items-center justify-center"
                style={{ backgroundColor: C.tertiary }}
              >
                <DynamicIcon name="x" size={12} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Fields */}
        <View
          className="rounded-2xl p-4 gap-4"
          style={{ backgroundColor: C.surfaceMid }}
        >
          <FormField
            label="Name"
            required
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            autoCapitalize="words"
            returnKeyType="next"
          />
          <FormField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <FormField
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone number"
            keyboardType="phone-pad"
            returnKeyType="next"
          />
          <FormField
            label="Note"
            value={description}
            onChangeText={setDescription}
            placeholder="How you know them, relationship, etc."
            multiline
            style={{ height: 88, textAlignVertical: "top" } as any}
          />
        </View>

        {/* Delete */}
        <TouchableOpacity
          onPress={handleDelete}
          disabled={isBusy}
          activeOpacity={0.75}
          className="flex-row items-center justify-center gap-2 p-4 rounded-2xl bg-surface-mid"
        >
          {deleting ? (
            <ActivityIndicator size="small" color={C.tertiary} />
          ) : (
            <>
              <DynamicIcon name="trash-2" size={17} color={C.tertiary} />
              <Text className="text-[14px] font-semibold text-tertiary">
                Delete Person
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
