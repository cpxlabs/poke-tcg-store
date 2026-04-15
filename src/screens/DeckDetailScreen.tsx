import React, { useState, useCallback } from 'react';
import { View, ScrollView, TextInput, Pressable, Image, useWindowDimensions } from 'react-native';
import { BookOpen, Search, MoreVertical, ScanLine } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';
import { FeatureCard } from '@/components/deck/FeatureCard';
import { PokemonCardItem } from '@/components/deck/PokemonCardItem';
import { AddCardSlot } from '@/components/deck/AddCardSlot';
import { MarketInsightCard } from '@/components/deck/MarketInsightCard';
import { BottomTabBar } from '@/components/deck/BottomTabBar';

const TYPE_FILTERS = ['allTypes', 'fire', 'water', 'psychic', 'holoRare'] as const;

const POKEMON_CARDS = [
  {
    id: '1',
    name: 'Charizard ex',
    type: 'FIRE',
    stage: 'STAGE 2',
    number: '#006',
    condition: 'NM/Mint',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBasB-p5UYCJXoFvsbGjV-dW4WzeKLkPYlsCUO-094sGgwNsEZz8-Gp647lXk9g-2lVBos22c3OUZi_UCMenqcFo3QDkGEu15wu9Nrdimv1EOyBHSJonU1DN7iED7ccc8Wk7jQvUN1Th0ye85WkZezaxCtC5icaN54gLHYpH1yzD9L1aR-2DpKFM2N6iv7dlhaf5VwY0KH_8YFpgaAkXSK8cDTgV0-Z23G5S869BOo8Or--7jc_DxmQleOhmfqIE-LDSVdBENpkIi8',
  },
  {
    id: '2',
    name: 'Pikachu V',
    type: 'LIGHTNING',
    stage: 'BASIC',
    number: '#025',
    condition: 'EXC',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2WtkYi-jJwCRYjJWrmxAlv7he6DMohLP210BrHSrYJqGacsOkqAh8z_JtjbgtZOWNJ9jNX2mOkTGKiZFNok7q3hLw5jflZ5XaVqWftSLvdNEQs2pc_EBZO-kAMk22nUIoIJCR-k8CTQheR-ESWHoOrBr3hjhREmKyrew7af2AGn7mergRDZopyl9mhH7yw5ndUZHaVpgr8qKPjkIwt5VPgcq8jS5z0L9sT3gOHrKivqYZzJOC_K-j-BcvGkO6mtQZVCDJpFVch00',
  },
  {
    id: '3',
    name: 'Gengar VMAX',
    type: 'PSYCHIC',
    stage: 'STAGE 2',
    number: '#094',
    condition: 'NM',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAoADWRH9o-9IqzaBfJy3P_GOnJB2p3EiqBg_5f6sVRU95OPjG93ob_fOY6bOsAtdOXE20MPB4p43Xunmug8f01MyN073D24KdgjicN7uvFSOsS0LqkC9Cjvxq7Hkv_VKpUq7bWgAliT-9qHsT6h6sJGieLPS9VBs42UE0XZv9lyF0U9Tl0gk2mPIO3UnyMcZUpl8CWAz43Lze5oKxFvQz5yD0SDAlY3GVb5UsOuZr9WQPowqJFHk1BzZjoUlPEEujoLiFz3maLVgE',
  },
  {
    id: '4',
    name: 'Lugia VSTAR',
    type: 'COLORLESS',
    stage: 'BASIC',
    number: '#157',
    condition: 'Mint',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDWr7bZe-S7tB4WlteCfP6USPQQr1KMTcOoB4yVJF2h_5nFQ6dJOiTahne_T_v27Hc9DHf3evZPe5lKZEsiwhO_87JhZk8F7AFXTbde-7YZ1eqw2jhPf2VH22bSiJKc3VtQpSZmBBJ0pgKDndFwnIivhuvFqqUzIwep0ZnU2XS4SNoQm3hLTvm8sznT1qUyf5gUfeSp9uSf544eyMWEILx5R2BLeL8rDqyiTpf3YH-OsqiKf3HDLqZeafpYmLPQxTfHTnvyRVUclbY',
  },
];

const FEATURE_CARD = {
  name: 'Rayquaza VMAX',
  description: 'Alternate Art Secret Rare • #218/203',
  badge: 'Grail Card',
  badgeSubtext: 'PSA 10 Potential',
  imageUri:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAJUbrj6riX8xO800G2tiqJRAGZ5aHdFBa0ylda_isx9GDj7on7n2nblp5KvowSPWKUzbP6UbptbY5mDm74ZLDjc9HzUd0PBaI53VQwy4Y_wAQUXJhl3rh-zYaP41Ys_hUfbmF8SfJUORNkVdrJVleHXfkPeqEXIr5n_yMB-lmPuWTA3RQqwQ18x9QIOhfKM8h64XKhCB8DzitYM3vJIYGM6A3gpCv0kcOY2NRNlfv7swA2ntpPWblCsxzHu4Rz9XDf6C39qIMOJIQ',
};

const AVATAR_URI =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDAWOlzej11mQ2cAH7XUwqNzVJBN_QHGLXOcgXRSX9TGOvTrPnG9_jAQgvWXUmxNsZZPpHdFzS--dR21YimaLKHV6Nb6V2r4RW59hHb9zIDwzjsj5l0g4hDrv8S3OzsvkKSFE3nR7oqYPe-lnnosX7C_vw0VeONOuL9ZNYraEDNaYF0dwV0jHP0YtwU0V7UGugJi5aanRrGBoL93QpUuFEokdaw3KK7KzlzJ5el4_ZdnlfMTdbQQgJIIEmpzoIAPMLV1YJcnM2KKcA';

const DeckDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState<string>('allTypes');

  const getCardWidth = useCallback(() => {
    const padding = 48; // 24px per side
    const gap = 16;
    if (width >= 1024) {
      return (width - padding - gap * 3) / 4;
    }
    if (width >= 640) {
      return (width - padding - gap) / 2;
    }
    return width - padding;
  }, [width]);

  const numColumns = width >= 1024 ? 4 : width >= 640 ? 2 : 1;
  const cardWidth = getCardWidth();

  return (
    <View className="flex-1 bg-m3-background">
      {/* Top App Bar */}
      <View className="flex-row justify-between items-center px-6 h-16 bg-m3-surface z-50">
        <View className="flex-row items-center gap-3">
          <BookOpen size={24} color="#745b00" />
          <Text className="text-xl font-bold text-m3-on-surface uppercase tracking-widest font-headline">
            {t('deck.appName')}
          </Text>
        </View>
        <Pressable className="p-2 rounded-full active:bg-m3-surface-container-low">
          <Search size={24} color="#44474e" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 max-w-7xl mx-auto w-full">
          {/* Hero Header Section */}
          <View className="mb-12 mt-8">
            {/* Top row: title + actions */}
            <View className="flex-col md:flex-row md:items-end justify-between gap-6">
              <View className="flex-1">
                {/* Badges */}
                <View className="flex-row items-center gap-2 mb-2">
                  <View className="px-3 py-1 bg-m3-secondary-container rounded-full">
                    <Text className="text-m3-on-secondary-container text-[10px] font-bold tracking-widest uppercase">
                      {t('deck.masterSet')}
                    </Text>
                  </View>
                  <Text className="text-m3-on-surface-variant text-sm font-medium">
                    {t('deck.updatedAgo', { time: '2h' })}
                  </Text>
                </View>

                {/* Deck Title */}
                <Text className="text-5xl font-bold tracking-tighter text-m3-on-surface leading-none mb-4 font-headline">
                  {t('deck.deckName')}
                </Text>

                {/* Collectors row */}
                <View className="flex-row items-center gap-4">
                  <View className="flex-row">
                    {/* Avatar */}
                    <View className="w-8 h-8 rounded-full border-2 border-m3-surface bg-m3-primary-container overflow-hidden">
                      <Image
                        source={{ uri: AVATAR_URI }}
                        className="w-full h-full"
                        resizeMode="cover"
                        accessibilityLabel="Collector avatar"
                      />
                    </View>
                    <View className="w-8 h-8 rounded-full border-2 border-m3-surface bg-m3-secondary-container items-center justify-center -ml-2">
                      <Text className="text-[10px] font-bold text-m3-on-secondary-container">+3</Text>
                    </View>
                  </View>
                  <Text className="text-m3-on-surface-variant font-medium">
                    <Text className="text-m3-primary font-bold">142</Text> / 250 {t('deck.cardsCollected')}
                  </Text>
                </View>
              </View>

              {/* Action buttons */}
              <View className="flex-row items-center gap-3 mt-4">
                <Pressable
                  className="flex-row items-center gap-2 px-6 py-4 rounded-xl active:opacity-90"
                  style={{
                    backgroundColor: '#745b00',
                    shadowColor: '#745b00',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 6,
                  }}
                >
                  <ScanLine size={20} color="#241a00" />
                  <Text className="text-m3-on-primary-fixed font-bold">{t('deck.addMore')}</Text>
                </Pressable>
                <Pressable className="p-4 bg-m3-surface-container-highest rounded-xl active:bg-m3-surface-container-high">
                  <MoreVertical size={20} color="#0061a5" />
                </Pressable>
              </View>
            </View>

            {/* Search + Filter Chips */}
            <View className="mt-12 gap-4">
              {/* Search bar */}
              <View className="relative w-full max-w-md">
                <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
                  <Search size={20} color="#80765f" />
                </View>
                <TextInput
                  className="w-full pl-12 pr-4 py-4 bg-m3-surface-container-low rounded-xl text-m3-on-surface"
                  placeholder={t('deck.searchPlaceholder')}
                  placeholderTextColor="#80765f99"
                />
              </View>

              {/* Filter chips */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingBottom: 8 }}
              >
                {TYPE_FILTERS.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <Pressable
                      key={filter}
                      onPress={() => setActiveFilter(filter)}
                      className={`px-5 py-2 rounded-full ${
                        isActive
                          ? 'bg-m3-on-surface'
                          : 'bg-m3-surface-container-high active:bg-m3-surface-container-highest'
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          isActive ? 'text-m3-surface' : 'text-m3-on-surface'
                        }`}
                      >
                        {t(`deck.filter.${filter}`)}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          {/* Bento Card Grid */}
          <View className="flex-row flex-wrap" style={{ gap: 16 }}>
            {/* Feature Card - takes full width on mobile, half on larger */}
            <View style={{ width: numColumns >= 2 ? cardWidth * 2 + 16 : cardWidth }}>
              <FeatureCard
                name={FEATURE_CARD.name}
                description={FEATURE_CARD.description}
                imageUri={FEATURE_CARD.imageUri}
                badge={FEATURE_CARD.badge}
                badgeSubtext={FEATURE_CARD.badgeSubtext}
              />
            </View>

            {/* Standard Cards - first two alongside feature card */}
            {POKEMON_CARDS.slice(0, 2).map((card) => (
              <View key={card.id} style={{ width: cardWidth }}>
                <PokemonCardItem
                  name={card.name}
                  type={card.type}
                  stage={card.stage}
                  number={card.number}
                  condition={card.condition}
                  imageUri={card.imageUri}
                />
              </View>
            ))}

            {/* Add Card Slot */}
            <View style={{ width: cardWidth }}>
              <AddCardSlot />
            </View>

            {/* Remaining Cards */}
            {POKEMON_CARDS.slice(2).map((card) => (
              <View key={card.id} style={{ width: cardWidth }}>
                <PokemonCardItem
                  name={card.name}
                  type={card.type}
                  stage={card.stage}
                  number={card.number}
                  condition={card.condition}
                  imageUri={card.imageUri}
                />
              </View>
            ))}

            {/* Market Insight Card - spans 2 columns */}
            <View style={{ width: numColumns >= 2 ? cardWidth * 2 + 16 : cardWidth }}>
              <MarketInsightCard
                totalValue="$2,450.80"
                changePercent="12%"
                cardCount={142}
                rarestType="Gold Secret"
                conditionAvg="9.2 / 10"
              />
            </View>
          </View>

          {/* Load More */}
          <View className="mt-16 mb-24 items-center">
            <Pressable className="px-8 py-3 bg-m3-surface-container-high rounded-full active:bg-m3-surface-container-highest">
              <Text className="text-m3-on-surface-variant font-bold">
                {t('deck.loadMore', { count: 88 })}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View className="absolute bottom-0 left-0 right-0">
        <BottomTabBar activeTab="decks" />
      </View>
    </View>
  );
};

export default DeckDetailScreen;
