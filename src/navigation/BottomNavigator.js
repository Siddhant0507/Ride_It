import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RideHistory from '../screens/RideHistory';
import Profile from '../screens/Profile';
import HomeStack from './HomeStack';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    < Bottom.Navigator screenOptions={{headerShown:false}}>
      <Bottom.Screen
        name="Home"
        component={HomeStack}
        
      />
      <Bottom.Screen
        name="RideHistory"
        component={RideHistory}
        options={{headerShown: false,
        unmountOnBlur:true
      }}
      />
      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />   
    </Bottom.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
