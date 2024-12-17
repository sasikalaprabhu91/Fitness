import { ImageBackground, StyleSheet, Text, View, ScrollView,Image } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper'; 
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const theme = useTheme(); // Get theme from Paper's useTheme hook

  const img = {
    uri: 'https://st3.depositphotos.com/6944362/14918/i/450/depositphotos_149182862-stock-photo-portrait-of-a-young-fitness.jpg'
  };

  const navigation = useNavigation();

  // Navigate to the Signup screen
  function Next() {
    navigation.navigate('Signup');
  }

  // Navigate to the Login screen
  function Loginpage() {
    navigation.navigate('Login');
  }

  return (
    <ImageBackground source={img} style={styles.imageBackground} resizeMode="cover">
     
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
        <View style={styles.contentWrapper}>
          <View  >
        
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.description}>
              Achieve your fitness goals with personalized workout plans and progress tracking. Join a supportive community and take your fitness journey to the next level!
            </Text>
            <Button 
              mode="contained" 
              style={{ backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white' }} 
              labelStyle={{ color: 'white' }} // Change the button text color here
              onPress={Next}
            >
              Get Started
            </Button>
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.alreadyText}>Already have an account? </Text>
            <Text 
              style={styles.loginText} 
              onPress={Loginpage}
            >
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  contentWrapper: {
    padding: 20,
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    color: 'white',
  },
  textContainer: {
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 40,
    padding: 10,
    textAlign: 'center',
    fontFamily: 'MontserratAlternates-Light',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 40,
  },
  alreadyText: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Light',
    color: 'white',
    marginLeft:-30
  },
  loginText: {
    color: 'plum',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: 'MontserratAlternates-Light',
  },
});
