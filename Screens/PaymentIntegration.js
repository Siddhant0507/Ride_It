import { StyleSheet, Text, TouchableOpacity, View ,TouchableHighlight} from 'react-native'
import React from 'react'
import RazorpayCheckout from 'react-native-razorpay';
const PaymentIntegration = () => {
  return (
    <View>
      <Text>PaymentIntegration</Text>
      <TouchableOpacity style={styles.checkoutBtn} onPress={()=>{
          var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: 'rzp_test_ONNb6E3SJf1osK',
            amount: '5000',
            name: 'Rideit Services Pvt. Ltd.',
            order_id: '',//Replace this with an order_id created using Orders API.
            prefill: {
              email: 'gaurav.kumar@example.com',
              contact: '9191919191',
              name: 'Gaurav Kumar'
            },
            theme: {color: '#ffa07a'}
          }
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
      }}>
        <Text style={{fontSize:20 , color:'#000'}}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PaymentIntegration

const styles = StyleSheet.create({
    checkoutBtn:{
        width:"90%",
        height:50,
        backgroundColor:"#ffa07a",
        borderRadius:20,
        // position:'absolute',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    }
})