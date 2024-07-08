import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePage from '../Screens/HomePage';
import Profile from '../Screens/Profile';
import Recommend from '../Screens/Recommend';
import DiscoverBooks from '../Screens/DiscoverBooks';
import More from '../Screens/More';
import { Colors } from './../Components/Styles';

const Tab = createBottomTabNavigator();
const { secondary } = Colors;

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomePage') {
            iconName = focused ? 'home' : 'home-outline';
          } /* else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Recommend') {
            iconName = focused ? 'star' : 'star-outline';
          } */else if (route.name === 'DiscoverBooks') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: secondary,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomePage" component={HomePage} />
      {/* <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Recommend" component={Recommend} /> */}
      <Tab.Screen name="Discover" component={DiscoverBooks} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
