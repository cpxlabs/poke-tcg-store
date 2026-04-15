import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
  About: undefined;
  DeckDetail: undefined;
};

export type DrawerParamList = {
  Main: NavigatorScreenParams<RootStackParamList>;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type MenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;
export type AboutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'About'>;
export type DeckDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeckDetail'>;
export type MenuScreenRouteProp = RouteProp<RootStackParamList, 'Menu'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}
