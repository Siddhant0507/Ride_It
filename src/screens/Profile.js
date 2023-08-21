import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

 
  const fetchData = async () => {
    const jsonValue = await AsyncStorage.getItem('userData');
    let userData = JSON.parse(jsonValue)
    setUserData(userData);
  };

  return (
    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
      <Text>Profile</Text>
      <Text>{userData.Name}</Text>
      <Text>{userData.email}</Text>
      <Text>{userData.phoneNumber}</Text>
      <Text>{userData.driverLicense}</Text>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})