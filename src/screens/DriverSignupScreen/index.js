import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import api, {DriverSignUp} from '../../api/api';
import {placeholderTextColor} from '../../assets/colors';
import {backgroundColor} from '../../styles/commonStyle';
import {styles} from './style';

const DriverSignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const nameHandler = (name) => {
    setName(name);
  };

  const phoneNumberHandler = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };

  const emailHandler = (email) => {
    setEmail(email);
  };

  const messageHandler = (message) => {
    setMessage(message);
  };

  const signUpHandler = () => {
    const req = {
      name: name,
      phone: phoneNumber,
      email: email,
      message: message,
    };
    api
      .post(
        DriverSignUp,
        {
          name: req.name,
          phone: req.phone,
          email: req.email,
          message: req.message,
        },
        {
          headers: {
            'Content-type': 'application/json',
            accept: 'application/json',
          },
        },
      )
      .then((response) => {
        navigation.navigate('DummyScreen');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={backgroundColor.container}>
      <View style={{marginTop: 40, marginLeft: 20}}>
        <Text style={styles.becomeDriverText}>Become a Driver</Text>
        <Text style={styles.sendInfoText}>
          Please send your personal information.
        </Text>
      </View>
      <View>
        <View style={{marginLeft: 20, paddingTop: 30}}>
          <Text style={styles.aboveInputText}>Name</Text>
        </View>
        <View style={styles.inputfields}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your name"
            placeholderTextColor={placeholderTextColor}
            onChangeText={(name) => {
              nameHandler(name);
            }}
          />
        </View>
        <View style={{marginLeft: 20, marginTop: 20}}>
          <Text style={styles.aboveInputText}>Phone Number</Text>
        </View>
        <View style={styles.inputfields}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your number"
            placeholderTextColor={placeholderTextColor}
            onChangeText={(phoneNumber) => {
              phoneNumberHandler(phoneNumber);
            }}
          />
        </View>
        <View style={{marginLeft: 20, marginTop: 20}}>
          <Text style={styles.aboveInputText}>Email</Text>
        </View>
        <View style={styles.inputfields}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your email"
            placeholderTextColor={placeholderTextColor}
            onChangeText={(email) => {
              emailHandler(email);
            }}
          />
        </View>
        <View style={{marginLeft: 20, marginTop: 20}}>
          <Text style={styles.aboveInputText}>Message</Text>
        </View>
        <View style={styles.inputfields}>
          <TextInput
            style={styles.typeMessageInput}
            placeholder="Please type message..."
            placeholderTextColor={placeholderTextColor}
            onChangeText={(message) => {
              messageHandler(message);
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.submitButtonContainer}
        onPress={() => {
          signUpHandler();
        }}>
        <Text style={styles.submitButtonText}>BECOME A DRIVER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DriverSignupScreen;
