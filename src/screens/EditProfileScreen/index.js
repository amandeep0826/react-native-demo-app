import React, {useEffect, useState, useContext} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api, {
  DriverProfile,
  getHeaders,
  UpdateDriverProfile,
} from '../../api/api';
import {primarybackgroundColor, primarycolor} from '../../assets/colors';
import {UserContext} from '../../routes/RootStackNavigation';
import {backgroundColor} from '../../styles/commonStyle';
import NameCard from './ProfileDetailsCard';
import {styles} from './styles';

const EditProfileScreen = () => {
  const [driverProfile, setDriverProfile] = useState('');
  const [headers, setHeaders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useContext(UserContext);

  // const [name, setName] = useState('');

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

  // const updateName = () => {
  //   setName(name);
  // };

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
        // console.log({headers});
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
        setIsLoading(false);
      })
      .catch(error => {
        console.log({error});
        // console.log({headers});
      });
  };

  return (
    <ScrollView style={backgroundColor.container}>
      {/* {isLoading == true ? (
        <ActivityIndicator
          size="large"
          color={primarycolor}
          style={{
            marginTop: 20,
            backgroundColor: primarybackgroundColor,
          }}
        />
      ) : ( */}
      <View style={styles.bodyContainer}>
        {/* <Button
          title="CHoose from phone"
          onPress={() => {
            chooseFromPhone();
          }}
        />
        <Button
          title="CHoose from Camera"
          onPress={() => {
            openCamera();
          }}
        /> */}
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
              chooseFromPhone();
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
      {/* )} */}
    </ScrollView>
  );
};

export default EditProfileScreen;
