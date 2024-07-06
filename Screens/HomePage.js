/* import React , { useContext }from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
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
  EmotionImage4
} from "../Components/Styles";
import { Colors } from "../Components/Styles";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Components/CredentialsContext";


const { inText } = Colors;

export default function HomePage({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const [insightQuery, setInsightQuery] = React.useState("");



  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const onChangeInsight = (query) => {
    setInsightQuery(query);
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
        <StatusBar style="dark" />

        <ScrollView>
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
                style={{ flex: 1, marginTop: 20, marginLeft: 50, backgroundColor: inText }}
              />
              
            </NavBarContainer>

            <HeadingStyle>Pick an emotion and get started</HeadingStyle>

            <EmotionContainer>

              <RowContainer>

                <Emotion
                  onPress={() => console.log("Happiness emotion is chosen")}
                >

                  <EmotionImage1 source={require('../assets/happiness.png')}/>

                  <EmotionText> Happiness </EmotionText>

                </Emotion>

                <Emotion
                  onPress={() => console.log("Sadness emotion is chosen")}
                >
                  <EmotionImage2 source={require('../assets/sadness.png')}/>

                  <EmotionText> Sadness </EmotionText>

                </Emotion>

              </RowContainer>

              <RowContainer>

                <Emotion onPress={() => console.log("Love emotion is chosen")}>
                  
                  <EmotionImage3 source={require('../assets/love.png')}/>

                  <EmotionText> Love </EmotionText>

                </Emotion>

                <Emotion onPress={() => console.log("Fear emotion is chosen")}>
                  
                  <EmotionImage4 source={require('../assets/fear.png')}/>

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
                onChangeText={onChangeInsight}
                value={insightQuery}
                style={{ textAlign: "left" }}
              />

              <CorrectIcon>
                <AntDesign name="checkcircleo" size={24} color="black" />
              </CorrectIcon>
            </View>
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

 */

import React, { useContext } from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Container,
  NavBarContainer,
  PageContent,
  ProfileIcon,
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
  TextStyle2,
  EmotionImage1,
  EmotionImage2,
  EmotionImage3,
  EmotionImage4,
  Emoji,
  IconButton2
} from "../Components/Styles";
import { Colors } from "../Components/Styles";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { inText } = Colors;

export default function HomePage({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const [insightQuery, setInsightQuery] = React.useState("");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
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
        <StatusBar style="dark" />

        <ScrollView>
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
                style={{ flex: 1, marginTop: 20, marginLeft: 50, backgroundColor: inText }}
              />
              
            </NavBarContainer>

            <HeadingStyle>Pick an emotion and get started</HeadingStyle>

            <EmotionContainer>
              <RowContainer>
                <Emotion onPress={() => console.log("Happiness emotion is chosen")}>
                  <Text style={{ fontSize: 50 }}>😊</Text>
                  <EmotionText>Happiness</EmotionText>
                </Emotion>
                <Emotion onPress={() => console.log("Sadness emotion is chosen")}>
                  <Text style={{ fontSize: 50 }}>😢</Text>
                  <EmotionText>Sadness</EmotionText>
                </Emotion>
              </RowContainer>
              <RowContainer>
                <Emotion onPress={() => console.log("Love emotion is chosen")}>
                  <Text style={{ fontSize: 50 }}>❤️</Text>
                  <EmotionText>Love</EmotionText>
                </Emotion>
                <Emotion onPress={() => console.log("Fear emotion is chosen")}>
                  <Text style={{ fontSize: 50 }}>😱</Text>
                  <EmotionText>Fear</EmotionText>
                </Emotion>
              </RowContainer>
            </EmotionContainer>

            <Line2 />

            <StyleOr>or try to maximize it</StyleOr> 

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <InsightInput
                placeholder="Enter your insights here..."
                placeholderTextColor="gray"
                onChangeText={(query) => setInsightQuery(query)}
                value={insightQuery}
                style={{ textAlign: "left" }}
              />
              <IconButton2 onPress={() => console.log("Insight submitted")}>
                <MaterialCommunityIcons name="check" size={24} color="black" />
              </IconButton2>
            </View>
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
