import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api, {
  DriverProfile,
  getHeaders,
  UpdateDriverProfile,
} from '../../api/api';
import {
  iconColor,
  primarycolor,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {UserContext} from '../../routes/RootStackNavigation';
import {backgroundColor} from '../../styles/commonStyle';
import NameCard from './ProfileDetailsCard';
import {styles} from './styles';

const EditProfileScreen = () => {
  const [driverProfile, setDriverProfile] = useState('');
  const [headers, setHeaders] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
  const UpdateName = name => {
    let updateValue = {
      name: name,
    };
    api
      .put(UpdateDriverProfile, updateValue, {
        headers: headers,
      })
      .then(response => {
        // console.log({response});
        // const updatedName = name;
        // AsyncStorage.setItem('user.name', updatedName);
        console.log('Profile has been updated');
        // console.log({name});
        AsyncStorage.getItem('user')
          .then(user => {
            // the string value read from AsyncStorage has been assigned to data
            // console.log(user);

            // transform it back to an object
            user = JSON.parse(user);
            // console.log(user);

            // Decrement
            user.user.name = name;
            // console.log(user);
            setUser(user);

            //save the value to AsyncStorage again
            AsyncStorage.setItem('user', JSON.stringify(user));
          })
          .done();
        // const newUser = {...user};
        // newUser.user.name = name;
        // console.log({newUser});
        // setUser(newUser);
      })
      .catch(error => {
        console.log({error});
      });
  };
  const UpdateEmail = email => {
    let updateValue = {
      email: email,
    };
    api
      .put(UpdateDriverProfile, updateValue, {
        headers: headers,
      })
      .then(response => {
        // console.log({response});
        console.log('Profile has been updated');
        AsyncStorage.getItem('user')
          .then(user => {
            // the string value read from AsyncStorage has been assigned to data
            // console.log(user);

            // transform it back to an object
            user = JSON.parse(user);
            // console.log(user);

            // Decrement
            user.user.email = email;
            // console.log(user);
            setUser(user);

            //save the value to AsyncStorage again
            AsyncStorage.setItem('user', JSON.stringify(user));
          })
          .done();
      })
      .catch(error => {
        console.log({error});
      });
  };
  const UpdateNumber = phone => {
    let updateValue = {
      phone: phone,
    };
    api
      .put(UpdateDriverProfile, updateValue, {
        headers: headers,
      })
      .then(response => {
        // console.log({response});
        console.log('Profile has been updated');
        AsyncStorage.getItem('user')
          .then(user => {
            // the string value read from AsyncStorage has been assigned to data
            // console.log(user);

            // transform it back to an object
            user = JSON.parse(user);
            // console.log(user);

            // Decrement
            user.user.phone = phone;
            // console.log(user);
            setUser(user);

            //save the value to AsyncStorage again
            AsyncStorage.setItem('user', JSON.stringify(user));
          })
          .done();
      })
      .catch(error => {
        console.log({error});
      });
  };
  const spinnerControl = () => {
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
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
            <ActivityIndicator size="large" color={primarycolor} style={{}} />
          </View>
        }
      />
      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text>Change Password</Text>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}>
              <Image source={require('../../assets/cancel.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
              UpdateName(name);
            }}
            setSpinner={() => setSpinner(true)}
            spinnerControl={() => spinnerControl()}
            updateProfilePage={_headers => {
              getDriverProfileHandler(_headers);
            }}
            iconName="account"
            title="Name"
            // value={user.user.name}
            value={user.user.name}
          />
          <NameCard
            onSave={email => {
              UpdateEmail(email);
            }}
            setSpinner={() => setSpinner(true)}
            spinnerControl={() => spinnerControl()}
            updateProfilePage={_headers => {
              getDriverProfileHandler(_headers);
            }}
            iconName="email"
            title="Email"
            // value={user.user.email}
            value={user.user.email}
          />
          <NameCard
            onSave={phone => {
              UpdateNumber(phone);
            }}
            setSpinner={() => setSpinner(true)}
            spinnerControl={() => spinnerControl()}
            updateProfilePage={_headers => {
              getDriverProfileHandler(_headers);
            }}
            iconName="phone"
            title="Phone Number"
            // value={user.user.phone}
            value={user.user.phone}
          />
          <View
            style={[styles.editPasswordContainer, {flexDirection: 'column'}]}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <View style={styles.nameAndIconContainer}>
                  <MaterialCommunityIcons
                    style={styles.userIcon}
                    name="lock"
                    size={24}
                    color={iconColor}
                  />
                  <Text style={styles.nameText}>Password</Text>
                </View>
                {isEdit ? (
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      alignSelf: 'stretch',
                      // width: 220,
                      marginLeft: 43,
                      marginRight: 20,
                    }}
                    // placeholder={value}
                    onChangeText={setText}
                    // value={text}
                  />
                ) : (
                  <Text style={styles.usernameText}>******</Text>
                )}
              </View>
              {isEdit ? (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    backgroundColor: primarycolor,
                    width: 81,
                    height: 31,
                    borderRadius: 5,
                    marginVertical: 18,
                    marginLeft: 'auto',
                    marginRight: 20,
                  }}
                  onPress={() => {
                    setIsEdit(false);
                    setSpinner(true);
                    spinnerControl();
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontFamily: NunitoFont,
                      fontSize: 14,
                      color: '#FFFFFF',
                      textAlignVertical: 'center',
                      marginLeft: 12,
                    }}>
                    Save
                  </Text>
                  <MaterialCommunityIcons
                    style={{marginLeft: 7.17, alignSelf: 'center'}}
                    name="arrow-right"
                    size={18}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.editPasswordButton}
                  onPress={() => {
                    setIsEdit(true);
                    toggleModal();
                  }}>
                  <MaterialCommunityIcons
                    style={styles.pencil}
                    name="pencil"
                    size={18}
                    color={tertiarybackgroundColor}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <NameCard iconName="lock" title="Password" value="******" />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
