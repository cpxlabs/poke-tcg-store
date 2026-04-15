import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { Star } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';

interface FeatureCardProps {
  name: string;
  description: string;
  imageUri: string;
  badge?: string;
  badgeSubtext?: string;
  onViewDetails?: () => void;
  onFavorite?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  name,
  description,
  imageUri,
  badge,
  badgeSubtext,
  onViewDetails,
  onFavorite,
}) => {
  const { t } = useTranslation();

  return (
    <View className="relative overflow-hidden rounded-3xl bg-m3-surface-container-low min-h-[400px]">
      {/* Background image */}
      <Image
        source={{ uri: imageUri }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
        accessibilityLabel={name}
      />
      {/* Gradient overlay */}
      <View className="absolute inset-0 bg-[#1a1c1e]/60" />

      {/* Content */}
      <View className="flex-1 justify-end p-8 relative z-10">
        {/* Badges */}
        <View className="flex-row items-center gap-2 mb-3">
          {badge && (
            <View className="bg-m3-primary-container px-3 py-1 rounded-full">
              <Text className="text-m3-on-primary-container text-[10px] font-black uppercase tracking-widest">
                {badge}
              </Text>
            </View>
          )}
          {badgeSubtext && (
            <Text className="text-white/80 text-xs font-medium">{badgeSubtext}</Text>
          )}
        </View>

        <Text className="text-4xl font-bold text-white mb-2 tracking-tight leading-tight font-headline">
          {name}
        </Text>
        <Text className="text-white/70 font-medium mb-6">{description}</Text>

        {/* Actions */}
        <View className="flex-row gap-3">
          <Pressable
            onPress={onViewDetails}
            className="flex-1 py-3 bg-white rounded-xl items-center active:bg-m3-surface-container-highest"
          >
            <Text className="text-m3-on-surface font-bold">{t('deck.viewDetails')}</Text>
          </Pressable>
          <Pressable
            onPress={onFavorite}
            className="px-4 py-3 bg-white/10 rounded-xl items-center justify-center active:bg-white/20"
          >
            <Star size={20} color="#ffffff" fill="#ffffff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
