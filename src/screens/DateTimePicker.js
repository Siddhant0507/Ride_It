import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {PickUpDateTime} from '../redux/reducer/authReducer';
import Icon from 'react-native-vector-icons/FontAwesome';
const DateTimePicker = ({navigation}) => {
  const {Ride} = useSelector(state => state.Login);
  dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Select Date');
  const [selectedTime, setSelectedTime] = useState('Select Time');

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const detail = {selectedDate, selectedTime};

  const handleDateConfirm = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    setSelectedDate(x1[2] + '-' + x1[1] + '-' + x1[0]);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = date => {
    const dt = new Date(date);
    const x = dt.toLocaleTimeString();
    setSelectedTime(x);
    hideTimePicker();
  };

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 50,
          borderWidth:0.5,
          borderRadius:30,
          marginHorizontal:30,
          padding:20
        }}>
        <Image
          source={{uri: Ride.Image}}
          style={styles.imgStyle}
          resizeMode="cover"
        />

        

        <Text style={{fontSize: 20, color: '#000'}}>{Ride.name}</Text>
        <Text>{Ride.vehicleNumber}</Text>
        <Text>Milage - {Ride.milage}</Text>
      </View>

      <View style={styles.dateTimeContainer}>
        <View
          style={{
            marginVertical:20,
            marginHorizontal:20,
            borderWidth: 0.3,
            borderColor: '#fff',
            borderRadius: 23,
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems:'center'
          }}>
          <View>
            <Text style={{color: '#A2A2A2',fontSize:17}}>{selectedDate}</Text>
            <Text style={{color: '#A2A2A2'}}>{selectedTime}</Text>
          </View>
        
          <Icon name="long-arrow-right" icon='fa-thin' solid size={20} color='#fff' />
          <View>
            <Text style={{color: '#A2A2A2',fontSize:17}}>{selectedDate}</Text>
            <Text style={{color: '#A2A2A2'}}>{selectedTime}</Text>
          </View>
        </View>

        <Text style={{color: '#fff', paddingBottom: 10, textAlign: 'center'}}>
          Select Pickup Date and Time
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom:20
          }}>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => {
              showDatePicker();
            }}>
            <Text style={{color: '#fff'}}>{selectedDate}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.timeInput}
            onPress={() => {
              showTimePicker();
            }}>
            <Text style={{color: '#fff'}}>{selectedTime}</Text>
          </TouchableOpacity>
        </View>

        <Text style={{color: '#fff', paddingBottom: 10, textAlign: 'center'}}>
          Select Drop Date and Time
        </Text>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('DropDateTime', dispatch(PickUpDateTime(detail)))
        }>
        <Text style={{color: '#fff', fontSize: 20}}>Next</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  imgStyle: {
    width: 200,
    height: 150,
    marginTop: 10,
    borderRadius: 20,
  },
  dateTimeContainer: {
    backgroundColor: '#444444',
    marginHorizontal: 10,
    borderRadius: 20,
  },
  dateInput: {
    height: 45,
    padding: 15,
    borderRadius: 44,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5b5b5b',
    marginRight: 30,
  },
  timeInput: {
    padding: 15,
    height: 45,
    backgroundColor: '#000000',
    borderRadius: 44,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    height: 52,
    width: '90%',
    backgroundColor: `#000`,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    bottom:20
  },
});
