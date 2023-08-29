import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale } from '../../utills/Scalling'
import R from '../../res/R'

const Header = ({onPress,source}) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Image source={source} style={styles.img} />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    img: {
        height: moderateScale(45),
        width: moderateScale(45),
        resizeMode: 'contain'
    }
})