import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API_URL } from "@/lib/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";
import { PikaLogo } from "@/components/PikaLogo";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/theme/colors";

function GoogleLogo() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export default function SignInScreen() {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const { login, loginWithGoogle, isAuthenticated } = useAuth();

  // Safety net: if auth state becomes true while on this screen (set by
  // auth.tsx deep-link handler or a concurrent loginWithGoogle call), navigate.
  useEffect(() => {
    if (isAuthenticated) router.replace("/(tabs)");
  }, [isAuthenticated]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setError(null);
    setGoogleLoading(true);
    try {
      const ok = await loginWithGoogle();
      if (ok) router.replace("/(tabs)");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Google sign-in failed.");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleSignIn() {
    if (!email.trim() || !password) return;
    setError(null);
    setIsLoading(true);
    try {
      await login(email.trim(), password);
      router.replace("/(tabs)");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign in failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={[s.root, { backgroundColor: C.surface }]}>
      <StatusBar style="light" />

      {/* Ambient glow orbs */}
      <View style={[s.orbTopLeft, { backgroundColor: C.primaryBright }]} />
      <View style={[s.orbBotRight, { backgroundColor: C.secondary }]} />

      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={[
            s.scroll,
            {
              paddingTop: (insets.top || 44) + 24,
              paddingBottom: (insets.bottom || 24) + 24,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── CARD ─────────────────────────────────────────────────────── */}
          <View style={[s.card, { backgroundColor: C.surfaceLow }]}>
            {/* Logo */}
            <View style={s.logoSection}>
              <View style={[s.logoWrap, { backgroundColor: C.surfaceMid }]}>
                <PikaLogo size={64} />
              </View>
              <View style={s.logoLabel}>
                <Text style={[s.pikaWord, { color: C.primaryBright }]}>
                  Pika
                </Text>
              </View>
              <Text style={[s.title, { color: C.onSurface }]}>
                Welcome Back
              </Text>
              <Text style={[s.subtitle, { color: C.onSurfaceVariant }]}>
                Sign in to manage your finances
              </Text>
            </View>

            {/* Google sign-in */}
            <TouchableOpacity
              style={s.googleBtn}
              activeOpacity={0.85}
              onPress={handleGoogleSignIn}
              disabled={googleLoading || isLoading}
            >
              {googleLoading ? (
                <ActivityIndicator color="#1a1a2e" size="small" />
              ) : (
                <GoogleLogo />
              )}
              <Text style={s.googleText}>Sign in with Google</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={s.dividerRow}>
              <View
                style={[s.dividerLine, { backgroundColor: C.outlineVariant }]}
              />
              <Text style={[s.dividerText, { color: C.onSurfaceVariant }]}>
                or
              </Text>
              <View
                style={[s.dividerLine, { backgroundColor: C.outlineVariant }]}
              />
            </View>

            {/* Email */}
            <View style={s.fieldGroup}>
              <Text style={[s.label, { color: C.onSurface }]}>
                Email Address
              </Text>
              <View
                style={[
                  s.inputWrap,
                  { backgroundColor: C.surface },
                  emailFocused && {
                    borderColor: C.primaryBright,
                    borderWidth: 1.5,
                  },
                ]}
              >
                <TextInput
                  style={[s.input, { color: C.onSurface }]}
                  placeholder="name@example.com"
                  placeholderTextColor={`${C.onSurfaceVariant}66`}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password */}
            <View style={s.fieldGroup}>
              <View style={s.labelRow}>
                <Text style={[s.label, { color: C.onSurface }]}>Password</Text>
                <TouchableOpacity activeOpacity={0.75}>
                  <Text style={[s.forgot, { color: C.primaryBright }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  s.inputWrap,
                  { backgroundColor: C.surface },
                  passwordFocused && {
                    borderColor: C.primaryBright,
                    borderWidth: 1.5,
                  },
                ]}
              >
                <TextInput
                  style={[s.input, { color: C.onSurface }]}
                  placeholder="••••••••"
                  placeholderTextColor={`${C.onSurfaceVariant}66`}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Error message */}
            {error && (
              <Text style={[s.errorText, { color: C.tertiaryContainer }]}>
                {error}
              </Text>
            )}

            {/* Sign In button */}
            <TouchableOpacity
              activeOpacity={0.88}
              disabled={isLoading}
              onPress={handleSignIn}
            >
              <LinearGradient
                colors={[C.primary, C.primaryBright]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[s.signInBtn, isLoading && { opacity: 0.7 }]}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={s.signInText}>Sign In</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Footer note */}
            <Text style={[s.footerNote, { color: C.onSurfaceVariant }]}>
              New to Pika?{" "}
              <Text style={{ color: C.onSurface, fontWeight: "600" }}>
                Sign up with Google above
              </Text>
            </Text>
          </View>

          {/* Footer links */}
          <View style={s.footerLinks}>
            {(
              [
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Terms of Service", path: "/terms" },
              ] as const
            ).map(({ label, path }) => (
              <TouchableOpacity
                key={label}
                activeOpacity={0.7}
                onPress={() => Linking.openURL(`${API_URL}${path}`)}
              >
                <Text style={[s.footerLink, { color: C.onSurfaceVariant }]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },

  // Glow orbs
  orbTopLeft: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.06,
  },
  orbBotRight: {
    position: "absolute",
    bottom: -80,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.05,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  // Card
  card: {
    borderRadius: 32,
    padding: 32,
    gap: 20,
  },

  // Logo section
  logoSection: { alignItems: "center", gap: 8, marginBottom: 4 },
  logoWrap: {
    width: 96,
    height: 96,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  logoLabel: { flexDirection: "row", alignItems: "center", gap: 6 },
  pikaWord: { fontSize: 28, fontWeight: "900", letterSpacing: -1 },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: -0.5, marginTop: 2 },
  subtitle: { fontSize: 14, fontWeight: "500", textAlign: "center" },

  // Google button
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  googleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a2e",
    letterSpacing: -0.2,
  },

  // Divider
  dividerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  dividerLine: { flex: 1, height: 1, opacity: 0.2 },
  dividerText: { fontSize: 13, fontWeight: "600" },

  // Form
  fieldGroup: { gap: 6 },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: { fontSize: 13, fontWeight: "600", marginLeft: 2 },
  forgot: { fontSize: 12, fontWeight: "700" },
  inputWrap: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "transparent",
    overflow: "hidden",
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    fontWeight: "500",
  },

  // Sign In button
  signInBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  signInText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.3,
  },

  // Footer
  footerNote: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 4,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 24,
  },
  errorText: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  footerLink: {
    fontSize: 12,
    fontWeight: "600",
  },
});
