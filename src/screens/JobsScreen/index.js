import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import api, {Deliveries, getHeaders} from '../../api/api';
import {primarybackgroundColor, primarycolor} from '../../assets/colors';
import {backgroundColor} from '../../styles/commonStyle';
import JobsCard from './JobsCard';
import styles from './style';

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

export default JobScreen;
