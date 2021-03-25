import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api, {ForgotPasswordEnd} from '../../api/api';
import {backgroundColor} from '../../styles/commonStyle';
import {styles} from './style';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const emailHandler = email => {
    setEmail(email);
  };

  const printVal = () => {
    console.log(email);
  };

  const resetLinkHandler = () => {
    const req = {email: email};
    api
      .post(
        ForgotPasswordEnd,
        {
          email: req.email,
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
        alert('Email does not exist');
      });
  };

  return (
    <View style={backgroundColor.container}>
      <View>
        <Text style={styles.forgotPassText}>Forgot Password?</Text>
        <Text style={styles.sendEmailText}>
          Please enter your email address.
        </Text>
      </View>
      <View style={styles.emailInputField}>
        <TextInput
          style={{marginLeft: 10, fontFamily: 'Nunito-Regular', fontSize: 16}}
          placeholderTextColor="#000000"
          placeholder="Email address"
          onChangeText={email => {
            emailHandler(email);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.resetButtonContainer}
        onPress={() => {
          resetLinkHandler();
        }}>
        <Text style={styles.resetButtonText}>SEND RESET LINK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
