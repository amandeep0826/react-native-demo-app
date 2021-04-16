import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useMemo, useState} from 'react';
import {Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {getToken, getUserData} from '../api/api';
import {
  primarybackgroundColor,
  secondarybackgroundColor,
} from '../assets/colors';
import {NunitoFont} from '../assets/fonts/nunitoFont';
import ContactUsScreen from '../screens/ContactUsScreen';
import DriverLoginScreen from '../screens/DriverLoginScreen/index';
import DriverSignupScreen from '../screens/DriverSignupScreen/index';
import DummyScreen from '../screens/dummyScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen/index';
import JobDetailScreen from '../screens/JobDetailScreen';
import SplashScreenScreen from '../screens/SplashScreen/index';
import TabNavigation from './TabNavigation';

export const AuthContext = React.createContext([{}, function () {}]);
export const UserContext = React.createContext([{}, function () {}]);

const Stack = createStackNavigator();

const RootStackNavigation = ({navigation}) => {
  const [token, setToken] = useState(null);
  // const [userData, setUserData] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
    const fetchData = async () => {
      const user = await getUserData();
      setUser(user);
    };
    fetchData();
    SplashScreen.hide();
  }, []);

  const authContext = useMemo(() => [token, setToken], [token]);
  const userContext = useMemo(() => [user, setUser], [user]);

  const headerIcon = () => {
    return (
      <Image
        style={{width: 20, height: 20}}
        source={require('../assets/back_button_arrow.png')}
      />
    );
  };
  // console.log({token});

  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={userContext}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {token == null ? (
            <>
              <Stack.Screen
                name="SplashScreenScreen"
                component={SplashScreenScreen}
              />
              <Stack.Screen name="DriverLogin" component={DriverLoginScreen} />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                  headerShown: true,
                  headerBackTitleVisible: false,
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
                  headerBackTitleVisible: false,
                  headerBackImage: () => headerIcon,
                  // headerLeft: () => {
                  //   <View>
                  //     <Text>Fefaf</Text>
                  //   </View>;
                  // },
                  headerTitle: '',
                  headerStyle: {
                    backgroundColor: primarybackgroundColor,
                  },
                }}
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
              <Stack.Screen
                name="ContactUsScreen"
                component={ContactUsScreen}
                options={{
                  headerShown: true,
                  headerTitle: 'Contact Us',
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
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default RootStackNavigation;
