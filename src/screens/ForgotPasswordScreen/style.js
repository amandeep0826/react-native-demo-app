import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  emailInputField: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    height: 46,
    marginTop: 18,
    paddingStart: 20,
  },

  resetButtonContainer: {
    elevation: 3,
    backgroundColor: '#FF148E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '90%',
    alignSelf: 'center',
    marginTop: 24,
    height: 43,
  },

  resetButtonText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Nunito-Regular',
    fontWeight: 'bold',
  },

  sendEmailText: {
    fontSize: 16,
    marginLeft: 22,
    marginTop: 6,
    color: '#404040',
    fontFamily: 'Nunito-Regular',
  },

  forgotPassText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    fontFamily: 'Nunito-Regular',
  },
});
