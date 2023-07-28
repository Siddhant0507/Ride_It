import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Map from '../Components/Map';
import {BiCurrentLocation} from 'react-icons/bi';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({navigation}) => {
  const [mLat, setMlat] = useState(0);
  const [mLong, setMlong] = useState(0);
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Cool Photo App needs access to your Location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setMlat(position.coords.latitude);
        setMlong(position.coords.longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <>
      <View style={{height: '60%', width: '100%'}}>
        <Map />
        <View
          style={{
            width: '100%',
            position: 'absolute',
            paddingHorizontal: 10,
            top: 20,
            height: '100%',
          }}>
          <GooglePlacesAutocomplete
            placeholder="Search your Location"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyAtPscXSljaNjDxGRIucvlr51RyUn1QcOU',
              language: 'en',
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            getCurrentLocation();
          }}
          style={{
            height: 55,
            width: 55,
            backgroundColor: '#fff',
            borderRadius: 20,
            position: 'absolute',
            alignSelf: 'flex-end',
            bottom: 20,
            right: 20,
          }}></TouchableOpacity>
      </View>

      <TouchableOpacity
       onPress={()=>navigation.navigate("RideSelect")}
        style={{
          height: 55,
          width: '90%',
          backgroundColor: `#ffa07a`,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 20,
          position: 'relative',
          bottom: 10,
        }}>
        <Text
          style={{fontSize: 24, color: '#000'}}>
          Book a Ride
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
