import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FirstScreen from '../../src/screens/FirstScreen';
import Login from '../../src/screens/Login';
import OtpScreen from '../../src/screens/Otp';
import Signup from '../../src/screens/Signup';
import HomeScreen from '../../src/screens/HomeScreen'
import RideSelect from '../../src/screens/RideSelect';
import DateTimePicker from '../../src/screens/DateTimePicker';
import DropDateTime from '../screens/DropDateTime';
import BookingDetail from '../screens/BookingDetail';

const LoginStack = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen
          name="FirstScreen"
          component={FirstScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
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
          <Stack.Screen
          name="DropDateTime"
          component={DropDateTime}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="BookingDetail"
          component={BookingDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStack;
