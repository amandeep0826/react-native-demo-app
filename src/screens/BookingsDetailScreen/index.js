import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import api, {
  AcceptDelivery,
  DeliveryManagement,
  getHeaders,
} from '../../api/api';
import Modal from 'react-native-modal';
import SelectPicker from 'react-native-form-select-picker';
import {
  cardBorderColor,
  dashColor,
  fourthBackGroundColor,
  iconColor,
  primarybackgroundColor,
  primarycolor,
  primaryDarkBlue,
  primaryGreen,
  pureBlack,
  pureWhite,
  secondarybackgroundColor,
  tertiarybackgroundColor,
} from '../../assets/colors';
import ImagePicker from 'react-native-image-crop-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import Spinner from 'react-native-loading-spinner-overlay';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {backgroundColor} from '../../styles/commonStyle';
import DropOffAddressComponent from '../JobDetailScreen/DropOffAddressComponent';
import PickUpAddressComponent from '../JobDetailScreen/PickUpAddressComponent';
import ReturnDeliveryAddressComponent from '../JobDetailScreen/ReturnDeliveryAddressComponent';
import SingleDropOffAddressComponent from '../JobDetailScreen/SingleDropOffAddressComponent';

const BookingsDetailScreen = (props, {route}) => {
  const [deliveriesJobs, setDeliveriesJobs] = useState([]);
  const [headers, setHeaders] = useState(null);
  const [dropDownSort, setDropDownSort] = useState(0);
  const dropDownOptions = ['Package Delivered', 'Delivery Failure'];
  const [spinner, setSpinner] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState();
  const navigation = useNavigation();
  const [selectedReason, setSelectedReason] = useState(1);

  const {item} = props.route.params;

  const options = ['Apple', 'Banana', 'Orange'];

  const printFun = () => {
    console.log(props.route.params.item.dropoffDetails);
  };

  const spinnerControl = () => {
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      setHeaders(_headers);
    };
    console.log(props.route.params.status);
    if (deliveriesJobs.length === 0) fetchHeader();
  }, []);

  const deliveryCancellation = () => {
    api
      .put(
        DeliveryManagement,
        {
          cancel_delivery_id: props.route.params.item.id,
          pickup_id: props.route.params.item.pickupDetails[0].id,
          dropoff_id: props.route.params.item.dropoffDetails[0].id,
          cancellation_reason: 'string',
          cancelled_id: selectedReason,
          complete: 0,
        },
        {
          headers: headers,
        },
      )
      .then(response => {
        console.log('cancelled success');
      })
      .catch(error => {
        console.log({error});
      });
  };

  const deliveryCompletion = () => {
    api
      .put(
        DeliveryManagement,
        {
          delivery_id: props.route.params.item.id,
          driver_reached_at: 1,
          pickup_id: props.route.params.item.pickupDetails[0].id,
          dropoff_id: props.route.params.item.dropoffDetails[0].id,
          package_image: 'string',
          distance_travelled: 'string',
          complete: 1,
        },
        {
          headers: headers,
        },
      )
      .then(response => {
        console.log('Delivery Success');
      })
      .catch(error => {
        console.log({error});
      });
  };
  return (
    <ScrollView style={backgroundColor.container}>
      <Spinner
        visible={spinner}
        size="large"
        customIndicator={
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color={primarycolor} />
          </View>
        }
      />
      {props.route.params.status == 2 ? (
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
      ) : null}
      <View style={styles.pickUpContainer}>
        <View style={styles.pickupDateContainer}>
          {props.route.params.status == 4 ? (
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: NunitoFont,
                fontSize: 14,
              }}>
              DELIVERY DETAILS
            </Text>
          ) : null}
          <Text style={styles.pickUpDateText}>PICKUP DATE</Text>
          <Text style={styles.pickUpDate}>
            {props.route.params.item.pickupDetails[0].pickup_date.split(' ')[0]}
          </Text>
          {props.route.params.status == 4 ? (
            <>
              <Text style={styles.pickUpDateText}>SERVICE TYPE</Text>
              {props.route.params.item.deliver_type_id == 1 ? (
                <Text style={styles.pickUpTime}>Single Delivery</Text>
              ) : props.route.params.item.deliver_type_id == 2 ? (
                <Text style={styles.pickUpTime}>Return Delivery</Text>
              ) : (
                <Text style={styles.pickUpTime}>Traxi Run</Text>
              )}
            </>
          ) : null}
        </View>
        <View style={styles.pickupTimeContainer}>
          {props.route.params.status == 4 ? (
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: NunitoFont,
                fontSize: 14,
                color: primaryGreen,
              }}>
              DELIVERED
            </Text>
          ) : null}
          <Text style={styles.pickUpTimeText}>PICKUP TIME</Text>
          <Text style={styles.pickUpTime}>
            {props.route.params.item.pickupDetails[0].pickup_time.split(' ')[1]}
          </Text>
          {props.route.params.status == 4 ? (
            <>
              <Text style={styles.pickUpDateText}>REQUEST TYPE</Text>
              {props.route.params.item.time_sensitive == 0 ? (
                <Text style={[styles.pickUpTime, {color: primaryDarkBlue}]}>
                  Time-Flexible
                </Text>
              ) : props.route.params.item.time_sensitive == 1 ? (
                <Text style={[styles.pickUpTime, {color: primaryDarkBlue}]}>
                  Time-Sensitive
                </Text>
              ) : null}
            </>
          ) : null}
        </View>
      </View>
      {props.route.params.status == 4 ? (
        <View style={styles.clientContainer}>
          <Text style={styles.clientDetailsText}>CLIENT DETAILS</Text>
          <View style={styles.clientDetailsContainer}>
            <Image
              style={styles.profilePic}
              source={{
                uri:
                  'https://ca.slack-edge.com/TC9LHABTP-U01J3U0JKHS-129560ba72fa-192',
              }}
            />
            <View style={{marginLeft: 14}}>
              <Text style={[styles.clientDetailsText, {fontSize: 16}]}>
                {props.route.params.item.pickupDetails[0].user_name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.clientDetailsText,
                    {fontSize: 16, fontWeight: 'normal'},
                  ]}>
                  You Rated:
                </Text>
                <Image
                  style={[styles.starImage, {marginLeft: 8}]}
                  source={require('../../assets/star_fill_large.png')}
                />
                <Image
                  style={styles.starImage}
                  source={require('../../assets/star_fill_large.png')}
                />
                <Image
                  style={styles.starImage}
                  source={require('../../assets/star_fill_large.png')}
                />
                <Image
                  style={styles.starImage}
                  source={require('../../assets/star_fill_large.png')}
                />
                <Image
                  style={styles.starImage}
                  source={require('../../assets/star_medium_outline.png')}
                />
                <Text style={styles.ratings}>4.0</Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}
      {props.route.params.status == 4 ? (
        <View style={styles.costContainer}>
          <Text style={styles.deliveryCostText}>DELIVERY COST</Text>
          <Text style={styles.deliveryCost}>
            ${props.route.params.item.delivered_charges}
          </Text>
        </View>
      ) : null}
      <View style={styles.locationContainer}>
        {props.route.params.status == 4 ? (
          <Text style={styles.locationText}>DISTANCE & LOCATIONS</Text>
        ) : (
          <Text style={styles.locationText}>LOCATIONS</Text>
        )}
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
      {props.route.params.status == 2 ? (
        <View style={styles.clientMessageContainer}>
          <Text style={styles.clientMessageText}>CLIENT MESSAGE</Text>
          <Text style={styles.clientMessage}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      ) : null}
      {props.route.params.status == 2 ? (
        <View style={styles.accepOrDeliverContainer}>
          <View style={styles.deliveryStatusContainer}>
            <Text style={styles.deliveryStatusText}>Delivery Status:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ModalDropdown
                options={dropDownOptions}
                children={
                  <View style={styles.dropDownChildrenStyle}>
                    {dropDownSort == 0 ? (
                      <Text>Package Delivered</Text>
                    ) : dropDownSort == 1 ? (
                      <Text>Delivery Failure</Text>
                    ) : (
                      <Text>Update Status</Text>
                    )}
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        marginLeft: 'auto',
                        marginRight: 16,
                      }}
                      source={require('../../assets/drop_down.png')}
                    />
                  </View>
                }
                defaultValue="Update Status"
                style={styles.modalStyle}
                dropdownStyle={styles.dropdownStyle}
                dropdownTextStyle={styles.dropdownTextStyle}
                textStyle={styles.TextStyle}
                onSelect={data => {
                  // setLoading(true);
                  // changeSorting(data + 1);
                  setSpinner(true);
                  spinnerControl();
                  setDropDownSort(data);
                  toggleModal();
                }}
              />
            </View>
          </View>
        </View>
      ) : null}
      {props.route.params.status == 4 ? (
        <View style={styles.distanceDurationContainer}>
          <View style={styles.distanceDurationInnerContainer}>
            <View>
              <Text style={styles.deliveryDistance}>4.5</Text>
              <Text style={styles.deliveryDistanceText}>Distance</Text>
            </View>
            <View
              style={{
                backgroundColor: secondarybackgroundColor,
                width: 1,
              }}></View>
            <View>
              <Text style={styles.deliveryDistance}>
                {props.route.params.item.estimated_delivery_time}
              </Text>
              <Text style={styles.deliveryDistanceText}>Duration</Text>
            </View>
          </View>
        </View>
      ) : null}
      {dropDownSort == 0 ? (
        <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
          <View
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              backgroundColor: tertiarybackgroundColor,
            }}>
            <View
              style={{
                backgroundColor: secondarybackgroundColor,
                height: 80,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: secondarybackgroundColor,
                  justifyContent: 'center',
                  // alignSelf: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: NunitoFont,
                    width: 170,
                  }}>
                  Upload a Photo of Delivered Package
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                  }}>
                  <Image
                    source={require('../../assets/cancel.png')}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.uploadPackageImageBox}>
              <TouchableOpacity
                onPress={() => {
                  openCamera();
                }}>
                <Image
                  style={{
                    height: 45,
                    width: 45,
                    alignSelf: 'center',
                    marginTop: 45,
                  }}
                  source={require('../../assets/add_photo.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: tertiarybackgroundColor,
                paddingVertical: 20,
                paddingHorizontal: 12,
              }}>
              <TouchableOpacity
                onPress={() => {
                  deliveryCompletion();
                  navigation.navigate('DeliverySuccessScreen', {item});
                  toggleModal();
                }}
                activeOpacity={0.7}
                style={styles.submitButtonContainer}>
                <Text style={styles.submitButtonText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
          <View style={{borderRadius: 10, overflow: 'hidden'}}>
            <View
              style={{backgroundColor: secondarybackgroundColor, height: 60}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: secondarybackgroundColor,
                  justifyContent: 'center',
                  // alignSelf: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: NunitoFont,
                  }}>
                  Delivery Failure
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                  }}>
                  <Image
                    source={require('../../assets/cancel.png')}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.deliveryFailureReasonContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.refusalResonContainer}
                onPress={() => {
                  setSelectedReason(1);
                }}>
                {selectedReason == 1 ? (
                  <>
                    <Image
                      style={styles.clientRefusalReasonDotSelected}
                      source={require('../../assets/radio_button_checked.png')}
                    />
                    <Text style={styles.deliveryFailureReasonsSelected}>
                      Client Refused
                    </Text>
                  </>
                ) : (
                  <>
                    <Image
                      style={styles.clientRefusalReasonDotSelected}
                      source={require('../../assets/radio_button_unchecked.png')}
                    />
                    <Text style={styles.deliveryFailureReasonsUnselected}>
                      Client Refused
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.refusalResonContainer}
                onPress={() => {
                  setSelectedReason(2);
                }}>
                {selectedReason == 2 ? (
                  <>
                    <Image
                      style={styles.clientRefusalReasonDotSelected}
                      source={require('../../assets/radio_button_checked.png')}
                    />
                    <Text style={styles.deliveryFailureReasonsSelected}>
                      Client Unavailability
                    </Text>
                  </>
                ) : (
                  <>
                    <Image
                      style={styles.clientRefusalReasonDotSelected}
                      source={require('../../assets/radio_button_unchecked.png')}
                    />
                    <Text style={styles.deliveryFailureReasonsUnselected}>
                      Client Unavailability
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.refusalResonContainer}
                onPress={() => {
                  setSelectedReason(3);
                }}>
                {selectedReason == 3 ? (
                  <>
                    <Image
                      style={styles.clientRefusalReasonDotSelected}
                      source={require('../../assets/radio_button_checked.png')}
                    />
                    <Text style={styles.deliveryFailureReasonsSelected}>
                      Stuck in Traffic
                    </Text>
                  </>
                ) : (
                  <>
                    <Image
                      style={styles.clientRefusalReasonDotSelected}
                      source={require('../../assets/radio_button_unchecked.png')}
                    />
                    <Text style={styles.deliveryFailureReasonsUnselected}>
                      Stuck in Traffic
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.refusalResonContainer}
                onPress={() => {
                  setSelectedReason(4);
                }}>
                {selectedReason == 4 ? (
                  <>
                    <Image
                      style={styles.clientRefusalReasonDotSelected}
                      source={require('../../assets/radio_button_checked.png')}
                    />
                    <Text style={styles.deliveryFailureReasonsSelected}>
                      Inaccessible Location
                    </Text>
                  </>
                ) : (
                  <>
                    <Image
                      style={styles.clientRefusalReasonDotSelected}
                      source={require('../../assets/radio_button_unchecked.png')}
                    />
                    <Text style={styles.deliveryFailureReasonsUnselected}>
                      Inaccessible Location
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.refusalResonContainer}
                onPress={() => {
                  setSelectedReason(5);
                }}>
                {selectedReason == 5 ? (
                  <>
                    <Image
                      style={styles.clientRefusalReasonDotSelected}
                      source={require('../../assets/radio_button_checked.png')}
                    />
                    <Text style={styles.deliveryFailureReasonsSelected}>
                      Vehicle Complications
                    </Text>
                  </>
                ) : (
                  <>
                    <Image
                      style={styles.clientRefusalReasonDotSelected}
                      source={require('../../assets/radio_button_unchecked.png')}
                    />
                    <Text style={styles.deliveryFailureReasonsUnselected}>
                      Vehicle Complications
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: tertiarybackgroundColor,
                paddingVertical: 20,
                paddingHorizontal: 12,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.submitButtonContainer}
                onPress={() => {
                  deliveryCancellation();
                  toggleModal();
                  navigation.goBack();
                }}>
                <Text style={styles.submitButtonText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      {/* <SelectPicker
        onValueChang={value => {
          setSelected(value);
        }}
        selected={selected}>
        <SelectPicker.Item label="Client Refused" value="client refused" />
        <SelectPicker.Item label="Client Refused" value="client refused" />
        <SelectPicker.Item label="Client Refused" value="client refused" />
        <SelectPicker.Item label="Client Refused" value="client refused" />
        <SelectPicker.Item label="Client Refused" value="client refused" />
      </SelectPicker> */}
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
    marginTop: 12,
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
    marginTop: 12,
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
    fontWeight: 'bold',
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
    fontSize: 14,
    color: pureBlack,
    fontWeight: 'bold',
    marginTop: 8,
  },
  deliveryStatusContainer: {
    backgroundColor: primarybackgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 80,
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
  sortByText: {
    color: '#FFFFFF',
  },
  sortByText: {
    marginLeft: 20,
    marginVertical: 15,
    fontFamily: NunitoFont,
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  modalStyle: {
    width: 170,
    height: 36,
    backgroundColor: tertiarybackgroundColor,
    // marginVertical: 8,
    marginRight: 20,
    alignSelf: 'center',
  },
  dropdownStyle: {
    backgroundColor: '#FFDE67',
    height: 78,
    width: 170,
    backgroundColor: tertiarybackgroundColor,
  },
  dropdownTextStyle: {
    fontSize: 14,
    marginLeft: 16,
    backgroundColor: tertiarybackgroundColor,
    color: '#000000',
  },
  TextStyle: {
    fontFamily: NunitoFont,
    fontSize: 14,
    marginTop: 9,
    marginBottom: 8,
    marginLeft: 16,
    backgroundColor: '#FFDE67',
  },
  dropDownChildrenStyle: {
    flexDirection: 'row',
    marginVertical: 8,
    marginLeft: 16,
  },
  uploadPackageImageBox: {
    backgroundColor: pureWhite,
    height: 150,
    width: 275,
    alignSelf: 'center',
    marginVertical: 20,
  },
  submitButtonContainer: {
    elevation: 3,
    backgroundColor: primarycolor,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '95%',
    alignSelf: 'center',
    height: 43,
  },
  submitButtonText: {
    fontSize: 14,
    color: pureWhite,
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: NunitoFont,
    fontWeight: 'bold',
  },
  deliveryFailureReasonContainer: {
    backgroundColor: tertiarybackgroundColor,
    paddingLeft: 30,
  },
  deliveryFailureReasons: {
    fontFamily: NunitoFont,
    fontSize: 16,
    marginLeft: 18,
    color: pureBlack,
  },
  clientContainer: {
    paddingHorizontal: 20,
    paddingVertical: 18.5,
    borderBottomWidth: 1,
    borderBottomColor: cardBorderColor,
  },
  clientDetailsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  clientDetailsText: {
    fontWeight: 'bold',
    fontFamily: NunitoFont,
    fontSize: 14,
  },
  starImage: {
    height: 20,
    width: 20,
  },
  ratings: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: NunitoFont,
    color: primarycolor,
    marginLeft: 6,
  },
  costContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 18.5,
    borderBottomColor: cardBorderColor,
    borderBottomWidth: 1,
  },
  deliveryCostText: {
    fontFamily: NunitoFont,
    fontSize: 14,
    color: pureBlack,
    fontWeight: 'bold',
  },
  deliveryCost: {
    fontFamily: NunitoFont,
    fontSize: 14,
    color: pureBlack,
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  distanceDurationContainer: {
    padding: 20,
  },
  distanceDurationInnerContainer: {
    backgroundColor: tertiarybackgroundColor,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  deliveryDistance: {
    fontSize: 18,
    color: primaryDarkBlue,
    fontFamily: NunitoFont,
  },
  deliveryDistanceText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    color: pureBlack,
  },
  refusalResonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  clientRefusalReasonDotSelected: {
    marginTop: 5,
    height: 15,
    width: 15,
  },
  clientRefusalReasonDotUnselected: {
    height: 15,
    width: 15,
    marginTop: 5,
  },
  deliveryFailureReasonsSelected: {
    fontFamily: NunitoFont,
    fontSize: 16,
    marginLeft: 18,
    color: primarycolor,
  },
  deliveryFailureReasonsUnselected: {
    fontFamily: NunitoFont,
    fontSize: 16,
    marginLeft: 18,
    color: pureBlack,
  },
});

export default BookingsDetailScreen;
