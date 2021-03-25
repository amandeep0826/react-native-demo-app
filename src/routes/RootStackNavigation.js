import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useEffect, useState} from 'react/cjs/react.development';
import DriverLoginScreen from '../screens/DriverLoginScreen/index';
import DriverSignupScreen from '../screens/DriverSignupScreen/index';
import DummyScreen from '../screens/dummyScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen/index';
import TabNavigation from './TabNavigation';
import {getToken} from '../api/api';

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
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
