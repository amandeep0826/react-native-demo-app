import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  dashColor,
  pureBlack,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import Dash from 'react-native-dash';

const {width, height} = Dimensions.get('window');

export default function JobsCard({
  item,
  onPress,
  onAccept,
  setSpinner,
  spinnerControl,
}) {
  // const date = item.pickupDetails[0].pickup_date;
  // const dateArray = date.split(/(\s+)/);
  // // console.log(date);

  // // console.log(dateArray); // ["my", " ", "car", " ", "is", " ", "red"]
  // pickUpDate = dateArray[0];
  // pickUpTime = dateArray[2];
  // console.log(dateArray[0]);
  // console.log(dateArray[2]);

  return (
    <TouchableOpacity
      style={styles.cardView}
      activeOpacity={0.7}
      onPress={() => {
        onPress();
      }}>
      <View style={styles.topContainer}>
        <View style={styles.nameAndImageContainer}>
          <Image
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              marginTop: 18,
              marginLeft: 20,
            }}
            // source={{
            //   uri:
            //     'https://ca.slack-edge.com/TC9LHABTP-U01J3U0JKHS-129560ba72fa-192',
            // }}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.johnDoeText}>
              {item.pickupDetails[0].user_name}
            </Text>
            {item.deliver_type_id == 1 ? (
              <Text style={styles.singleDeliveryText}>Single Delivery</Text>
            ) : item.deliver_type_id == 2 ? (
              <Text>Return Delivery</Text>
            ) : (
              <Text>Traxi Run</Text>
            )}
          </View>
        </View>
        {/* <Image style={styles.image}/> */}

        <View style={styles.chargesContainer}>
          {/* <Text>{item.name}</Text> */}
          <Text style={styles.chargesText}>$ {item.delivered_charges}</Text>
          {item.time_sensitive == 1 ? (
            <Text style={styles.timeFlexibleText}>Time Flexible</Text>
          ) : (
            <Text style={styles.timeFlexibleText}>Time Sensitive</Text>
          )}
        </View>
      </View>
      <View style={{backgroundColor: '#FFDE67', height: 2, padding: 1}}></View>
      <View style={styles.middleContainer}>
        <View style={styles.pickUpDateContainer}>
          <Text style={styles.pickUpDateText}>PICKUP DATE</Text>
          <Text style={styles.pickUpDate}>
            {item.pickup_date.split(' ')[0]}
          </Text>
        </View>
        <View style={styles.pickUpTimeContainer}>
          <Text style={styles.pickUpTimeText}>PICKUP TIME</Text>
          <Text style={styles.pickUpTime}>
            {item.pickup_time.split(' ')[1]}
          </Text>
        </View>
      </View>
      <View style={{backgroundColor: '#FFDE67', height: 2, padding: 1}}></View>
      <View style={styles.bottomContainer}>
        <View style={{flexDirection: 'row', marginTop: 14.5}}>
          <View
            style={{
              backgroundColor: '#009957',
              height: 18,
              width: 18,
              borderRadius: 10,
              marginLeft: 20,
            }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                height: 8,
                width: 8,
                borderRadius: 10,
                marginTop: 5,
              }}></View>
          </View>
          <Text style={styles.pickupPointText}>PICKUP POINT</Text>
        </View>
        <View style={styles.pickUpPointContainer}>
          {/* <View style={styles.dashedLine}></View> */}
          <Dash
            dashStyle={{width: 1, backgroundColor: dashColor}}
            style={{flexDirection: 'column', marginLeft: 29.5}}
          />
          <Text style={styles.pickupPoint}>
            {item.pickupDetails[0].address}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 3.5}}>
          <View
            style={{
              backgroundColor: '#0031A3',
              height: 18,
              width: 18,
              borderRadius: 10,
              marginLeft: 20,
            }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                height: 8,
                width: 8,
                borderRadius: 10,
                marginTop: 5,
              }}></View>
          </View>
          {item.dropoffDetails.length > 1 ? (
            <Text style={styles.pickupPointText}>
              {item.dropoffDetails.length} DROP OFF POINTS
            </Text>
          ) : (
            <Text style={styles.pickupPointText}>DROP OFF POINT</Text>
          )}
        </View>
        {item.dropoffDetails.length == 1 ? (
          <Text style={styles.dropoffPoint}>
            {item.dropoffDetails[0].address}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.acceptButtonContainer}
        onPress={() => {
          onAccept();
          setSpinner(true);
          spinnerControl();
        }}>
        <Text style={styles.acceptButtonText}>ACCEPT</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: tertiarybackgroundColor,
    shadowOpacity: 10,
    alignSelf: 'stretch',
    borderRadius: 6,
    marginBottom: 41,
    elevation: 3,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  nameContainer: {
    marginLeft: 10,
    marginTop: 20,
  },
  nameAndImageContainer: {
    flexDirection: 'row',
  },
  chargesContainer: {
    marginTop: 20,
    marginRight: 20,
  },
  johnDoeText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: NunitoFont,
  },
  singleDeliveryText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    marginTop: 4,
  },
  chargesText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: NunitoFont,
  },
  timeFlexibleText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    marginTop: 4,
  },
  middleContainer: {
    flexDirection: 'row',
    marginTop: -15,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  pickUpDateContainer: {
    marginLeft: 20,
  },
  pickUpDateText: {
    marginTop: 31,
    color: '#404040',
    fontSize: 12,
    fontFamily: NunitoFont,
  },
  pickUpDate: {
    color: '#000000',
    fontSize: 14,
    marginTop: 3,
    fontFamily: NunitoFont,
    fontWeight: 'bold',
  },
  pickUpTimeContainer: {
    marginRight: 30,
  },
  pickUpTimeText: {
    marginTop: 31,
    color: '#404040',
    fontSize: 12,
    fontFamily: NunitoFont,
  },
  pickUpTime: {
    color: '#000000',
    fontSize: 14,
    marginTop: 3,
    fontFamily: NunitoFont,
    fontWeight: 'bold',
  },
  bottomContainer: {
    justifyContent: 'space-between',
  },
  pickupPointText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: NunitoFont,
    marginLeft: 13,
  },
  dropoffPointText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: NunitoFont,
    marginTop: 29,
    marginLeft: 13,
  },
  pickUpPointContainer: {
    flexDirection: 'row',
  },
  dashedLine: {
    backgroundColor: pureBlack,
    width: 1,
    marginLeft: 29.5,
  },
  pickupPoint: {
    color: '#009957',
    marginLeft: 21.5,
    fontSize: 14,
    fontFamily: NunitoFont,
    marginTop: 2,
    marginBottom: 20,
    width: '80%',
  },
  dropoffPoint: {
    color: '#0031A3',
    marginLeft: 51,
    fontSize: 14,
    fontFamily: NunitoFont,
    marginTop: 2,
  },
  acceptButtonContainer: {
    elevation: 3,
    backgroundColor: '#FF148E',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 295,
    alignSelf: 'center',
    marginTop: 18,
    height: 43,
    marginBottom: -20,
    marginHorizontal: 20,
  },
  acceptButtonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Nunito-Regular',
    fontWeight: 'bold',
  },
});
