/**
 * DateTimePicker — full date + time selection (used in transaction forms).
 * DatePicker     — date-only selection (used in the filter sheet).
 *
 * The drum-roll scroll columns use a momentum-aware commit strategy:
 *  - If the user flicks (creates momentum), commit on onMomentumScrollEnd.
 *  - If the user drags slowly (no momentum), commit 50 ms after onScrollEndDrag
 *    once we confirm that onMomentumScrollBegin did NOT fire.
 * This prevents the double-fire glitch that occurred when both drag-end and
 * momentum-end events fired in sequence for the same scroll gesture.
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DynamicIcon } from "../Icon";
import { useColors } from "../../theme/colors";

// ── Constants ─────────────────────────────────────────────────────────────────

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DOW = ["S", "M", "T", "W", "T", "F", "S"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
function firstDow(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}
function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

// ── Scroll Column ─────────────────────────────────────────────────────────────

function ScrollColumn({
  items,
  selectedIndex,
  onSelect,
  width,
}: {
  items: string[];
  selectedIndex: number;
  onSelect: (i: number) => void;
  width: number;
}) {
  const C = useColors();
  const ref = useRef<ScrollView>(null);

  // Track scroll position and momentum state entirely in refs so handlers
  // never go stale and never trigger re-renders on every scroll frame.
  const currentOffset = useRef(selectedIndex * ITEM_HEIGHT);
  const hasMomentum = useRef(false);
  const dragEndTimer = useRef<ReturnType<typeof setTimeout>>();

  // Snap the view to the nearest item and notify the parent.
  const commit = useCallback(
    (y: number) => {
      const i = Math.max(
        0,
        Math.min(items.length - 1, Math.round(y / ITEM_HEIGHT)),
      );
      onSelect(i);
      // snapToInterval already moved the scroll view; calling scrollTo here
      // would cause another scroll event and re-trigger commit — skip it.
    },
    [items.length, onSelect],
  );

  // Sync when the parent changes selectedIndex (e.g. external "Now" button).
  useEffect(() => {
    ref.current?.scrollTo({ y: selectedIndex * ITEM_HEIGHT, animated: false });
    currentOffset.current = selectedIndex * ITEM_HEIGHT;
  }, [selectedIndex]);

  return (
    <View style={{ width, height: PICKER_HEIGHT, overflow: "hidden" }}>
      {/* Centre selection highlight */}
      <View
        style={{
          position: "absolute",
          top: ITEM_HEIGHT * 2,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: C.outlineVariant,
          zIndex: 1,
        }}
        pointerEvents="none"
      />

      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
        // Track live offset so drag-end commits can read it.
        onScroll={(e) => {
          currentOffset.current = e.nativeEvent.contentOffset.y;
        }}
        onScrollBeginDrag={() => {
          hasMomentum.current = false;
          clearTimeout(dragEndTimer.current);
        }}
        onScrollEndDrag={() => {
          // Wait briefly: if momentum is going to start, onMomentumScrollBegin
          // fires within one frame (~16 ms). If it doesn't fire within 50 ms
          // the gesture had no momentum and this is the final position.
          dragEndTimer.current = setTimeout(() => {
            if (!hasMomentum.current) {
              commit(currentOffset.current);
            }
          }, 50);
        }}
        onMomentumScrollBegin={() => {
          hasMomentum.current = true;
          clearTimeout(dragEndTimer.current);
        }}
        onMomentumScrollEnd={(e) => {
          hasMomentum.current = false;
          commit(e.nativeEvent.contentOffset.y);
        }}
      >
        {items.map((label, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              onSelect(i);
              ref.current?.scrollTo({ y: i * ITEM_HEIGHT, animated: true });
            }}
            activeOpacity={0.7}
            style={{
              height: ITEM_HEIGHT,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: i === selectedIndex ? 18 : 15,
                fontWeight: i === selectedIndex ? "700" : "400",
                color:
                  i === selectedIndex ? C.onSurface : C.onSurfaceVariant,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// ── Calendar ──────────────────────────────────────────────────────────────────

function Calendar({
  year,
  month,
  selectedDay,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
}: {
  year: number;
  month: number;
  selectedDay: number;
  onSelectDay: (d: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}) {
  const C = useColors();
  const today = new Date();
  const numDays = daysInMonth(year, month);
  const startDow = firstDow(year, month);

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= numDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <View>
      {/* Month nav */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <TouchableOpacity
          onPress={onPrevMonth}
          activeOpacity={0.7}
          style={{
            padding: 8,
            borderRadius: 20,
            backgroundColor: C.surfaceHigh,
          }}
        >
          <DynamicIcon name="chevron-left" size={16} color={C.onSurface} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 15,
            fontWeight: "700",
            color: C.onSurface,
          }}
        >
          {MONTHS[month]} {year}
        </Text>
        <TouchableOpacity
          onPress={onNextMonth}
          activeOpacity={0.7}
          style={{
            padding: 8,
            borderRadius: 20,
            backgroundColor: C.surfaceHigh,
          }}
        >
          <DynamicIcon name="chevron-right" size={16} color={C.onSurface} />
        </TouchableOpacity>
      </View>

      {/* DOW header */}
      <View style={{ flexDirection: "row", marginBottom: 4 }}>
        {DOW.map((d, i) => (
          <View key={i} style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: C.onSurfaceVariant,
              }}
            >
              {d}
            </Text>
          </View>
        ))}
      </View>

      {/* Day grid */}
      {Array.from({ length: cells.length / 7 }, (_, w) => (
        <View key={w} style={{ flexDirection: "row" }}>
          {cells.slice(w * 7, w * 7 + 7).map((day, i) => {
            if (!day)
              return <View key={`e-${i}`} style={{ flex: 1, height: 40 }} />;
            const isSelected = day === selectedDay;
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();
            return (
              <TouchableOpacity
                key={`d-${day}`}
                onPress={() => onSelectDay(day)}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isSelected ? C.primary : "transparent",
                    borderWidth: isToday && !isSelected ? 1.5 : 0,
                    borderColor: C.primary,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: isSelected || isToday ? "700" : "400",
                      color: isSelected
                        ? "#fff"
                        : isToday
                          ? C.primary
                          : C.onSurface,
                    }}
                  >
                    {day}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

// ── DatePicker (date-only) ────────────────────────────────────────────────────

export interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
}: DatePickerProps) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);

  const base = value ?? new Date();
  const [year, setYear] = useState(base.getFullYear());
  const [month, setMonth] = useState(base.getMonth());
  const [day, setDay] = useState(base.getDate());

  useEffect(() => {
    if (!visible) {
      const b = value ?? new Date();
      setYear(b.getFullYear());
      setMonth(b.getMonth());
      setDay(b.getDate());
    }
  }, [value, visible]);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const displayStr = value
    ? `${SHORT_MONTHS[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}`
    : placeholder;

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.75}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: C.surfaceHigh,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}
      >
        <DynamicIcon
          name="calendar"
          size={15}
          color={value ? C.primary : C.outlineVariant}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: value ? C.onSurface : C.outlineVariant,
          }}
        >
          {displayStr}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        >
          <View
            style={{
              backgroundColor: C.surfaceLow,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingBottom: Math.max(insets.bottom, 16) + 4,
            }}
          >
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 12,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 17,
                  fontWeight: "800",
                  color: C.onSurface,
                }}
              >
                Pick Date
              </Text>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                activeOpacity={0.7}
                style={{
                  padding: 6,
                  borderRadius: 20,
                  backgroundColor: C.surfaceHigh,
                }}
              >
                <DynamicIcon name="x" size={16} color={C.onSurface} />
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
              <Calendar
                year={year}
                month={month}
                selectedDay={day}
                onSelectDay={setDay}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 20,
                gap: 10,
              }}
            >
              {value && (
                <TouchableOpacity
                  onPress={() => {
                    onChange(null);
                    setVisible(false);
                  }}
                  activeOpacity={0.8}
                  style={{
                    paddingVertical: 16,
                    paddingHorizontal: 20,
                    borderRadius: 16,
                    backgroundColor: C.surfaceHigh,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      color: C.onSurface,
                    }}
                  >
                    Clear
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  onChange(new Date(year, month, day));
                  setVisible(false);
                }}
                activeOpacity={0.85}
                style={{
                  flex: 1,
                  paddingVertical: 16,
                  borderRadius: 16,
                  backgroundColor: C.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "700", color: "#fff" }}
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// ── DateTimePicker ────────────────────────────────────────────────────────────

export interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);

  const [year, setYear] = useState(value.getFullYear());
  const [month, setMonth] = useState(value.getMonth());
  const [day, setDay] = useState(value.getDate());
  const [hour12, setHour12] = useState(value.getHours() % 12 || 12);
  const [minute, setMinute] = useState(value.getMinutes());
  const [period, setPeriod] = useState<"AM" | "PM">(
    value.getHours() < 12 ? "AM" : "PM",
  );
  const [tab, setTab] = useState<"date" | "time">("date");

  useEffect(() => {
    if (!visible) {
      setYear(value.getFullYear());
      setMonth(value.getMonth());
      setDay(value.getDate());
      setHour12(value.getHours() % 12 || 12);
      setMinute(value.getMinutes());
      setPeriod(value.getHours() < 12 ? "AM" : "PM");
    }
  }, [value, visible]);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const handleConfirm = () => {
    const hours24 =
      period === "AM"
        ? hour12 === 12
          ? 0
          : hour12
        : hour12 === 12
          ? 12
          : hour12 + 12;
    onChange(new Date(year, month, day, hours24, minute, 0, 0));
    setVisible(false);
  };

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minutes = Array.from({ length: 60 }, (_, i) => pad(i));
  const periodItems = ["AM", "PM"];

  const h = value.getHours();
  const displayStr =
    `${SHORT_MONTHS[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}  ·  ` +
    `${h % 12 || 12}:${pad(value.getMinutes())} ${h < 12 ? "AM" : "PM"}`;

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.75}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: C.surfaceHigh,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}
      >
        <DynamicIcon name="calendar-clock" size={16} color={C.primary} />
        <Text style={{ fontSize: 14, fontWeight: "600", color: C.onSurface }}>
          {displayStr}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        >
          <View
            style={{
              backgroundColor: C.surfaceLow,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingBottom: Math.max(insets.bottom, 16) + 4,
            }}
          >
            {/* Handle + header */}
            <View
              style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}
            >
              <View
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: C.outlineVariant,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 12,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 17,
                  fontWeight: "800",
                  color: C.onSurface,
                }}
              >
                Pick Date & Time
              </Text>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                activeOpacity={0.7}
                style={{
                  padding: 6,
                  borderRadius: 20,
                  backgroundColor: C.surfaceHigh,
                }}
              >
                <DynamicIcon name="x" size={16} color={C.onSurface} />
              </TouchableOpacity>
            </View>

            {/* Tab bar */}
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginBottom: 16,
                borderRadius: 12,
                overflow: "hidden",
                backgroundColor: C.surfaceHigh,
              }}
            >
              {(["date", "time"] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setTab(t)}
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    alignItems: "center",
                    backgroundColor: tab === t ? C.primary : "transparent",
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      color: tab === t ? "#fff" : C.onSurfaceVariant,
                    }}
                  >
                    {t === "date" ? "Date" : "Time"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ paddingHorizontal: 20 }}>
              {tab === "date" ? (
                <Calendar
                  year={year}
                  month={month}
                  selectedDay={day}
                  onSelectDay={setDay}
                  onPrevMonth={prevMonth}
                  onNextMonth={nextMonth}
                />
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <ScrollColumn
                    items={hours}
                    selectedIndex={hour12 - 1}
                    onSelect={(i) => setHour12(i + 1)}
                    width={70}
                  />
                  <View style={{ justifyContent: "center", paddingBottom: 4 }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "800",
                        color: C.onSurface,
                      }}
                    >
                      :
                    </Text>
                  </View>
                  <ScrollColumn
                    items={minutes}
                    selectedIndex={minute}
                    onSelect={setMinute}
                    width={70}
                  />
                  <ScrollColumn
                    items={periodItems}
                    selectedIndex={period === "AM" ? 0 : 1}
                    onSelect={(i) => setPeriod(i === 0 ? "AM" : "PM")}
                    width={60}
                  />
                </View>
              )}
            </View>

            {/* Confirm row */}
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 20,
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  const now = new Date();
                  setYear(now.getFullYear());
                  setMonth(now.getMonth());
                  setDay(now.getDate());
                  setHour12(now.getHours() % 12 || 12);
                  setMinute(now.getMinutes());
                  setPeriod(now.getHours() < 12 ? "AM" : "PM");
                }}
                activeOpacity={0.8}
                style={{
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                  backgroundColor: C.surfaceHigh,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 6,
                }}
              >
                <DynamicIcon name="clock" size={15} color={C.onSurface} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: C.onSurface,
                  }}
                >
                  Now
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirm}
                activeOpacity={0.85}
                style={{
                  flex: 1,
                  paddingVertical: 16,
                  borderRadius: 16,
                  backgroundColor: C.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "700", color: "#fff" }}
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
