import React, {useContext, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api, {DriverSignUp} from '../../api/api';
import {placeholderTextColor} from '../../assets/colors';
import {backgroundColor} from '../../styles/commonStyle';
import {styles} from './style';

const DriverSignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const nameHandler = name => {
    setName(name);
  };

  const phoneNumberHandler = phoneNumber => {
    setPhoneNumber(phoneNumber);
  };

  const emailHandler = email => {
    setEmail(email);
  };

  const messageHandler = message => {
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
      .then(response => {
        navigation.navigate('DummyScreen');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ScrollView style={backgroundColor.container}>
      <View style={{marginLeft: 20}}>
        <Text style={styles.becomeDriverText}>Become a Driver</Text>
        <Text style={styles.sendInfoText}>
          Please send your personal information.
        </Text>
      </View>
      <View style={styles.inputBoxContainer}>
        <Text style={styles.aboveInputText}>Name</Text>
        <TextInput
          selectionColor={placeholderTextColor}
          style={styles.inputStyle}
          placeholder="Enter your name"
          placeholderTextColor={placeholderTextColor}
          onChangeText={name => {
            nameHandler(name);
          }}
        />
        <Text style={styles.aboveInputText}>Phone Number</Text>
        <TextInput
          selectionColor={placeholderTextColor}
          style={styles.inputStyle}
          placeholder="Enter your number"
          placeholderTextColor={placeholderTextColor}
          onChangeText={phoneNumber => {
            phoneNumberHandler(phoneNumber);
          }}
        />
        <Text style={styles.aboveInputText}>Email</Text>
        <TextInput
          selectionColor={placeholderTextColor}
          style={styles.inputStyle}
          placeholder="Enter your email"
          placeholderTextColor={placeholderTextColor}
          onChangeText={email => {
            emailHandler(email);
          }}
        />
        <Text style={styles.aboveInputText}>Message</Text>
        <TextInput
          selectionColor={placeholderTextColor}
          style={styles.typeMessageInput}
          placeholder="Please type message..."
          placeholderTextColor={placeholderTextColor}
          onChangeText={message => {
            messageHandler(message);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButtonContainer}
        activeOpacity={0.7}
        onPress={() => {
          signUpHandler();
        }}>
        <Text style={styles.submitButtonText}>BECOME A DRIVER</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DriverSignupScreen;
