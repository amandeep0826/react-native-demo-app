import {StyleSheet} from 'react-native';
import {pureBlack, pureWhite} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';

export const styles = StyleSheet.create({
  submitButtonContainer: {
    elevation: 3,
    backgroundColor: '#FF148E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'stretch',
    marginTop: 24,
    height: 43,
  },

  submitText: {
    fontSize: 14,
    color: pureWhite,
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: NunitoFont,
    fontWeight: 'bold',
  },
  messageInputBox: {
    backgroundColor: pureWhite,
    height: 100,
    fontFamily: NunitoFont,
    fontSize: 16,
    paddingStart: 20,
    marginTop: 10,
    textAlignVertical: 'top',
    borderRadius: 8,
  },
  innerContainer: {
    paddingHorizontal: 20,
  },
  messageText: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 20,
    color: pureBlack,
    fontFamily: NunitoFont,
  },
});
