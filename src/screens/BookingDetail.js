import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import { app, database } from '../../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingDetail = ({ navigation }) => {
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
        console.log('AsynkStorageGetITEm---======', userId);
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
    const totalCost = hours * hourlyRate;
    console.log('--=====totalCost===', totalCost);

    const handlePayment = async () => {

        await addDoc(collectionRef, {
           
                dropDate: dropData.dropDate,
                dropTime: dropData.dropTime,
                pickUpDate: pickUpData.selectedDate,
                pickUpTime: pickUpData.selectedTime,
                totalAmount: totalCost,
                totalHours: hours,
                vichleName: Ride.name,
                use_id:userId
          
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
                        navigation.navigate('BookingComplete')
                    }
                    // console.log('options', data);
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
            <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 20, color: 'black', fontWeight: 'bold' }}>BookingDetail</Text>
            <View style={[styles.cardView, { backgroundColor: 'black' }]}>
                <View style={[styles.innerCardView]}>
                    <Image source={{ uri: Ride.Image }} style={styles.imgStyle} />
                    <Text style={[styles.headingText, { alignSelf: 'center', marginTop: 10 }]}>{Ride.name}</Text>

                </View>
                <View style={{ marginLeft: 10, }}>
                    <Text style={styles.headingText}>Pick Up Date -{pickUpData.selectedDate}</Text>
                    <Text style={styles.headingText}>Pick Up Time -{pickUpData.selectedTime}</Text>
                    <Text style={styles.headingText}>Drop Date -{dropData.dropDate}</Text>
                    <Text style={styles.headingText}>Drop Time -{dropData.dropTime}</Text>
                    <Text style={styles.headingText}>Total hours -{hours}</Text>
                    <Text style={styles.headingText}>Amount-{totalCost}</Text>
                    <TouchableOpacity style={styles.touchableStyle}
                        onPress={() => handlePayment()}  >
                        <Text style={styles.touchableText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default BookingDetail

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginHorizontal: '8%'
    },
    headingText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    imgStyle: {
        width: 120,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 15
    },
    touchableStyle: {
        marginTop: 10,
        backgroundColor: `#ffa07a`,
        borderRadius: 30,
        alignItems: 'center',
        padding: 5
    },
    touchableText: {
        color: "#000",
        fontSize: 20,
        fontWeight: '600',

    },
    cardView: {
        marginTop: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10
    },
    innerCardView: {
        bottom: 20
    }
})