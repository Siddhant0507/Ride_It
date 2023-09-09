import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app, database } from '../../../../FirebaseConfig';
import { collection, getDocs, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/Header';
import R from '../../../res/R';
const { height, width } = Dimensions.get('window')
import { moderateScale } from '../../../utills/Scalling';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BottomTab from '../../../components/BottomTab';
import { Screen } from '../../../navigation/Screen';
const RideHistory = ({ navigation }) => {

  const [userId, setUserId] = useState('')
  const [data, setData] = useState([]);
  const [selectedButton, setSelectedButton] = useState('Recent');



  useEffect(() => {
    getUserID()
    fetchData();
  }, []);

  // console.log('rider history', data)

  const fetchData = async () => {
    const document = await getDocs(collection(database, 'user_ride_details', userId));
    const result = document.docs.map(doc => doc.data());
    setData(result);

  };

  const filterData = data.filter((id) => id.use_id === userId)
  // console.log('filterDAta>>>>>>>>>>>>>>>>>>>>>', filterData);

  const getUserID = async () => {
    const jsonValue = await AsyncStorage.getItem('userId')
    let userId = JSON.parse(jsonValue)
    setUserId(userId)
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listView}>
        <View style={styles.innerButtonView}>
          <TouchableOpacity style={styles.dropOnButton}>
            <Text style={styles.dropOnButtonText}>Dropped on time</Text>
          </TouchableOpacity>
          <Image source={R.Icon.scooty_icon} style={[styles.imgScooty]} />
          <TouchableOpacity style={styles.invoiceButton}>
            <Text style={styles.invoiceButtonText}>Download invoice</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.innerDateView}>
          <View>
            <Text style={styles.innerDateViewText}>Pick up Date and time </Text>
            <Text style={styles.innerdateButtonText}>{item.pickUpDate}</Text>
            <Text style={styles.innerTimeText} >{item.pickUpTime}</Text>

          </View>
          <Image source={R.Icon.arrow_icon} style={styles.arrow_img} />

          <View>
            <Text style={styles.innerDateViewText}>Drop Date and time </Text>
            <Text style={styles.innerdateButtonText}>{item.dropDate}</Text>
            <Text style={styles.innerTimeText}>{item.dropTime}</Text>
          </View>
        </View>
        <View style={styles.ratingView}>
          <View>
            <Text style={styles.activaText}>{item.vichleName}</Text>
            <Text style={styles.hourText}>{item.totalHours} hrs <Text style={styles.innerHourText}>( Total hours)</Text></Text>

          </View>
          <View>
            <Text style={styles.ratingText}>Your rating</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image source={R.Icon.star_icon} style={styles.star_img} />
              <Image source={R.Icon.star_icon} style={styles.star_img} />
              <Image source={R.Icon.star_icon} style={styles.star_img} />
              <Image source={R.Icon.star_icon} style={styles.star_img} />
              <Image source={R.Icon.white_star_icon} style={styles.star_img} />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.touchableStyle}>
          <Text style={styles.touchableText}>{item.totalAmount}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image source={R.Icon.summary_icon} style={styles.summary_img} />
            <Text style={styles.touchableSummaryText}>Fare summary</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Header onPress={() => navigation.goBack()}
            source={R.Icon.header_icon} />
          <View style={styles.buttonGroupContainer}>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={selectedButton === 'Recent' ? styles.selectedButton : styles.unselectButton}
                onPress={() => handleButtonPress('Recent')}
              >
                <Text style={selectedButton === 'Recent' ? styles.unselectButtonText : styles.buttonText}>Recent</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={selectedButton === 'Ongoing' ? styles.selectedButton : styles.unselectButton}
                onPress={() => handleButtonPress('Ongoing')}
              >
                <Text style={selectedButton === 'Ongoing' ? styles.unselectButtonText : styles.buttonText}>Ongoing</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={selectedButton === 'Past month' ? styles.selectedButton : styles.unselectButton}
                onPress={() => handleButtonPress('Past month')}
              >
                <Text style={selectedButton === 'Past month' ? styles.unselectButtonText : styles.buttonText}>Past month</Text>
              </TouchableOpacity>
              <TouchableOpacity
              // style={selectedButton === 'Past month' ? styles.selectedButton : null}
              // onPress={() => handleButtonPress('Past month')}
              >
                <Image source={R.Icon.drawer_icon} style={styles.img} />
              </TouchableOpacity>
            </View>
          </View>

          {filterData.length ?
            <View style={{
             marginTop: hp(1), height:hp(80),paddingBottom:moderateScale(50)

            }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={filterData}
                renderItem={renderItem} />
            </View>
            :
          <Text style={{ textAlign: 'center', marginTop: 350 }}>No record</Text>}

        </View>

        <BottomTab
          onPressHome={() => navigation.navigate(Screen.HOME)}
          onPressRideHistory={() => navigation.navigate(Screen.RIDE_HISTORY)}
          onPressProfile={() => navigation.navigate(Screen.PROFILE)}
          activeTab={'rideHistory'}
        />
      </View>
    </>

  )
}

export default RideHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    backgroundColor: R.colors.background
  },
  subContainer: {
    marginHorizontal: '2%'
  },
  buttonGroupContainer: {
    marginTop: hp('3%'),

  },
  selectedButton: {
    backgroundColor: R.colors.black,
    borderWidth: 1,
    height: hp(5),
    paddingHorizontal: moderateScale(15),
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hp('1%'),

  },
  unselectButton: {
    borderColor: R.colors.button_background,
    borderWidth: 1,
    height: hp(5),
    paddingHorizontal: moderateScale(15),
    justifyContent: 'center',
    borderRadius: 10,
  },

  buttonText: {
    color: R.colors.unselect_Button,
    fontFamily: R.Fonts.REGULAR,
    fontSize: moderateScale(15),
  },
  unselectButtonText: {
    color: R.colors.selectedButton,
    fontFamily: R.Fonts.REGULAR,
    fontSize: moderateScale(15),
  },
  img: {
    height: moderateScale(33),
    width: moderateScale(33),
    resizeMode: 'contain'
  },


  listView: {
    marginTop: hp(5),
    backgroundColor: R.colors.white,
    padding: 15,
    marginHorizontal: '2%',
    borderRadius: 15,
   
  },
  innerButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  innerDateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    borderColor: '#818181',


  },
  imgScooty: {
    bottom: 50,
    borderRadius: 10,
    height: moderateScale(60),
    width: moderateScale(60),
    resizeMode: 'contain'

  },
  dropOnButton: {
    backgroundColor: R.colors.green,
    height: hp('3'),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
    borderRadius: 12,
    justifyContent: 'center',
  },
  dropOnButtonText: {
    color: '#4A4A4A',
    fontSize: moderateScale(10),
    fontFamily: R.Fonts.MEDIUM,

  },
  innerDateViewText: {
    color: '#898989',
    fontSize: moderateScale(10),
    fontFamily: R.Fonts.MEDIUM,

  },
  innerTimeText: {
    color: '#5D5D5D',
    fontSize: moderateScale(12),
    fontFamily: R.Fonts.LIGHT,

  },
  invoiceButtonText: {
    color: '#4B4B4B',
    fontSize: moderateScale(10),
    fontFamily: R.Fonts.MEDIUM
  },
  invoiceButton: {
    borderColor: '#7F7F7F',
    borderWidth: 1,
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(8),
    height: hp(3),
    borderRadius: 5,
    justifyContent: 'center',
  },
  arrow_img: {
    height: moderateScale(20),
    width: moderateScale(45),
    resizeMode: 'contain',
    tintColor: '#242424',
    alignSelf: 'center'
  },
  innerdateButtonText: {
    color: '#242424',
    fontSize: moderateScale(14),
    fontFamily: R.Fonts.BOLD
  },
  hourText: {
    color: '#242424',
    fontSize: moderateScale(18),
    fontFamily: R.Fonts.BOLD

  },
  activaText: {
    color: '#242424',
    fontSize: moderateScale(16),
    fontFamily: R.Fonts.LIGHT
  },
  innerHourText: {
    color: '#ABABAB',
    fontFamily: R.Fonts.LIGHT,
    fontSize: moderateScale(12)
  },
  touchableText: {
    color: R.colors.white,
    fontSize: moderateScale(18),
    fontFamily: R.Fonts.LIGHT,
  },
  touchableSummaryText: {
    color: R.colors.grayText,
    marginLeft: moderateScale(8),
    fontSize: moderateScale(10),
    fontFamily: R.Fonts.LIGHT,

  },
  ratingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '4%',
    marginTop: hp(2)
  },
  ratingText: {
    color: '#828282',
    fontFamily: R.Fonts.REGULAR,
    fontSize: R.FontSize.F_1

  },
  star_img: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: 'contain',
  },
  touchableStyle: {
    backgroundColor: R.colors.black,
    paddingVertical: 6,
    width: moderateScale(150),
    marginTop: hp(2),
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: hp(3)

  },
  summary_img: {
    height: moderateScale(16),
    width: moderateScale(16),
    resizeMode: 'contain',
  },

})