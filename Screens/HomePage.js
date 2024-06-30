import React , { useContext }from "react";
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
} from "../Components/Styles";
import { Colors } from "../Components/Styles";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Components/CredentialsContext";


//colors

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
                onFocus={handleFocus}// trigers the navigation to discoverbooks screen
                value={searchQuery}
                style={{ flex: 1, margin: 20, backgroundColor: inText }}
              />

              <NotificationIcon>
                <MaterialCommunityIcons name="bell" size={30} color="black" />
              </NotificationIcon>
            </NavBarContainer>

            <HeadingStyle>Pick an emotion and get started</HeadingStyle>

            <EmotionContainer>
              <RowContainer>
                <Emotion
                  onPress={() => console.log("Happiness emotion is chosen")}
                >
                  <EmotionText>😀</EmotionText>

                  <EmotionName>Happiness</EmotionName>
                </Emotion>

                <Emotion
                  onPress={() => console.log("Sadness emotion is chosen")}
                >
                  <EmotionText>😢</EmotionText>

                  <EmotionName>Sadness</EmotionName>
                </Emotion>
              </RowContainer>

              <RowContainer>
                <Emotion onPress={() => console.log("Love emotion is chosen")}>
                  <EmotionText>🥰</EmotionText>

                  <EmotionName>Love</EmotionName>
                </Emotion>

                <Emotion onPress={() => console.log("Fear emotion is chosen")}>
                  <EmotionText>😰</EmotionText>

                  <EmotionName>Fear</EmotionName>
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
