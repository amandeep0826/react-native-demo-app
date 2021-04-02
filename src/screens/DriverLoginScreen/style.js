import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainLogo: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 80,
  },

  emailInput: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 5,
    height: 46,
  },

  passwordInput: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 5,
    height: 46,
  },

  signInButton: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
  },

  signInButtonContainer: {
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

  signInButtonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Nunito-Regular',
    fontWeight: 'bold',
  },

  driverButtonContainer: {
    elevation: 3,
    backgroundColor: '#fcdd60',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#FF148E',
    borderWidth: 2,
    height: 43,
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  driverButtonText: {
    fontSize: 14,
    color: '#FF148E',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Nunito-Regular',
    fontWeight: 'bold',
  },

  welcomeBackText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 20,
    marginTop: 64,
    fontFamily: 'Nunito-Regular',
  },

  pleaseLoginText: {
    fontSize: 16,
    paddingLeft: 20,
    marginTop: 4,
    color: '#404040',
    fontFamily: 'Nunito-Regular',
  },

  forgotPasswordText: {
    textAlign: 'right',
    paddingRight: 20,
    marginTop: 12,
    fontSize: 14,
  },
  forgotPasswordContainer: {
    padding: 5,
  },
});
