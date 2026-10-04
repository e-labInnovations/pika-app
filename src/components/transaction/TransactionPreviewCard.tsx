import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";
import { useFormatMoney } from "../../lib/format-currency";
import type { AITransactionData } from "./AIAssistantSheet";

const MISSING = "#f59e0b";

/**
 * The AI-gradient transaction summary: title, amount and type, then category, account,
 * person, split, tags and note. Used for AI results and for captured bank SMS.
 * `children` render at the bottom, inside the card.
 */
export function TransactionPreviewCard({
  data,
  missing,
  children,
}: {
  data: AITransactionData;
  /** Show a hint row for these when they're empty (bank SMS that need a review). */
  missing?: { category?: boolean; account?: boolean };
  children?: React.ReactNode;
}) {
  const C = useColors();
  const fmt = useFormatMoney();
  const typeColor =
    data.type === "income"
      ? "#10b981"
      : data.type === "transfer"
        ? "#6366f1"
        : "#ef4444";

  const formattedDate = data.date
    ? (() => {
        const d = new Date(data.date);
        const date = d.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const time = d.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        });
        return `${date} · ${time}`;
      })()
    : null;

  return (
    <LinearGradient
      colors={["#7c3aed22", "#db277722", "#f59e0b22"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 16,
        padding: 14,
        gap: 10,
        borderWidth: 1,
        borderColor: "#7c3aed33",
      }}
    >
      {/* Title + Amount */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text
            style={{ fontSize: 16, fontWeight: "700", color: C.onSurface }}
            numberOfLines={2}
          >
            {data.title}
          </Text>
          {formattedDate ? (
            <Text
              style={{
                fontSize: 12,
                color: C.onSurfaceVariant,
                marginTop: 2,
              }}
            >
              {formattedDate}
            </Text>
          ) : null}
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: typeColor,
              letterSpacing: -0.5,
            }}
          >
            {data.amount != null
              ? fmt(parseFloat(String(data.amount)))
              : "—"}
          </Text>
          <View
            style={{
              marginTop: 4,
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 10,
              backgroundColor: `${typeColor}20`,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "700",
                textTransform: "uppercase",
                color: typeColor,
              }}
            >
              {data.type}
            </Text>
          </View>
        </View>
      </View>

      {/* Category */}
      {data.category ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor:
                data.category.bgColor ??
                `${data.category.color ?? "#f59e0b"}22`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicIcon
              name={data.category.icon ?? "folder"}
              size={14}
              color={data.category.color ?? "#f59e0b"}
            />
          </View>
          <Text
            style={{ fontSize: 13, color: C.onSurface, fontWeight: "500" }}
          >
            {data.category.name}
          </Text>
        </View>
      ) : null}

      {missing?.category && !data.category ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor: `${MISSING}22`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicIcon name="circle-question-mark" size={14} color={MISSING} />
          </View>
          <Text style={{ fontSize: 13, color: MISSING, fontWeight: "600" }}>Needs a category</Text>
        </View>
      ) : null}

      {/* Account */}
      {data.account ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor: data.account.bgColor ?? "#6366f122",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicIcon
              name={data.account.icon ?? "wallet"}
              size={14}
              color={data.account.color ?? "#6366f1"}
            />
          </View>
          <Text
            style={{ fontSize: 13, color: C.onSurface, fontWeight: "500" }}
          >
            {data.account.name}
          </Text>
          {data.toAccount ? (
            <>
              <DynamicIcon
                name="arrow-right"
                size={14}
                color={C.onSurfaceVariant}
              />
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  backgroundColor: data.toAccount.bgColor ?? "#6366f122",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DynamicIcon
                  name={data.toAccount.icon ?? "wallet"}
                  size={14}
                  color={data.toAccount.color ?? "#6366f1"}
                />
              </View>
              <Text
                style={{
                  fontSize: 13,
                  color: C.onSurface,
                  fontWeight: "500",
                }}
              >
                {data.toAccount.name}
              </Text>
            </>
          ) : null}
        </View>
      ) : null}

      {missing?.account && !data.account ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor: `${MISSING}22`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicIcon name="wallet" size={14} color={MISSING} />
          </View>
          <Text style={{ fontSize: 13, color: MISSING, fontWeight: "600" }}>No account matched</Text>
        </View>
      ) : null}

      {/* Person */}
      {data.person ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: "#8b5cf622",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicIcon name="user" size={14} color="#8b5cf6" />
          </View>
          <Text
            style={{ fontSize: 13, color: C.onSurface, fontWeight: "500" }}
          >
            {data.person.name}
          </Text>
        </View>
      ) : null}

      {/* Split with */}
      {data.shares && data.shares.some((s) => s.person) ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: "#10b98122",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicIcon name="split" size={14} color="#10b981" />
          </View>
          <Text style={{ flex: 1, fontSize: 13, color: C.onSurface, fontWeight: "500" }}>
            Split with{" "}
            {data.shares
              .filter((s) => s.person)
              .map((s) => `${s.person!.name} ₹${parseFloat(s.amount).toFixed(2)}`)
              .join(", ")}
          </Text>
        </View>
      ) : null}

      {/* Tags */}
      {data.tags && data.tags.length > 0 ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
          {data.tags.map((tag, i) => (
            <View
              key={tag.id ?? tag.name ?? i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 10,
                backgroundColor: tag.bgColor ?? `${tag.color ?? "#64748b"}22`,
              }}
            >
              <DynamicIcon
                name={tag.icon ?? "tag"}
                size={10}
                color={tag.color ?? "#64748b"}
              />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: tag.color ?? "#64748b",
                }}
              >
                {tag.name}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* Note */}
      {data.note ? (
        <Text
          style={{
            fontSize: 13,
            color: C.onSurfaceVariant,
            fontStyle: "italic",
          }}
          numberOfLines={3}
        >
          {data.note}
        </Text>
      ) : null}
    {children}
    </LinearGradient>
  );
}
