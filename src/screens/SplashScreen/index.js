import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {getToken} from '../../api/api';
import {backgroundColor} from '../../styles/commonStyle';

const SplashScreen = ({navigation}) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchHeader = async () => {
      const token = await getToken();
      setToken(token);
      ShowAlertWithDelay(token);
    };
    fetchHeader();
    console.log({token});
  }, []);

  const ShowAlertWithDelay = token => {
    if (!token) {
      setTimeout(() => {
        navigation.navigate('DriverLogin');
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.navigate('TabNavigation');
      }, 2000);
    }
  };
  return (
    <View style={backgroundColor.container}>
      <Image
        style={styles.traxiSplashLogo}
        source={require('../../assets/traxiSplashLogo.png')}
      />
    </View>
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
