import { StyleSheet, Text, View,FlatList,Image } from 'react-native';
import React,{useState,useEffect} from 'react';
import {app,database} from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { TouchableOpacity } from 'react-native-gesture-handler';

const RideSelect = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData =async () => {
      
      const document =await getDocs(collection(database, "bikes_available"))
      const result = document.docs.map(doc => doc.data())   
      setData(result)
    };

   fetchData();
   
  }, []);



  return (
    <>
     <Text style={{fontSize:25 , fontWeight:'700', textAlign:'center', paddingVertical:20}}>Available Bikes</Text>
     <FlatList
        data={Object.values(data)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.FlatListContainer} onPress={()=>navigation.navigate("DateTimePicker")}>    
            <View>
            <Text style={styles.bikeName}>{item.name}</Text>
            <Text >{item.km_driven}</Text>
            </View>
            <View style={styles.image_section}>
            <Image source={{ uri: item.Image }} style={{ width: 200, height: 150 , }}  resizeMode="cover"   />
            </View>
          </TouchableOpacity>
        )}
      />  
    </>
  )
}

export default RideSelect

const styles = StyleSheet.create({
  FlatListContainer:{
    width: '100vw',
    backgroundColor: 'rgb(211,211,211)',
    padding: 20,
    marginBottom:5,
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  bikeName:{
    fontSize:25
  }
})