import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, } from 'react-native'
import React from 'react';
import R from '../../res/R';
import LinearGradient from 'react-native-linear-gradient';

import { moderateScale } from '../../utills/Scalling';

const BottomTab = ({
    onPressHome,
    onPressRideHistory,
    onPressProfile,
    activeTab
}) => {
    return (
        <View style={styles.mainContainer}>
            <LinearGradient colors={['#AAAAAA', '#AAAAAA']} style={styles.LinearStyle}>
                <View style={styles.insideView}>
                    <View >
                        <TouchableOpacity onPress={onPressHome}>
                            <Image source={activeTab === 'home' ? R.Icon.active_home : R.Icon.home_icon}
                                style={styles.homeIcon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={onPressRideHistory}  >
                            <Image source={activeTab === 'rideHistory' ? R.Icon.active_ride : R.Icon.ride_history_icon}
                                style={styles.homeIcon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={onPressProfile}  >
                            <Image source={activeTab === 'profile' ? R.Icon.active_person : R.Icon.profile_icon}
                                style={styles.homeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default BottomTab;

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        bottom: 10,
        width: '70%',
        alignSelf: 'center',
        zIndex: 10,
      
      
    },
    LinearStyle: {
        borderRadius: 40,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    bottomTabImage: {
        width: '100%',
        height: moderateScale(80),
        resizeMode: 'stretch',
    },
    insideView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20
    },
    homeIcon: {
        height: moderateScale(35),
        width: moderateScale(35),
        resizeMode: 'contain'
    },
    history_img: {
        height: moderateScale(35),
        width: moderateScale(35),
    },
})












