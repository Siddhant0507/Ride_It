import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { moderateScale } from "../../utills/Scalling";
import R from "../../res/R";
/**
 * Reusable Input component.
 * @example <Input ref={myRef} onChangeText={(val) => {}} value="test" />
 */
const UserInput = (props) => {
    const {
        placeholder,
        onChangeText,
        value,
        keyboardType,
        secureTextEntry,
        returnKeyType,
        editable,
        pointerEvents,
        maxLength,
        autoCapitalize,
        onTouchStart,
        textAlignVertical,
        multiline,
        numberOfLines,
        error,
        placeholderTextColor,
        inputTitle,
        onPressIcon,
        Icon
    } = props;

    return (
        <View>
            <Text style={styles.titleText}>{inputTitle}</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={placeholderTextColor}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    autoCorrect={false}
                    returnKeyType={returnKeyType}
                    numberOfLines={numberOfLines}
                    editable={editable}
                    pointerEvents={pointerEvents}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onTouchStart={onTouchStart}
                    textAlignVertical={textAlignVertical}
                    multiline={multiline}
                    allowFontScaling={false}
                />
                <View style={styles.rightView}>
                    <TouchableOpacity onPress={onPressIcon}>
                        <Image source={Icon} />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.errorText}>
                {error ?? ""}
            </Text>
        </View>
    );
};

export default UserInput;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: R.colors.background,
        borderRadius: moderateScale(10),
        shadowColor: R.colors.black,
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        alignItems: 'center',

    },
    titleText: {
        fontSize: moderateScale(10),
        color: R.colors.profile,
        fontFamily: R.Fonts.REGULAR,
        marginLeft: moderateScale(15)
    },
    input: {
        fontSize: moderateScale(14),
        paddingLeft: moderateScale(15),
        color: R.colors.black,
        borderRadius: moderateScale(10),
        fontFamily: R.Fonts.MEDIUM,
        ///
        width: wp(57),
        height: hp(5),
    },
    errorText: {
        fontSize: moderateScale(14),
        color: 'red',
        // margin: hp(0.3),

    },
    rightView: {
        // backgroundColor:'red',
        width: moderateScale(40),
        height: hp(5),
        borderTopRightRadius: moderateScale(10),
        borderBottomRightRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10
    }
})








