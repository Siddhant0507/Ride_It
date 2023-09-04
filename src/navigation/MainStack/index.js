import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../../screens/Authentication/Welcome';
import Login from '../../screens/Authentication/Login/Login';
import OtpScreen from '../../screens/Authentication/OtpScreen';
import Signup from '../../screens/Authentication/SignUp';
import HomeScreen from '../../screens/Dashboard/Home';
import RideHistory from '../../screens/BookRide/RideHistory';
import DateTimePicker from '../../screens/BookRide/SelectDateTime';
import RideSelect from '../../screens/BookRide/RideSelect';
import BookingComplete from '../../screens/BookRide/BookingComplete';
import RideDetail from '../../screens/BookRide/RideDetail';
import Profile from '../../screens/Dashboard/Profile';
import { Screen } from '../../constants/Screen';

const MainStack = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={Screen.WELCOME_SCREEN}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Screen.WELCOME_SCREEN} component={WelcomeScreen} />
        <Stack.Screen name={Screen.LOGIN} component={Login} />
        <Stack.Screen name={Screen.SIGN_UP} component={Signup} />
        <Stack.Screen name={Screen.OTP_SCREEN} component={OtpScreen} />
        <Stack.Screen name={Screen.HOME} component={HomeScreen} />
        <Stack.Screen name={Screen.RIDE_SELECT} component={RideSelect} />
        <Stack.Screen name={Screen.PROFILE} component={Profile} />
        <Stack.Screen name={Screen.SELECT_DATE_TIME} component={DateTimePicker} />
        <Stack.Screen name={Screen.BOOKING_COMPLETE} component={BookingComplete} />
        <Stack.Screen name={Screen.RIDE_HISTORY} component={RideHistory} />
        <Stack.Screen name={Screen.RIDE_DETAIL} component={RideDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
