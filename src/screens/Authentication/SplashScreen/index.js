import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import NavigationServices from '../../../navigation/NavigationServices'
import { Screen } from '../../../navigation/Screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen'


const Splash = () => {

    useEffect(() => {
        console.log('useEffect');
        getUser()
    }, []);

    const getUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userData');
            let userData = JSON.parse(jsonValue);
            console.log('use rIdWelcome', userData);

            if (userData && userData?.phoneNumber) {
                SplashScreen.hide();
                NavigationServices.navigateToClearStack(Screen.HOME);
            } else {
                setTimeout(() => {
                    SplashScreen.hide();
                    NavigationServices.navigateToClearStack(Screen.WELCOME_SCREEN);
                }, 3000);
            }
        } catch (error) {
            console.error("Error in getUser:", error);
            setTimeout(() => {
                NavigationServices.navigate(Screen.WELCOME_SCREEN);
            }, 3000);
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text>Loading...</Text> */}
            {/* // You can also add a spinner or some loading indicator here */}
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({})