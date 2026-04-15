import React from 'react';
import { Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

interface AddCardSlotProps {
  onPress?: () => void;
}

export const AddCardSlot: React.FC<AddCardSlotProps> = ({ onPress }) => {
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={onPress}
      className="bg-m3-surface-container-low border-2 border-dashed border-m3-outline-variant/30 rounded-3xl p-4 items-center justify-center active:bg-m3-surface-container-high"
      style={{ minHeight: 260 }}
    >
      <View className="w-16 h-16 rounded-full bg-m3-surface-container-highest items-center justify-center mb-4">
        <Plus size={28} color="#745b00" />
      </View>
      <Text className="text-sm font-bold text-m3-on-surface mb-1">{t('deck.addToDeck')}</Text>
      <Text className="text-xs text-m3-on-surface-variant text-center max-w-[120px]">
        {t('deck.addToDeckDesc')}
      </Text>
    </Pressable>
  );
};
