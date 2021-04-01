import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const AddressComponent = (
  {pickupAddress, user_name, user_phone, user_apartment, user_landmark},
  props,
) => {
  return (
    <View>
      <Text>Hello from Address component.</Text>
      <View>{props.route.params.item.pickupDetails[0].address}</View>
    </View>
  );
};

export default AddressComponent;
