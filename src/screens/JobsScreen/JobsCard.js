import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NunitoFont} from '../../assets/nunitoFont';
import {DeliveryTitleComponent} from './DeliveryTItleComponent';
import {OrderTitleComponent} from './OrderTitleComponent';
import api, {AcceptDelivery, getHeaders, getToken} from '../../api/api';

const {width, height} = Dimensions.get('window');

export default function JobsCard({item}) {
  const [headers, setHeaders] = useState(null);

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      setHeaders(_headers);
      getDeliveriesFromAPI(_headers);
    };
    fetchHeader();
  }, []);

  const acceptDeliveryHandler = () => {
    api
      .put(AcceptDelivery, {
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MTEsImFwcF92ZXJzaW9uIjoxfSwiaWF0IjoxNjE2NTkwNzUwfQ.JdLewnAVsC0ljVMSE1vltmx_yrV91y2CAFjw00bQrLU',
        },
      })
      .then(response => {
        navigation.navigate('DummyScreen');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // console.log(headers);

  return (
    <View style={styles.cardView}>
      <View style={styles.topContainer}>
        {/* <Image style={styles.image}/> */}
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            marginTop: 18,
            marginLeft: 20,
          }}
          source={{
            uri:
              'https://ca.slack-edge.com/TC9LHABTP-U01J3U0JKHS-129560ba72fa-192',
          }}
        />
        <View style={styles.nameContainer}>
          {/* <Text>{item.name}</Text> */}
          <Text style={styles.johnDoeText}>John Doe</Text>
          <Text style={styles.singleDeliveryText}>Single Delivery</Text>
        </View>
        <View style={styles.chargesContainer}>
          {/* <Text>{item.name}</Text> */}
          <Text style={styles.chargesText}>{item.delivered_charges}</Text>
          <Text style={styles.timeFlexibleText}>Time Flexible</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#FFDE67', height: 2, padding: 1}}></View>
      <View style={styles.middleContainer}>
        <View>
          <Text style={styles.pickUpDateText}>PICKUP DATE</Text>
          <Text style={styles.pickUpDate}>
            {item.pickupDetails[0].pickup_date}
          </Text>
        </View>
        <View>
          <Text style={styles.pickUpTimeText}>PICKUP TIME</Text>
          <Text style={styles.pickUpTime}>
            {item.pickupDetails[0].pickup_time}
          </Text>
        </View>
      </View>
      <View style={{backgroundColor: '#FFDE67', height: 2, padding: 1}}></View>
      <View style={styles.bottomContainer}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: '#009957',
              height: 18,
              width: 18,
              borderRadius: 10,
              marginTop: 29,
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
        <Text style={styles.pickupPoint}>{item.pickupDetails[0].address}</Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: '#0031A3',
              height: 18,
              width: 18,
              borderRadius: 10,
              marginTop: 29,
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
          <Text style={styles.pickupPointText}>DROPOFF POINT</Text>
        </View>
        <Text style={styles.dropoffPoint}>
          {item.dropoffDetails[0].address}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.acceptButtonContainer}
        onPress={() => {
          acceptDeliveryHandler();
        }}>
        <Text style={styles.acceptButtonText}>ACCEPT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    // height: height / 2,
    // height: 355,
    width: 335,
    backgroundColor: '#FFF6C7',
    shadowColor: '#DFAF0080',
    shadowOpacity: 10,
    alignSelf: 'center',
    borderRadius: 6,
    marginBottom: 41,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  nameContainer: {
    marginLeft: 10,
    marginTop: 20,
  },
  chargesContainer: {
    marginLeft: 55,
    marginTop: 20,
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
  },
  pickUpDateText: {
    marginLeft: 20,
    marginTop: 31,
    color: '#404040',
    fontSize: 12,
    fontFamily: NunitoFont,
  },
  pickUpDate: {
    color: '#000000',
    fontSize: 14,
    marginLeft: 20,
    marginTop: 3,
    fontFamily: NunitoFont,
    fontWeight: 'bold',
  },
  pickUpTimeText: {
    marginLeft: 134,
    marginTop: 31,
    color: '#404040',
    fontSize: 12,
    fontFamily: NunitoFont,
  },
  pickUpTime: {
    color: '#000000',
    fontSize: 14,
    marginLeft: 134,
    marginTop: 3,
    fontFamily: NunitoFont,
    fontWeight: 'bold',
  },
  bottomContainer: {},
  pickupPointText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: NunitoFont,
    marginTop: 29,
    marginLeft: 13,
  },
  dropoffPointText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: NunitoFont,
    marginTop: 29,
    marginLeft: 13,
  },
  pickupPoint: {
    color: '#009957',
    marginLeft: 51,
    marginRight: 52,
    fontSize: 14,
    fontFamily: NunitoFont,
    marginTop: 2,
  },
  dropoffPoint: {
    color: '#0031A3',
    marginLeft: 51,
    marginRight: 52,
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
