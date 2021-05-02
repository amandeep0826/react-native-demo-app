import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  iconColor,
  primaryDarkBlue,
  pureBlack,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';

const TransactionCard = ({item, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.transactionCard}>
      <View style={styles.innerContainer}>
        <View style={styles.customerDetailContainer}>
          <Text style={styles.receivedFromText}>Received from {item.name}</Text>
          <Text style={styles.otherDetails}>{item.created_at}</Text>
        </View>
        <View style={styles.chargesContainer}>
          <Text style={[styles.receivedFromText, {fontWeight: 'bold'}]}>
            $ {item.amount}
          </Text>
          <Text style={[styles.otherDetails, {color: primaryDarkBlue}]}>
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  transactionCard: {
    backgroundColor: tertiarybackgroundColor,
    shadowOpacity: 10,
    alignSelf: 'stretch',
    borderRadius: 6,
    marginBottom: 16,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  customerDetailContainer: {},
  chargesContainer: {
    marginLeft: 'auto',
  },
  innerContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  receivedFromText: {
    fontSize: 16,
    color: pureBlack,
    fontFamily: NunitoFont,
  },
  otherDetails: {
    fontSize: 12,
    fontFamily: NunitoFont,
    color: iconColor,
  },
});
