import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  DeckDetail: undefined;
};

export type DrawerParamList = {
  Main: NavigatorScreenParams<RootStackParamList>;
};

export type DeckDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeckDetail'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}
