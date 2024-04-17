import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomwScreen from './Screens/WelcomeScreen';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import RootNavigator from './Navigation/RootNavigator';
export default function App() {
  return (
      <RootNavigator/>
   
  );
}

