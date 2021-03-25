import React from 'react';
import {View, Text} from 'react-native';

const DummyScreen = props => {
  const JobDetails = props.route.params.item;

  console.log(JobDetails);

  return (
    <View style={{flex: 1}}>
      <Text>Logged in successfully.</Text>
    </View>
  );
};

export default DummyScreen;
