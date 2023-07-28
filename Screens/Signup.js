import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import {app, database} from '../FirebaseConfig';
import {collection, addDoc} from 'firebase/firestore';

const Signup = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('+91');

  const isButtonDisabled = !(username && email && licenseNumber && PhoneNumber);

  const collectionRef = collection(database, 'users');

  const handleSubmit = () => {
    addDoc(collectionRef, {
      Name: username,
      email: email,
      phoneNumber: PhoneNumber,
      driverLicense: licenseNumber,
    })
      .then(() => {
        Alert.alert('data added successfully');
        navigation.navigate('Otp');
      })
      .catch(err => {
        Alert.alert(err);
      });
  };
  return (
    <>
      <Image
        style={{height: '40%', width: 'auto'}}
        source={require('../assets/signup.jpg')}
      />
      <ScrollView>
        <View style={{paddingTop: 20, paddingHorizontal: 20}}>
          <Text> Name </Text>
          <TextInput
            style={{
              height: 45,
              width: 'auto',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingLeft: 20,
              fontSize: 24,
            }}
            onChangeText={setUserName}
            keyboardType="default"
            value={username}
          />

          <Text style={{paddingTop: 20}}> Phone Number </Text>
          <TextInput
            style={{
              height: 45,
              width: 'auto',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingLeft: 20,
              fontSize: 24,
            }}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            value={PhoneNumber}
          />

          <Text style={{paddingTop: 20}}> Email ID</Text>
          <TextInput
            style={{
              height: 45,
              width: 'auto',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingLeft: 20,
              fontSize: 24,
            }}
            onChangeText={setEmail}
            keyboardType="email-address"
            value={email}
          />

          <Text style={{paddingTop: 20}}> Driver Licenses Number </Text>
          <TextInput
            style={{
              height: 45,
              width: 'auto',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingLeft: 20,
              fontSize: 24,
            }}
            onChangeText={setLicenseNumber}
            keyboardType="phone-pad"
            value={licenseNumber}
          />
        </View>
      
      </ScrollView>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        disabled={isButtonDisabled}
        style={[styles.button, isButtonDisabled && styles.disabledButton]}>
        <Text style={{fontSize: 24, color: '#000'}}>Proceed</Text>
      </TouchableOpacity>
     
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  button: {
    height: 55,
    width: '90%',
    backgroundColor: `#ffa07a`,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
