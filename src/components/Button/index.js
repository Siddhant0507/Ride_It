
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Vibration } from 'react-native'

import R from '../../res/R';
import { moderateScale } from '../../utills/Scalling';

const Button = ({ onPress, title }) => {
    return (
       
        <TouchableOpacity onPress={onPress} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
export default Button;

var styles = StyleSheet.create({
    linearGradient: {
        justifyContent: 'center',
        borderRadius:moderateScale(20),
        // flexDirection: 'row',
        height:moderateScale(45),
        width:moderateScale(250),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        
       
    },
    buttonText: {
        fontSize: moderateScale(18),
        color: R.colors.white,
        alignSelf: 'center',
        fontFamily:R.Fonts.REGULAR
    },
    img: {
        alignSelf: 'center',
        resizeMode: 'contain',
      
    }
});