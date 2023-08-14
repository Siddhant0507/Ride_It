import {StyleSheet, Text, View, TouchableOpacity, Image,ScrollView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
const BookingComplete = ({navigation}) => {
  const {Ride, pickUpData, dropData} = useSelector(state => state.Login);
  return (
    <ScrollView>
      <LinearGradient
        colors={['#00CE15', '#FBFAFA']}
        style={styles.container}
        useAngle={true}
        angle={180}>
        <Image
          style={styles.wheel}
          source={require('../../src/res/images/fullWheel.png')}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: '700',
            color: '#000',
            paddingBottom: 30,
          }}>
          Booking Confirmed
        </Text>
      </LinearGradient>
      <View
        style={{
          alignSelf: 'center',
          backgroundColor: '#E7E7E7',
          width: '90%',
          marginTop: 20,
          borderRadius: 20,
          padding: 20,
        }}>
        <Image
          source={{uri: Ride.Image}}
          style={styles.imgStyle}
          resizeMode="cover"
        />
        {/* <Text>{pickUpData.selectedTime}</Text> */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: '#000',
            lineHeight: 22,
            textAlign: 'center',
          }}>
          {' '}
          {Ride.name}
        </Text>
        <View
          style={{
            backgroundColor: '#D9D9D9',
            padding: 15,
            borderBottomWidth: 0.5,
            borderRadius: 20,
            marginVertical: 19,
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 20, color: '#000', textAlign: 'center'}}>
            {Ride.vehicleNumber}
          </Text>
        </View>
        <Text style={{fontSize: 18, color: '#000', fontWeight: '700'}}>
          Invoice
        </Text>

        <View style={styles.invoiceBox}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View>
              <Text>{pickUpData.selectedDate}</Text>
              <Text>{pickUpData.selectedTime}</Text>
            </View>
            <Icon
              name="long-arrow-right"
              icon="fa-thin"
              solid
              size={20}
              color="#000"
            />
            <View>
              <Text>{dropData.dropDate}</Text>
              <Text>{dropData.dropTime}</Text>
            </View>
          </View>
          <Text style={{fontSize:18,color:'#000',fontWeight:"700",paddingVertical:20}}>Total Fare</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default BookingComplete;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wheel: {
    height: 100,
    width: 100,
    marginTop: 50,
    marginBottom: 20,
  },
  imgStyle: {
    width: 200,
    height: 150,
    marginTop: 10,
    alignSelf: 'center',
  },
  invoiceBox: {
    borderWidth: 0.5,
    borderRadius: 20,
    padding:20
  },
});
