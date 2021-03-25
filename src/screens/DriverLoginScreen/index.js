import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, {DriverLogin, getToken} from '../../api/api';
import {placeholderTextColor} from '../../assets/colors';
import {backgroundColor} from '../../styles/commonStyle';
import {styles} from './style';

const DriverLoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  getToken().then(token => {
    const navigationParam = {
      index: 0,
      routes: [{name: 'TabNavigation', params: {token}}],
    };
    if (token) {
      navigation.reset(navigationParam);
    }
  });
  // const [token, setToken] = useState('');

  // const storeData = async (token) => {
  //   try {
  //     const jsonValue = JSON.stringify(token);
  //     await AsyncStorage.setItem('@storage_Key', jsonValue);
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  const usernameHandler = username => {
    setUsername(username);
  };

  const passwordHandler = password => {
    setPassword(password);
  };

  const logInHandler = () => {
    const req = {email: username, password: password};
    api
      .post(
        DriverLogin,
        {
          email: req.email,
          password: req.password,
          fcm_id: 'string',
          device_id: 'string',
          device_type: 1,
          app_version: 1.0,
        },
        {headers: {'Content-type': 'application/json'}},
      )
      .then(response => {
        const token = response.data.token;
        storeData(token);

        navigation.navigate('TabNavigation');
        return token;
      })
      .catch(error => {
        // alert('Incorrect username or password');
        console.log(error);
      });
  };
  const storeData = async token => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      console.log({e});
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.mainLogo}
          source={require('../../assets/traxiTextLogo.png')}
        />
      </View>
      <View>
        <Text style={styles.welcomeBackText}>Welcome Back</Text>
        <Text style={styles.pleaseLoginText}>Please login to your account</Text>
      </View>
      <View>
        <View style={styles.emailInput}>
          <TextInput
            style={{marginLeft: 10, fontFamily: 'Nunito-Regular', fontSize: 16}}
            placeholderTextColor={placeholderTextColor}
            placeholder="Email or phone number"
            onChangeText={username => {
              usernameHandler(username);
            }}
          />
        </View>
        <View style={styles.passwordInput}>
          <TextInput
            style={{marginLeft: 10, fontFamily: 'Nunito-Regular', fontSize: 16}}
            placeholderTextColor={placeholderTextColor}
            placeholder="Password"
            onChangeText={password => {
              passwordHandler(password);
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ForgotPassword');
        }}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signInButtonContainer}
        onPress={() => {
          logInHandler();
          // navigation.navigate('TabNavigation');
        }}>
        <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.driverButtonContainer}
        onPress={() => {
          navigation.navigate('DriverSignupScreen');
        }}>
        <Text style={styles.driverButtonText}>BECOME A DRIVER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DriverLoginScreen;
