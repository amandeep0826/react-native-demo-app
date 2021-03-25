import {StyleSheet} from 'react-native';
import {NunitoFont} from '../../assets/nunitoFont';

export default styles = StyleSheet.create({
  mainLogo: {
    alignSelf: 'center',
    marginTop: 54,
    height: 30,
    width: 184,
    marginBottom: 40,
  },
  sortedBoxContainer: {
    height: 52,
    width: 335,
    backgroundColor: '#FFF6C7',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    marginTop: 20,
    marginHorizontal: 20,
  },
  sortByText: {
    marginLeft: 20,
    marginVertical: 15,
    fontFamily: NunitoFont,
    fontSize: 16,
  },
  flatListContainer: {
    marginTop: 20,
  },
  modalStyle: {
    width: 170,
    height: 36,
    backgroundColor: '#FFDE67',
    marginVertical: 8,
    marginLeft: 62,
    marginRight: 36,
    alignSelf: 'center',
  },
  dropdownStyle: {
    backgroundColor: '#FFDE67',
    height: 162,
    width: 170,
    backgroundColor: '#FFDE67',
  },
  dropdownTextStyle: {
    fontSize: 14,
    marginLeft: 16,
    backgroundColor: '#FFDE67',
    color: '#000000',
  },
  TextStyle: {
    fontFamily: NunitoFont,
    fontSize: 14,
    marginTop: 9,
    marginBottom: 8,
    marginLeft: 16,
    backgroundColor: '#FFDE67',
  },
  jobsContainer: {
    backgroundColor: '#FFDE67',
    flex: 1,
  },
  jobsHeader: {
    backgroundColor: '#FFD439',
    height: 104,
  },
  spaceBetweenContainer: {
    height: 50,
  },
  acceptButtonContainer: {
    elevation: 3,
    backgroundColor: '#FF148E',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 295,
    alignSelf: 'center',
    marginTop: 18,
    height: 43,
    // marginBottom: -20,
  },
  acceptButtonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Nunito-Regular',
    fontWeight: 'bold',
  },
});
