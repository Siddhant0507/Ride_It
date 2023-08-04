import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../src/screens/HomeScreen'
import RideSelect from '../../src/screens/RideSelect';
import DateTimePicker from '../../src/screens/DateTimePicker';

const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RideSelect"
          component={RideSelect}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="DateTimePicker"
          component={DateTimePicker}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
