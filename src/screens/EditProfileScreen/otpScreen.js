import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Spinner from 'react-native-loading-spinner-overlay';

import api, {getHeaders, UpdateDriverProfile} from '../../api/api';
import {
  primarycolor,
  pureWhite,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {UserContext} from '../../routes/RootStackNavigation';
import {backgroundColor} from '../../styles/commonStyle';

const OTPScreen = ({navigation, route}) => {
  const [value, setValue] = useState('');
  const [user, setUser] = useContext(UserContext);
  const [headers, setHeaders] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 4;
  const {phone} = route.params;

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      console.log(phone);
      setHeaders(_headers);
      // getDriverProfileHandler(_headers);
    };
    fetchHeader();
  }, []);

  const UpdateNumber = () => {
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

  const spinnerControl = () => {
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  };

  return (
    <View style={backgroundColor.container}>
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
      <CodeField
        ref={ref}
        // {...props}
        // Use caretHidden={false} when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={4}
        autoFocus={true}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        // textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.submitButtonContainer}
        onPress={() => {
          if (!value) {
            ToastAndroid.show('Please enter OTP', ToastAndroid.SHORT);
          } else {
            UpdateNumber();
            setSpinner(true);
            spinnerControl();
            navigation.goBack();
          }
        }}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  submitButtonContainer: {
    elevation: 3,
    backgroundColor: primarycolor,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'center',
    width: '90%',
    height: 43,
    marginTop: 40,
  },
  submitButtonText: {
    fontSize: 14,
    color: pureWhite,
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: NunitoFont,
    fontWeight: 'bold',
  },

  codeFieldRoot: {
    marginTop: 20,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
  },
  cell: {
    width: 60,
    height: 60,
    borderRadius: 8,
    fontSize: 30,
    // lineHeight: 38,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tertiarybackgroundColor,
  },
  focusCell: {
    borderColor: '#000',
  },
});
