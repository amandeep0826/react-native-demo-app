import React from 'react';
import {Button, Text, View} from 'react-native';
import {backgroundColor} from '../../styles/commonStyle';
import {removeToken} from '../../api/api';

const SettingsScreen = ({navigation}) => {
  const logOut = async () => {
    try {
      const logOutValue = await removeToken();
      if (logOutValue) {
        navigation.navigate('DriverLogin');
      } else {
        alert('Error logging out');
      }
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <View style={backgroundColor.container}>
      <Text>Settings Screen</Text>
      <Button
        title="Log Out"
        onPress={() => {
          logOut();
        }}
      />
    </View>
  );
};

export default SettingsScreen;
