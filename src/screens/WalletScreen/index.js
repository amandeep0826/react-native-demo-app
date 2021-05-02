import React, {useContext, useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import api, {getHeaders, Transactions} from '../../api/api';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  cardBorderColor,
  iconColor,
  primarybackgroundColor,
  primarycolor,
  pureBlack,
  pureWhite,
  secondarybackgroundColor,
  tertiarybackgroundColor,
} from '../../assets/colors';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {AuthContext, UserContext} from '../../routes/RootStackNavigation';
import {backgroundColor} from '../../styles/commonStyle';
import TransactionCard from './transactionCard';

const WalletScreen = ({navigation}) => {
  const [user, setUser] = useContext(UserContext);
  const [headers, setHeaders] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const fetchHeader = async () => {
    //   const _headers = await getHeaders();
    //   setHeaders(_headers);
    // };
    // fetchHeader();
    // console.log({headers});
    getTransactions();
    console.log(transactions);
    setLoading(true);
  }, []);

  const getTransactions = () => {
    api
      .get(Transactions, {
        headers: {accept: 'application/json', Authorization: token},
      })
      .then(response => {
        setTransactions(response.data);
        // console.log(response);
        setLoading(false);
      })
      .catch(error => {
        console.log({error});
      });
  };

  return (
    <View style={backgroundColor.container}>
      <StatusBar backgroundColor={secondarybackgroundColor} />

      <View style={styles.headerContainer}>
        <Text style={styles.traxiCreditText}>Traxi Credits</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.creditContainer}>
          <View style={styles.availableCreditsContainer}>
            <Text style={styles.credits}>$ {user.user.wallet_balance}</Text>
            <Text style={styles.availableCreditsText}>Available Credits</Text>
          </View>
          <View style={styles.withdrawContainer}>
            <TextInput
              style={styles.enterAmountField}
              placeholder="$ Enter amout"
              placeholderTextColor={pureBlack}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.withDrawButtonContainer}>
              <Text style={styles.withDrawButtonText}>WITHDRAW MONEY</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewAllContainer}>
          <Text style={styles.transactionText}>Transactions</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('WalletDetailScreen', {transactions});
            }}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={primarycolor} />
        ) : (
          <FlatList
            data={transactions}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({item}) => <TransactionCard item={item} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 48,
    backgroundColor: secondarybackgroundColor,
    elevation: 2,
  },
  traxiCreditText: {
    fontFamily: NunitoFont,
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 20,
  },
  bodyContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  creditContainer: {
    backgroundColor: tertiarybackgroundColor,
    borderRadius: 8,
  },
  availableCreditsContainer: {
    alignSelf: 'stretch',
    borderBottomColor: cardBorderColor,
    borderBottomWidth: 1,
  },
  availableCreditsText: {
    fontFamily: NunitoFont,
    fontSize: 14,
    color: iconColor,
    marginTop: 6,
    textAlign: 'center',
    marginBottom: 20.5,
  },
  credits: {
    fontFamily: NunitoFont,
    fontSize: 24,
    color: primarycolor,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  withdrawContainer: {padding: 20},
  enterAmountField: {
    backgroundColor: pureWhite,
    paddingVertical: 12,
    paddingStart: 20,
    height: 46,
    borderRadius: 6,
    borderColor: cardBorderColor,
    borderWidth: 1,
  },
  withDrawButtonContainer: {
    elevation: 3,
    backgroundColor: primarycolor,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'stretch',
    marginTop: 24,
    height: 43,
  },

  withDrawButtonText: {
    fontSize: 14,
    color: pureWhite,
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: NunitoFont,
    fontWeight: 'bold',
  },
  viewAllContainer: {
    flexDirection: 'row',
    paddingVertical: 22,
    justifyContent: 'space-between',
  },
  transactionText: {
    fontSize: 16,
    color: pureBlack,
    fontFamily: NunitoFont,
  },
  viewAllText: {
    fontFamily: NunitoFont,
    fontSize: 14,
    color: iconColor,
    textDecorationLine: 'underline',
  },
});

export default WalletScreen;
