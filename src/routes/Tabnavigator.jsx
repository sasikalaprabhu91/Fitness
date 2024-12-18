import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Report from '../screens/Report';
import Mainapp from '../screens/Mainapp';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const Tabnavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,  // Set as a default option for all screens
        tabBarActiveTintColor: 'plum',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white', // Background color of the tab bar
        },
      }}
    >
      <Tab.Screen 
        name='Mainapp' 
        component={Mainapp} 
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name='Report' 
        component={Report} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-line" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name='Profile' 
        component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default Tabnavigator;
