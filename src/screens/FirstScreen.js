import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const FirstScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Image
        style={{height: '70%', width: 'auto'}}
        source={require('../../src/res/images/bike4.png')}
      />
      <TouchableOpacity
      onPress={()=>navigation.navigate("Login")}
        style={{
          height: 55,
          width: '90%',
          backgroundColor: `#ffa07a`,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <Text style={{fontSize: 24, color: '#000'}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>navigation.navigate("Signup")}
        style={{
          height: 55,
          width: '90%',
          backgroundColor: `#ffa07a`,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <Text style={{fontSize: 24, color: '#000'}}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({});
