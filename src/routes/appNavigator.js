import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootStackNavigation from './RootStackNavigation';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};

export default AppNavigator;
