import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { app, database } from '../../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import auth from '@react-native-firebase/auth'
import RNOtpVerify from 'react-native-otp-verify'

const Signup = ({ navigation }) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [hash, setHash] = useState('');


  useEffect(() => {
    RNOtpVerify.getHash()
      .then(hash => {
        setHash(hash)
        console.log('hash----', hash);
        //use this hash in the message.
      }).catch(console.log);
    }, [])


  const isButtonDisabled = !(username && email && licenseNumber && PhoneNumber);

  const collectionRef = collection(database, 'users');

  const signInWithPhoneNumber = async () => {
    try {
      //  setIsLoading(true)
      alert('hiiiiii')
      const confirmation = await auth().signInWithPhoneNumber('+91' + PhoneNumber, true, hash);
      setConfirm(confirmation);
      //  setIsLoading(false);
      //  setModalVisible(true)
      console.log('confirmation======', confirmation);
    } catch (error) {
      console.log('error======', error);
      // ToastAndroid.show(error, ToastAndroid.SHORT);
      //  setMobile('')
      //  setIsLoading(false);
    }
  }

  //const confirmCode = async () => {
  //   try {
  //     const Verify = await confirm.confirm(code);
  //     if (Verify) {
  //       //  setModalVisible(false)
  //       // NavigationServices.navigate(Screen.PROFILE_AFTER_SIGN_UP)
  //     }
  //     console.log('code.=====', code);
  //     console.log('Verify.=====', Verify);

  //   } catch (error) {

  //     //  setOtpError('Invalid otp......')
  //     // ToastAndroid.show('please Enter Valid Otp', ToastAndroid.SHORT);
  //     console.log('Invalid otp===', error)
  //   }
  // }

  const handleSubmit = async () => {
    await addDoc(collectionRef, {
      Name: username,
      email: email,
      phoneNumber: PhoneNumber,
      driverLicense: licenseNumber,
    })
      .then(() => {
        signInWithPhoneNumber()
        // confirmCode()
        Alert.alert('data added successfully');
        navigation.navigate('Otp',{confirm:confirm});
      })

  };
  return (
    <>
      <Image
        style={{ height: '40%', width: 'auto' }}
        source={require('../../src/res/images/signup.jpg')}
      />
      <ScrollView>
        <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
          <Text> Name </Text>
          <TextInput
            style={{
              height: 45,
              width: 'auto',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingLeft: 20,
              fontSize: 24,
            }}
            onChangeText={setUserName}
            keyboardType="default"
            value={username}
          />

          <Text style={{ paddingTop: 20 }}> Phone Number </Text>
          <TextInput
            style={{
              height: 45,
              width: 'auto',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingLeft: 20,
              fontSize: 24,
            }}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            value={PhoneNumber}
          />

          <Text style={{ paddingTop: 20 }}> Email ID</Text>
          <TextInput
            style={{
              height: 45,
              width: 'auto',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingLeft: 20,
              fontSize: 24,
            }}
            onChangeText={setEmail}
            keyboardType="email-address"
            value={email}
          />

          <Text style={{ paddingTop: 20 }}> Driver Licenses Number </Text>
          <TextInput
            style={{
              height: 45,
              width: 'auto',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingLeft: 20,
              fontSize: 24,
            }}
            onChangeText={setLicenseNumber}
            keyboardType="phone-pad"
            value={licenseNumber}
          />
        </View>

      </ScrollView>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        disabled={isButtonDisabled}
        style={[styles.button, isButtonDisabled && styles.disabledButton]}>
        <Text style={{ fontSize: 18, color: '#fff' }}>Signup</Text>
      </TouchableOpacity>


     
    </>



  );
};

export default Signup;

const styles = StyleSheet.create({
  button: {
    height: 55,
    width: '90%',
    backgroundColor: `#ffa07a`,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
