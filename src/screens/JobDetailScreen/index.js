import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import api, {AcceptDelivery, getHeaders} from '../../api/api';
import {
  cardBorderColor,
  dashColor,
  iconColor,
  primarybackgroundColor,
  primaryDarkBlue,
  primaryGreen,
  pureBlack,
  pureWhite,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {backgroundColor} from '../../styles/commonStyle';
import DropOffAddressComponent from './DropOffAddressComponent';
import PickUpAddressComponent from './PickUpAddressComponent';
import ReturnDeliveryAddressComponent from './ReturnDeliveryAddressComponent';
import SingleDropOffAddressComponent from './SingleDropOffAddressComponent';
import {useNavigation} from '@react-navigation/native';

const JobDetailScreen = (props, onAccept) => {
  const [deliveriesJobs, setDeliveriesJobs] = useState([]);
  const [headers, setHeaders] = useState(null);
  const navigation = useNavigation();

  const printFun = () => {
    console.log(props.route.params.item.dropoffDetails);
  };

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      setHeaders(_headers);
    };
    if (deliveriesJobs.length === 0) fetchHeader();
  }, []);

  const acceptDeliveryHandler = item => {
    api
      .put(
        AcceptDelivery,
        {
          delivery_id: props.route.params.item.id,
          job_type: props.route.params.item.job_type,
          pickup_time: props.route.params.item.pickup_time,
          estimated_time: props.route.params.item.estimated_delivery_time,
        },
        {
          headers: headers,
        },
      )
      .then(response => {
        removeJob(props.route.params.item.id);
        console.log({response});
        navigation.goBack();
      })
      .catch(error => {
        console.log({error});
      });
  };

  const removeJob = id => {
    const newJob = [...deliveriesJobs];
    const filteredJob = newJob.filter(job => job.id !== id);
    setDeliveriesJobs(filteredJob);
  };

  return (
    <ScrollView style={backgroundColor.container}>
      <View style={styles.nameAndPriceContainer}>
        <Image
          style={styles.profilePic}
          // source={{
          //   uri:
          //     'https://ca.slack-edge.com/TC9LHABTP-U01J3U0JKHS-129560ba72fa-192',
          // }}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.johnDoeText}>
            {props.route.params.item.pickupDetails[0].user_name}
          </Text>
          <Text styles={styles.singleDeliveryText}>Single Delivery</Text>
        </View>
        <View style={styles.chargesContainer}>
          <Text style={styles.chargesText}>
            ${props.route.params.item.delivered_charges}
          </Text>
          {props.route.params.item.time_sensitive == 1 ? (
            <Text style={styles.timeFlexibleText}>Time Flexible</Text>
          ) : (
            <Text style={styles.timeFlexibleText}>Time Sensitive</Text>
          )}
        </View>
      </View>
      <View style={styles.pickUpContainer}>
        <View style={styles.pickupDateContainer}>
          <Text style={styles.pickUpDateText}>PICKUP DATE</Text>
          <Text style={styles.pickUpDate}>
            {props.route.params.item.pickupDetails[0].pickup_date}
          </Text>
        </View>
        <View style={styles.pickupTimeContainer}>
          <Text style={styles.pickUpTimeText}>PICKUP TIME</Text>
          <Text style={styles.pickUpTime}>
            {props.route.params.item.pickupDetails[0].pickup_time}
          </Text>
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>LOCATIONS</Text>
        <PickUpAddressComponent
          pickupAddress={props.route.params.item.pickupDetails[0].address}
          user_name={props.route.params.item.pickupDetails[0].user_name}
          user_phone={props.route.params.item.pickupDetails[0].user_phone}
          user_apartment={
            props.route.params.item.pickupDetails[0].user_apartment
          }
          user_landmark={props.route.params.item.pickupDetails[0].user_landmark}
        />
        {props.route.params.item.deliver_type_id == 1 ? (
          <SingleDropOffAddressComponent
            pickupAddress={props.route.params.item.dropoffDetails[0].address}
            user_name={props.route.params.item.dropoffDetails[0].user_name}
            user_phone={props.route.params.item.dropoffDetails[0].user_phone}
            user_apartment={
              props.route.params.item.dropoffDetails[0].user_apartment
            }
            user_landmark={
              props.route.params.item.dropoffDetails[0].user_landmark
            }
          />
        ) : props.route.params.item.deliver_type_id == 2 ? (
          <View>
            <SingleDropOffAddressComponent
              pickupAddress={props.route.params.item.dropoffDetails[0].address}
              user_name={props.route.params.item.dropoffDetails[0].user_name}
              user_phone={props.route.params.item.dropoffDetails[0].user_phone}
              user_apartment={
                props.route.params.item.dropoffDetails[0].user_apartment
              }
              user_landmark={
                props.route.params.item.dropoffDetails[0].user_landmark
              }
            />
            <ReturnDeliveryAddressComponent
              pickupAddress={props.route.params.item.pickupDetails[1].address}
              user_name={props.route.params.item.pickupDetails[1].user_name}
              user_phone={props.route.params.item.pickupDetails[1].user_phone}
              user_apartment={
                props.route.params.item.pickupDetails[1].user_apartment
              }
              user_landmark={
                props.route.params.item.pickupDetails[1].user_landmark
              }
              dropOffAddress={props.route.params.item.dropoffDetails[1].address}
              delivery_user_name={
                props.route.params.item.dropoffDetails[1].user_name
              }
              delivery_user_phone={
                props.route.params.item.dropoffDetails[1].user_phone
              }
              delivery_user_apartment={
                props.route.params.item.dropoffDetails[1].user_apartment
              }
              delivery_user_landmark={
                props.route.params.item.dropoffDetails[1].user_landmark
              }
            />
          </View>
        ) : (
          <FlatList
            data={props.route.params.item.dropoffDetails}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <View style={styles.dropoffDotContainer}>
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
                  <Text style={styles.pickupPointText}>
                    {props.route.params.item.dropoffDetails.length} DROP OFF
                    POINTS
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({item, index}) => {
              return (
                <DropOffAddressComponent
                  item={item}
                  index={index}
                  showDash={
                    index !== props.route.params.item.dropoffDetails.length - 1
                  }
                />
              );
            }}
          />
        )}
      </View>
      <View style={styles.packageTypeContainer}>
        <Text style={styles.packageTypeText}>PACKAGE TYPE</Text>
        <Text style={styles.packageDetails}>
          Accessories and Fragrance | Beauty | Food and Caterers.
        </Text>
      </View>
      <View style={styles.clientMessageContainer}>
        <Text style={styles.clientMessageText}>CLIENT MESSAGE</Text>
        <Text style={styles.clientMessage}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
      <View style={styles.accepOrDeliverContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.acceptButtonContainer}
          onPress={() => {
            // onAccept();
            // // printFun();
            acceptDeliveryHandler();
          }}>
          <Text style={styles.acceptButtonText}>ACCEPT</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.deliveryStatusContainer}>
        <Text style={styles.deliveryStatusText}>Delivery Status</Text>
        <View style={styles.statusDropDownContainer}>
          <ModalDropdown
            options={['Package Delivered', 'Delivery Failure']}
            onSelect={() => {
              alert('Hi');
            }}
            defaultValue="Update Status"
            style={styles.modalStyle}
            dropdownStyle={styles.dropdownStyle}
            dropdownTextStyle={styles.dropdownTextStyle}
            textStyle={styles.TextStyle}
          />
        </View>
      </View> */}
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: primarybackgroundColor,
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 20,
  },
  nameAndPriceContainer: {
    flexDirection: 'row',
    borderBottomColor: cardBorderColor,
    borderBottomWidth: 1,
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
  nameContainer: {
    marginLeft: 10,
    marginVertical: 22,
  },
  chargesContainer: {
    marginTop: 23,
    marginLeft: 'auto',
    marginRight: 20,
  },
  pickUpContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: cardBorderColor,
  },
  pickupDateContainer: {
    marginLeft: 20,
    marginVertical: 16.5,
  },
  pickupTimeContainer: {
    marginVertical: 16.5,
    marginLeft: 'auto',
    marginRight: 30,
  },
  pickUpDateText: {
    color: iconColor,
    fontSize: 12,
    fontFamily: NunitoFont,
  },
  pickUpDate: {
    color: pureBlack,
    fontSize: 14,
    fontFamily: NunitoFont,
    fontWeight: 'bold',
  },
  pickUpTimeText: {
    color: iconColor,
    fontSize: 12,
    fontFamily: NunitoFont,
  },
  pickUpTime: {
    color: pureBlack,
    fontSize: 14,
    fontFamily: NunitoFont,
    fontWeight: 'bold',
  },
  locationContainer: {
    borderBottomColor: cardBorderColor,
    borderBottomWidth: 1,
  },
  locationText: {
    marginTop: 20.5,
    marginLeft: 20,
    fontFamily: NunitoFont,
    fontSize: 14,
    fontWeight: 'bold',
  },
  pickupDotContainer: {
    flexDirection: 'row',
    marginTop: 14,
    marginLeft: 20,
  },
  pickupPointText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: NunitoFont,
    marginLeft: 10,
  },
  verticalDash: {
    width: 1,
    textDecorationStyle: 'dashed',
    backgroundColor: dashColor,
    marginLeft: 29.5,
    marginTop: 6.5,
  },
  pickupDetailsContainer: {
    flexDirection: 'row',
  },
  pickupOtherDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  navigationButton: {
    height: 32,
    width: 32,
  },
  callButton: {
    height: 32,
    width: 32,
    marginLeft: 15,
  },
  phoneIconContainer: {
    backgroundColor: primaryGreen,
    height: 32,
    width: 32,
    borderRadius: 50,
    marginLeft: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginRight: 20,
    marginLeft: 'auto',
  },
  iconStyles: {
    alignSelf: 'center',
    marginTop: 3,
  },
  pickupAddress: {
    color: pureBlack,
    fontSize: 14,
    fontFamily: NunitoFont,
    marginLeft: 18.5,
    width: 220,
  },
  dropoffAddress: {
    color: pureBlack,
    fontSize: 14,
    fontFamily: NunitoFont,
    marginLeft: 48,
    width: 220,
  },
  dropoffDotContainer: {
    flexDirection: 'row',
    marginTop: 6.5,
    marginLeft: 20,
    marginBottom: 17,
  },
  addressContainer: {
    marginTop: 4,
  },
  address: {
    fontSize: 14,
    fontFamily: NunitoFont,
    color: pureBlack,
  },
  otherPickupDetails: {
    fontSize: 14,
    fontFamily: NunitoFont,
    color: primaryGreen,
  },
  otherDropoffDetails: {
    fontSize: 14,
    fontFamily: NunitoFont,
    color: primaryDarkBlue,
  },
  dropoffOtherDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  packageTypeText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    color: pureBlack,
    marginTop: 20.5,
    marginLeft: 20,
  },
  packageDetails: {
    fontSize: 14,
    fontFamily: NunitoFont,
    color: iconColor,
    marginTop: 12,
    marginLeft: 20,
    marginBottom: 20.5,
  },
  packageTypeContainer: {
    borderBottomColor: cardBorderColor,
    borderBottomWidth: 1,
  },
  clientMessageContainer: {
    borderBottomColor: cardBorderColor,
    borderBottomWidth: 1,
  },
  clientMessageText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    color: pureBlack,
    marginTop: 20.5,
    marginLeft: 20,
  },
  clientMessage: {
    fontSize: 14,
    fontFamily: NunitoFont,
    color: iconColor,
    marginTop: 12,
    marginLeft: 20,
    marginBottom: 20.5,
  },
  deliveryStatusText: {
    fontFamily: NunitoFont,
    marginTop: 32.5,
    marginLeft: 20,
  },
  deliveryStatusContainer: {
    flexDirection: 'row',
  },
  statusDropDownContainer: {
    marginTop: 20.5,
  },
  modalStyle: {
    width: 170,
    height: 36,
    backgroundColor: tertiarybackgroundColor,
    marginVertical: 8,
    marginLeft: 62,
    marginRight: 36,
    alignSelf: 'center',
  },
  dropdownStyle: {
    backgroundColor: tertiarybackgroundColor,
    width: 170,
    height: 78,
  },
  dropdownTextStyle: {
    fontSize: 14,
    marginLeft: 16,
    backgroundColor: tertiarybackgroundColor,
    color: pureBlack,
  },
  TextStyle: {
    fontFamily: NunitoFont,
    color: pureBlack,
    fontSize: 14,
    marginTop: 9,
    marginBottom: 8,
    marginLeft: 20,
    backgroundColor: tertiarybackgroundColor,
  },
  dropoffAddressContainer: {},
  accepOrDeliverContainer: {
    padding: 20,
  },
  acceptButtonContainer: {
    elevation: 3,
    backgroundColor: '#FF148E',
    borderRadius: 4,
    paddingVertical: 8,
    height: 42,
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

export default JobDetailScreen;
