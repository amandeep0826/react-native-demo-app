import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import {getToken} from '../../api/api';
import {
  primarybackgroundColor,
  secondarybackgroundColor,
} from '../../assets/colors';
import {backgroundColor} from '../../styles/commonStyle';

const SplashScreen = ({navigation}) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
    ShowAlertWithDelay(token);
  }, []);

  // const navigateWithCondition = () => {
  //   if (token == null) {
  //     navigation.replace('DriverLogin');
  //   } else {
  //     navigation.replace('TabNavigation');
  //   }
  // };

  // const ShowAlertWithDelay = () => {
  //   setTimeout(() => {
  //     navigateWithCondition();
  //   }, 1500);
  // };

  const ShowAlertWithDelay = () => {
    if (token == null) {
      setTimeout(() => {
        navigation.replace('DriverLogin');
      }, 1500);
    } else {
      setTimeout(() => {
        navigation.replace('TabNavigation');
      }, 1500);
    }
  };

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

export default SplashScreen;
