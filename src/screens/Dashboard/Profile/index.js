import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Dimensions, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInput from '../../../components/TextInput';
import BottomTab from '../../../components/BottomTab';
import { Screen } from '../../../constants/Screen';
import R from '../../../res/R';
import { moderateScale } from '../../../utills/Scalling';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window')
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../components/Button';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState(userData?.Name);
  const [userEmail, setUserEmail] = useState(userData?.phoneNumber);
  const [userPhoneNo, setUserPhoneNo] = useState(userData?.email);
  const [userLicense, setUserLicense] = useState(userData?.driverLicense);



  useEffect(() => {
    fetchData();
  }, []);

  console.log('userName', userData?.email);
  const fetchData = async () => {
    const jsonValue = await AsyncStorage.getItem('userData');
    let userData = JSON.parse(jsonValue)
    setUserData(userData);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image source={R.images.profile_background} style={styles.profileBackground} />
        <View style={styles.subContainer}>
          <Image source={R.images.user_profile} style={styles.userProfile} />
          <Text style={styles.nameText}>Vansh Nagarkoti</Text>
          <View style={styles.inputView}>
            <UserInput
              inputTitle={'Name'}
              Icon={R.Icon.input_icon}
              value={userData?.Name}
            />
            <UserInput
              inputTitle={'Phone number'}
              Icon={R.Icon.input_icon}
              value={userData?.phoneNumber}
            />
            <UserInput
              inputTitle={'Gmail'}
              Icon={R.Icon.input_icon}
              value={userData?.email}
            />
            <UserInput
              inputTitle={'Driving license number'}
              Icon={R.Icon.camera_icon}
              value={userData?.driverLicense}
            />
          </View>
        </View>
        <View style={{
          backgroundColor: '#222222',
          borderRadius: moderateScale(10),

        }}>
          <Button
            title={'Save Changes'} />
        </View>
        <BottomTab
          onPressHome={() => navigation.navigate(Screen.HOME)}
          onPressRideHistory={() => navigation.navigate(Screen.RIDE_HISTORY)}
          onPressProfile={() => navigation.navigate(Screen.PROFILE)}
          activeTab="profile"
        />

      </View>
    </KeyboardAwareScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    flex: 1,
    height: height,
    alignItems: 'center',
  },
  profileBackground: {
    height: moderateScale(600),
    width: moderateScale(350),
    resizeMode: 'contain'
  },
  subContainer: {
    position: 'absolute',
    marginTop: hp(16),
    alignItems: 'center'
  },
  userProfile: {
    height: moderateScale(150),
    width: moderateScale(150),
    resizeMode: 'contain',
  },
  nameText: {
    fontSize: moderateScale(14),
    fontFamily: R.Fonts.BOLD,
    color: R.colors.black,
    bottom: 15
  },
  inputView: {
    // marginVertical:2
  }

})