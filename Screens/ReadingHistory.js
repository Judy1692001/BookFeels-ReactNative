import React, { useState, useEffect, useRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
    Switch,
  StyleSheet,
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
  ProfileInfo,
  ProfilePicture2,
  UserName2,
  Preferences,
  BookManagement,
  Support,
  Flex1,
  Flex2,
  Theme,
  Theme2,
  Tutorials,
  RightArrow,
  ReadingHistoryContainer,
  ReadingHistoryFlex,
  BookDetails,
  FavoriteGroupBox,
  FavoriteGroupBoxName,
  StarFlex,
  HistoryText,
  BookDetailsText,
  StarFlex2,
} from "../Components/Styles";
import { Colors } from "../Components/Styles";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../config";
import StarRating from "../Components/StarRating";

const { inText,quoteBox,moreColor,primary,text,secondary } = Colors;

export default function ReadingHistory({ navigation }) {
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
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
  console.log("UserToken", userToken);
  const ViewReadingHistory = async () => {
    console.log("HelloInside", "hello its me outside");
    setLoading(true);
    await axios
      .get(`${baseURL}api/readinghistory/`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        console.log("Res", res);
        console.log("Res.data", res.data);
        console.log("userToken3", userToken);
        console.log("Developer", "NadaShoukry");
        if (res.data.status !== "SUCCESS") {
          console.log("Error Message:", res.data.message);
        } else {
          if (res.data?.data.books && Array.isArray(res.data.data.books)) {
            res.data.data.books.forEach((result, index) => {
              console.log(`Result ${index + 1}:`, result);
            });
          } else {
            console.log("No results found or 'results' is not an array.");
          }
          console.log("Message:", res.data.message);
          console.log("ViewData:", res.data.data);
          console.log("ViewBooks:", res.data.data.books);
          setHistory([...res.data.data.books] || []);
        }
      })
      .catch((err) => {
        console.log("ERROR History", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    ViewReadingHistory();
  }, [userToken]);

  const RenderReadingHistory = ({ item }) => (
    <ScrollView>
      <ReadingHistoryContainer>
        <ReadingHistoryFlex>
          <FavoriteGroupBox>
            <Image source={{ uri: item.image }} />
          </FavoriteGroupBox>

          <BookDetails>
            <BookDetailsText> {item.Title} </BookDetailsText>

            <BookDetailsText> {item.categories} </BookDetailsText>

            <StarFlex2>
              <StarRating rating={item.rating} />
            </StarFlex2>
          </BookDetails>
        </ReadingHistoryFlex>
      </ReadingHistoryContainer>
    </ScrollView>
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container>
        <StatusBar style="dark" />
              <PageContent>
                  <TextStyle2>{userData.username}'s Reading History</TextStyle2>
                  <View style={styles.reviewsContainer}>
          <FlatList
            data={history}
            renderItem={RenderReadingHistory}
            keyExtractor={(item, index) => index.toString()}
                      />
                      </View>
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
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    list: {
      padding: 10,
    },
    pagination: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 16,
      marginVertical: 10,
    },
    image: {
      width: 60,
      height: 80,
      marginRight: 10,
    },
    rating: {
      marginVertical: 16, // Adjust the vertical margin to add space above and below the rating stars
    },
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
      alignItems: "center",
    },
    text: {
      fontSize: 18,
      textAlign: "center",
      color: moreColor,
    },
    textInput: {
      borderColor: quoteBox,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 30,
      minHeight: 100,
      textAlignVertical: "top",
    },
    reviewsContainer: {
      flex: 1,
      padding: 10,
    },
    reviewItem: {
      borderBottomWidth: 1,
      borderBottomColor: "gray",
      paddingVertical: 10,
    },
    textContainer: {
      flex: 1,
      marginRight: 10,
      backgroundColor: primary,
    },
    details: {
      flex: 1,
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center",
    },
    authors: {
      color: text,
    },
    container: {
      flexDirection: "row",
      flex: 1,
      padding: 20,
      borderRadius: 10,
      shadowColor: secondary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 10, //to control the drop shadow of a component.
      backgroundColor: primary,
      marginTop: 20,
    },
    footer: {
      width: "90%",
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
  });