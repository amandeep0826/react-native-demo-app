import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalDropdown from 'react-native-modal-dropdown';
import api, {
  AcceptDelivery,
  acceptDeliveryHandler,
  Deliveries,
  getHeaders,
} from '../../api/api';
import {
  primarybackgroundColor,
  primarycolor,
  secondarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {backgroundColor} from '../../styles/commonStyle';
import JobsCard from './JobsCard';

const JobScreen = ({navigation, ...props}) => {
  const [deliveriesJobs, setDeliveriesJobs] = useState([]);
  const [headers, setHeaders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(1);
  const [showLoadmore, setShowLoadmore] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [itemId, setItemId] = useState('');
  const [sorting, setSorting] = useState(1);
  const [dropDownSort, setDropDownSort] = useState(0);

  const dropDownOptions = ['Recent Posted', 'Time', 'Payment', 'Distance'];

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      setHeaders(_headers);
      getDeliveriesFromAPI(_headers, sorting, offset).then(response => {
        setDeliveriesJobs(response.data.deliveries);
      });
    };
    if (deliveriesJobs.length === 0) fetchHeader();
  }, []);

  const loadMore = () => {
    getDeliveriesFromAPI(headers, sorting, offset + 1).then(response => {
      setOffset(offset + 1);
      if (response.data.deliveries.length == 0) {
        setShowLoadmore(false);
        return;
      }
      const newData = [...deliveriesJobs, ...response.data.deliveries];
      setDeliveriesJobs(newData);
    });
  };

  const refresh = () => {
    getDeliveriesFromAPI(headers, sorting, 1).then(response => {
      setOffset(1);
      const newData = response.data.deliveries;
      setDeliveriesJobs(newData);
    });
  };

  const changeSorting = _sorting => {
    if (_sorting === sorting) {
      return;
    }
    getDeliveriesFromAPI(headers, _sorting, 1).then(response => {
      setOffset(1);
      setSorting(_sorting);
      const newData = response.data.deliveries;
      setDeliveriesJobs(newData);
    });
  };

  const acceptDeliveryHandler = item => {
    api
      .put(
        AcceptDelivery,
        {
          delivery_id: item.id,
          job_type: item.job_type,
          pickup_time: item.pickup_time,
          estimated_time: item.estimated_delivery_time,
        },
        {
          headers: headers,
        },
      )
      .then(response => {
        removeJob(item.id);
      })
      .catch(error => {
        console.log({error});
      });
  };

  const getDeliveriesFromAPI = (_headers, _sorting, _offset) => {
    return api
      .get(Deliveries(_sorting, _offset), {
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

  const renderFooter = () => {
    return showLoadmore ? (
      <ActivityIndicator
        color={primarycolor}
        style={{marginBottom: 10}}
        size="large"
      />
    ) : null;
  };

  const removeJob = id => {
    const newJob = [...deliveriesJobs];
    const filteredJob = newJob.filter(job => job.id !== id);
    setDeliveriesJobs(filteredJob);
  };

  return (
    <SafeAreaView style={backgroundColor.mainContainer}>
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
      <View style={styles.jobsHeader}>
        <Image
          style={styles.mainLogo}
          source={require('../../assets/traxiTextLogo.png')}
        />
      </View>
      <View style={styles.jobsContainer}>
        <View style={styles.sortedBoxContainer}>
          <Text style={styles.sortByText}>Sort By:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ModalDropdown
              options={dropDownOptions}
              children={
                <View style={styles.dropDownChildrenStyle}>
                  {dropDownSort == 0 ? (
                    <Text>Recent Posted</Text>
                  ) : dropDownSort == 1 ? (
                    <Text>Time</Text>
                  ) : dropDownSort == 2 ? (
                    <Text>Payment</Text>
                  ) : (
                    <Text>Distance</Text>
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
        {loading && deliveriesJobs.length == 0 ? (
          <ActivityIndicator
            size="large"
            color={primarycolor}
            style={{
              marginTop: 20,
              backgroundColor: primarybackgroundColor,
            }}
          />
        ) : (
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
            ListEmptyComponent={() => <Text>No Data found</Text>}
            renderItem={({item}) => {
              return (
                <JobsCard
                  setSpinner={() => setSpinner(true)}
                  spinnerControl={() => spinnerControl()}
                  onAccept={() => acceptDeliveryHandler(item)}
                  onPress={() => {
                    navigation.navigate('JobsDetailScreen', {item});
                  }}
                  item={item}
                />
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainLogo: {
    alignSelf: 'center',
    height: 30,
    width: 184,
    marginBottom: 20,
    marginTop: 20,
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
    height: 162,
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
  jobsContainer: {
    backgroundColor: '#FFDE67',
    flex: 1,
    paddingHorizontal: 20,
  },
  jobsHeader: {
    backgroundColor: '#FFD439',
    height: 60,
    elevation: 3,
  },
  dropDownChildrenStyle: {
    flexDirection: 'row',
    marginVertical: 8,
    marginLeft: 16,
  },
});

export default JobScreen;
