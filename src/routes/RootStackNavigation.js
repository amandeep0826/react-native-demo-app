import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {getToken} from '../api/api';
import {
  primarybackgroundColor,
  secondarybackgroundColor,
} from '../assets/colors';
import {NunitoFont} from '../assets/fonts/nunitoFont';
import DriverLoginScreen from '../screens/DriverLoginScreen/index';
import DriverSignupScreen from '../screens/DriverSignupScreen/index';
import DummyScreen from '../screens/dummyScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen/index';
import JobDetailScreen from '../screens/JobDetailScreen';
import TabNavigation from './TabNavigation';
import SplashScreen from '../screens/SplashScreen/index';

const Stack = createStackNavigator();

const RootStackNavigation = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
    console.log({token});
  }, [token]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* {!token ? (
        <> */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="DriverLogin" component={DriverLoginScreen} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: primarybackgroundColor,
          },
        }}
      />
      <Stack.Screen
        name="DriverSignupScreen"
        component={DriverSignupScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: primarybackgroundColor,
          },
        }}
      />
      {/* </>
      ) : (
        <> */}
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
      {/* </>
      )} */}
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
