import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';

const BookingDetail = ({ navigation }) => {
    const { Ride, pickUpData, dropData } = useSelector((state) => state.Login)

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

    const handlePayment = () => {
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
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>BookingDetail</Text>
            <Text style={styles.headingText}>Bike Name -{Ride.name}</Text>
            <Image source={{ uri: Ride.Image }} style={styles.imgStyle} resizeMode="cover" />
            <Text style={styles.headingText}>Pick Up Date -{pickUpData.selectedDate}</Text>
            <Text style={styles.headingText}>Pick Up Time -{pickUpData.selectedTime}</Text>
            <Text style={styles.headingText}>Drop Date -{dropData.dropDate}</Text>
            <Text style={styles.headingText}>Drop Time -{dropData.dropTime}</Text>
            <Text style={styles.headingText}>Total hours -{hours}</Text>
            <Text style={styles.headingText}>Amount 40 rs.per hour -{totalCost}</Text>
            <TouchableOpacity style={styles.touchableStyle}
                onPress={() => handlePayment()}
            >
                <Text style={styles.touchableText}>Book Now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BookingDetail

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
        marginTop: 20
    },
    imgStyle: {
        width: 200,
        height: 150,
        marginTop: 10
    },
    touchableStyle: {
        marginTop: 15,
        height: 55,
        width: '60%',
        backgroundColor: `#ffa07a`,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableText: {
        color: "#000",
        fontSize: 20,
        fontWeight: '600',

    },

})