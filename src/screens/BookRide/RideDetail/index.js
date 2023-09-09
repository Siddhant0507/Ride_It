import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import { app, database } from '../../../../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Screen } from '../../../navigation/Screen';
 import R from '../../../res/R'
import Header from '../../../components/Header'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale } from '../../../utills/Scalling';
const { height, width } = Dimensions.get('window')
import Button from '../../../components/Button';

const RideDetail = ({ navigation }) => {
    const { Ride, pickUpData, dropData } = useSelector((state) => state.Login)
    const [userId, setUserId] = useState('')
    // const collectionRef = collection(database, 'user_ride_details');
    const collectionRef = collection(database, 'user_ride_details')


    useEffect(() => {
        getUserID()
    }, [])
    const getUserID = async () => {
        const jsonValue = await AsyncStorage.getItem('userId')
        let userId = JSON.parse(jsonValue)
        setUserId(userId)
        // console.log('AsynkStorageGetITEm---======', userId);
    }
    // User input
    var time1 = pickUpData.selectedTime;
    var time2 = dropData.dropTime;
    var date1 = pickUpData.selectedDate
    var date2 = dropData.dropDate

    function convertHour(time) {
        const [hourMinuteSecond, ampm] = time.split(' ');
        let [hours, minutes, seconds] = hourMinuteSecond.split(':');

        if (ampm === 'PM' && hours !== '12') {
            hours = parseInt(hours) + 12;
        }
        if (ampm === 'AM' && hours === '12') {
            hours = '00';
        }
        return `${hours}:${minutes}:${seconds}`;
    }

    function convertToDateTime(dateString, timeString) {
        const [day, month, year] = dateString.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = convertHour(timeString);
        const dateTimeString = `${formattedDate}T${formattedTime}`;
        return new Date(dateTimeString);
    }

    const selectedDateTime = convertToDateTime(date1, time1);
    const dropDateTime = convertToDateTime(date2, time2);

    const differenceInMilliseconds = dropDateTime.getTime() - selectedDateTime.getTime();
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
    console.log('--=====differenceInHours', differenceInHours);
    const absoluteDifferenceInHours = Math.abs(differenceInHours)
    console.log('absoluteDifferenceInHours>>>>>>', absoluteDifferenceInHours);
    const hourlyRate = 40;
    const hours = Math.floor(absoluteDifferenceInHours);
    console.log('hours  round===', hours);

    const roundedHours = Math.ceil(absoluteDifferenceInHours);
    console.log('=========== roundedHours===/////', roundedHours);

    const totalCost = roundedHours * hourlyRate;
    console.log('--=====totalCost===', totalCost);

    const handlePayment = async () => {
        await addDoc(collectionRef, {
            dropDate: dropData.dropDate,
            dropTime: dropData.dropTime,
            pickUpDate: pickUpData.selectedDate,
            pickUpTime: pickUpData.selectedTime,
            totalAmount: totalCost,
            totalHours: roundedHours,
            vichleName: Ride.name,
            use_id: userId
        })

            .then((res) => {

                console.log('resssBooking DEtail', res);
                alert('save details susscessfully')
                var options = {
                    description: 'Credits towards consultation',
                    image: 'https://i.imgur.com/3g7nmJC.jpg',
                    currency: 'INR',
                    key: 'rzp_test_ONNb6E3SJf1osK',
                    amount: '5000',
                    name: 'Rideit Services Pvt. Ltd.',
                    order_id: '',//Replace this with an order_id created using Orders API.
                    prefill: {
                        email: 'gaurav.kumar@example.com',
                        contact: '9191919191',
                        name: 'Gaurav Kumar'
                    },
                    theme: { color: '#ffa07a' }
                }
                RazorpayCheckout.open(options).then((data) => {
                    if (data) {
                        navigation.navigate(Screen.BOOKING_COMPLETE)
                    }
                    console.log('options', data);
                    // handle success
                    // alert(`Success: ${data.razorpay_payment_id}`);
                }).catch((error) => {
                    // handle failure
                    Alert.alert(error.error.description);
                });
            });
    }


    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', }}>
                <Image source={R.images.ride_detail} style={styles.topBacgroundImg} />

            </View>
            <View style={styles.headerView}>
                <Header source={R.Icon.light_arrow}
                    onPress={() => navigation.goBack()} />

                <View style={styles.modalView}>
                    <View>
                        <Text style={styles.modalBookingText}>Model Booking</Text>
                        <Text style={styles.ridenameText}>{Ride.name}</Text>

                    </View>
                    <View style={styles.hrRateView}>
                        <Text style={styles.hrRateText}>40 rs/hr</Text>
                    </View>

                </View>
                <View style={styles.horzontalView}>

                </View>

                <Text style={styles.totalHoursText}>Total hours</Text>
                <View style={styles.innerDateView}>
                    <View style={styles.flexView}>
                        <Text style={styles.innerDateViewText}>{roundedHours} hrs</Text>
                        <View style={styles.changeView}>
                            <Image source={R.Icon.input_icon} style={styles.changeImg} />
                            <Text style={styles.innerTimeText} >change</Text>

                        </View>
                    </View>

                    <View style={styles.flexView}>
                        <View>
                            <Text style={styles.innerdateButtonText}>Sun ,{pickUpData.selectedDate}</Text>
                            <Text style={styles.innerTimeText} >{pickUpData.selectedTime}</Text>
                        </View>
                        <Image source={R.Icon.arrow_icon} style={styles.arrow_img} />

                        <View>
                            <Text style={[styles.innerdateButtonText,]}>Sun ,{dropData.dropDate}</Text>
                            <Text style={styles.innerTimeText}>{dropData.dropTime}</Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={styles.touchableView}>
                <TouchableOpacity style={styles.touchableStyle}>
                    <Text style={styles.touchableText}>{totalCost}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={R.Icon.summary_icon} style={styles.summary_img} />
                        <Text style={styles.touchableSummaryText}>Fare summary</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.lastbackgroundView}>
                    <View>
                        <Image source={R.images.bike_img} style={styles.bike_img} />
                    </View>
                    <View style={{ marginLeft: moderateScale(10) }}>
                        <Text style={styles.chargeText}>Cancellation Charges</Text>
                        <Text style={styles.policyText}>Cancellation charges will be applied as per the polices</Text>
                        <TouchableOpacity style={styles.touchableViewPolicy}>
                            <Text style={styles.touchableViewPolicyText}>View policy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.agrementView}>

                    <View style={styles.inneragrementview}>

                        <Image source={R.Icon.contract_icon} />
                        <View style={styles.policyTextView}>
                            <Text style={styles.agrementpolicyText} >Agreement policy</Text>
                            <Text style={styles.termsText} >I here by agree to the term and conditions of lease agreement with host </Text>
                            <Text style={styles.detailText}>See details</Text>
                        </View>
                        <Image source={R.Icon.checkBox_icon} />

                    </View>
                </View>

            </View>
            <View style={styles.buttonView}>
                <Button
                    title={'Pay'}
                    isImg={true}
                    source={R.Icon.pay_arrow}
                    onPress={() => handlePayment()} />
            </View>
        </View>
    )
}

export default RideDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: '8%',
        height: height,


    },
    topBacgroundImg: {
        top: 0,
        position: 'relative',
    },
    headerView: {
        position: 'absolute',
        marginTop: hp(2)
    },
    modalView: {
        flexDirection: 'row',
        marginTop: hp(2),
        justifyContent: 'space-between',
        width: moderateScale(300),
        paddingLeft: moderateScale(15)
    },

    modalBookingText: {
        color: '#868686',
        fontSize: R.FontSize.F_1,
        fontFamily: R.Fonts.REGULAR
    },
    ridenameText: {
        color: R.colors.white,
        fontSize: moderateScale(18),
        fontFamily: R.Fonts.BOLD
    },
    hrRateView: {
        borderColor: '#626262',
        borderWidth: 1,
        height: moderateScale(40),
        width: moderateScale(81),
        borderRadius: moderateScale(10),
        justifyContent: 'center'
    },
    hrRateText: {
        color: 'white',
        textAlign: 'center'
    },
    horzontalView: {
        borderBottomWidth: 1,
        borderBottomColor: '#626262',
        marginTop: hp(2),
        borderStyle: 'dashed',
        left: moderateScale(10)
    },
    totalHoursText: {
        color: '#868686',
        fontSize: R.FontSize.F_1,
        fontFamily: R.Fonts.BOLD,
        marginHorizontal: '6%',
        marginTop: hp(2)
    },
    flexView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    innerDateView: {
        // flexDirection: 'row',
        // justifyContent:'center',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        borderColor: '#3F3F3F',
        alignSelf: 'center',
        // alignItems:'center',
        // backgroundColor: 'red',
        width: moderateScale(280),

        //    justifyContent: 'space-evenly',
        marginLeft: moderateScale(15),

    },
    innerDateViewText: {
        color: '#BEB1B1',
        fontSize: moderateScale(22),
        fontFamily: R.Fonts.BOLD,

    },
    changeView: {
        borderColor: '#3F3F3F',
        borderWidth: 1,
        height: moderateScale(27),
        width: moderateScale(75),
        borderRadius: moderateScale(25),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    changeImg: {
        tintColor: R.colors.white,
        height: moderateScale(10),
        width: moderateScale(10)
    },
    innerTimeText: {
        color: '#BEB1B1',
        fontSize: moderateScale(10),
        fontFamily: R.Fonts.LIGHT,

    },
    invoiceButtonText: {
        color: '#4B4B4B',
        fontSize: moderateScale(10),
        fontFamily: R.Fonts.MEDIUM
    },
    arrow_img: {
        height: moderateScale(20),
        width: moderateScale(40),
        resizeMode: 'contain',
        tintColor: '#BEB1B1',
        // alignSelf: 'center'
    },
    innerdateButtonText: {
        color: '#BEB1B1',
        fontSize: moderateScale(10),
        fontFamily: R.Fonts.BOLD
    },
    touchableView: {
        backgroundColor: '#E7E7E7',
        height: height,
        bottom: 0,
        marginTop: hp(1),
        borderTopLeftRadius: moderateScale(15),
        borderTopRightRadius: moderateScale(15),
        marginHorizontal: '-3%',
        position: 'relative'
    },
    touchableStyle: {
        backgroundColor: R.colors.black,
        paddingVertical: 10,
        width: moderateScale(180),
        bottom: hp(7),
        borderRadius: 15,
        alignItems: 'center',
        alignSelf: 'center',
        // marginLeft: hp(3),
        // position:'absolute'

    },
    touchableText: {
        color: R.colors.white,
        fontSize: moderateScale(20),
        fontFamily: R.Fonts.LIGHT,
    },
    touchableSummaryText: {
        color: R.colors.grayText,
        marginLeft: moderateScale(8),
        fontSize: moderateScale(10),
        fontFamily: R.Fonts.LIGHT,

    },
    summary_img: {
        height: moderateScale(16),
        width: moderateScale(16),
        resizeMode: 'contain',
    },
    lastbackgroundView: {
        borderWidth: 1,
        padding: 5,
        borderRadius: moderateScale(20),
        marginHorizontal: '4%',
        borderColor: '#7F7F7F',
        flexDirection: 'row',
        bottom: moderateScale(30)
    },
    bike_img: {
        height: moderateScale(70),
        width: moderateScale(70),
        resizeMode: 'contain'
    },
    chargeText: {
        color: 'black',
        fontFamily: R.Fonts.BOLD,
        fontSize: moderateScale(14)
    },
    policyText: {
        color: '#B0B0B0',
        fontFamily: R.Fonts.LIGHT,
        fontSize: moderateScale(10),
        width: moderateScale(190)
    },
    touchableViewPolicy: {
        borderWidth: 1,
        borderRadius: 20,
        width: moderateScale(90),
        height: moderateScale(30),
        justifyContent: 'center',
        marginTop: hp(1)
    },
    touchableViewPolicyText: {
        textAlign: 'center',
        color: '#7A7A7A',
        fontFamily: R.Fonts.LIGHT,
        fontSize: moderateScale(10)
    },
    agrementView: {
        padding: 5,
        borderRadius: moderateScale(20),
        marginHorizontal: '4%',
        backgroundColor: 'white',
        bottom: hp(2)
    },
    inneragrementview: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10
    },
    policyTextView: {
        width: moderateScale(230),
        marginLeft: moderateScale(10)
    },
    agrementpolicyText: {
        color: 'black',
        fontFamily: R.Fonts.BOLD,
        fontSize: moderateScale(14)
    },
    termsText: {
        color: '#B0B0B0',
        fontFamily: R.Fonts.LIGHT,
        fontSize: moderateScale(10)
    },
    detailText: {
        color: '#4C4C4C',
        marginTop: hp(1),
        borderBottomWidth: 1,
        alignSelf: 'baseline'
    },
    buttonView: {
        backgroundColor: '#222222',
        borderRadius: moderateScale(10),
        marginHorizontal: '10%',
        alignItems: 'center',
        // marginTop:hp(2)
        position: "absolute",
        bottom: 20
    }
})