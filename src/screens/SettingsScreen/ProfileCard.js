import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

export default function ProfileCard({item}) {
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.phone}</Text>
      <Text>dfshfg</Text>
    </View>
  );
}
