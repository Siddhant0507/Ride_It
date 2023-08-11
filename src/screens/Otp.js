import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
import React, { useRef, useState ,useEffect} from "react";
import RNOtpVerify from 'react-native-otp-verify'
import LinearGradient from "react-native-linear-gradient";

const OtpScreen = (route) => {
  const { confirm } = route.params ?? { confirm: null }
  const [code, setCode] = useState('');
  const [hash, setHash] = useState('');


  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

useEffect(()=>{
 

   RNOtpVerify.getOtp()
     .then(p => {
       RNOtpVerify.addListener(startOtpListener)
       console.log('pppp', p);
     }
      //  use this hash in the message.
     ).catch(p => console.log('p===catch', p));
   }, [])



   const startOtpListener = ((message) => {
     console.log('message----', message);
     const otp = (message);
     console.log('otp----', otp);
     setCode(otp);
     RNOtpVerify.removeListener()

     });

  const confirmCode = async () => {
    try {
      const Verify = await confirm.confirm(code);
      if (Verify) {
        //  setModalVisible(false)
        // NavigationServices.navigate(Screen.PROFILE_AFTER_SIGN_UP)
      }
      console.log('code.=====', code);
      console.log('Verify.=====', Verify);

    } catch (error) {

      //  setOtpError('Invalid otp......')
      // ToastAndroid.show('please Enter Valid Otp', ToastAndroid.SHORT);
      console.log('Invalid otp===', error)
    }
  }
  return (
    <>
     <Image
        style={styles.topImage}
        source={require('../../src/res/images/Wheel.png')}
      />
      <Image
        style={styles.BottomImage}
        source={require('../../src/res/images/Wheel.png')}
      />
    <LinearGradient  colors={['#fff', '#BDBDBD']}
        style={styles.container}
        useAngle={true}
        angle={180}>
      <Text style={styles.heading}>Enter OTP</Text>
      <Text style={{}}>We have send OTP to this Number</Text>
      <Text style={{fontSize:16,fontWeight:'700',textDecorationLine:'underline',paddingBottom:10}}>+91775703926</Text>
        <TextInput
          // ref={pin1Ref}
          keyboardType={"number-pad"}
          maxLength={6}
          style={styles.input}
          // onChange={(pin1) => {
          //   setPin1(pin1);
          //   if (pin1 != "") {
          //     pin2Ref.current.focus();
          //   }
          // }}
          onChangeText={(text)=>setCode(text)}
        />
        {/* <TextInput
          ref={pin2Ref}
          keyboardType={"number-pad"}
          maxLength={1}
          style={styles.input}
          onChange={(pin2) => {
            setPin2(pin2);
            if (pin2 != "") {
              pin3Ref.current.focus();
            }
          }}
        />
        <TextInput
          ref={pin3Ref}
          keyboardType={"number-pad"}
          maxLength={1}
          style={styles.input}
          onChange={(pin3) => {
            setPin3(pin3);
            if (pin3 != "") {
              pin4Ref.current.focus();
            }
          }}
        />
        <TextInput
          ref={pin4Ref}
          keyboardType={"number-pad"}
          maxLength={1}
          style={styles.input}
          onChange={(pin4) => {
            setPin4(pin4);
            if (pin4 != "") {
              pin4Ref.current.focus();
            }
          }}
        /> */}
        
      <TouchableOpacity style={styles.button}
      onPress={()=>confirmCode()}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>Next</Text>
      </TouchableOpacity>
      <Text style={{fontWeight:'700',paddingTop:20}}>Didn't receive OTP ? Go Back</Text>
    </LinearGradient>
    </>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 30
  },
  heading: {
    fontSize: 37,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 50,
  },
  container: {
    zIndex: 0,
    width: '90%',
    height: '100%',
    borderRadius: 31,
    borderWidth: 0.7,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '30%',
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
