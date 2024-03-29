import React from 'react';
import {Image, Text, TouchableOpacity, View, Linking} from 'react-native';
import {dashColor, primaryGreen, pureWhite} from '../../assets/colors';
import {styles} from './style';
import Dash from 'react-native-dash';
import {useNavigation} from '@react-navigation/native';

const PickUpAddressComponent = (
  {
    pickupAddress,
    user_name,
    user_phone,
    user_apartment,
    user_landmark,
    lat,
    lng,
  },
  props,
) => {
  const navigation = useNavigation();

  const callHandler = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${user_phone}`;
    } else {
      phoneNumber = `telpromt:${user_phone}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.pickUpContainer}>
      <View style={styles.pickupDotContainer}>
        <View
          style={{
            backgroundColor: primaryGreen,
            height: 18,
            width: 18,
            borderRadius: 10,
          }}>
          <View
            style={{
              backgroundColor: pureWhite,
              alignSelf: 'center',
              height: 8,
              width: 8,
              borderRadius: 10,
              marginTop: 5,
            }}></View>
        </View>
        <Text style={styles.pickupPointText}>PICKUP POINT</Text>
      </View>
      <View style={styles.pickUpAddressContainer}>
        {/* <View style={styles.verticalDash}></View> */}
        <Dash
          dashStyle={{width: 1, backgroundColor: dashColor}}
          style={{flexDirection: 'column', height: 60}}
        />
        <View style={styles.addressAndOtherDetailsContainer}>
          <Text style={styles.address}>{pickupAddress}</Text>
          <View style={styles.otherPickupDetailsContainer}>
            <Text style={styles.otherPickupDetails}>{user_name} </Text>
            <Text style={styles.otherPickupDetails}>({user_phone}) </Text>
            {user_apartment ? (
              <>
                <Text>,</Text>
                <Text style={styles.otherPickupDetails}>
                  {user_apartment},{' '}
                </Text>
              </>
            ) : null}
          </View>
          {user_landmark ? (
            <Text style={styles.otherPickupDetails}>{user_landmark}</Text>
          ) : null}
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('MapsView', {lat, lng});
            }}>
            <Image
              style={styles.navigationButton}
              source={require('../../assets/navigation.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              callHandler();
            }}>
            <Image
              style={styles.callButton}
              source={require('../../assets/call.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PickUpAddressComponent;
