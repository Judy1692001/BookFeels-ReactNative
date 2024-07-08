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
  FavoriteGroupBoxName,
  SubHeader2,
  Line4,
  QuoteBox,
  SubHeaderGroup,
  EditGroup,
  FlewRow,
  Colors,
  StarContainer,
} from "../Components/Styles";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../config";
import { Rating } from "react-native-rating-element";
import axios from "axios";
import { TextInput } from "react-native-paper";


const {
  secondary,
  text,
  primary,
  inText,
  heading,
  quoteBox,
  moreColor,
  historyColor,
} = Colors;
const ReviewRate = ({ route }) => {
  const navigation = useNavigation();
  const { bookTitle, bookImage } = route.params;
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [username, setUserName] = useState("");
  const [booktitle, setBooktitle] = useState("");
  const [id, setID] = useState(0);
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState({});
  const [editOrAdd, setEditOrAdd] = useState(false);

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

  const AddReviewRate = async () => {
    setLoading(true);
    console.log("above url", bookTitle);
    const url = `${baseURL}api/addreview/${bookTitle}/`;
    console.log("under url", bookTitle);
    console.log("Rating", rating);
    console.log("Review", review);
    await axios
      .post(
        url,
        {
          review_text: review,
          rating: rating,
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
          console.log("ReviewData", res.data.data);
          console.log("InsideReview Data", res.data.data.user);
          Alert.alert(
            res.data.message,
            "To edit your review, write your changes and then click the pen icon. To delete your review, click the recycle bin icon."
          );
          setRating(res.data.data.rating);
          setReview(res.data.data.review_text);
          setUserName(res.data.data.user);
          setBooktitle(res.data.data.book_title);
          setID(res.data.data.id);
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

  const EditReviewRate = async () => {
    setLoading(true);
    await axios
      .put(
        `${baseURL}api/editreview/${bookTitle}/${id}/`,
        {
          review_text: review,
          rating: rating,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        console.log("Res", res);
        console.log("Res.data", res.data);
        if (res.data.status !== "SUCCESS") {
          console.log("Error Message:", res.data.message);
        } else {
          console.log("Message:", res.data.message);
          console.log("ReviewData", res.data.data);
          console.log("InsideReview Data", res.data.data.user);
          setRating(res.data.data.rating);
          setReview(res.data.data.review_text);
          setUserName(res.data.data.user);
          setBooktitle(res.data.data.book_title);
          setID(res.data.data.id);
          Alert.alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("ERROR Edit", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const DelReviewRate = async () => {
    setLoading(true);
    await axios
      .delete(`${baseURL}api/deletereview/${bookTitle}/${id}/`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if (res.data.status !== "SUCCESS") {
          console.log("Error Message:", res.data.message);
          Alert.alert(res.data.message);
        } else {
          console.log("Message:", res.data.message);
          Alert.alert(res.data.message);
          setReview("");
          
        }
      })
      .catch((err) => {
        console.log("ERROR Del", err); 
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleViewReviewRate = () => {
    // useEffect(() => {
    //   ViewReviewRate();
    // }, []);
    // setShowReviews(!showReviews);
    navigation.navigate("ViewReviewsRates", { bookTitle: bookTitle });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container>
        <PageContent>
          <ScrollView>
            <View style={styles.container}>
              <Image source={{ uri: bookImage }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{bookTitle}</Text>
              </View>
            </View>
            <Text style={styles.title}> </Text>
            <Text style={styles.texttitle}>
              Did this book match your emotions?
            </Text>
            <Text style={styles.title}> </Text>
            <Text style={styles.texttitle}>
              Give Us Your Rate for better Recommendation
            </Text>

            <StarContainer>
              <Rating
                rated={rating}
                totalCount={5}
                ratingColor="#f1c40f"
                ratingBackgroundColor="#d4d4d4"
                size={30}
                onIconTap={(position) => setRating(position)}
                icon="star"
                direction="row"
                // style={styles.rating}
              />
             
            </StarContainer>
            <Text style={styles.text}>Write your Review</Text>
            <QuoteBox
              style={{ marginTop: 10, marginBottom: 30 }}
              placeholder="Write Your Review"
              multiline
              value={review}
              onChangeText={setReview}
            />
            <FlewRow>
              <EditGroup
                onPress={() => {
                  setEditOrAdd(true);
                  AddReviewRate();
                }}
              >
                <MaterialIcons name="add" size={24} color="black" />
              </EditGroup>
              <EditGroup
                onPress={() => {
                  setEditOrAdd(true);
                  EditReviewRate();
                }}
                style={{ marginLeft: 50 }}
              >
                <MaterialIcons name="edit" size={24} color="black" />
              </EditGroup>
              <EditGroup
                onPress={() => {
                  DelReviewRate();
                }}
              >
                <MaterialIcons
                  name="delete"
                  size={24}
                  color="black"
                  style={{ marginLeft: 60 }}
                />
              </EditGroup>
            </FlewRow>
          
            <TouchableOpacity
              style={styles.button}
              onPress={handleViewReviewRate}
            >
              {/* <Text style={styles.title}>{showReviews ? "Hide All Reviews" : "View All Reviews"}</Text> */}
              <Text style={styles.title}>{"View All Reviews"}</Text>
            </TouchableOpacity>
          </ScrollView>
        </PageContent>

        
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
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 30,
    minHeight: 100,
    textAlignVertical: "top",
  },
  reviewsContainer: {
    flex: 1,
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
  texttitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: historyColor,
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
export default ReviewRate;
