import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
} from "react-native";
import { showAlert } from "@/components/ui/AlertDialog";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "@/components/Icon";
import { UserAvatar } from "@/components/UserAvatar";
import { uploadMedia } from "@/lib/media-upload";
import { useCreatePerson } from "@/services/gql/people/people.service";
import { type mutationPersonInput } from "@/services/gql/types/graphql";
import { useColors } from "@/theme/colors";

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

export default function AddPersonScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const topPad = insets.top || (Platform.OS === "ios" ? 44 : 24);

  const { createPerson } = useCreatePerson();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handlePickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });
    if (result.canceled || !result.assets?.[0]) return;
    setAvatarUri(result.assets[0].uri);
  };

  const handleSave = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setSaving(true);
    try {
      let avatarId: string | null = null;
      if (avatarUri) {
        setUploading(true);
        const asset = avatarUri;
        const ext = asset.split(".").pop() ?? "jpg";
        const uploaded = await uploadMedia(
          asset,
          `person-${Date.now()}.${ext}`,
          "image/jpeg",
          trimmedName,
        );
        avatarId = uploaded.id;
        setUploading(false);
      }
      const personData: mutationPersonInput = {
        name: trimmedName,
        email: email.trim() || null,
        phone: phone.trim() || null,
        description: description.trim() || null,
        avatar: avatarId,
      };
      await createPerson({ data: personData });
      router.back();
    } catch (err: any) {
      setUploading(false);
      showAlert({
        title: "Error",
        message: err?.message ?? "Could not save person.",
      });
    } finally {
      setSaving(false);
    }
  };

  const isBusy = saving || uploading;
  const canSave = !!name.trim() && !isBusy;

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
            <DynamicIcon name="x" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text className="flex-1 text-[20px] font-black tracking-[-0.5px] text-on-surface">
            Add Person
          </Text>
          <TouchableOpacity
            onPress={handleSave}
            disabled={!canSave}
            activeOpacity={0.75}
            className="px-4 py-2 rounded-xl"
            style={{ backgroundColor: C.primary, opacity: canSave ? 1 : 0.4 }}
          >
            {isBusy ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-[14px] font-bold text-white">Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: Math.max(insets.bottom, 16) + 24,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar */}
        <View
          className="rounded-2xl items-center py-8"
          style={{ backgroundColor: C.surfaceMid }}
        >
          <View>
            <UserAvatar
              id={name || "new"}
              name={name || "?"}
              avatarUrl={avatarUri}
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
            {avatarUri && !uploading && (
              <TouchableOpacity
                onPress={() => setAvatarUri(null)}
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
      </ScrollView>
    </View>
  );
}
