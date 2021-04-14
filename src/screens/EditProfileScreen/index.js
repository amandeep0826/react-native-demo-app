import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api, {
  DriverProfile,
  getHeaders,
  UpdateDriverProfile,
} from '../../api/api';
import {UserContext} from '../../routes/RootStackNavigation';
import {backgroundColor} from '../../styles/commonStyle';
import NameCard from './ProfileDetailsCard';
import {styles} from './styles';

const EditProfileScreen = () => {
  const [driverProfile, setDriverProfile] = useState('');
  const [headers, setHeaders] = useState(null);
  const [user, setUser] = useContext(UserContext);

  const changeProfilePhoto = () => {
    Alert.alert('Add Photo', ' ', [
      {
        text: 'Take Photo',
        onPress: () => openCamera(),
      },
      {
        text: 'Choose from Gallery',
        onPress: () => chooseFromPhone(),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancelled Photo Selection'),
        style: 'cancel',
      },
    ]);
  };

  const chooseFromPhone = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
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
      getDriverProfileHandler(_headers);
    };
    if (driverProfile === '') fetchHeader();
  }, []);

  const getDriverProfileHandler = _headers => {
    api
      .get(DriverProfile, {
        headers: _headers,
      })
      .then(response => {
        setDriverProfile(response.data);
      })
      .catch(error => {
        console.log({error});
      });
  };

  const UpdateDriverProfileHandler = value => {
    let updateValue = {
      name: driverProfile.name,
      phone: driverProfile.phone,
      country_code: 'string',
      email: driverProfile.email,
      lat: 0,
      lng: 0,
      profile_image: 'string',
    };
    updateValue[Object.keys(value)[0]] = value[Object.keys(value)[0]];
    console.log({updateValue});
    api
      .put(UpdateDriverProfile, updateValue, {
        headers: headers,
      })
      .then(response => {
        console.log({response});
      })
      .catch(error => {
        console.log({error});
      });
  };

  return (
    <ScrollView style={backgroundColor.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={{
              height: 130,
              width: 130,
              borderRadius: 100,
              marginTop: 30,
              alignSelf: 'center',
            }}
            source={{
              uri:
                'https://ca.slack-edge.com/TC9LHABTP-U01J3U0JKHS-129560ba72fa-192',
            }}
          />
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={() => {
              changeProfilePhoto();
            }}>
            <MaterialCommunityIcons
              style={styles.cameraIcon}
              name="camera"
              size={18}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.editDetailsContainer}>
          <NameCard
            onSave={name => {
              UpdateDriverProfileHandler({name});
            }}
            iconName="account"
            title="Name"
            value={user.user.name}
          />
          <NameCard
            onSave={email => {
              UpdateDriverProfileHandler({email});
            }}
            iconName="email"
            title="Email"
            value={user.user.email}
          />
          <NameCard
            onSave={phone => {
              UpdateDriverProfileHandler({phone});
            }}
            iconName="phone"
            title="Phone Number"
            value={user.user.phone}
          />
          <NameCard iconName="lock" title="Password" value="******" />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
