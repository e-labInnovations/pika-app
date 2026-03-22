# Pika App — Claude Guidelines

## Project Stack

- **Expo Router** + **React Native 0.81.5**
- **Uniwind** — Tailwind v4 for React Native (Metro plugin transforms `className` at build time)
- **Design system**: Obsidian Luminescence (`src/global.css`, `src/theme/colors.ts`)

---

## Styling Rules

### 1. Always use `className` — never `StyleSheet.create`

Use Tailwind utility classes via `className` on all React Native components. Do **not** create `StyleSheet.create({})` objects.

```tsx
// CORRECT
<View className="flex-row items-center gap-3 rounded-2xl p-5 bg-surface-low">
  <Text className="text-sm font-bold text-on-surface">Hello</Text>
</View>

// WRONG — do not use StyleSheet
const s = StyleSheet.create({ container: { flexDirection: "row" } });
<View style={s.container} />
```

### 2. Import components from `react-native` — NOT from `'uniwind'`

Uniwind augments the existing RN types; it does not re-export components.

```tsx
// CORRECT
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

// WRONG
import { View, Text } from "uniwind";
```

### 3. Use `style` prop only for values that cannot be expressed as static className

Keep `style` for:

| Situation | Example |
|---|---|
| Dynamic hex + alpha string | `style={{ backgroundColor: \`${C.primaryBright}1a\` }}` |
| Computed flex ratio | `style={{ flex: bar.pct }}` |
| Absolute positioning with numeric coords | `style={{ width: 280, height: 280, right: -80, bottom: -80 }}` |
| `rgba()` literals | `style={{ backgroundColor: "rgba(255,255,255,0.1)" }}` |
| `LinearGradient` (does not accept `className`) | `style={{ borderRadius: 16, padding: 24 }}` |
| Safe area / platform-specific numeric padding | `style={{ paddingTop: topPad }}` |

Everything else — spacing, radius, flex layout, colors, typography — must use `className`.

### 4. `useColors()` — only for Ionicons and dynamic hex composition

`useColors()` returns raw hex strings. Use it **only** when you need a hex value that cannot be a className token:

```tsx
const C = useColors();

// CORRECT — Ionicons requires a color prop (no className support)
<Ionicons name="home-outline" size={22} color={C.onSurfaceVariant} />

// CORRECT — building a hex+alpha string dynamically
style={{ backgroundColor: `${C.primaryBright}1a` }}

// WRONG — use className instead
<Text style={{ color: C.onSurface }}>Hello</Text>
// CORRECT
<Text className="text-on-surface">Hello</Text>
```

If a component needs `useColors()` only for Ionicons, keep it. If it has no Ionicons, remove `useColors()` entirely.

---

## Design Token Reference

All tokens are available as `className` utilities and as CSS variables.

### Surfaces (depth through layering, never borders)

| Token | className | Hex (dark) |
|---|---|---|
| Base background | `bg-surface` | `#0d1322` |
| Large content areas | `bg-surface-low` | `#151b2b` |
| Cards | `bg-surface-mid` | `#191f2f` |
| Hover / nested elements | `bg-surface-high` | `#242a3a` |
| Topmost elements | `bg-surface-highest` | `#2f3445` |

### Colors

| Role | className | Hex (dark) |
|---|---|---|
| Primary (icons, soft) | `text-primary` / `bg-primary` | `#adc6ff` |
| Primary bright (CTAs, active) | `text-primary-bright` / `bg-primary-bright` | `#4d8eff` |
| Income / positive | `text-secondary` / `bg-secondary` | `#4edea3` |
| Income chip bg | `bg-secondary-container` | `#00a572` |
| Expense / negative | `text-tertiary-container` / `bg-tertiary-container` | `#ff516a` |
| Danger text | `text-tertiary` | `#ffb2b7` |
| Primary text | `text-on-surface` | `#dde2f7` |
| Secondary text / labels | `text-on-surface-variant` | `#c2c6d6` |
| Ghost borders | `border-outline-variant` | `#424754` |

### Typography conventions

- Display numbers: `tracking-[-0.5px]` to `tracking-[-1px]`, `font-black`
- Labels / caps: `text-[10px] font-bold tracking-[1.5px] uppercase`
- Body: `text-[13px] font-medium`
- Section headers: `text-base font-bold tracking-[-0.2px]`

### Semantic color usage

- **Income / positive amounts**: `text-secondary`
- **Expense / negative amounts**: `text-tertiary-container`
- **Active / CTA**: `text-primary-bright`, `bg-primary-bright`
- **Muted / disabled**: add `opacity-50`

---

## Design Rules

- **No 1px borders** — use surface color layering for separation (`bg-surface-mid` inside `bg-surface-low`)
- **No white** (`#fff`) — use `text-on-surface` (`#dde2f7`) for primary text
- **Card radius**: `rounded-2xl` (20px)
- **No card shadows** — flat design
- **Generous spacing**: `gap-3` to `gap-4` between list items, `p-5` inside cards
- All interactive elements: `activeOpacity={0.75}` on `TouchableOpacity`
