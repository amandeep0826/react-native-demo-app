import React, {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, {DriverLogin, getToken} from '../../api/api';
import {
  placeholderTextColor,
  primarybackgroundColor,
  primarycolor,
  pureBlack,
} from '../../assets/colors';
import {backgroundColor} from '../../styles/commonStyle';
import {styles} from './style';

const DriverLoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  getToken().then(token => {
    const navigationParam = {
      index: 0,
      routes: [{name: 'TabNavigation', params: {token}}],
    };
    if (token) {
      navigation.reset(navigationParam);
    }
  });

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!username.trim()) {
      ToastAndroid.show('Please enter your email', ToastAndroid.SHORT);
      setLoading(false);
      return;
    }
    //Check for the Email TextInput
    if (!password.trim()) {
      ToastAndroid.show('Please enter your password', ToastAndroid.SHORT);
      setLoading(false);
      return;
    }
    if (!username.trim() && !password.trim()) {
      ToastAndroid.show('Please Enter Email and Password', ToastAndroid.SHORT);
      setLoading(false);
      return;
    }
    //Checked Successfully
    //Do whatever you want
  };
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
        if (username.trim() && password.trim()) {
          ToastAndroid.show('Email or password incorrect', ToastAndroid.SHORT);
        }
        setLoading(false);
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
    <View style={backgroundColor.container}>
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
            style={{marginLeft: 10, fontFamily: 'Nunito-Regular', fontSize: 16}}
            selectionColor={placeholderTextColor}
            placeholderTextColor={placeholderTextColor}
            placeholder="Password"
            onChangeText={password => {
              passwordHandler(password);
            }}
          />
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
          setLoading(true);
          // navigation.navigate('TabNavigation');
        }}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={primarybackgroundColor}
            style={{paddingBottom: 6}}
          />
        ) : (
          <Text style={styles.signInButtonText}>SIGN IN</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
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
