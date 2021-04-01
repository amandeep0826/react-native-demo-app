import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {
  cardBorderColor,
  dashColor,
  iconColor,
  primarybackgroundColor,
  primaryDarkBlue,
  primaryGreen,
  pureBlack,
  pureWhite,
  secondarybackgroundColor,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {backgroundColor} from '../../styles/commonStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import AddressComponent from './AddressComponent';

const JobDetailScreen = props => {
  return (
    <ScrollView style={backgroundColor.container}>
      <View style={styles.nameAndPriceContainer}>
        <Image
          style={styles.profilePic}
          source={{
            uri:
              'https://ca.slack-edge.com/TC9LHABTP-U01J3U0JKHS-129560ba72fa-192',
          }}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.johnDoeText}>John Doe</Text>
          <Text styles={styles.singleDeliveryText}>Single Delivery</Text>
        </View>
        <View style={styles.chargesContainer}>
          <Text style={styles.chargesText}>
            ${props.route.params.item.delivered_charges}
          </Text>
          <Text style={styles.timeFlexibleText}>Time Flexible</Text>
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
        {/* <AddressComponent
          pickupAddress=""
          user_name=""
          user_phone=""
          user_apartment=""
          user_landmark=""
        /> */}
        <View style={styles.pickupAddressContainer}>
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

          <View style={styles.pickupDetailsContainer}>
            <View style={styles.verticalDash}></View>
            <View style={styles.pickupAddress}>
              <View style={styles.addressContainer}>
                <Text style={styles.address}>
                  {props.route.params.item.pickupDetails[0].address}
                </Text>
              </View>
              <View style={[styles.pickupOtherDetails, {marginTop: 4}]}>
                <Text style={styles.otherPickupDetails}>
                  {props.route.params.item.pickupDetails[0].user_name}{' '}
                </Text>
                <Text style={styles.otherPickupDetails}>
                  ({props.route.params.item.pickupDetails[0].user_phone}),{' '}
                </Text>
                <Text style={styles.otherPickupDetails}>
                  {props.route.params.item.pickupDetails[0].user_apartment},{' '}
                </Text>
                <Text style={styles.otherPickupDetails}>
                  {props.route.params.item.pickupDetails[0].user_landmark}
                </Text>
              </View>
            </View>
            <View style={styles.iconsContainer}>
              <View style={styles.sendIconContainer}>
                <MaterialCommunityIcons
                  style={styles.iconStyles}
                  name="send"
                  size={24}
                  color={pureWhite}
                />
              </View>
              <View style={styles.phoneIconContainer}>
                <MaterialCommunityIcons
                  style={styles.iconStyles}
                  name="phone"
                  size={24}
                  color={pureWhite}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.pickupAddressContainer}>
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
            <Text style={styles.pickupPointText}>DROP OFF POINT</Text>
          </View>

          <View style={styles.pickupDetailsContainer}>
            <View style={styles.dropoffAddress}>
              <View style={styles.addressContainer}>
                <Text style={styles.address}>
                  {props.route.params.item.dropoffDetails[0].address}
                </Text>
              </View>
              <View style={[styles.dropoffOtherDetails, {marginTop: 4}]}>
                <Text style={styles.otherDropoffDetails}>
                  {props.route.params.item.dropoffDetails[0].user_name}{' '}
                </Text>
                <Text style={styles.otherDropoffDetails}>
                  ({props.route.params.item.dropoffDetails[0].user_phone}),{' '}
                </Text>
                <Text style={styles.otherDropoffDetails}>
                  {props.route.params.item.dropoffDetails[0].user_apartment},{' '}
                </Text>
                <Text
                  style={[styles.otherDropoffDetails, {marginBottom: 20.5}]}>
                  {props.route.params.item.dropoffDetails[0].user_landmark}
                </Text>
              </View>
            </View>
            <View style={styles.iconsContainer}>
              <View style={styles.sendIconContainer}>
                <MaterialCommunityIcons
                  style={styles.iconStyles}
                  name="send"
                  size={24}
                  color={pureWhite}
                />
              </View>
              <View style={styles.phoneIconContainer}>
                <MaterialCommunityIcons
                  style={styles.iconStyles}
                  name="phone"
                  size={24}
                  color={pureWhite}
                />
              </View>
            </View>
          </View>
        </View>
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
      <View style={styles.deliveryStatusContainer}>
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
      </View>
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
    marginTop: 23,
    marginBottom: 22.5,
  },
  chargesContainer: {
    marginTop: 23,
    marginLeft: 95,
  },
  pickUpContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: cardBorderColor,
  },
  pickupDateContainer: {
    marginLeft: 20,
    marginTop: 16.4,
    marginBottom: 16.5,
  },
  pickupTimeContainer: {
    marginLeft: 172,
    marginTop: 16.4,
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
  sendIconContainer: {
    backgroundColor: primaryDarkBlue,
    height: 32,
    width: 32,
    borderRadius: 50,
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
    marginHorizontal: 20,
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
});

export default JobDetailScreen;
