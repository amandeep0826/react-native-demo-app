import {StyleSheet} from 'react-native';

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
    color: 'white',
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
  },

  inputStyle: {
    marginLeft: 15,
    color: '#000000',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },

  typeMessageInput: {
    marginLeft: 15,
    height: 100,
    textAlignVertical: 'top',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
});
