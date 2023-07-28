import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const DateTimePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Select Date');
  const [selectedTime, setSelectedTime] = useState('Select Time');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color:'#000' , fontSize:24 , fontWeight:'600'}}>Select Pickup Date and Time</Text>
      
      <TouchableOpacity
        style={{
          height: 50,
          width: '60%',
          borderWidth: 1,
          borderRadius: 20,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical:30,
        }}
        onPress={() => {
          showDatePicker();
        }}>
        <Text style={{color:"#000",fontSize:20}}>{selectedDate}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 50,
          width: "60%",
          borderWidth: 1,
          borderRadius: 20,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          showTimePicker();
        }}>
        <Text style={{color:"#000",fontSize:20}}>{selectedTime}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop:20,height:55 , width:'60%',backgroundColor:`#ffa07a`, borderRadius:30,alignItems:'center',justifyContent:'center' ,marginTop:20 }}>
        <Text style={{fontSize:24, color:"#000"}}>Next</Text>
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
    </View>
    </>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({});
