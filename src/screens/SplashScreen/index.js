import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {getToken} from '../../api/api';
import {primarybackgroundColor} from '../../assets/colors';
import {backgroundColor} from '../../styles/commonStyle';

const SplashScreenScreen = ({navigation}) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
    NavigationHandler();
  }, []);

  const NavigationHandler = () => {
    if (token == null) {
      setTimeout(() => {
        navigation.replace('DriverLogin');
      }, 1500);
    }
  };

  // SplashScreen.hide();

  return (
    <SafeAreaView style={backgroundColor.container}>
      <StatusBar backgroundColor={primarybackgroundColor} />
      <Image
        style={styles.traxiSplashLogo}
        source={require('../../assets/traxiSplashLogo.png')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  traxiSplashLogo: {
    height: 148,
    width: 183,
    alignSelf: 'center',
    marginTop: 288,
  },
});

export default SplashScreenScreen;
