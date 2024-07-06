import React, { useContext, useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,Text
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Container,
  NavBarContainer,
  PageContent,
  ProfileIcon,
  NotificationIcon,
  HeadingStyle,
  EmotionContainer,
  EmotionText,
  EmotionName,
  StyleOr,
  Line2,
  InsightInput,
  FooterContainer,
  IconButton,
  RowContainer,
  Emotion,
  CorrectIcon,
  TextStyle2,
  EmotionImage1,
  EmotionImage2,
  EmotionImage3,
  EmotionImage4,
} from "../Components/Styles";
import { Colors } from "../Components/Styles";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Components/CredentialsContext";
import { baseURL } from "../config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const { inText ,quoteBox} = Colors;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [insightQuery, setInsightQuery] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [emotion, setEmotion] = useState("");
  const [emotionHistory, setEmotionHistory] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const user = AsyncStorage.getItem("BookFeelsCredentials").then((res) => {
      // console.log("res", res);
      const userdata = JSON.parse(res);
      setUserToken(userdata.access);
      // console.log("USERDATA", userdata);
      setUserData(userdata.user);
      // const username = userData.username;
    }); // Get the user data from AsyncStorage
  }, []);
  // console.log("UserToken", userToken);

  const Recommendation = async (inputEmotion) => {
    setLoading(true);
    // console.log("above url");
    const url = `${baseURL}api/recommendbooks/`;

    console.log("API URL:", url);
    console.log("Emotion:", emotion);
    console.log("User Token:", userToken);
    await axios
      .post(
        url,
        {
          user_input: inputEmotion,
        },
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        // console.log("res", res);
        setLoading(false);
        if (res.data.status !== "SUCCESS") {
          console.log("Error Message:", res.data.message);
        } else {
          console.log("Message:", res.data.message);
          console.log("HistoryData", res.data.data);
          setEmotionHistory(emotion);
          navigation.navigate("Recommend", { books: res.data.data });
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
        console.log("res", res);
        setLoading(false);
      });
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const onChangeInsight = () => {
    console.log("Insights", insightQuery);
    if (insightQuery) {
      Recommendation(insightQuery);
    } else {
      console.log("Empty text box");
    }
  };

  const onChangeEmotion = (chosenEmotion) => {
    console.log("Selecte Emotion");
    setEmotion(chosenEmotion);
    Recommendation(chosenEmotion);
  };

  const handleFocus = () => {
    navigation.navigate("Discover");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      
      <Container>
      <ScrollView >
        <StatusBar style="dark" />
        
          <PageContent>
            <NavBarContainer>
              <ProfileIcon
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              >
                <MaterialCommunityIcons
                  name="account"
                  size={35}
                  color="black"
                />
              </ProfileIcon>

              <Searchbar
                placeholder="Title or author"
                placeholderTextColor="gray"
                onChangeText={onChangeSearch}
                onFocus={handleFocus}
                value={searchQuery}
                style={{
                  flex: 1,
                  marginTop: 20,
                  marginLeft: 50,
                  backgroundColor: inText,
                }}
              />
            </NavBarContainer>

            <HeadingStyle>Pick an emotion and get started</HeadingStyle>

            <EmotionContainer>
              <RowContainer>
                <Emotion onPress={() => onChangeEmotion("happy")}>
                  <EmotionImage1 source={require("../assets/happiness.png")} />

                  <EmotionText> Happiness </EmotionText>
                </Emotion>

                <Emotion onPress={() => onChangeEmotion("sad")}>
                  <EmotionImage2 source={require("../assets/sadness.png")} />

                  <EmotionText> Sadness </EmotionText>
                </Emotion>
              </RowContainer>

              <RowContainer>
                <Emotion onPress={() => onChangeEmotion("love")}>
                  <EmotionImage3 source={require("../assets/love.png")} />

                  <EmotionText> Love </EmotionText>
                </Emotion>

                <Emotion onPress={() => onChangeEmotion("fear")}>
                  <EmotionImage4 source={require("../assets/fear.png")} />

                  <EmotionText> Fear </EmotionText>
                </Emotion>
              </RowContainer>
            </EmotionContainer>

            <Line2 />

            <StyleOr>or</StyleOr>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <InsightInput
                placeholder="Enter your insights here...."
                placeholderTextColor="gray"
                onChangeText={setInsightQuery}
                value={insightQuery}
                style={{ textAlign: "left" }}
              />

              <CorrectIcon>
                <AntDesign name="checkcircleo" size={24} color="black" />
              </CorrectIcon>
            </View>
            {/* <View styles={styles.buttoncontainer}>
              <Button
                title="Submit"
                color="#A67FBF" //secondary
                // onPress={() => AddReviewRate()}
                onPress={onChangeInsight}
              />
            </View> */}
            <TouchableOpacity style={styles.button} onPress={onChangeInsight}>
            <Text style={styles.title}>{"Get Recommendations"}</Text>
            </TouchableOpacity>
          </PageContent>
        
          </ScrollView>
        <FooterContainer>
          <IconButton onPress={() => navigation.navigate("Homepage")}>
            <Feather name="home" size={24} color="black" />

            <TextStyle2>Home</TextStyle2>
          </IconButton>

          <IconButton onPress={() => navigation.navigate("Discover")}>
            <Feather name="compass" size={24} color="black" />

            <TextStyle2>Discover</TextStyle2>
          </IconButton>

          <IconButton onPress={() => navigation.navigate("More")}>
            <Feather name="menu" size={24} color="black" />

            <TextStyle2>More</TextStyle2>
          </IconButton>
          </FooterContainer>
         
        </Container>
        
    </KeyboardAvoidingView>
  );
}

// import React, { useContext } from "react";
// import { View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import {
//   Container,
//   NavBarContainer,
//   PageContent,
//   ProfileIcon,
//   HeadingStyle,
//   EmotionContainer,
//   EmotionText,
//   EmotionName,
//   StyleOr,
//   Line2,
//   InsightInput,
//   FooterContainer,
//   IconButton,
//   RowContainer,
//   Emotion,
//   TextStyle2,
//   EmotionImage1,
//   EmotionImage2,
//   EmotionImage3,
//   EmotionImage4
// } from "../Components/Styles";
// import { Colors } from "../Components/Styles";
// import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
// import { Searchbar } from "react-native-paper";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// const { inText } = Colors;

// export default function HomePage({ navigation }) {
//   const [searchQuery, setSearchQuery] = React.useState("");

//   const [insightQuery, setInsightQuery] = React.useState("");

//   const onChangeSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const handleFocus = () => {
//     navigation.navigate("Discover");
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <Container>
//         <StatusBar style="dark" />

//         <ScrollView>
//           <PageContent>
//             <NavBarContainer>
//               <ProfileIcon
//                 onPress={() => {
//                   navigation.navigate("Profile");
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name="account"
//                   size={35}
//                   color="black"
//                 />
//               </ProfileIcon>

//               <Searchbar
//                 placeholder="Title or author"
//                 placeholderTextColor="gray"
//                 onChangeText={onChangeSearch}
//                 onFocus={handleFocus}
//                 value={searchQuery}
//                 style={{ flex: 1, marginTop: 20, marginLeft: 50, backgroundColor: inText }}
//               />

//             </NavBarContainer>

//             <HeadingStyle>Pick an emotion and get started</HeadingStyle>

//             <EmotionContainer>
//               <RowContainer>
//                 <Emotion onPress={() => console.log("Happiness emotion is chosen")}>
//                   <EmotionImage1 source={require('../assets/happiness.png')} />
//                   <EmotionText> Happiness </EmotionText>
//                 </Emotion>
//                 <Emotion onPress={() => console.log("Sadness emotion is chosen")}>
//                   <EmotionImage2 source={require('../assets/sadness.png')} />
//                   <EmotionText> Sadness </EmotionText>
//                 </Emotion>
//               </RowContainer>
//               <RowContainer>
//                 <Emotion onPress={() => console.log("Love emotion is chosen")}>
//                   <EmotionImage3 source={require('../assets/love.png')} />
//                   <EmotionText> Love </EmotionText>
//                 </Emotion>
//                 <Emotion onPress={() => console.log("Fear emotion is chosen")}>
//                   <EmotionImage4 source={require('../assets/fear.png')} />
//                   <EmotionText> Fear </EmotionText>
//                 </Emotion>
//               </RowContainer>
//             </EmotionContainer>

//             <Line2 />

//             <StyleOr>or</StyleOr>

//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-around",
//               }}
//             >
//               <InsightInput
//                 placeholder="Enter your insights here...."
//                 placeholderTextColor="gray"
//                 onChangeText={(query) => setInsightQuery(query)}
//                 value={insightQuery}
//                 style={{ textAlign: "left" }}
//               />
//               <IconButton onPress={() => console.log("Insight submitted")}>
//                 <MaterialCommunityIcons name="check" size={24} color="black" />
//               </IconButton>
//             </View>
//           </PageContent>
//         </ScrollView>

//         <FooterContainer>
//           <IconButton onPress={() => navigation.navigate("Homepage")}>
//             <Feather name="home" size={24} color="black" />
//             <TextStyle2>Home</TextStyle2>
//           </IconButton>

//           <IconButton onPress={() => navigation.navigate("Discover")}>
//             <Feather name="compass" size={24} color="black" />
//             <TextStyle2>Discover</TextStyle2>
//           </IconButton>

//           <IconButton onPress={() => navigation.navigate("More")}>
//             <Feather name="menu" size={24} color="black" />
//             <TextStyle2>More</TextStyle2>
//           </IconButton>
//         </FooterContainer>
//       </Container>
//     </KeyboardAvoidingView>
//   );
// }
const styles = StyleSheet.create({
  buttoncontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 40,
  },
  button: {
    backgroundColor: quoteBox, // Adjust the color as needed
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25, // Adjust the radius to make it more or less rounded
    alignItems: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
