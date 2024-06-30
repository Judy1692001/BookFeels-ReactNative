import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./../Screens/WelcomeScreen";
import Login from "./../Screens/Login";
import Signup from "./../Screens/Signup";
import HomePage from "../Screens/HomePage";
import Profile from "../Screens/Profile";
import Recommend from "../Screens/Recommend";
import DiscoverBooks from "../Screens/DiscoverBooks";
import More from "../Screens/More";
import { Colors } from "./../Components/Styles";
import BookDetails from "../Screens/BookDetails";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { CredentialsContext } from "../Components/CredentialsContext";
import ActivityHistory from '../Screens/ActivityHistory'
import Favorites from '../Screens/Favorites'
import ReadingHistory from '../Screens/ReadingHistory'
import FAQ from '../Screens/FAQ'
import About from '../Screens/About'
import RateApp from '../Screens/RateApp'
import { Colors } from './../Components/Styles';
import ReviewRate from '../Screens/ReviewRate';

//color
const { secondary, text, heading, dark_primary } = Colors;
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
//   const [userData, setUserData] = useState({});
//   useEffect(() => {
//     const user = AsyncStorage.getItem("BookFeelsCredentials").then((res) => {
//       console.log("res", res);
//       const userdata = JSON.parse(res);

//       console.log("USERDATA", userdata);
//       setUserData(userdata);
      
//    // const username = userData.username;
//   }); // Get the user data from AsyncStorage
// }, []);
  return (
    //to consume(access )the values stored in the context.
    <CredentialsContext.Consumer>
      {/* child of a consumer should be a function */}
      {({ storedCredentials }) => (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "transparent",
                },
                headerTintColor: secondary,
                headerTransparent: true,
                headerTitle: "",
                headerLeftContainerStyle: {
                  pddingLeft: 20,
                },
              }}
              initialRouteName="Get Started"
            >
              {/* check the value of credentials and if set move to homepage */}
              {storedCredentials ? (
                <Stack.Screen name="Homepage" component={HomePage} />
              ) : (
                  <>
                  <Stack.Screen name="Get Started" component={WelcomeScreen} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Signup" component={Signup} />
                </>
              )}
             
              {/* <Stack.Screen name="Get Started" component={WelcomeScreen} />
                  <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Homepage" component={HomePage} /> */}
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Recommend" component={Recommend} />
              <Stack.Screen name="MyBooks" component={MyBooks} />
              <Stack.Screen name="Discover" component={DiscoverBooks} />
              <Stack.Screen name="More" component={More} />
              <Stack.Screen name="BookDetails" component={BookDetails} />
              <Stack.Screen name="ActivityHistory" component={ActivityHistory} />
              <Stack.Screen name="Favorites" component={Favorites} />
              <Stack.Screen name="ReviewRate" component={ReviewRate} />
              <Stack.Screen name="FAQ" component={FAQ} />
              <Stack.Screen name="About" component={About} />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      )}
    </CredentialsContext.Consumer>
  );
}
