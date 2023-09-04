import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { PickUpDateTime, DropTimeDate } from '../../../redux/reducer/authReducer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../../components/Header';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import R from '../../../res/R';
import Button from '../../../components/Button';
import { moderateScale } from '../../../utills/Scalling';
const DateTimePicker = ({ navigation }) => {
  const { Ride } = useSelector(state => state.Login);
  dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Select Date');
  const [selectedTime, setSelectedTime] = useState('Select Time');
  const [dateDropVisible, setDateDropVisible] = useState(false);
  const [dropTimeVisible, setdropTimeVisible] = useState(false);
  const [dropDate, setDropDate] = useState('Select Drop Date');
  const [dropTime, setDropTime] = useState('Select Drop Time');

  const dropDetail = { dropDate, dropTime }

  const showDropDatePicker = () => {
    setDateDropVisible(true);
  };
  const hideDropDatePicker = () => {
    setDateDropVisible(false);
  };
  const showDropTimePicker = () => {
    setdropTimeVisible(true);
  };

  const hideDropTimePicker = () => {
    setdropTimeVisible(false);
  };

  const handleDropDateConfirm = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    setDropDate(x1[2] + '-' + x1[1] + '-' + x1[0]);
    hideDropDatePicker();
  };

  const handleDropTimeConfirm = date => {
    const dt = new Date(date);
    const x = dt.toLocaleTimeString();
    setDropTime(x);
    hideDropTimePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const detail = { selectedDate, selectedTime };

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
      <DateTimePickerModal
        isVisible={dateDropVisible}
        mode="date"
        onConfirm={handleDropDateConfirm}
        onCancel={hideDropDatePicker}
      />
      <DateTimePickerModal
        isVisible={dropTimeVisible}
        mode="time"
        onConfirm={handleDropTimeConfirm}
        onCancel={hideDropTimePicker}
      />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.headerStyle}>
            <Header onPress={() => navigation.goBack()}
              source={R.Icon.light_arrow} />
          </View>
        </View>
        <View
          style={styles.middleContainer}>
          <View style={styles.scootyViewStyle}>
            <Image source={R.Icon.scooty_icon} style={styles.scootyImgStyle} />
          </View>
          <View style={styles.middleTextView}>
            <Text style={styles.modalFont}>Model- 2018</Text>
            <Text style={styles.modalFont}>Purchased on Nov , 2018</Text>
            <Text style={styles.activaText}>{Ride.name}</Text>
          </View>
          <View style={styles.middleDrivenView}>
            <View >
              <Text style={styles.drivenText}>Driven </Text>
              <Text style={styles.drivenText}>Millage</Text>
              <Text style={styles.drivenText}>Top speed</Text>
              <Text style={styles.drivenText}>Last servicing</Text>
            </View>
            <View style={{}}>
              <Text style={styles.kmText}>1467 kms</Text>
              <Text style={styles.kmText}>40 kmpl</Text>
              <Text style={styles.kmText}>90</Text>
              <Text style={styles.kmText}>June , 2023</Text>
            </View>
          </View>

        </View>

        <View style={styles.dateTimeContainer}>
          <Image source={R.images.date_time_image} style={styles.lastViewImg} />
          <View style={styles.lastView}>

            <Text style={styles.totalText}>Total hours</Text>
            <View style={styles.innerDateView}>

              <Text style={styles.innerDateViewText}>50 hrs</Text>


              <View style={styles.innerDateStyle}>
                <View>
                  <Text style={styles.innerdateButtonText}>Sun ,{selectedDate}</Text>
                  <Text style={styles.innerTimeText} >{selectedTime}</Text>
                </View>
                <Image source={R.Icon.arrow_icon} style={styles.arrow_img} />

                <View>
                  <Text style={[styles.innerdateButtonText,]}>Sun ,{dropDate}</Text>
                  <Text style={styles.innerTimeText}>{dropTime}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: hp(3) }}>
              <Text style={styles.pickupHeadingText}>Pickup Date and time</Text>
              <View
                style={styles.dateTimeInput}>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => { showDatePicker() }}>
                  <Text style={styles.dateInputText}>{'Sun,' + selectedDate}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.timeInput}
                  onPress={() => { showTimePicker() }}>
                  <Text style={styles.dateInputText}>{selectedTime}</Text>
                  <Image source={R.Icon.down_icon} style={styles.timeInputImg} />
                </TouchableOpacity>
                <Image source={R.Icon.date_icon} style={styles.calenderImg} />
              </View>
            </View>
            <View style={{ marginTop: hp(2) }}>
              <Text style={styles.pickupHeadingText}> Drop Date and time</Text>


              <View style={styles.dateTimeDropInput}>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => {
                    showDropDatePicker();
                  }}>
                  <Text style={styles.dateInputText}>{'Sun,' + dropDate}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.timeInput, { marginLeft: moderateScale(10) }]}
                  onPress={() => { showDropTimePicker() }}>
                  <Text style={styles.dateInputText}>{dropTime}</Text>
                  <Image source={R.Icon.down_icon} style={styles.timeInputImg} />
                </TouchableOpacity>


              </View>

            </View>
           
          </View>
          <View style={styles.buttonView}>
              <Button
                title={'Pay'}
                isImg={true}
                source={R.Icon.pay_arrow}
                onPress={() =>
                  navigation.navigate('RideDetail', dispatch(PickUpDateTime(detail), dispatch(DropTimeDate(dropDetail))))

                }
              // onPress={() => handlePayment()}
              />
            </View>
        </View>

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
      </View >
    </>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '3%'

  },
  topContainer: {
    backgroundColor: R.colors.background_date_time,
    paddingVertical: hp(6),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    borderBottomRightRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(20),
    position: 'relative'
  },
  headerStyle: {
    position: 'absolute',
    left: hp(2),
    top: hp(1)
  },
  middleContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(20),
    marginTop: hp(2),
  },
  scootyViewStyle: {
    position: 'absolute',
    alignSelf: 'center',
    top: hp(-6.5)
  },
  scootyImgStyle: {
    resizeMode: 'contain',
    borderRadius: 15,
    height: moderateScale(85),
    width: moderateScale(85)
  },
  middleTextView: {
    alignItems: 'center',
    marginTop: hp(7),
  },
  imgStyle: {
    width: 200,
    height: 150,
    marginTop: 10,
    borderRadius: 20,
  },

  dateTimeContainer: {
    // backgroundColor: '#444444',
    // marginHorizontal: '2%',
    // borderRadius: 20,
    marginTop: hp(1),
    justifyContent: 'center',
    alignItems: 'center'

  },
  lastViewImg: {
    height: moderateScale(370),
    width: moderateScale(350),
    resizeMode: 'stretch'
  },
  lastView: {
    top: hp(2),
    position: "absolute",
  },
  totalText: {
    color: '#656565',
    fontSize: R.FontSize.F_1,
    fontFamily: R.Fonts.BOLD,
    left: hp(4)

  },
  dateTimeInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    // backgroundColor:'red',
    paddingLeft: moderateScale(8)
  },
  dateTimeDropInput: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: hp(1),
    // backgroundColor:'red',
    paddingLeft: moderateScale(8)
  },
  dateInput: {
    // height: 45,
    paddingVertical: 10,
    borderRadius: 44,
    backgroundColor: '#5D5D5D',
    paddingHorizontal: 10,

  },
  dateInputText: {
    color: '#D2D2D2',
    fontFamily: R.Fonts.BOLD,
    fontSize: moderateScale(12)

  },
  timeInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#000000',
    borderRadius: 44,
    // alignSelf: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
    // width: moderateScale(100),
    flexDirection: 'row',
    // justifyContent:'space-around'

  },
  timeInputImg: {
    marginLeft: moderateScale(10),
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain'
  },
  button: {
    alignSelf: 'center',
    height: 52,
    width: '90%',
    backgroundColor: `#000`,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10
  },
  calenderImg: {
    height: moderateScale(38),
    width: moderateScale(38),
    resizeMode: 'contain'
  },
  modalFont: {
    color: '#6C6C6C',
    fontFamily: R.Fonts.MEDIUM,
    fontSize: R.FontSize.F_1
  },
  activaText: {
    color: R.colors.black,
    fontFamily: R.Fonts.BOLD,
    fontSize: R.FontSize.F_3
  },
  middleDrivenView: {
    flexDirection: 'row',
    width: moderateScale(300),
    justifyContent: 'space-around',
    paddingBottom: moderateScale(15)
  },
  drivenText: {
    color: '#8B8B8B',
    fontFamily: R.Fonts.MEDIUM,
    fontSize: R.FontSize.F_2
  },
  kmText: {
    color: R.colors.black,
    fontFamily: R.Fonts.BOLD,
    fontSize: R.FontSize.F_2
  },
  innerDateView: {

    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    // paddingBottom:5,
    borderColor: '#3F3F3F',
    alignSelf: 'center',
    // alignItems:'center',
    // backgroundColor: 'red',
    width: moderateScale(290),
    marginTop: moderateScale(5)



  },
  innerDateViewText: {
    color: '#BEB1B1',
    fontSize: moderateScale(22),
    fontFamily: R.Fonts.BOLD,

  },
  innerDateStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  innerdateButtonText: {
    color: '#A2A2A2',
    fontSize: moderateScale(10),
    fontFamily: R.Fonts.BOLD
  },
  innerTimeText: {
    color: '#A2A2A2',
    fontSize: moderateScale(10),
    fontFamily: R.Fonts.LIGHT,


  },
  pickupHeadingText: {
    color: '#969696',
    fontSize: moderateScale(10),
    fontFamily: R.Fonts.BOLD,
    left: hp(4)

  },
  arrow_img: {
    height: moderateScale(20),
    width: moderateScale(40),
    resizeMode: 'contain',
    tintColor: '#BEB1B1',
    // alignSelf: 'center'
  },
  buttonView: {
    backgroundColor: '#222222',
    borderRadius: moderateScale(10),
    marginHorizontal: '10%',
    alignItems: 'center',
    // top: hp(4.5),
    position: "absolute",
    bottom: 0

  }
});
