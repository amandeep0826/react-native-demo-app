import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {backgroundColor} from '../../styles/commonStyle';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const BookingsScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.bookingsHeader}>
        <Text style={styles.bookingsText}>Bookings</Text>
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity style={styles.deliveriesButton}>
            <MaterialCommunityIcons
              style={styles.carIcon}
              name="car-side"
              size={30}
            />
            <Text style={styles.deliveryText}>Deliveries</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.storesButton}>
            <MaterialCommunityIcons
              style={styles.cartIcon}
              name="cart"
              size={26}
            />
            <Text style={styles.storesText}>Stores</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bookingsContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.upcomingButton}>
            <Text style={styles.upcomingText}>UPCOMING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deliveredButton}>
            <Text style={styles.deliveredText}>DELIVERED</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sortByContainer}>
          <Text style={styles.sortByText}>Sort By:</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookingsHeader: {
    backgroundColor: '#FFD439',
    height: 138,
  },
  bookingsContainer: {
    backgroundColor: '#FFDE67',
    flex: 1,
  },
  bookingsText: {
    fontFamily: NunitoFont,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    fontWeight: 'bold',
  },
  headerButtonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  deliveriesButton: {
    backgroundColor: '#FF148E',
    height: 50,
    width: width / 2,
    flexDirection: 'row',
  },
  storesButton: {
    backgroundColor: '#FFF6C7',
    height: 50,
    width: width / 2,
    flexDirection: 'row',
  },
  deliveryText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 14,
    marginLeft: 10,
  },
  storesText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 14,
    marginLeft: 10,
  },
  carIcon: {
    marginLeft: 36,
    marginTop: 10,
  },
  cartIcon: {
    marginLeft: 36,
    marginTop: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  upcomingButton: {
    backgroundColor: '#FF148E',
    height: 36,
    width: 108,
  },
  deliveredButton: {
    backgroundColor: '#FFDE67',
    height: 36,
    width: 108,
    borderColor: '#FF148E',
    borderWidth: 1,
  },
  upcomingText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    textAlign: 'center',
    marginTop: 8,
    color: '#FFFFFF',
  },
  deliveredText: {
    fontSize: 14,
    fontFamily: NunitoFont,
    textAlign: 'center',
    marginTop: 8,
    color: '#FF148E',
  },
  sortByContainer: {
    flexDirection: 'row',
  },
  sortByText: {
    color: '#FFFFFF',
  },
});

export default BookingsScreen;
