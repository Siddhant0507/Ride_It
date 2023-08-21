import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  ImageBackground
} from 'react-native';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import RNOtpVerify from 'react-native-otp-verify';

const Login = ({ navigation }) => {
  const [PhoneNumber, setPhoneNumber] = useState('');

  const [confirm, setConfirm] = useState(null);

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

  // If null, no SMS has been sent

  // verification code (OTP - One-Time-Passcode)

  const isButtonDisabled = !(PhoneNumber);

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
      if (confirmation) {
        navigation.navigate("Otp", { confirm: confirm })

      }
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

  // if (!confirm) {
  //   return (
  //     <Button
  //       title="Phone Number Sign In"
  //       onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
  //     />
  //   );
  // }

  const handleCheckUserPhoneNumber = () => {
    signInWithPhoneNumber()
    navigation.navigate("Otp")


  }

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
        <Text style={styles.heading}>
          Login
        </Text>
        <Text style={{ paddingBottom: 20 }}> Verify Your account using OTP</Text>
        <TextInput
          maxLength={13}
          style={styles.input}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
          value={PhoneNumber}
        />
        <TouchableOpacity
          disabled={isButtonDisabled}
          onPress={() => handleCheckUserPhoneNumber()}
          style={[styles.button, isButtonDisabled && styles.disabledButton]}
        >
          <Text style={{ fontSize: 18, color: '#fff' }}>Get OTP</Text>
        </TouchableOpacity>
        <Text style={{ padding: 20 }}>
          By continuing , You are agree to our Terms of Service and Privacy
          Policy
        </Text>
      </LinearGradient>
    </>
  );
};

export default Login;

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
