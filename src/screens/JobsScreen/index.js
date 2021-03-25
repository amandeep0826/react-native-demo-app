import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import api, {AcceptDelivery, Deliveries, getHeaders} from '../../api/api';
import {backgroundColor} from '../../styles/commonStyle';
import JobsCard from './JobsCard';
import styles from './style';
import {primarycolor, primarybackgroundColor} from '../../assets/colors';

const JobScreen = ({navigation}) => {
  const [deliveriesJobs, setDeliveriesJobs] = useState('');
  const [headers, setHeaders] = useState(null);

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      setHeaders(_headers);
      getDeliveriesFromAPI(_headers);
    };
    if (deliveriesJobs === '') fetchHeader();
  }, []);

  function getDeliveriesFromAPI(_headers) {
    api
      .get(Deliveries, {
        headers: _headers,
      })
      .then(response => {
        setDeliveriesJobs(response.data);
      })
      .catch(error => {
        console.log({error});
      });
  }

  // console.log('deliveryJobs', deliveriesJobs);
  // console.log('headers', headers);

  if (!deliveriesJobs || !headers) {
    return (
      <ActivityIndicator
        size="large"
        color={primarycolor}
        style={{
          flex: 1,
          alignContent: 'center',
          backgroundColor: primarybackgroundColor,
        }}
      />
    );
  }

  return (
    <View style={backgroundColor.mainContainer}>
      <View style={styles.jobsHeader}>
        <View style={styles.mainLogoContainer}>
          <Image
            style={styles.mainLogo}
            source={require('../../assets/traxiTextLogo.png')}
          />
        </View>
      </View>
      <View style={styles.jobsContainer}>
        <View style={styles.sortedBoxContainer}>
          <Text style={styles.sortByText}>Sort By:</Text>
          <ModalDropdown
            options={['Recent Posted', 'Time', 'Payment', 'Distance']}
            onSelect={() => {
              alert('Hi');
            }}
            defaultValue="Recent Posted"
            style={styles.modalStyle}
            dropdownStyle={styles.dropdownStyle}
            dropdownTextStyle={styles.dropdownTextStyle}
            textStyle={styles.TextStyle}
          />
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={deliveriesJobs.deliveries}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({item}) => {
              return <JobsCard item={item} />;
            }}
          />
          {/* <TouchableOpacity style={styles.acceptButtonContainer}>
            <Text style={styles.acceptButtonText}>ACCEPT</Text>
          </TouchableOpacity> */}
        </View>
        {/* <View style={styles.spaceBetweenContainer}></View> */}
      </View>
      {/* <TouchableOpacity style={styles.acceptButtonContainer}>
        <Text style={styles.acceptButtonText}>ACCEPT</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default JobScreen;
