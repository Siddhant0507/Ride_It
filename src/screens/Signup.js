import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { app, database } from '../../FirebaseConfig';
import { collection, addDoc, getDoc } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';
import RNOtpVerify from 'react-native-otp-verify';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        setHash(hash);
        console.log('hash----', hash);
        //use this hash in the message.
      })
      .catch(console.log);
  }, []);

  const isButtonDisabled = !(username && email && licenseNumber && PhoneNumber);

  const collectionRef = collection(database, 'users');

  const signInWithPhoneNumber = async () => {
    try {
      //  setIsLoading(true)
      // alert('hiiiiii');
      const confirmation = await auth().signInWithPhoneNumber(
        '+91' + PhoneNumber,
        true,
        hash,
      );
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
  };

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
    }).then(async (docRef) => {
      const userId = JSON.stringify(docRef.id)
      AsyncStorage.setItem('userId', userId)
      console.log('Document ID:', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data()
        console.log("Document data:", userData);
        const userId = JSON.stringify(userData)
        AsyncStorage.setItem('userData', userId)
      } else {
        console.log("No such document exists!");
      }
      signInWithPhoneNumber();
      // confirmCode()
      Alert.alert('data added successfully');
      navigation.navigate('Otp', { confirm: confirm, });
    });

  };
  return (
    <>
      <ImageBackground source={require("../res/images/background.png")} style={{ height: "100%", width: '100%', zIndex: -1 }} />
      <Image
        style={styles.topImage}
        source={require('../../src/res/images/Wheel.png')}
      />
      <Image
        style={styles.BottomImage}
        source={require('../../src/res/images/Wheel.png')}
      />
      <LinearGradient
        colors={['#fff', '#BDBDBD']}
        style={styles.container}
        useAngle={true}
        angle={180}>
        <Text style={styles.heading}>Sign up</Text>
        <TextInput
          placeholder="Enter Your Full name"
          style={styles.input}
          onChangeText={setUserName}
          keyboardType="default"
          value={username}
        />

        <TextInput
          placeholder="Enter Phone Number "
          style={styles.input}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          value={PhoneNumber}
        />

        <TextInput
          placeholder="Enter Email Address"
          style={styles.input}
          onChangeText={setEmail}
          keyboardType="email-address"
          value={email}
        />

        <TextInput
          placeholder="Enter Driving License Number"
          style={styles.input}
          onChangeText={setLicenseNumber}
          keyboardType="phone-pad"
          value={licenseNumber}
        />

        <TouchableOpacity
          onPress={() => handleSubmit()}
          disabled={isButtonDisabled}
          style={[styles.button, isButtonDisabled && styles.disabledButton]}>
          <Text style={{ fontSize: 18, color: '#fff' }}>Signup</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 0,
    width: '90%',
    height: '100%',
    borderRadius: 31,
    borderWidth: 0.7,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  heading: {
    fontSize: 37,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 50,
  },
  button: {
    height: 45,
    width: '70%',
    backgroundColor: '#000',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  input: {
    borderWidth: 0.7,
    borderColor: '#000',
    marginBottom: 20,
    height: 45,
    width: '70%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  topImage: {
    height: '30%',
    width: '40%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },

  BottomImage: {
    transform: [{ rotate: '180deg' }],
    height: '25%',
    width: '35%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
});
