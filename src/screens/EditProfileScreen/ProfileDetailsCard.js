import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getHeaders} from '../../api/api';
import {
  iconColor,
  primarycolor,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {styles} from './styles';

const NameCard = ({
  iconName,
  value,
  title,
  onSave,
  setSpinner,
  spinnerControl,
  updateProfilePage,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState('');
  const [headers, setHeaders] = useState(null);

  useEffect(() => {
    const fetchHeader = async () => {
      const _headers = await getHeaders();
      setHeaders(_headers);
    };
    fetchHeader();
  }, []);

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
              autoFocus={true}
              style={{
                borderBottomWidth: 1,
                alignSelf: 'stretch',
                marginLeft: 43,
                marginRight: 20,
              }}
              // placeholder={value}
              defaultValue={value}
              onChangeText={setText}
              // value={text}
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
              marginVertical: 18,
              marginLeft: 'auto',
              marginRight: 20,
            }}
            onPress={() => {
              onSave(text);
              setIsEdit(false);
              setSpinner(true);
              // updateProfilePage(headers);
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
