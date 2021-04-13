import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {backgroundColor} from '../../styles/commonStyle';
import {DriverProfile, removeToken, getHeaders, ContactUs} from '../../api/api';
import {secondarybackgroundColor} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import api from '../../api/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext, UserContext} from '../../routes/RootStackNavigation';

const SettingsScreen = ({navigation, driveData}) => {
  const [driverProfile, setDriverProfile] = useState('');
  const [headers, setHeaders] = useState(null);
  const [token, setToken] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);
  // const [userData, setUserData] = useState('');

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      setHeaders(_headers);
    };
    fetchHeader();
  }, []);
  console.log(user);

  // const userData = user;

  // function getDriverProfileHandler(_headers) {
  //   api
  //     .get(DriverProfile, {
  //       headers: _headers,
  //     })
  //     .then(response => {
  //       setDriverProfile(response.data);
  //     })
  //     .catch(error => {
  //       console.log({error});
  //     });
  // }
  const logOut = async () => {
    try {
      const logOutValue = await removeToken();
      if (logOutValue) {
        // ToastAndroid.show('You are logged out!', ToastAndroid.SHORT);
        Alert.alert('Log out', 'Are you sure you want to log out?', [
          {
            text: 'No',
            onPress: () => console.log('Log out cancelled.'),
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => setToken(null),
          },
        ]);
        // setToken(null);
      } else {
        ToastAndroid.show('Error logging out', ToastAndroid.SHORT);
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
        ToastAndroid.show('Your message has been posted', ToastAndroid.SHORT);
      })
      .catch(error => {
        console.log({error});
      });
  }

  return (
    <SafeAreaView style={backgroundColor.container}>
      <StatusBar backgroundColor={secondarybackgroundColor} />

      <View style={styles.headerContainer}>
        <Text style={styles.settingsText}>Settings</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View>{driveData}</View>
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
          <Text style={styles.name}>{user.user.name}</Text>
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
        <Text style={styles.phone}>{user.user.phone}</Text>
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
    </SafeAreaView>
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
