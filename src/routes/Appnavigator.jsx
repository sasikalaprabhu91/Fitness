import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Schedule from '../screens/Schedule';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Mainapp from '../screens/Mainapp';
import Report from '../screens/Report';
import Tabnavigator from './Tabnavigator';
import Aerobics from '../screens/Main/Aerobics';
import Strength from '../screens/Main/Strength';
import Fullbody from '../screens/Main/Fullbody';
import Abs from '../screens/Main/Abs';
import Arm from '../screens/Main/Arm';
import Chest from '../screens/Main/Chest';
import Leg from '../screens/Main/Leg';

const Stack = createNativeStackNavigator();

const Appnavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,  // Set as a default option for all screens
      }}
    >
      <Stack.Screen name="Tabnavigator" component={Tabnavigator} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Mainapp" component={Mainapp} 
      options={{
        headerShown:false,
        
      }}
      />
      
      <Stack.Screen name="Report" component={Report} />

      <Stack.Screen name="Aerobics" component={Aerobics} />
      <Stack.Screen name="Strength" component={Strength} />
      <Stack.Screen name="Fullbody" component={Fullbody} />
      <Stack.Screen name="Abs" component={Abs} />
      <Stack.Screen name="Arm" component={Arm} />
      <Stack.Screen name="Chest" component={Chest} />
      <Stack.Screen name="Leg" component={Leg} />
    </Stack.Navigator>
  );
};

export default Appnavigator;

const styles = StyleSheet.create({});
