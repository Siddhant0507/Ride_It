import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
const Map = () => {
  return (
    <View>
      <MapView
        style={{width: '100%', height: '100%'}}
        
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        <Marker coordinate={{latitude: 37.78825, longitude: -122.4324}}
        title='Your Location'
        description='here are you are'
        identifier='origin' />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
