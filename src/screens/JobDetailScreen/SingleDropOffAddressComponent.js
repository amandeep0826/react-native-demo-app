import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {primaryDarkBlue, pureWhite} from '../../assets/colors';
import {styles} from './style';

const SingleDropOffAddressComponent = (
  {pickupAddress, user_name, user_phone, user_apartment, user_landmark},
  props,
) => {
  return (
    <View style={styles.dropOffContainer}>
      <View style={styles.pickupDotContainer}>
        <View
          style={{
            backgroundColor: primaryDarkBlue,
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
        <Text style={styles.pickupPointText}>DROP OFF POINT</Text>
      </View>
      <View style={styles.pickUpAddressContainer}>
        <View style={styles.addressAndOtherDropOffDetailsContainer}>
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
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              style={styles.navigationButton}
              source={require('../../assets/navigation.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
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

export default SingleDropOffAddressComponent;
