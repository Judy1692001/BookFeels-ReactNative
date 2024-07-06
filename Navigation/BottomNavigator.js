// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import WelcomeScreen from "./../Screens/WelcomeScreen";
// import Login from "./../Screens/Login";
// import Signup from "./../Screens/Signup";
// import HomePage from "../Screens/HomePage";
// import Profile from "../Screens/Profile";
// import Recommend from "../Screens/Recommend";
// import DiscoverBooks from "../Screens/DiscoverBooks";
// import More from "../Screens/More";
// import { Colors } from "./../Components/Styles";
// import BookDetails from "../Screens/BookDetails";

// import Favorites from "../Screens/Favorites";
// import ReadingHistory from "../Screens/ReadingHistory";
// import FAQ from "../Screens/FAQ";
// import About from "../Screens/About";
// import RateApp from "../Screens/RateApp";
// import ReviewRate from "../Screens/ReviewRate";
// import ViewReviewsRates from "../Screens/ViewReviewsRates.js";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import Feedback from "../Screens/Feedback.js";
// //color
// const { secondary } = Colors;
// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const HomePage = "home";
// const Discover = "discover";
// const More = "more";

// export default function BottomNavigator() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName={HomePage}
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let IN = route.name;
//             if (IN === HomePage) {
//               iconName = focused ? "home" : "home-outline";
//             } else if (IN === Discover) {
//               iconName = focused ? "compass" : "compass-outline";
//             } else if (IN === More) {
//               iconName = focused ? "menu" : "menu-outline";
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: "secondary",
//           inactiveTintColor: "grey",
//           labelStyle: { paddingBottom: 10, fontSize: 10 },
//           style: { padding: 10, height: 70 },
//         }}
//       >
//         <Tab.Screen name="Homepage" component={HomePage} />
//         <Tab.Screen name="Profile" component={Profile} />
//         <Tab.Screen name="Recommend" component={Recommend} />
//         <Tab.Screen name="Discover" component={DiscoverBooks} />
//         <Tab.Screen name="More" component={More} />
//         <Tab.Screen name="BookDetails" component={BookDetails} />
//         <Tab.Screen name="Feedback" component={Feedback} />
//         <Tab.Screen name="Favorites" component={Favorites} />
//         <Tab.Screen name="ReviewRate" component={ReviewRate} />
//         <Tab.Screen name="FAQ" component={FAQ} />
//         <Tab.Screen name="About" component={About} />
//         <Tab.Screen name="RateApp" component={RateApp} />
//         <Tab.Screen name="ReadingHistory" component={ReadingHistory} />
//         <Tab.Screen name="ViewReviewsRates" component={ViewReviewsRates} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
