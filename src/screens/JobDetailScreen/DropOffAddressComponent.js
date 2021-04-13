import React from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {primaryDarkBlue, primaryGreen, pureWhite} from '../../assets/colors';
import {styles} from './style';

const DropOffAddressComponent = ({item}) => {
  const printDetails = () => {
    console.log({item});
  };
  console.log({item});

  return (
    <View style={styles.dropOffContainer}>
      <View style={styles.pickupNumberContainer}>
        <View
          style={{
            backgroundColor: primaryDarkBlue,
            height: 18,
            width: 18,
            borderRadius: 10,
          }}>
          <View style={{}}>
            <Text style={{color: pureWhite, textAlign: 'center', fontSize: 12}}>
              1
            </Text>
          </View>
        </View>
        <View style={styles.dropoffAddressContainer}>
          <Text style={styles.address}>{item.address}</Text>
        </View>
      </View>
      <View style={styles.pickUpAddressContainer}>
        <View style={styles.verticalDash}></View>
        <View style={styles.addressAndOtherDropoffDetailsContainer}>
          <View style={styles.otherDropoffDetailsContainer}>
            <Text style={styles.otherPickupDetails}>{item.user_name} </Text>
            <Text style={styles.otherPickupDetails}>({item.user_phone}), </Text>
            <Text style={styles.otherPickupDetails}>
              {item.user_apartment},{' '}
            </Text>
          </View>
          <Text style={styles.otherPickupDetails}>{item.user_landmark}</Text>
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

export default DropOffAddressComponent;
