import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const BookingDetail = () => {
    const { Ride, pickUpData, dropData } = useSelector((state) => state.Login)
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>BookingDetail</Text>
            <Text style={styles.headingText}>Bike Name -{Ride.name}</Text>
            <Image source={{ uri: Ride.Image }} style={{ width: 200, height: 150, marginTop: 20 }} resizeMode="cover" />
            <Text style={styles.headingText}>Pick Up Date -{pickUpData.selectedDate}</Text>
            <Text style={styles.headingText}>Pick Up Time -{pickUpData.selectedTime}</Text>
            <Text style={styles.headingText}>Drop Date -{dropData.dropDate}</Text>
            <Text style={styles.headingText}>Drop Time -{dropData.dropTime}</Text>
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
})