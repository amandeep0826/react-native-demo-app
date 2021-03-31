import {StyleSheet} from 'react-native';
import {primarybackgroundColor} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: primarybackgroundColor,
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 20,
  },
  nameAndPriceContainer: {
    flexDirection: 'row',
  },
  johnDoeText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: NunitoFont,
  },
  singleDeliveryText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    marginTop: 4,
  },
  chargesText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: NunitoFont,
  },
  timeFlexibleText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    marginTop: 4,
  },
});
