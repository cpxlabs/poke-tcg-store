import React from 'react';
import { View, Pressable } from 'react-native';
import { Home, Camera, Layers, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';

type TabName = 'home' | 'scan' | 'decks' | 'profile';

interface BottomTabBarProps {
  activeTab?: TabName;
  onTabPress?: (tab: TabName) => void;
}

interface TabItem {
  name: TabName;
  labelKey: string;
  icon: typeof Home;
}

const TABS: TabItem[] = [
  { name: 'home', labelKey: 'tabs.home', icon: Home },
  { name: 'scan', labelKey: 'tabs.scan', icon: Camera },
  { name: 'decks', labelKey: 'tabs.decks', icon: Layers },
  { name: 'profile', labelKey: 'tabs.profile', icon: User },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab = 'decks',
  onTabPress,
}) => {
  const { t } = useTranslation();

  return (
    <View
      className="flex-row justify-around items-center px-4 pt-2 pb-6 bg-m3-surface/80 rounded-t-3xl"
      style={{
        shadowColor: '#1a1c1e',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.04,
        shadowRadius: 24,
        elevation: 8,
      }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.name;
        const Icon = tab.icon;

        if (isActive) {
          return (
            <Pressable
              key={tab.name}
              onPress={() => onTabPress?.(tab.name)}
              className="items-center justify-center rounded-2xl p-3"
              style={{
                backgroundColor: '#745b00',
                shadowColor: '#745b00',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
                transform: [{ translateY: -2 }],
              }}
            >
              <Icon size={22} color="#ffffff" />
              <Text className="text-[11px] font-semibold uppercase tracking-wider mt-1 text-white">
                {t(tab.labelKey)}
              </Text>
            </Pressable>
          );
        }

        return (
          <Pressable
            key={tab.name}
            onPress={() => onTabPress?.(tab.name)}
            className="items-center justify-center p-3 active:opacity-70"
          >
            <Icon size={22} color="#44474e" />
            <Text className="text-[11px] font-semibold uppercase tracking-wider mt-1 text-[#44474e]">
              {t(tab.labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
