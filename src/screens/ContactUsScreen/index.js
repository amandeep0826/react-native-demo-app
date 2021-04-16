import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import api, {ContactUs, getHeaders} from '../../api/api';
import {backgroundColor} from '../../styles/commonStyle';
import {styles} from './style';

const ContactUsScreen = () => {
  const [headers, setHeaders] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      setHeaders(_headers);
    };
    fetchHeader();
  }, []);

  const contactUsHandler = () => {
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
  };

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!message.trim()) {
      ToastAndroid.show('Please enter a message', ToastAndroid.SHORT);
      return;
    }
  };

  return (
    <View style={backgroundColor.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.messageText}>Message</Text>
        <TextInput
          style={styles.messageInputBox}
          placeholder="Type your message here..."
          onChangeText={value => {
            setMessage(value);
          }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.submitButtonContainer}
          onPress={() => {
            checkTextInput();
            contactUsHandler();
          }}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactUsScreen;
