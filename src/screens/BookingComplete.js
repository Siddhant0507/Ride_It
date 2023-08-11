import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

const BookingComplete = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Book Ride Successfull</Text>
      <TouchableOpacity style={styles.touchableStyle}
                onPress={() =>navigation.navigate('RideSelect')}
            >
                <Text style={styles.touchableText}>Go Back To Home</Text>
            </TouchableOpacity>
    </View>
  )
}

export default BookingComplete

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
        marginTop: 20
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