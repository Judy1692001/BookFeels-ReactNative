import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import RootNavigator from './Navigation/RootNaviagtor';
import DiscoverBooks from './Screens/DiscoverBooks';

export default function App() {
  
  return (
    <RootNavigator/>
    //<DiscoverBooks/>
   
  );
  
}
