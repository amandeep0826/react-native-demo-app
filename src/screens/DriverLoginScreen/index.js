import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import validator from 'validator';
import api, {DriverLogin} from '../../api/api';
import {
  placeholderTextColor,
  primarybackgroundColor,
  primarycolor,
} from '../../assets/colors';
import {AuthContext, UserContext} from '../../routes/RootStackNavigation';
import {backgroundColor} from '../../styles/commonStyle';
import {styles} from './style';

const DriverLoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const netInfo = useNetInfo();
  const [token, setToken] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);

  const checkNetwork = () => {
    if (netInfo.isConnected == false) {
      ToastAndroid.show('No Internet detected.', ToastAndroid.SHORT);
    }
  };

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!username.trim()) {
      ToastAndroid.show('Please enter your email', ToastAndroid.SHORT);
      setSpinner(false);
      return;
    }
    //Check for the Email TextInput
    if (!password.trim()) {
      ToastAndroid.show('Please enter your password', ToastAndroid.SHORT);
      setSpinner(false);
      return;
    }
    if (!username.trim() && !password.trim()) {
      ToastAndroid.show('Please Enter Email and Password', ToastAndroid.SHORT);
      setSpinner(false);
      return;
    }
    if (!validator.isEmail(username)) {
      ToastAndroid.show('Invalid email format', ToastAndroid.SHORT);
      return;
    }
  };

  const usernameHandler = username => {
    setUsername(username);
  };

  const passwordHandler = password => {
    setPassword(password);
  };

  const visibilityControl = () => {
    if (visibility == true) {
      return false;
    } else {
      return true;
    }
  };

  const spinnerControl = () => {
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  };

  const logInHandler = () => {
    const req = {
      email: username,
      password: password,
      fcm_id: 'string',
      device_id: 'string',
      device_type: 1,
      app_version: 1.0,
    };
    api
      .post(DriverLogin, JSON.stringify(req), {
        headers: {'Content-type': 'application/json'},
      })
      .then(async response => {
        const token = response.data.token;
        const user = response.data;

        await storeData(token);
        setToken(token);
        await storeUserData(user);
        setUser(user);
      })
      .catch(error => {
        if (username.trim() && password.trim()) {
          ToastAndroid.show('Email or password incorrect', ToastAndroid.SHORT);
        }
        setSpinner(false);
        console.log({error});
      });
  };
  const storeData = async token => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      console.log({e});
    }
  };
  const storeUserData = async user => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      console.log({e});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={-60}
      style={{flex: 1}}>
      <Spinner
        visible={spinner}
        size="large"
        customIndicator={
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color={primarycolor} style={{}} />
          </View>
        }
      />
      <SafeAreaView style={backgroundColor.container}>
        <StatusBar backgroundColor={primarybackgroundColor} />
        <View>
          <Image
            style={styles.mainLogo}
            source={require('../../assets/traxiTextLogo.png')}
          />
        </View>
        <View>
          <Text style={styles.welcomeBackText}>Welcome Back</Text>
          <Text style={styles.pleaseLoginText}>
            Please login to your account
          </Text>
        </View>
        <View>
          <View style={styles.emailInput}>
            <TextInput
              style={{
                marginLeft: 10,
                fontFamily: 'Nunito-Regular',
                fontSize: 16,
              }}
              selectionColor={placeholderTextColor}
              placeholderTextColor={placeholderTextColor}
              placeholder="Email or phone number"
              onChangeText={username => {
                usernameHandler(username);
              }}
            />
          </View>
          <View style={styles.passwordInput}>
            <TextInput
              style={{
                marginLeft: 10,
                fontFamily: 'Nunito-Regular',
                fontSize: 16,
                paddingRight: 250,
              }}
              selectionColor={placeholderTextColor}
              placeholderTextColor={placeholderTextColor}
              placeholder="Password"
              secureTextEntry={visibilityControl()}
              onChangeText={password => {
                passwordHandler(password);
              }}
            />
            {visibility ? (
              <TouchableOpacity
                style={{
                  padding: 15,
                  marginLeft: 'auto',
                }}
                onPress={() => {
                  setVisibility(false);
                }}>
                <Image
                  source={require('../../assets/visibility.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  padding: 15,
                  marginLeft: 'auto',
                }}
                onPress={() => {
                  setVisibility(true);
                }}>
                <Image
                  source={require('../../assets/visibility_off.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.signInButtonContainer}
          onPress={() => {
            logInHandler();
            checkTextInput();

            if (
              username.trim() &&
              password.trim() &&
              validator.isEmail(username)
            ) {
              spinnerControl();
              setSpinner(true);
            } else {
            }
          }}>
          <Text style={styles.signInButtonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.driverButtonContainer}
          onPress={() => {
            navigation.navigate('DriverSignupScreen');
          }}>
          <Text style={styles.driverButtonText}>BECOME A DRIVER</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default DriverLoginScreen;
