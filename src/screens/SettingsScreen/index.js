import React, {useState, useEffect} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {backgroundColor} from '../../styles/commonStyle';
import {DriverProfile, removeToken, getHeaders, ContactUs} from '../../api/api';
import {secondarybackgroundColor} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import api from '../../api/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = ({navigation}) => {
  const [driverProfile, setDriverProfile] = useState('');
  const [headers, setHeaders] = useState(null);

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      setHeaders(_headers);
      getDriverProfileHandler(_headers);
    };
    if (driverProfile === '') fetchHeader();
  }, []);

  function getDriverProfileHandler(_headers) {
    api
      .get(DriverProfile, {
        headers: _headers,
      })
      .then(response => {
        setDriverProfile(response.data);
      })
      .catch(error => {
        console.log({error});
        // console.log({headers});
      });
  }
  const logOut = async () => {
    try {
      const logOutValue = await removeToken();
      if (logOutValue) {
        alert('You are logged out!');
        navigation.navigate('DriverLogin');
      } else {
        alert('Error logging out');
      }
    } catch (error) {
      console.log({error});
    }
  };

  function contactUsHandler() {
    api
      .post(
        ContactUs,
        {
          message: 'string',
        },
        {
          headers: headers,
        },
      )
      .then(response => {
        // console.log({response});
        alert('Your message has been posted.');
      })
      .catch(error => {
        console.log({error});
        // console.log({headers});
      });
  }

  // const updateProfileHandler = () => {
  //   api.put()
  // }

  return (
    <View style={backgroundColor.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.settingsText}>Settings</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Image
          style={{
            height: 130,
            width: 130,
            borderRadius: 100,
            marginTop: 30,
            alignSelf: 'center',
          }}
          // source={{uri: driverProfile.profile_image}}
          source={{
            uri:
              'https://ca.slack-edge.com/TC9LHABTP-U01J3U0JKHS-129560ba72fa-192',
          }}
        />
        <View style={styles.editNameContainer}>
          <Text style={styles.name}>{driverProfile.name}</Text>
          <MaterialCommunityIcons
            style={styles.pencilIcon}
            name="pencil-plus"
            size={24}
            color="#0031A3"
            onPress={() => {
              navigation.navigate('EditProfileScreen');
            }}
          />
        </View>
        <Text style={styles.phone}>{driverProfile.phone}</Text>
      </View>
      <TouchableOpacity
        style={styles.contactUsContainer}
        onPress={() => {
          contactUsHandler();
        }}>
        <View style={{flexDirection: 'row', marginVertical: 24}}>
          <MaterialCommunityIcons
            style={styles.phoneIcon}
            name="phone-in-talk"
            size={24}
            color="#0031A3"
          />
          <Text style={styles.contactUsText}>Contact Us</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logOutContainer}
        onPress={() => {
          logOut();
        }}>
        <View style={{flexDirection: 'row', marginVertical: 24}}>
          <MaterialCommunityIcons
            style={styles.logOutIcon}
            name="logout"
            size={24}
            color="#0031A3"
          />
          <Text style={styles.logOutText}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 48,
    backgroundColor: secondarybackgroundColor,
    elevation: 2,
  },
  settingsText: {
    fontFamily: NunitoFont,
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 20,
  },
  editNameContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignSelf: 'center',
  },
  bodyContainer: {
    alignSelf: 'center',
  },
  name: {
    fontSize: 22,
    fontFamily: NunitoFont,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  phone: {
    fontSize: 16,
    fontFamily: NunitoFont,
    textAlign: 'center',
    marginTop: 8,
  },
  pencilIcon: {
    marginLeft: 6,
    marginTop: 5,
  },
  contactUsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E8C857',
    borderBottomColor: '#E8C857',
    borderBottomWidth: 1,
  },
  contactUsText: {
    fontFamily: NunitoFont,
    fontSize: 16,
    marginLeft: 16.75,
  },
  logOutContainer: {
    flexDirection: 'row',
    borderBottomColor: '#E8C857',
    borderBottomWidth: 1,
  },
  logOutText: {
    fontFamily: NunitoFont,
    fontSize: 16,
    marginLeft: 16.75,
  },
  phoneIcon: {
    marginLeft: 22.75,
  },
  logOutIcon: {
    marginLeft: 22.75,
  },
});

export default SettingsScreen;
