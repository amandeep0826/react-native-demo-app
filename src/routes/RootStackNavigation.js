import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import React from 'react';
import {useEffect, useState} from 'react/cjs/react.development';
import DriverLoginScreen from '../screens/DriverLoginScreen/index';
import DriverSignupScreen from '../screens/DriverSignupScreen/index';
import DummyScreen from '../screens/dummyScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen/index';
import TabNavigation from './TabNavigation';
import {getToken} from '../api/api';
import EditProfileScreen from '../screens/EditProfileScreen';
import {secondarybackgroundColor} from '../assets/colors';
import {NunitoFont} from '../assets/fonts/nunitoFont';
import JobDetailScreen from '../screens/JobDetailScreen';

const Stack = createStackNavigator();

const RootStackNavigation = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
  }, [token]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!token ? (
        <>
          <Stack.Screen name="DriverLogin" component={DriverLoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen
            name="DriverSignupScreen"
            component={DriverSignupScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="DummyScreen" component={DummyScreen} />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{
              headerShown: true,
              headerTitle: 'Edit Profile',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: NunitoFont,
                fontSize: 16,
                fontWeight: 'bold',
              },
              headerStyle: {
                backgroundColor: secondarybackgroundColor,
              },
            }}
          />
          <Stack.Screen
            name="JobsDetailScreen"
            component={JobDetailScreen}
            options={{
              headerShown: true,
              headerTitle: 'Job Details',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: NunitoFont,
                fontSize: 16,
                fontWeight: 'bold',
              },
              headerStyle: {
                backgroundColor: secondarybackgroundColor,
              },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
