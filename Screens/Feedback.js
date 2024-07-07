import React, { useState } from "react";
import { Platform, View, Text, Alert, Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Container,
  PageContent,
  FooterContainer,
  IconButton,
  TextStyle2,
  FeedbackTitle,
  FeedbackImage,
} from "../Components/Styles";
import { Colors } from "../Components/Styles";
import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../config";

const { primary, inText, faqPar, secondary } = Colors;

const FeedbackInput = styled.TextInput`
  border-width: 1px;
  border-color: ${faqPar};
  padding: 10px;
  margin-left: 30px;
  margin-bottom: 20px;
  width: 80%;
  height: 30%;
  border-radius: 8px;
  font-size: 16px;
  color: ${faqPar};
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${secondary};
  padding: 15px;
  border-radius: 25px;
  align-items: center;
  border: 1px solid black;
  margin-left: 120px;
  width: 30%;
`;

const SubmitButtonText = styled.Text`
  color: black;
  font-size: 16px;
`;

export default function Feedback({ navigation }) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = AsyncStorage.getItem("BookFeelsCredentials").then((res) => {
      console.log("res", res);
      const userdata = JSON.parse(res);
      setUserToken(userdata.access);
      console.log("USERDATA", userdata);
      setUserData(userdata.user);
      // const username = userData.username;
    }); // Get the user data from AsyncStorage
  }, []);

   
  const handleSubmit = async () => {
    setLoading(true);
    console.log("userToken", userToken);
    const url = `${baseURL}api/addfeedback/`;
   
    await axios
      .post(
        url,
        {
          feedback_text: feedback
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        // console.log("res", res);
        setLoading(false);
        if (res.data.status !== "SUCCESS") {
            console.log("Error Message:", res.data.message);
            Alert.alert(res.data.message);
        } else {
          console.log("Message:", res.data.message);
          console.log("ReviewData", res.data.data);
         
          Alert.alert(res.data.message);
            setFeedback(res.data.data.feedback_text)
           
          // saveBookShelfState(false); //to ensure that the book is removed from bookshelf
        }
        //return res.data.data.books;
      })
      .catch((err) => {
        console.log("ERROR", err);
        console.log("res", res);
        setLoading(false);
      });
  };
 

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container>
        <StatusBar style="dark" />
        <PageContent>
          <FeedbackImage source={require("../assets/feedback.png")} />
          <FeedbackTitle> Do you have any thoughts to share? </FeedbackTitle>
          <FeedbackInput
            placeholder="Enter your feedback here..."
            placeholderTextColor="gray"
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />
                  <SubmitButton onPress={() => { handleSubmit(); Keyboard.dismiss(); }} >
            <SubmitButtonText>
              Submit
            </SubmitButtonText>
          </SubmitButton>
        </PageContent>
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
    </KeyboardAwareScrollView>
  );
}
