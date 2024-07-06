import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import {
  Container,
  PageContent,
  NavBarContainer2,
  FooterContainer,
  IconButton,
  TextStyle2,
  SearchIcon,
  SettingsIcon,
  BioSection,
  ProfilePicture,
  UserName,
  BioText,
  LeftFlex,
  FollowButton,
  FollowText,
  TopFlex,
  BottomFlex,
  Group,
  Number,
  GroupText,
  RightFlex,
  SubHeader,
  Line3,
  Line,
  Line2,
  FavouritesFlex,
  FavoriteGroup,
  FavoriteGroupBox,
  SubHeader2,
  Line4,
  QuoteBox,
  SubHeaderGroup,
  EditGroup,
  FlewRow,
  Colors,
  StarContainer,
  HistoryFlex1,
  HistoryFlexRow,
  HistoryText,
  StarFlex,
} from "../Components/Styles";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../config";
import { Rating } from "react-native-rating-element";
import axios from "axios";
import { TextInput } from "react-native-paper";
import StarRating from "../Components/StarRating";
const { secondary, text, primary, inText, heading, quoteBox, moreColor } =
  Colors;

const ViewReviewsRates = ({ route }) => {
  const { bookTitle } = route.params;
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const navigation = useNavigation();

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

  useEffect(() => {
    ViewReviewRate();
  }, [userToken]);

  const ViewReviewRate = async () => {
    setLoading(true);
    // console.log("userToken3", userToken);
    // console.log("Developer", "NadaShoukry");
    await axios
      .get(`${baseURL}api/getreviews/${bookTitle}/`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        console.log("Res", res);
        console.log("Res.data", res.data);
        //     console.log("userToken3", userToken);
        // console.log("Developer", "NadaShoukry");
        if (res.data.status !== "SUCCESS") {
          console.log("Error Message:", res.data.message);
        } else {
          if (res.data?.data && Array.isArray(res.data.data)) {
            res.data.data.forEach((result, index) => {
              console.log(`Result ${index + 1}:`, result);
            });
          } else {
            console.log("No results found or 'results' is not an array.");
          }
          console.log("Message:", res.data.message);
          console.log("ViewReview:", res.data.data);
          setReviews([...res.data.data] || []);
        }
      })
      .catch((err) => {
        console.log("ERROR View", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const RenderAllReviews = ({ item }) => (
    <ScrollView>
      <HistoryFlex1>
        <HistoryFlexRow>
          <HistoryText> {item.user} </HistoryText>

          {/* <HistoryText> Sun 02 Jun </HistoryText> */}
        </HistoryFlexRow>

        <HistoryFlexRow>
          <HistoryText> {item.review_text} </HistoryText>

          {/* <HistoryText> Romance </HistoryText> */}
        </HistoryFlexRow>

        <HistoryFlexRow>
          {/* <HistoryText> Feedback </HistoryText> */}

          <StarFlex>
            <StarRating rating={item.rating} />
          </StarFlex>
        </HistoryFlexRow>
      </HistoryFlex1>
      </ScrollView>
    
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container>
        <PageContent>
          <Text style={styles.title}>{bookTitle} Reviews and Rates</Text>
          <View style={styles.reviewsContainer}>
            <FlatList
              data={reviews}
              renderItem={RenderAllReviews}
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
};

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

export default ViewReviewsRates;
