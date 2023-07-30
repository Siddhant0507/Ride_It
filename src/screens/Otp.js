import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";
  import React, { useRef, useState } from "react";
  
  const OtpScreen = () => {
    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);
  
    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");
    return (
      <SafeAreaView style={styles.mainBody}>
        <Text style={styles.otpText}>Enter OTP</Text>
        <View style={styles.container}>
          <TextInput
            ref={pin1Ref}
            keyboardType={"number-pad"}
            maxLength={1}
            style={styles.input}
            onChange={(pin1) => {
              setPin1(pin1);
              if (pin1 != "") {
                pin2Ref.current.focus();
              }
            }}
          />
          <TextInput
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
          />
        </View>
        <TouchableOpacity style={{marginTop:20,height:55 , width:'90%',backgroundColor:`#ffa07a`, borderRadius:30,alignItems:'center',justifyContent:'center' ,marginTop:50 }}>
        <Text style={{fontSize:24, color:"#000"}}>Next</Text>
    </TouchableOpacity>
      </SafeAreaView>

    );
  };
  
  export default OtpScreen;
  
  const styles = StyleSheet.create({
    mainBody:{
      flex:1,
      justifyContent:'center',
      padding:30
    },
    otpText: {
        color:'#000',
      fontSize: 25,
      fontWeight: "700",
      paddingLeft: 25,
      paddingBottom: 20,
    },
    container: {
      display: "flex",
      flexDirection: "row",
    },
    input: {
      marginHorizontal: 15,
      height: 50,
      width: 50,
      borderBottomWidth:1,
      fontWeight: "700",
      borderBottomColor:'#000',
      fontSize: 20,
      textAlign: "center",
      alignContent: "center",
    },

  });
  