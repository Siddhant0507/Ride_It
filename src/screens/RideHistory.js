import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app, database } from '../../FirebaseConfig';
import { collection, getDocs, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RideHistory = () => {

  const [userId, setUserId] = useState('')
  const [data, setData] = useState([]);


  useEffect(() => {
    getUserID()
    fetchData();
  }, []);

  console.log('rider history', data)

  const fetchData = async () => {
    const document = await getDocs(collection(database, 'user_ride_details', userId));
    const result = document.docs.map(doc => doc.data());
    setData(result);

  };

  const filterData = data.filter((id) => id.use_id === userId)
  console.log('filterDAta>>>>>>>>>>>>>>>>>>>>>', filterData);

  const getUserID = async () => {
    const jsonValue = await AsyncStorage.getItem('userId')
    let userId = JSON.parse(jsonValue)
    setUserId(userId)
  }





  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.headingText}>Bike -{item.vichleName}</Text>
        <View style={[styles.cardView, { backgroundColor: 'black' }]}>
               
                <View style={{ marginLeft: 10, }}>
                    <Text style={styles.listText}>Pick Up Date -{item.pickUpDate}</Text>
                    <Text style={styles.listText}>Pick Up Time -{item.pickUpDate}</Text>
                    <Text style={styles.listText}>Drop Date -{item.dropDate}</Text>
                    <Text style={styles.listText}>Drop Time -{item.dropTime}</Text>
                    <Text style={styles.listText}>Total hours -{item.totalHours}</Text>
                    {/* <Text style={styles.headingText}>Amount-{item.totalCost}</Text> */}
                    {/* <TouchableOpacity style={styles.touchableStyle}
                        onPress={() => handlePayment()}  >
                        <Text style={styles.touchableText}>Book Now</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
      </View>
    )
  }




  return (
    <View style={styles.container}>
      {filterData.length ?  <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={filterData}
        renderItem={renderItem} /> :
        <Text style={{textAlign:'center'}}>No record</Text>}
    
    </View>
  )
}

export default RideHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '8%',
},

listText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
},
headingText: {
  color: 'black',
  fontSize: 16,
  fontWeight: '600',
},
cardView: {
  marginTop: 15,
  borderRadius: 15,
  alignItems: 'center',
  justifyContent: 'center',
  // flexDirection: 'row',
  padding: 10
},
innerCardView: {
  // bottom: 20
}
})