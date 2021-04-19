import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api, {
  ChangePassword,
  DriverProfile,
  getHeaders,
  UpdateDriverProfile,
} from '../../api/api';
import {
  iconColor,
  primarybackgroundColor,
  primarycolor,
  pureBlack,
  pureWhite,
  secondarybackgroundColor,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {UserContext} from '../../routes/RootStackNavigation';
import {backgroundColor} from '../../styles/commonStyle';
import NameCard from './ProfileDetailsCard';
import {styles} from './styles';

const EditProfileScreen = ({navigation}) => {
  const [driverProfile, setDriverProfile] = useState('');
  const [headers, setHeaders] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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

  const printVal = () => {
    console.log(currentPassword, newPassword);
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
      // getDriverProfileHandler(_headers);
    };
    if (driverProfile === '') fetchHeader();
  }, []);

  // const getDriverProfileHandler = _headers => {
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
  // };
  const UpdateName = name => {
    let updateValue = {
      name: name,
    };
    api
      .put(UpdateDriverProfile, updateValue, {
        headers: headers,
      })
      .then(response => {
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
        console.log('Profile has been updated');
        AsyncStorage.getItem('user')
          .then(user => {
            user = JSON.parse(user);
            user.user.email = email;
            setUser(user);
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
        console.log('Profile has been updated');
        AsyncStorage.getItem('user')
          .then(user => {
            user = JSON.parse(user);
            user.user.phone = phone;
            setUser(user);
            AsyncStorage.setItem('user', JSON.stringify(user));
          })
          .done();
      })
      .catch(error => {
        console.log({error});
      });
  };

  const UpdatePassword = () => {
    let updateValue = {
      old_password: currentPassword,
      new_password: newPassword,
    };
    api
      .put(ChangePassword, updateValue, {
        headers: headers,
      })
      .then(response => {
        // console.log('Your password has been changed successfully.');
        ToastAndroid.show(
          'Your password has been changed successfully.',
          ToastAndroid.SHORT,
        );
        toggleModal();
      })
      .catch(error => {
        console.log({error});
        ToastAndroid.show('Incorrect password', ToastAndroid.SHORT);
      });
  };

  const spinnerControl = () => {
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  };

  const visibilityControl = () => {
    if (visibility == true) {
      return false;
    } else {
      return true;
    }
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
            <ActivityIndicator size="large" color={primarycolor} />
          </View>
        }
      />
      <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
        <View style={{borderRadius: 10, overflow: 'hidden'}}>
          <View style={{backgroundColor: secondarybackgroundColor, height: 60}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: secondarybackgroundColor,
                justifyContent: 'center',
                // alignSelf: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: NunitoFont,
                }}>
                Change Password
              </Text>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                }}>
                <Image
                  source={require('../../assets/cancel.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: primarybackgroundColor,
              paddingVertical: 20,
              paddingHorizontal: 12,
            }}>
            <TextInput
              placeholder="Current Password"
              secureTextEntry={visibilityControl()}
              onChangeText={value => {
                setCurrentPassword(value);
              }}
              left={
                <TextInput.Icon
                  name={() => (
                    <MaterialCommunityIcons name={'lock'} size={20} />
                  )}
                />
              }
              right={
                visibility ? (
                  <TextInput.Icon
                    name={() => (
                      <MaterialCommunityIcons
                        onPress={() => {
                          console.log('eye pressed');
                          setVisibility(false);
                        }}
                        name={'eye'}
                        size={20}
                      />
                    )}
                  />
                ) : (
                  <TextInput.Icon
                    name={() => (
                      <MaterialCommunityIcons
                        onPress={() => {
                          setVisibility(true);
                        }}
                        name={'eye-off'}
                        size={20}
                      />
                    )}
                  />
                )
              }
              style={{
                backgroundColor: pureWhite,
                height: 42,
                borderRadius: 5,
                marginBottom: 20,
                borderBottomColor: pureWhite,
              }}
            />
            <TextInput
              placeholder="New Password"
              secureTextEntry={visibilityControl()}
              onChangeText={value => {
                setNewPassword(value);
              }}
              left={
                <TextInput.Icon
                  name={() => (
                    <MaterialCommunityIcons name={'lock'} size={20} />
                  )}
                />
              }
              right={
                visibility ? (
                  <TextInput.Icon
                    name={() => (
                      <MaterialCommunityIcons
                        onPress={() => {
                          setVisibility(false);
                        }}
                        name={'eye'}
                        size={20}
                      />
                    )}
                  />
                ) : (
                  <TextInput.Icon
                    name={() => (
                      <MaterialCommunityIcons
                        onPress={() => {
                          setVisibility(true);
                        }}
                        name={'eye-off'}
                        size={20}
                      />
                    )}
                  />
                )
              }
              style={{
                backgroundColor: pureWhite,
                height: 42,
                borderRadius: 5,
                marginBottom: 20,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                // UpdatePassword();
                if (currentPassword.trim() && newPassword.trim()) {
                  if (currentPassword.trim() == newPassword.trim()) {
                    ToastAndroid.show(
                      'Passwords dont match',
                      ToastAndroid.SHORT,
                    );
                  } else {
                    setSpinner(true);
                    UpdatePassword();
                    spinnerControl();
                  }
                } else {
                  ToastAndroid.show(
                    'Please enter both passwords',
                    ToastAndroid.SHORT,
                  );
                }
              }}
              style={styles.changePasswordButtonContainer}>
              <Text style={styles.changePasswordButtonText}>SUBMIT</Text>
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
            // updateProfilePage={_headers => {
            //   getDriverProfileHandler(_headers);
            // }}
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
            // updateProfilePage={_headers => {
            //   getDriverProfileHandler(_headers);
            // }}
            iconName="email"
            title="Email"
            // value={user.user.email}
            value={user.user.email}
          />
          <NameCard
            onSave={phone => {
              // UpdateNumber(phone);
              navigation.navigate('OTPScreen', {phone});
            }}
            setSpinner={() => {}}
            spinnerControl={() => {}}
            // updateProfilePage={_headers => {
            //   getDriverProfileHandler(_headers);
            // }}
            iconName="phone"
            title="Phone Number"
            // value={user.user.phone}
            value={user.user.phone}
          />
          <View style={[styles.editPasswordContainer, {flexDirection: 'row'}]}>
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
              <Text style={styles.usernameText}>******</Text>
            </View>
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
          </View>
          {/* <NameCard iconName="lock" title="Password" value="******" /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
