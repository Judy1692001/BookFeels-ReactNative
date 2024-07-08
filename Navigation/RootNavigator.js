import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../Screens/WelcomeScreen";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import HomePage from "../Screens/HomePage";
import Profile from "../Screens/Profile";
import Recommend from "../Screens/Recommend";
import BookDetails from "../Screens/BookDetails";
import Favorites from '../Screens/Favorites'
import ReadingHistory from '../Screens/ReadingHistory'
import FAQ from '../Screens/FAQ'
import About from '../Screens/About'
import RateApp from '../Screens/RateApp'
import ReviewRate from '../Screens/ReviewRate';
import ViewReviewsRates from "../Screens/ViewReviewsRates.js";
import Feedback from "../Screens/Feedback";
import DiscoverBooks from "../Screens/DiscoverBooks";
import More from "../Screens/More";
import BottomNavigator from './BottomNavigator';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CredentialsContext } from "../Components/CredentialsContext";
import { Colors } from "../Components/Styles";
import BottomTabNavigator from "./BottomTabNavigator";

const { secondary } = Colors;
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <GestureHandlerRootView style={{ flex: 1 }}>
       
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "transparent",
                },
                headerTintColor: secondary,
                headerTransparent: true,
                headerTitle: "",
                headerLeftContainerStyle: {
                  paddingLeft: 20,
                },
              }}
              initialRouteName="Get Started"
            >
              {storedCredentials ? (
                
                <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
              ) : (
                <>
                  <Stack.Screen name="Get Started" component={WelcomeScreen} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Signup" component={Signup} />
                </>
              )}
              
              <Stack.Screen name="Profile" component={Profile} />
              {/* <Stack.Screen name="HomePage" component={HomePage} /> */}
              <Stack.Screen name="Recommend" component={Recommend} />
              <Stack.Screen name="BookDetails" component={BookDetails} />
              <Stack.Screen name="Feedback" component={Feedback} />
              <Stack.Screen name="Favorites" component={Favorites} />
              <Stack.Screen name="ReviewRate" component={ReviewRate} />
              <Stack.Screen name="FAQ" component={FAQ} />
              <Stack.Screen name="About" component={About} />
              <Stack.Screen name="RateApp" component={RateApp} />
              <Stack.Screen name="ReadingHistory" component={ReadingHistory} />
              <Stack.Screen name="ViewReviewsRates" component={ViewReviewsRates} />
            </Stack.Navigator>
  
        </GestureHandlerRootView>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootNavigator;
