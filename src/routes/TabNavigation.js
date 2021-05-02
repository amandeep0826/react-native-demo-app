import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BookingsScreen from '../screens/BookingsScreen/index';
import JobScreen from '../screens/JobsScreen/index';
import SettingsScreen from '../screens/SettingsScreen/index';
import WalletScreen from '../screens/WalletScreen/index';
import {primarycolor} from '../assets/colors';

const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      shifting={false}
      backBehavior="initialRoute"
      barStyle={{backgroundColor: '#FFF6C7', height: 58}}
      activeColor={primarycolor}
      inactiveColor="black"
      style={{backgroundColor: 'tomato'}}
      initialRouteName="JobScreen">
      <Tab.Screen
        options={{
          inactiveColor: 'black',
          tabBarLabel: 'JOBS',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="briefcase" color={color} size={26} />
          ),
        }}
        name="JobScreen"
        component={JobScreen}
      />
      <Tab.Screen
        options={{
          inactiveColor: 'black',
          tabBarLabel: 'BOOKINGS',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="calendar-range"
              color={color}
              size={26}
            />
          ),
        }}
        name="BookingsScreen"
        component={BookingsScreen}
      />
      <Tab.Screen
        options={{
          inactiveColor: 'black',
          tabBarLabel: 'WALLET',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="wallet" color={color} size={26} />
          ),
        }}
        name="WalletScreen"
        component={WalletScreen}
      />
      <Tab.Screen
        options={{
          inactiveColor: 'black',
          tabBarLabel: 'SETTINGS',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
