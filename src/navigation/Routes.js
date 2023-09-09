import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import NavigationServices from './NavigationServices';

const Routes = () => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationServices.setTopLevelNavigator(navigatorRef);
      }}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Routes;
