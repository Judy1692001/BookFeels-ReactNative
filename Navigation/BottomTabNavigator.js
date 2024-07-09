// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomePage from '../Screens/HomePage';
import DiscoverBooks from '../Screens/DiscoverBooks';
import More from '../Screens/More';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
  
      <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomePage') {
            iconName = 'home';
          } else if (route.name === 'Discover') {
            iconName = 'magnify';
          } else if (route.name === 'More') {
            iconName = 'dots-horizontal';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#C8A2C8', // Lilac color for active icons
        tabBarInactiveTintColor: '#C8A2C4', // Color for inactive icons
        tabBarStyle: { backgroundColor: 'white' }, // Lilac color for the background
      })}
    >
    
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="Discover" component={DiscoverBooks} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
