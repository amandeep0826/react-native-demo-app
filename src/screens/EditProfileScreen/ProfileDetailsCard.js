import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  iconColor,
  primarycolor,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {styles} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {UpdateDriverProfile, getHeaders} from '../../api/api';
import api from '../../api/api';

const NameCard = ({iconName, value, title, onSave}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [headers, setHeaders] = useState(null);
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  const [text, setText] = useState('');

  // const printVal = () => {
  //   console.log(email);
  // };

  return (
    <ScrollView>
      <View
        style={[
          styles.editNameContainer,
          isEdit ? {flexDirection: 'column'} : null,
        ]}>
        <View>
          <View style={styles.nameAndIconContainer}>
            <MaterialCommunityIcons
              style={styles.userIcon}
              name={iconName}
              size={24}
              color={iconColor}
            />
            <Text style={styles.nameText}>{title}</Text>
          </View>
          {isEdit ? (
            <TextInput
              style={{borderBottomWidth: 1, width: 272, alignSelf: 'center'}}
              // onChangeText={name => {
              //   nameHandler(name);
              // }}
              onChangeText={setText}
              value={text}
            />
          ) : (
            <Text style={styles.usernameText}>{value}</Text>
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
              marginLeft: 234,
              marginVertical: 18,
            }}
            onPress={() => {
              // setIsEdit(false);
              onSave(text);
              // printVal();
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
            style={styles.editButton}
            onPress={() => {
              setIsEdit(true);
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
    </ScrollView>
  );
};
export default NameCard;
