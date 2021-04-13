import {StyleSheet} from 'react-native';
import {
  cardBorderColor,
  dashColor,
  iconColor,
  primarybackgroundColor,
  primaryDarkBlue,
  primaryGreen,
  pureBlack,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';

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
  dropOffContainer: {
    // marginBottom: 20.5,
    // borderBottomWidth: 1,
    // borderBottomColor: cardBorderColor,
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
    // flexDirection: 'row',
    marginTop: 14,
    marginLeft: 20,
    flexDirection: 'row',
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
  },
  addressContainer: {
    marginTop: 4,
  },
  address: {
    fontSize: 14,
    fontFamily: NunitoFont,
    color: pureBlack,
    flexWrap: 'wrap',
    flex: 1,
    width: '70%',
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
    // maxWidth: 240,
    alignSelf: 'stretch',
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
  dropoffAddressContainer: {
    flex: 1,
    marginLeft: 10,
  },
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
  pickUpAddressContainer: {
    marginLeft: 29.5,
    flexDirection: 'row',
    marginTop: 4,
  },
  otherPickupDetailsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  addressAndIconsContainer: {
    flexDirection: 'row',
  },
  addressAndOtherDetailsContainer: {
    marginLeft: 18.5,
  },
  pickupNumberContainer: {
    // marginTop: 17,
    marginLeft: 20,
    flexDirection: 'row',
  },
  otherDropoffDetailsContainer: {
    flexDirection: 'row',
  },
  addressAndOtherDropoffDetailsContainer: {
    marginBottom: 18.5,
    marginLeft: 18.5,
  },
});
