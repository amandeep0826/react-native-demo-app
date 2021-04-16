import {StyleSheet} from 'react-native';
import {
  cardBorderColor,
  primarycolor,
  pureBlack,
  pureWhite,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';

export const styles = StyleSheet.create({
  editDetailsContainer: {},
  nameAndIconContainer: {
    flexDirection: 'row',
  },
  userIcon: {
    marginTop: 15,
    marginLeft: 10,
  },
  nameText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: NunitoFont,
    marginTop: 16,
    marginLeft: 8,
  },
  editNameContainer: {
    backgroundColor: tertiarybackgroundColor,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 5,
    borderColor: cardBorderColor,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usernameText: {
    marginLeft: 43,
    marginTop: 4,
    fontSize: 16,
    fontFamily: NunitoFont,
    marginBottom: 16,
    color: pureBlack,
  },
  editButton: {
    backgroundColor: primarycolor,
    height: 25,
    width: 25,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    marginTop: 26,
    marginRight: 20,
  },
  pencil: {
    alignSelf: 'center',
    marginTop: 2,
  },
  imagePicker: {
    width: 30,
    height: 30,
    backgroundColor: primarycolor,
    borderRadius: 50,
    marginTop: 110,
    marginLeft: -30,
  },
  imageContainer: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  cameraIcon: {
    alignSelf: 'center',
    marginTop: 5,
    color: pureWhite,
  },
  editPasswordContainer: {
    backgroundColor: tertiarybackgroundColor,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 5,
    borderColor: cardBorderColor,
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  editPasswordButton: {
    backgroundColor: primarycolor,
    height: 25,
    width: 25,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    marginVertical: 18,
    marginLeft: 'auto',
    marginRight: 20,
  },
});
