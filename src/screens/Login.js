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
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

const Login = ({navigation}) => {
  const [text, setText] = useState('+91');



   // If null, no SMS has been sent
   const [confirm, setConfirm] = useState(null);

   // verification code (OTP - One-Time-Passcode)
   const [code, setCode] = useState('');

  const isButtonDisabled = !(text);


  const signInWithPhoneNumber=async(phoneNumber)=> {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  

  // if (!confirm) {
  //   return (
  //     <Button
  //       title="Phone Number Sign In"
  //       onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
  //     />
  //   );
  // }

  const handleCheckUserPhoneNumber = () => {
    navigation.navigate("Otp")
  }

  return (
    <>
     <ImageBackground source={require("../res/images/background.png")} style={{height:"100%",width:'100%',zIndex:-1}}/>
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
        <Text style={{paddingBottom:20}}> Verify Your account using OTP</Text>
        <TextInput
          maxLength={13}
          style={styles.input}
          onChangeText={setText}
          keyboardType="phone-pad"
          value={text}
        />
         <TouchableOpacity
        disabled={isButtonDisabled}
        onPress={()=>handleCheckUserPhoneNumber()}
        style={[styles.button, isButtonDisabled && styles.disabledButton]}
         >
          <Text style={{fontSize: 18, color: '#fff'}}>Get OTP</Text>
        </TouchableOpacity>
        <Text style={{padding: 20}}>
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
    position:'absolute',
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
  input:{
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
  button:{
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
    transform: [{rotate: '180deg'}],
    height: '25%',
    width: '35%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
});
