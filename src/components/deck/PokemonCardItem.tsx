import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { Info } from 'lucide-react-native';
import { Text } from '@/components/ui/text';

interface PokemonCardItemProps {
  name: string;
  type: string;
  stage: string;
  number: string;
  condition: string;
  imageUri: string;
  onPress?: () => void;
  onInfo?: () => void;
}

export const PokemonCardItem: React.FC<PokemonCardItemProps> = ({
  name,
  type,
  stage,
  number,
  condition,
  imageUri,
  onPress,
  onInfo,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-m3-surface-container-lowest rounded-3xl p-4 active:opacity-90"
      style={{
        shadowColor: '#1a1c1e',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.06,
        shadowRadius: 32,
        elevation: 4,
      }}
    >
      {/* Card Image */}
      <View className="rounded-xl overflow-hidden mb-4 bg-m3-surface-container-low relative" style={{ aspectRatio: 3 / 4 }}>
        <Image
          source={{ uri: imageUri }}
          className="w-full h-full"
          resizeMode="cover"
          accessibilityLabel={name}
        />
        <View className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded-lg">
          <Text className="text-[10px] font-bold text-m3-secondary">{number}</Text>
        </View>
      </View>

      {/* Card Info */}
      <View className="gap-1">
        <Text className="text-[10px] font-black text-m3-outline tracking-widest uppercase">
          {type} • {stage}
        </Text>
        <Text className="text-lg font-bold text-m3-on-surface leading-tight">{name}</Text>
        <View className="flex-row items-center justify-between pt-2">
          <Text className="text-xs font-semibold text-m3-primary">{condition}</Text>
          <Pressable onPress={onInfo} hitSlop={8}>
            <Info size={14} color="#d2c5ab" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};
