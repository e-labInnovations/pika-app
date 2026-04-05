import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DynamicIcon } from '../Icon';
import { useColors } from '../../theme/colors';
import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  isDefaultSort,
  type TxSort,
  type SortField,
  type SortDir,
} from './types';

type Props = {
  visible: boolean;
  sort: TxSort;
  onApply: (sort: TxSort) => void;
  onClose: () => void;
};

export function SortSheet({ visible, sort, onApply, onClose }: Props) {
  const C = useColors();
  const insets = useSafeAreaInsets();
  const [local, setLocal] = React.useState<TxSort>(sort);

  React.useEffect(() => {
    if (visible) setLocal(sort);
  }, [visible, sort]);

  const select = (field: SortField, dir: SortDir) => setLocal({ field, dir });
  const isActive = (field: SortField, dir: SortDir) =>
    local.field === field && local.dir === dir;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
        activeOpacity={1}
        onPress={onClose}
      />
      <View
        style={{
          backgroundColor: C.surface,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingBottom: Math.max(insets.bottom, 16) + 8,
        }}
      >
        {/* Handle */}
        <View className="items-center pt-3 pb-1">
          <View
            className="w-10 h-1 rounded-full"
            style={{ backgroundColor: C.outlineVariant }}
          />
        </View>

        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-3">
          <Text className="text-[18px] font-black text-on-surface tracking-[-0.3px]">
            Sort by
          </Text>
          <View className="flex-row items-center gap-2">
            {!isDefaultSort(local) && (
              <TouchableOpacity
                onPress={() => setLocal(DEFAULT_SORT)}
                activeOpacity={0.7}
                className="px-3 py-1.5 rounded-full"
                style={{ backgroundColor: `${C.outlineVariant}33` }}
              >
                <Text className="text-[12px] font-semibold text-on-surface-variant">
                  Reset
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <DynamicIcon name="x" size={20} color={C.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Options */}
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
        >
          {SORT_OPTIONS.map((opt) => (
            <View
              key={opt.field}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: C.surfaceMid }}
            >
              <View className="px-4 pt-3 pb-2">
                <Text className="text-[11px] font-bold uppercase tracking-[0.8px] text-on-surface-variant">
                  {opt.label}
                </Text>
              </View>
              <View className="flex-row">
                {(['asc', 'desc'] as SortDir[]).map((dir) => {
                  const active = isActive(opt.field, dir);
                  const label = dir === 'asc' ? opt.ascLabel : opt.descLabel;
                  const dirIcon = dir === 'asc' ? 'arrow-up' : 'arrow-down';
                  return (
                    <TouchableOpacity
                      key={dir}
                      onPress={() => select(opt.field, dir)}
                      activeOpacity={0.75}
                      className="flex-1 flex-row items-center justify-center gap-1.5 py-3 mx-1 mb-2 rounded-xl"
                      style={{
                        backgroundColor: active ? C.primary : C.surfaceHigh,
                      }}
                    >
                      <DynamicIcon
                        name={dirIcon}
                        size={12}
                        color={active ? '#fff' : C.onSurfaceVariant}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: active ? '#fff' : C.onSurfaceVariant,
                        }}
                      >
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Apply */}
        <View className="px-4 pt-2">
          <TouchableOpacity
            onPress={() => { onApply(local); onClose(); }}
            activeOpacity={0.8}
            className="py-3.5 rounded-2xl items-center"
            style={{ backgroundColor: C.primary }}
          >
            <Text className="text-[15px] font-bold text-white">Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
