import {StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = ({navigation}) => {
  return (
    <>
      <ImageBackground source={require("../../../res/images/background.png")} style={{height:"100%",width:'100%',zIndex:-1}}/>
      <Image
        style={styles.topImage}
        source={require('../../../res/images/Wheel.png')}
      />
      <Image
        style={styles.BottomImage}
        source={require('../../../res/images/Wheel.png')}
      />
      <LinearGradient
        colors={['#fff', '#BDBDBD']}
        style={styles.container}
        useAngle={true}
        angle={180}>
        <Text style={styles.heading}>Welcome</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.Signupbutton}>
          <Text style={{fontSize: 18, color: '#000'}}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.Loginbutton}>
          <Text style={{fontSize: 18, color: '#fff'}}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>

    </>
  );
};

export default WelcomeScreen;

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
    marginTop: 70,
    marginBottom: 100,
  },
  Loginbutton: {
    height: 45,
    width: '70%',
    backgroundColor: '#000',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Signupbutton: {
    borderWidth: 0.7,
    borderColor: '#000',
    marginBottom: 20,
    height: 45,
    width: '70%',
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
    height: '30%',
    width: '40%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
});
