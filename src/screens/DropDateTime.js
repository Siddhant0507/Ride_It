import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { DropTimeDate } from '../redux/reducer/authReducer';
import { useDispatch } from 'react-redux';

const DropDateTime = ({ navigation }) => {
    dispatch = useDispatch()

    const [dateDropVisible, setDateDropVisible] = useState(false);
    const [dropTimeVisible, setdropTimeVisible] = useState(false);
    const [dropDate, setDropDate] = useState('Select Date');
    const [dropTime, setDropTime] = useState('Select Time');

    const detail = { dropDate, dropTime }


    const showDatePicker = () => {
        setDateDropVisible(true);
    };
    const hideDatePicker = () => {
        setDateDropVisible(false);
    };
    const showTimePicker = () => {
        setdropTimeVisible(true);
    };

    const hideTimePicker = () => {
        setdropTimeVisible(false);
    };

    const handleDateConfirm = date => {
        const dt = new Date(date);
        const x = dt.toISOString().split('T');
        const x1 = x[0].split('-');
        setDropDate(x1[2] + '-' + x1[1] + '-' + x1[0]);
        hideDatePicker();
    };

    const handleTimeConfirm = date => {
        const dt = new Date(date);
        const x = dt.toLocaleTimeString();
        setDropTime(x);
        hideTimePicker();
    };
    return (
        <View style={styles.container}>
            <DateTimePickerModal
                isVisible={dateDropVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />

            <DateTimePickerModal
                isVisible={dropTimeVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
            />
            <Text style={styles.headingText}>Select Drop Date and Time</Text>

            <TouchableOpacity
                style={styles.dateStyle}
                onPress={() => {
                    showDatePicker();
                }}>
                <Text style={styles.touchableText}>{dropDate}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.dateStyle]}
                onPress={() => {
                    showTimePicker();
                }}>
                <Text style={styles.touchableText}>{dropTime}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle}
                onPress={() => navigation.navigate("BookingDetail", dispatch(DropTimeDate(detail)))}

            >
                <Text style={styles.touchableText}>Next</Text>
            </TouchableOpacity>

        </View>
    )
}

export default DropDateTime

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600'
    },
    dateStyle: {
        height: 50,
        width: '60%',
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '4%',
    },
    touchableText: {
        color: "#000",
        fontSize: 20,
        fontWeight: '600',

    },
    buttonStyle: {
        marginTop: 20,
        height: 55,
        width: '60%',
        backgroundColor: `#ffa07a`,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
})