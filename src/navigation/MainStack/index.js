import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../../screens/Authentication/Welcome/index'
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
import { Screen } from '../Screen';
import Splash from '../../screens/Authentication/SplashScreen';
const Stack = createStackNavigator();

const MainStack = () => {
  return (
      <Stack.Navigator initialRouteName={Screen.SPLASH_SCREEN}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Screen.SPLASH_SCREEN} component={Splash} />
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
  );
};

export default MainStack;
