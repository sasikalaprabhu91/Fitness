import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const Dashboard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userEmail, selectedOptions, nickname, bmi, bmiColor,bmiMessage } = route.params; // Extracted all parameters in one destructure
  

  function main () {
    navigation.navigate('Mainapp')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Hi, {nickname}!</Text>
      
      <View style={styles.bmiContainer}>
        <Text style={styles.bmiLabel}>Your BMI value is </Text>
        <Text style={[styles.bmiValue, { color: bmiColor }]}>{bmi}</Text>
      </View> 
      
      <View style={styles.bmiInfo}>
      <Text style={[styles.bmiMessage, { color: bmiColor, backgroundColor: 'lightyellow' }]}>


        // lastly updated code 
  {route.params.bmiMessage}
</Text>

      </View>
      
      <Text style={styles.motivationalText}>Your journey to a healthier you starts now!</Text>

      <TouchableOpacity style={styles.button} onPress={main}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  greetingText: {
    color: 'plum',
    fontSize: 18,
    marginTop: 20,
    fontFamily: 'MontserratAlternates-Bold',
  },
  bmiContainer: {
    flexDirection: 'row',
    marginTop: 40,
    height:50,
    width:300,
    backgroundColor:'aliceblue',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15
  },
  bmiLabel: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'MontserratAlternates-Light',
    color:'black'
    
  },
  bmiValue: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
    fontFamily: 'MontserratAlternates-Bold',
  },
  bmiInfo: {
    marginTop: 30,
    padding: 10,
    alignItems: 'center',
    

  },
  motivationalText: {
    marginTop: 50,
    fontFamily: 'MontserratAlternates-Bold',
    color: 'plum',
    textAlign: 'center',
  },
  button: {
    height: 40,
    width: '60%',
    backgroundColor: 'plum',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: '600',
    color: 'white',
  },
});
