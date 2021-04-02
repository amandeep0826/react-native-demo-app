import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import api, {Deliveries, getHeaders} from '../../api/api';
import {primarybackgroundColor, primarycolor} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {backgroundColor} from '../../styles/commonStyle';
import JobsCard from './JobsCard';
// import styles from './style';

const JobScreen = ({navigation, ...props}) => {
  const [deliveriesJobs, setDeliveriesJobs] = useState('');
  const [headers, setHeaders] = useState(null);
  const [loading, setLoading] = useState(true);
  const dropDownOptions = ['Recent Posted', 'Time', 'Payment', 'Distance'];

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      setHeaders(_headers);
      getDeliveriesFromAPI(_headers, 1);
    };
    if (deliveriesJobs === '') fetchHeader();
  }, []);

  function getDeliveriesFromAPI(_headers, sorting) {
    api
      .get(Deliveries(sorting), {
        headers: _headers,
      })
      .then(response => {
        setDeliveriesJobs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log({error});
      });
  }
  return (
    <View style={backgroundColor.mainContainer}>
      <View style={styles.jobsHeader}>
        <Image
          style={styles.mainLogo}
          source={require('../../assets/traxiTextLogo.png')}
        />
      </View>
      <View style={styles.jobsContainer}>
        <View style={styles.sortedBoxContainer}>
          <Text style={styles.sortByText}>Sort By:</Text>
          <ModalDropdown
            options={dropDownOptions}
            defaultValue="Recent Posted"
            style={styles.modalStyle}
            dropdownStyle={styles.dropdownStyle}
            dropdownTextStyle={styles.dropdownTextStyle}
            textStyle={styles.TextStyle}
            onSelect={data => {
              setLoading(true);
              getDeliveriesFromAPI(headers, data + 1);
            }}
          />
        </View>

        {loading ? (
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
            data={deliveriesJobs.deliveries}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  getDeliveriesFromAPI(headers, 1);
                }}
              />
            }
            style={{marginTop: 20}}
            keyExtractor={(item, index) => 'key' + index}
            ListEmptyComponent={() => <Text>No Data found</Text>}
            renderItem={({item}) => {
              return (
                <JobsCard
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
    </View>
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
    marginHorizontal: 20,
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
  },
  jobsHeader: {
    backgroundColor: '#FFD439',
    height: 60,
    elevation: 3,
  },
});

export default JobScreen;
