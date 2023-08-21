import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {app, database} from '../../FirebaseConfig';
import {collection, getDocs} from 'firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {BookRide} from '../redux/reducer/authReducer';

const RideSelect = ({navigation}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const document = await getDocs(collection(database, 'bikes_available'));
      const result = document.docs.map(doc => doc.data());
      setData(result);
    };
    fetchData();
  }, []);


  return (
    <>
      <Text
        style={{
          fontSize: 32,
          fontWeight: '700',
          paddingVertical: 20,
          paddingLeft: 20,
          color: '#000',
        }}>
        Select Ride
      </Text>
      <FlatList
        data={Object.values(data)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.FlatListContainer}
            onPress={() =>
              navigation.navigate('DateTimePicker', dispatch(BookRide(item)))
            }>
            <View>
              <Text style={styles.bikeName}>{item.name}</Text>
              <Text>{item.vehicleNumber}</Text>
              <Text>Milage - {item.milage} kmpl</Text>
              <Text>Bike Driven - {item.km_driven}</Text>
             
                <Text
                  style={{
                    marginTop:50,
                    backgroundColor: '#000',
                    padding: 10,
                    borderRadius: 13,
                    color: '#fff',
                    textAlign: 'center',
                    justifyContent: 'flex-end',
                    width:100
                  }}>
                {item.price} Rs/Hr
                </Text>
              
            </View>
            <View style={styles.image_section}>
              <Image
                source={{uri: item.Image}}
                style={{width: 180, height: 150, borderRadius: 13}}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default RideSelect;

const styles = StyleSheet.create({
  FlatListContainer: {
    width: '92%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 13,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 13,
  },
  bikeName: {
    fontSize: 22,
    color: '#000',
  },
});
