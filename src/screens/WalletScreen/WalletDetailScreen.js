import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {backgroundColor} from '../../styles/commonStyle';
import TransactionCard from './transactionCard';

const WalletDetailScreen = ({route, navigation}) => {
  const {transactions} = route.params;

  useEffect(() => {
    console.log(transactions[0]);
  }, []);

  return (
    <View style={[backgroundColor.container, {padding: 20}]}>
      <FlatList
        data={transactions}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({item}) => <TransactionCard item={item} />}
      />
    </View>
  );
};

export default WalletDetailScreen;

const styles = StyleSheet.create({});
