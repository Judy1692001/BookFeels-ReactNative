import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './../Screens/WelcomeScreen';
import Login from './../Screens/Login';
import Signup from './../Screens/Signup';
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
     </Stack.Navigator>
    </NavigationContainer>
  );
}

