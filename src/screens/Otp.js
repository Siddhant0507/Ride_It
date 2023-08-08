import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState ,useEffect} from "react";
import RNOtpVerify from 'react-native-otp-verify'

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
    <SafeAreaView style={styles.mainBody}>
      <Text style={styles.otpText}>Enter OTP</Text>
      <View style={styles.container}>
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
      </View>
      <TouchableOpacity style={{ marginTop: 20, height: 55, width: '90%', backgroundColor: `#ffa07a`, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}
      onPress={()=>confirmCode()}
      >
        <Text style={{ fontSize: 24, color: "#000" }}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>

  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 30
  },
  otpText: {
    color: '#000',
    fontSize: 25,
    fontWeight: "700",
    paddingLeft: 25,
    paddingBottom: 20,
  },
  container: {
    display: "flex",
    alignItems:'center'

    // flexDirection: "row",

  },
  input: {
    marginHorizontal: 15,
    height: 50,
    width: 150,
    borderBottomWidth: 1,
    fontWeight: "700",
    borderBottomColor: '#000',
    fontSize: 20,
    textAlign: "center",
    alignContent: "center",
  },

});
