import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
} from 'react-native';
import {backgroundColor} from '../../styles/commonStyle';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalDropdown from 'react-native-modal-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  primarybackgroundColor,
  primarycolor,
  pureWhite,
  secondarybackgroundColor,
} from '../../assets/colors';
import api, {Bookings, getHeaders} from '../../api/api';
import JobsCard from '../JobsScreen/JobsCard';
import BookingsCard from './BookingsCard';

const {width, height} = Dimensions.get('window');

const BookingsScreen = ({navigation}) => {
  const [deliveriesJobs, setDeliveriesJobs] = useState([]);
  const [headers, setHeaders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(2);
  const [offset, setOffset] = useState(1);
  const [showLoadmore, setShowLoadmore] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [sorting, setSorting] = useState(4);
  const [dropDownSort, setDropDownSort] = useState(0);
  const dropDownOptions = ['Recent Accepted', 'Earliest Pickup'];
  const [deliveryCount, setDeliveryCount] = useState(0);

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      setHeaders(_headers);
      console.log(_headers);
      getDeliveriesFromAPI(_headers, status, sorting, offset).then(response => {
        setDeliveriesJobs(response.data.deliveries);
        setDeliveryCount(response.data.count);
      });
    };
    // if (deliveriesJobs.length === 0)
    fetchHeader();
  }, [status]);

  const getDeliveriesFromAPI = (_headers, _status, _sorting, _offset) => {
    return api
      .get(Bookings(_status, _sorting, _offset), {
        headers: _headers,
      })
      .then(response => {
        setLoading(false);
        return response;
      })
      .catch(error => {
        setLoading(false);
        console.log({error});
      });
  };

  const spinnerControl = () => {
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  };

  const loadMore = () => {
    getDeliveriesFromAPI(headers, status, sorting, offset + 1).then(
      response => {
        setOffset(offset + 1);
        if (response.data.deliveries.length == 0) {
          setShowLoadmore(false);
          return;
        }
        const newData = [...deliveriesJobs, ...response.data.deliveries];
        setDeliveriesJobs(newData);
        showLoadmore(false);
      },
    );
  };

  const refresh = () => {
    getDeliveriesFromAPI(headers, status, sorting, offset).then(response => {
      setOffset(1);
      const newData = response.data.deliveries;
      setDeliveriesJobs(newData);
    });
  };

  const changeSorting = _sorting => {
    if (_sorting === sorting) {
      return;
    }
    getDeliveriesFromAPI(headers, status, _sorting, 1).then(response => {
      // setOffset(1);
      setSorting(_sorting);
      const newData = response.data.deliveries;
      setDeliveriesJobs(newData);
    });
  };

  const renderFooter = () => {
    return showLoadmore ? (
      <ActivityIndicator
        color={primarycolor}
        style={{marginBottom: 10}}
        size="large"
      />
    ) : null;
  };

  return (
    <SafeAreaView style={backgroundColor.container}>
      <StatusBar backgroundColor={secondarybackgroundColor} />
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
      <View style={styles.headerContainer}>
        <Text style={styles.bookingsText}>Bookings</Text>
      </View>
      <View>
        {/* <Text style={styles.bookingsText}>Bookings</Text> */}
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity style={styles.deliveriesButton} activeOpacity={0.7}>
            <MaterialCommunityIcons
              style={styles.carIcon}
              name="car-side"
              size={30}
            />
            <Text style={styles.deliveryText}>Deliveries</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.storesButton} activeOpacity={0.7}>
            <MaterialCommunityIcons
              style={styles.cartIcon}
              name="cart"
              size={26}
            />
            <Text style={styles.storesText}>Stores</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bookingsContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              status == 2
                ? styles.upcomingButton
                : styles.unselectedUpcomingBox,
            ]}
            activeOpacity={0.7}
            onPress={() => {
              setStatus(2);
              setSpinner(true);
              spinnerControl();
            }}>
            <Text
              style={[
                status == 2
                  ? styles.upcomingText
                  : styles.unselectedUpcomingText,
              ]}>
              UPCOMING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              status == 4
                ? styles.selectedDeliveredBox
                : styles.deliveredButton,
            ]}
            activeOpacity={0.7}
            onPress={() => {
              setStatus(4);
              // setLoading(false);
              setSpinner(true);
              spinnerControl();
            }}>
            <Text
              style={[
                status == 4
                  ? styles.selectedDeliveredText
                  : styles.deliveredText,
              ]}>
              DELIVERED
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              status == 6
                ? styles.selectedCancelledBox
                : styles.CancelledButton,
            ]}
            activeOpacity={0.7}
            onPress={() => {
              setStatus(6);
              // setLoading(false);
              setSpinner(true);
              spinnerControl();
            }}>
            <Text
              style={[
                status == 6
                  ? styles.selectedCancelledText
                  : styles.cancelledText,
              ]}>
              CANCELLED
            </Text>
          </TouchableOpacity>
        </View>
        {status == 2 ? (
          <View style={styles.sortedBoxContainer}>
            <Text style={styles.sortByText}>Sort By:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ModalDropdown
                options={dropDownOptions}
                children={
                  <View style={styles.dropDownChildrenStyle}>
                    {dropDownSort == 0 ? (
                      <Text>Recent Accepted</Text>
                    ) : (
                      <Text>Earliest Pickup</Text>
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
                defaultValue="Recent Posted"
                style={styles.modalStyle}
                dropdownStyle={styles.dropdownStyle}
                dropdownTextStyle={styles.dropdownTextStyle}
                textStyle={styles.TextStyle}
                onSelect={data => {
                  setLoading(true);
                  changeSorting(data + 1);
                  setDropDownSort(data);
                }}
              />
            </View>
          </View>
        ) : null}
        <FlatList
          data={deliveriesJobs}
          extraData={deliveriesJobs}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            loadMore();
          }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                refresh();
              }}
            />
          }
          style={{marginTop: 20}}
          keyExtractor={(item, index) => 'key' + index}
          ListEmptyComponent={() => (
            <Text style={styles.noDeliveryText}>No Delivery found</Text>
          )}
          renderItem={({item}) => {
            return (
              <BookingsCard
                setSpinner={() => setSpinner(true)}
                spinnerControl={() => spinnerControl()}
                onAccept={() => acceptDeliveryHandler(item)}
                onPress={() => {
                  navigation.navigate('BookingsDetailScreen', {item, status});
                }}
                item={item}
                status={status}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 48,
    backgroundColor: secondarybackgroundColor,
    elevation: 2,
  },
  sortedBoxContainer: {
    backgroundColor: '#FFF6C7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
    borderRightColor: '#DFAF004D',
    marginTop: 20,
    elevation: 2,
  },
  bookingsContainer: {
    backgroundColor: '#FFDE67',
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingsText: {
    fontFamily: NunitoFont,
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerButtonContainer: {
    flexDirection: 'row',
  },
  deliveriesButton: {
    backgroundColor: '#FF148E',
    height: 50,
    width: width / 2,
    flexDirection: 'row',
  },
  storesButton: {
    backgroundColor: '#FFF6C7',
    height: 50,
    width: width / 2,
    flexDirection: 'row',
  },
  deliveryText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 14,
    marginLeft: 10,
  },
  storesText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 14,
    marginLeft: 10,
  },
  carIcon: {
    marginLeft: 36,
    marginTop: 10,
  },
  cartIcon: {
    marginLeft: 36,
    marginTop: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  upcomingButton: {
    backgroundColor: '#FF148E',
    height: 36,
    width: 108,
  },
  deliveredButton: {
    backgroundColor: '#FFDE67',
    height: 36,
    width: 108,
    borderColor: '#FF148E',
    borderWidth: 1,
  },
  upcomingText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    textAlign: 'center',
    marginTop: 8,
    color: '#FFFFFF',
  },
  deliveredText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    textAlign: 'center',
    marginTop: 8,
    color: '#FF148E',
  },
  sortByContainer: {
    flexDirection: 'row',
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
    backgroundColor: '#FFDE67',
    marginVertical: 8,
    marginRight: 20,
    alignSelf: 'center',
  },
  dropdownStyle: {
    backgroundColor: '#FFDE67',
    height: 80,
    width: 170,
    backgroundColor: '#FFDE67',
  },
  dropdownTextStyle: {
    fontSize: 14,
    marginLeft: 16,
    backgroundColor: '#FFDE67',
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
  unselectedUpcomingBox: {
    backgroundColor: primarybackgroundColor,
    height: 36,
    width: 108,
    borderColor: primarycolor,
    borderWidth: 1,
  },
  unselectedUpcomingText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    textAlign: 'center',
    marginTop: 8,
    color: primarycolor,
  },
  selectedDeliveredBox: {
    backgroundColor: primarycolor,
    height: 36,
    width: 108,
    borderColor: primarycolor,
    borderWidth: 1,
  },
  selectedDeliveredText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    textAlign: 'center',
    marginTop: 8,
    color: pureWhite,
  },
  noDeliveryText: {
    fontFamily: NunitoFont,
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  selectedCancelledBox: {
    backgroundColor: primarycolor,
    height: 36,
    width: 108,
    borderColor: primarycolor,
    borderWidth: 1,
  },
  selectedCancelledText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    textAlign: 'center',
    marginTop: 8,
    color: pureWhite,
  },
  CancelledButton: {
    backgroundColor: primarybackgroundColor,
    height: 36,
    width: 108,
    borderColor: primarycolor,
    borderWidth: 1,
  },
  cancelledText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    textAlign: 'center',
    marginTop: 8,
    color: primarycolor,
  },
});

export default BookingsScreen;
