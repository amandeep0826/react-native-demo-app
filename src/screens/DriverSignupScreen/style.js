import {StyleSheet} from 'react-native';
import {pureWhite} from '../../assets/colors';

export const styles = StyleSheet.create({
  inputfields: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 5,
  },

  submitButtonContainer: {
    elevation: 3,
    backgroundColor: '#FF148E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },

  submitButtonText: {
    fontSize: 18,
    color: pureWhite,
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Nunito-Regular',
    fontWeight: 'bold',
  },

  becomeDriverText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Nunito-Regular',
  },

  sendInfoText: {
    fontSize: 16,
    marginTop: 8,
    color: '#404040',
    fontFamily: 'Nunito-Regular',
  },

  aboveInputText: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    marginTop: 20,
  },

  inputStyle: {
    marginTop: 6,
    color: '#000000',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    backgroundColor: 'white',
    height: 46,
    paddingStart: 20,
  },

  typeMessageInput: {
    backgroundColor: pureWhite,
    height: 100,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    paddingStart: 20,
    marginTop: 6,
    textAlignVertical: 'top',
  },
  inputBoxContainer: {
    padding: 20,
  },
});
