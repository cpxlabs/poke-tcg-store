import React from 'react';
import { View } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';

interface MarketInsightCardProps {
  totalValue: string;
  changePercent: string;
  cardCount: number;
  rarestType: string;
  conditionAvg: string;
}

export const MarketInsightCard: React.FC<MarketInsightCardProps> = ({
  totalValue,
  changePercent,
  cardCount,
  rarestType,
  conditionAvg,
}) => {
  const { t } = useTranslation();

  return (
    <View
      className="rounded-3xl p-8 overflow-hidden relative"
      style={{
        backgroundColor: '#0061a5',
      }}
    >
      {/* Decorative blur circle */}
      <View
        className="absolute rounded-full"
        style={{
          width: 192,
          height: 192,
          right: -40,
          bottom: -40,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      />

      <View>
        <Text className="text-sm font-black uppercase tracking-[4px] mb-6 text-white/70">
          {t('deck.marketInsight')}
        </Text>

        <View className="flex-row items-end gap-2 mb-2">
          <Text className="text-5xl font-bold tracking-tighter text-white font-headline">
            {totalValue}
          </Text>
          <View className="flex-row items-center mb-2">
            <TrendingUp size={14} color="#86efac" />
            <Text className="text-green-300 font-bold ml-1">{changePercent}</Text>
          </View>
        </View>

        <Text className="text-white/80 text-sm font-medium">
          {t('deck.estimatedValue', { count: cardCount })}
        </Text>
      </View>

      <View className="flex-row gap-4 mt-8">
        <View>
          <Text className="text-xs text-white/60">{t('deck.rarest')}</Text>
          <Text className="font-bold text-white">{rarestType}</Text>
        </View>
        <View className="w-px bg-white/20" />
        <View>
          <Text className="text-xs text-white/60">{t('deck.conditionAvg')}</Text>
          <Text className="font-bold text-white">{conditionAvg}</Text>
        </View>
      </View>
    </View>
  );
};
