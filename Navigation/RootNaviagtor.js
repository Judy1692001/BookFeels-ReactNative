import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './../Screens/WelcomeScreen';
import Login from './../Screens/Login';
import Signup from './../Screens/Signup';
import HomePage from '../Screens/HomePage';
import Profile from '../Screens/Profile';
import Recommend from '../Screens/Recommend';
import MyBooks from '../Screens/MyBooks';
import Discover from '../Screens/Discover';
import More from '../Screens/More';
import ActivityHistory from '../Screens/ActivityHistory'
import Favorites from '../Screens/Favorites'
import ReadingHistory from '../Screens/ReadingHistory'
import FAQ from '../Screens/FAQ'
import About from '../Screens/About'
import RateApp from '../Screens/RateApp'
import { Colors } from './../Components/Styles';

//color
const { secondary,text,heading ,dark_primary} = Colors;
const Stack = createNativeStackNavigator();

export default function RootNavigator () {
    return (
    <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTintColor: secondary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        pddingLeft: 20
                    }
                }}
                initialRouteName='Get Started'
            >
                
          <Stack.Screen name="Get Started" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Homepage" component={HomePage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Recommend" component={Recommend} />
          <Stack.Screen name="MyBooks" component={MyBooks} />
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="More" component={More} />
          <Stack.Screen name="ActivityHistory" component={ActivityHistory} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="ReadingHistory" component={ReadingHistory} />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="RateApp" component={RateApp} />
          
     </Stack.Navigator>
    </NavigationContainer>
  );
}

