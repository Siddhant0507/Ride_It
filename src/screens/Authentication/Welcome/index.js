import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import R from '../../../res/R';
import { Screen } from '../../../navigation/Screen';
import NavigationServices from '../../../navigation/NavigationServices';

const WelcomeScreen = () => {
  return (
    <>
      <ImageBackground source={R.images.background} style={styles.backgroundImgStyle} />
      <Image
        style={styles.topImage}
        source={R.images.Wheel_img}
      />
      <Image
        style={styles.BottomImage}
        source={R.images.Wheel_img}
      />
      <LinearGradient
        colors={['#fff', '#BDBDBD']}
        style={styles.container}
        useAngle={true}
        angle={180}>
        <Text style={styles.heading}>Welcome</Text>

        <TouchableOpacity
          onPress={() => NavigationServices.navigate(Screen.SIGN_UP)}
          style={styles.Signupbutton}>
          <Text style={{ fontSize: 18, color: '#000' }}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationServices.navigate(Screen.LOGIN)}
          style={styles.Loginbutton}>
          <Text style={{ fontSize: 18, color: '#fff' }}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>

    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  backgroundImgStyle: {
    height: "100%",
    width: '100%',
    zIndex: -1
  },
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
    transform: [{ rotate: '180deg' }],
    height: '30%',
    width: '40%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
});
