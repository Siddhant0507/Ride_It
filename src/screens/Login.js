import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';


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
  

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
      />
    );
  }

  const handleCheckUserPhoneNumber = () => {
    navigation.navigate("Otp")
  }

  return (
    <>
      <Image
        style={{height: '50%', width: 'auto'}}
        source={require('../../src/res/images/login.jpg')}
      />
      <View style={{padding: 30, justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            color: 'black',
            marginBottom: 15,
          }}>
          Connect us via Mobile Number
        </Text>
        <Text style={{paddingBottom: 20}}> Verify Your account using OTP</Text>
        <TextInput
          maxLength={13}
          style={{
            height: 45,
            width: 'auto',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingLeft: 20,
            fontSize: 24,
          }}
          onChangeText={setText}
          keyboardType="phone-pad"
          value={text}
        />
      </View>
      <View style={{marginTop: 20}}>
        <TouchableOpacity
        disabled={isButtonDisabled}
        onPress={()=>handleCheckUserPhoneNumber()}
        style={[styles.button, isButtonDisabled && styles.disabledButton]}
         >
          <Text style={{fontSize: 24, color: '#000'}}>Get OTP</Text>
        </TouchableOpacity>
        <Text style={{padding: 20}}>
          By continuing , You are agree to our Terms of Service and Privacy
          Policy
        </Text>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  button:{
    height: 55,
    width: '90%',
    backgroundColor: `#ffa07a`,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
