import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  dashColor,
  primaryDarkBlue,
  primaryGreen,
  pureWhite,
} from '../../assets/colors';
import {styles} from './style';
import Dash from 'react-native-dash';

const ReturnDeliveryAddressComponent = (
  {
    pickupAddress,
    dropOffAddress,
    user_name,
    user_phone,
    user_apartment,
    user_landmark,
    delivery_user_name,
    delivery_user_phone,
    delivery_user_apartment,
    delivery_user_landmark,
  },
  props,
) => {
  return (
    <View style={styles.returnDeliveryContainer}>
      <View>
        <Text style={styles.locationText}>RETURN DELIVERY</Text>

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
            style={{flexDirection: 'column'}}
          />
          <View style={styles.addressAndOtherDetailsContainer}>
            <Text style={styles.address}>{pickupAddress}</Text>
            <View style={styles.otherPickupDetailsContainer}>
              <Text style={styles.otherPickupDetails}>{user_name} </Text>
              <Text style={styles.otherPickupDetails}>({user_phone}), </Text>

              {user_apartment !== null ? (
                <Text style={styles.otherPickupDetails}>
                  {user_apartment},{' '}
                </Text>
              ) : null}
            </View>
            <Text style={styles.otherPickupDetails}>{user_landmark}</Text>
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
      <View>
        <View style={styles.dropOffDotContainer}>
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
          <View style={styles.addressAndOtherDetailsContainer}>
            <Text style={styles.address}>{dropOffAddress}</Text>
            <View style={styles.otherPickupDetailsContainer}>
              <Text style={styles.otherPickupDetails}>
                {delivery_user_name}{' '}
              </Text>
              <Text style={styles.otherPickupDetails}>
                ({delivery_user_phone}),{' '}
              </Text>
              <Text style={styles.otherPickupDetails}>
                {delivery_user_apartment},{' '}
              </Text>
            </View>
            <Text style={styles.otherPickupDetails}>
              {delivery_user_landmark}
            </Text>
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
    </View>
  );
};

export default ReturnDeliveryAddressComponent;
