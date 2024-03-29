import React from 'react';
import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {
  dashColor,
  primaryDarkBlue,
  primaryGreen,
  pureWhite,
} from '../../assets/colors';
import {styles} from './style';
import Dash from 'react-native-dash';
import {useNavigation} from '@react-navigation/native';

const DropOffAddressComponent = ({item, index, showDash}) => {
  const printDetails = () => {
    console.log({item});
  };
  const lat = item.lat;
  const lng = item.lng;

  const navigation = useNavigation();

  const callHandler = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${item.user_name}`;
    } else {
      phoneNumber = `telpromt:${item.user_name}`;
    }
    Linking.openURL(phoneNumber);
  };

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
          <Text style={{color: pureWhite, textAlign: 'center', fontSize: 12}}>
            {index + 1}
          </Text>
        </View>
        <View style={styles.dropoffAddressContainer}>
          <Text numberOfLines={1} style={styles.address}>
            {item.address}
          </Text>
        </View>
      </View>
      <View style={styles.pickUpAddressContainer}>
        {/* <View style={styles.verticalDash}></View> */}
        {showDash ? (
          <Dash
            dashStyle={{width: 1, backgroundColor: dashColor}}
            style={{flexDirection: 'column'}}
          />
        ) : null}
        <View style={styles.addressAndOtherDropoffDetailsContainer}>
          <View style={styles.otherDropoffDetailsContainer}>
            <Text style={styles.otherDropOffDetails}>{item.user_name} </Text>
            <Text style={styles.otherDropOffDetails}>({item.user_phone})</Text>
            {item.user_apartment ? (
              <>
                <Text>, </Text>
                <Text style={styles.otherDropOffDetails}>
                  {item.user_apartment},{' '}
                </Text>
              </>
            ) : null}
          </View>
          {item.user_landmark ? (
            <Text style={styles.otherDropOffDetails}>{item.user_landmark}</Text>
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

export default DropOffAddressComponent;
