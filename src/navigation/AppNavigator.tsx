import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList, DrawerParamList } from '../types/navigation';
import { DrawerContent } from '../components/DrawerContent';
import DeckDetailScreen from '../screens/DeckDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const MainStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="DeckDetail"
    screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
  >
    <Stack.Screen name="DeckDetail" component={DeckDetailScreen} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerType: 'front' }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Main" component={MainStack} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
