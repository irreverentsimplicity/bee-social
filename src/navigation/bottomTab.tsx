import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/Home';
import {AccountScreen} from '../screens/Account';
import {MakeHiveScreen} from '../screens/MakeHive';
import {BottomTabBar} from '../components/bottomTabBar';

export type BottomTabParamList = {
  Home: undefined;
  MakeHive: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FunctionComponent = () => {
  const renderBottomTab = (props: BottomTabBarProps) => (
    <BottomTabBar {...props} />
  );

  return (
    <Tab.Navigator
      tabBar={renderBottomTab}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MakeHive" component={MakeHiveScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};
