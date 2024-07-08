import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
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
  Alert,
  ImageBackground,
} from "react-native";
import {
  Container,
  Colors,
  Line,
  Line1,
  Line2,
  Line3,
  Line4,
  NavBarContainer,
  FooterContainer,
  IconButton,
  TextStyle2,
  ProfileIcon,
  NotificationIcon,
  Line5,
} from "../Components/Styles";
//API
import axios from "axios";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper"; // Correct import for useTheme
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RemoveFromBookShelf, baseURL } from "../config";



// import { BlurView } from "@react-native-community/blur";
// import StarRating from 'react-native-star-rating';
const { secondary, text, primary, inText, heading,historyColor } = Colors;
const BookDetails = ({ route }) => {
  const navigation = useNavigation();
  const { bookTitle } = route.params;
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState([]);
  //state variable to store the error message.
  const [message, setMessage] = useState();
  //error message,success message
  const [messageType, setMessageType] = useState();
  // //states for rating part
  // const [rating, setRating] = useState(0);
  const [bookInShelf, setBookInShelf] = useState(0);
  const [readBook, setReadBook] = useState(false);

  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState({});

  //Function to handle the message
  const HandleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  const handleReviewRatePress = () => {
    navigation.navigate("ReviewRate", {
      bookTitle: bookDetails.Title,
      bookImage: bookDetails.image,
    });
  };
  //to get user data
  useEffect(() => {
    const user = AsyncStorage.getItem("BookFeelsCredentials").then((res) => {
      console.log("res", res);
      const userdata = JSON.parse(res);
      console.log("USERDATA", userdata);
      setUserData(userdata.user);
      setUserToken(userdata.access);
    }); // Get the user data from AsyncStorage
  }, []);

  //useEffect listener for book details whenever we click on a book.
  useEffect(() => {
    fetchBookDetails();
  }, [bookTitle]); // because we want it to run after we click on a book

  // const saveBookShelfState = (status) => {
  //   console.log("CredentialsInside", status);
  //   AsyncStorage.setItem("BookShelfState", JSON.stringify(status))
  //     .then((res) => {
  //       console.log("res", res);
  //       // const saveShelfState = JSON.parse(res);
  //       // console.log("USERDATA", saveShelfState);
  //       setBookInShelf(status);

  //     })
  //     .catch((error) => {
  //       console.log("ERROR in save", error);
  //     });
  // };
  // console.log("Stored state", bookInShelf);
  // useEffect(() => {
  //   const shelfState = AsyncStorage.getItem("BookShelfState").then((res) => {
  //     console.log("res", res);
  //     const storedStatus = JSON.parse(res);
  //     setBookInShelf(JSON.parse(storedStatus));
  //   });
  // }, [bookInShelf]);

  // console.log("stored status", bookInShelf);
  const fetchBookDetails = async () => {
    setLoading(true);
    const URL = `${baseURL}api/bookdetails/${bookTitle}`;
    await axios
      .get(URL)
      .then((response) => {
        const data = response.data;
        console.log("BOOKDetails", data);
        if (response.data.status !== "SUCCESS") {
          console.log("Error Message:", response.data.message);
          HandleMessage(response.data.message, response.data.status);
        } else {
          if (response.data.message) {
            console.log("Message:", response.data.message);
            HandleMessage(response.data.message, response.data.status);
          }
        }

        setBookDetails(data.data);
        //saveBookShelfState(data.is_on_shelf);
        setBookInShelf(data.is_on_shelf);
        console.log("Inside details", bookInShelf);
      })
      .catch((err) => {
        console.log("ERROR", err);
        HandleMessage("Check you Network and try again");
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const HandleAddToBookShelf = async () => {
    // Alert.alert("inside add shelf");
    //clear the message whenever the button is pressed
    HandleMessage(null);
    setLoading(true);
    // console.log("UserData", userData);
    // console.log("Name", userData.username);
    // console.log("token", userToken);

    const url = `${baseURL}api/bookshelf/add/`;
    console.log("credintials", bookTitle);
    axios
      .post(
        url,
        { title: bookTitle },
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
          HandleMessage(res.data.message, res.data.status);
        } else {
          if (res.data.message) {
            console.log("Message:", res.data.message);
            HandleMessage(res.data.message, res.data.status);
            console.log("Books", res.data.data);
            console.log("Bookshelf", bookTitle, "user", userData.username);
            
            fetchBookDetails();
           //saveBookShelfState(res.data.data.is_on_shelf); //to ensure that the book is added to bookshelf
          }
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
        console.log("res", res);
        setLoading(false);
        HandleMessage(err);
      });
  };

  const HandleRemoveFromBookShelf = async () => {
    setLoading(true);
    // console.log("UserData", userData);
    // console.log("Name", userData.username);

    // const url = `${baseURL}api/bookshelf/remove/`;
    // console.log("credintials", bookTitle);
    // axios
    //   .post(
    //     url,
    //     { "title": bookTitle },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${userToken}`
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     // console.log("res", res);
    //     setLoading(false);
    //     if (res.data.status !== "SUCCESS") {
    //       console.log("Error Message:", res.data.message);
    //       HandleMessage(res.data.message, res.data.status);
    //     } else {
    //       if (res.data.message) {
    //         console.log("Message:", res.data.message);
    //         HandleMessage(res.data.message, res.data.status);
    //         console.log("Books", res.data.data);
    //         console.log("Bookshelf", bookTitle, "user", userData.username);
    //         console.log("Book In Shelf", res.data.data.is_on_shelf);
    //         setBookInShelf(res.data.data.is_on_shelf);
    //         //to ensure that the book is removed from bookshelf
    //       }
    //     }
    //     //return res.data.data.books;
    //   })
    //   .catch((err) => {
    //     console.log("ERROR", err);
    //     console.log("res", res);
    //     setLoading(false);
    //     HandleMessage(err);
    //   });

    try {
      //this res is carrying res.data
      const res = await RemoveFromBookShelf(userToken, bookTitle);
      if (res.status !== "SUCCESS") {
        console.log("Error Message:", res.message);
      } else {
        console.log("res:", res);
        console.log("Bookshelf", bookTitle, "user", userData.username);
        fetchBookDetails();
      
      }
    } catch (error) {
      console.log("ERROR", error);
      console.log("res", res);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container>
        <ScrollView>
          <View style={styles.container}>
            {/* 
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.content}>
          <Text style={styles.text}>Your Content Here</Text>
        </View>
      </ImageBackground> */}
            <Image source={{ uri: bookDetails.image }} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{bookDetails.Title}</Text>
            <Text style={styles.authors}>by {bookDetails.authors}</Text>
            <Line></Line>
            <Text style={styles.description}>Book Description</Text>
            <Line5></Line5>
            <Text style={styles.descriptionContent}>
              {bookDetails.description}
            </Text>
            <Line></Line>
            <Text style={styles.authors}>
              Published by :{bookDetails.publisher}
            </Text>
            <Text style={styles.authors}>
              Published Date : {bookDetails.publishedDate}
            </Text>
            <Line></Line>
            <Text style={styles.authors}>
              Book Genre : {bookDetails.categories}
            </Text>
          </View>
          <Line></Line>
          <Text style={styles.textdescription}>To read this book later...</Text>
          <View style={styles.buttoncontainer}>
            {/* this ensure that button is rendered only when bookdetails are fetched successfully */}
            {bookDetails && (
              <Button
                title={
                  bookInShelf ? "Remove From BookShelf" : "Add To BookShelf"
                }
                mode="outlined"
                color={bookInShelf ? "gray" : "#A67FBF"} // if true dark_Primary else secondary
                onPress={()=>{bookInShelf ?  HandleRemoveFromBookShelf() : HandleAddToBookShelf()}
                }
                style={styles.button}
              ></Button>
            )}
          </View>
          <Line></Line>
          <Text style={styles.textdescription}>Already read this book ?</Text>
          <Text style={styles.textdescription}>
            Rate and Review it to get better Recommendations
          </Text>

          <View style={styles.buttoncontainer}>
            <Button
              title={"Review and Rate"}
              mode="outlined"
              color={"#A67FBF"} // if true dark_Primary else secondary
              onPress={handleReviewRatePress}
              style={styles.button}
            ></Button>
          </View>
        </ScrollView>

        
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
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
    width: 200,
    height: 300,
    marginRight: 10,
    resizeMode: "contain",
    //borderRadius: 100,
  },
  buttoncontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    // borderRadius: 80,
    // shadowColor: secondary,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // // shadowRadius: 4,
    // elevation: 10, //to control the drop shadow of a component.
  },
  button: {
    width: 100,
    height: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  authors: {
    //color: text,
    fontSize: 16,
    textAlign: "center",
    color: text,
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    color: heading,
    fontWeight: "bold",
  },
  textdescription: {
    fontSize: 20,
    textAlign: "center",
    color: historyColor,
    fontWeight: "bold",
  },
  descriptionContent: {
    fontSize: 16,
    textAlign: "center",
    color: text,
  },
  container: {
    //flex: 1,
    // width: 250,
    // height: 350,
    // //marginRight: 10,
    //alignContent: 'center',
    alignItems: "center",
    // justifyContent: 'center',
    // marginLeft: 40,
    padding: 20,
    borderRadius: 80,
    shadowColor: secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10, //to control the drop shadow of a component.
    backgroundColor: primary,
    //backgroundColor: transparent,
    marginTop: 20,
  },
  textContainer: {
    flex: 1,
    backgroundColor: primary,
    marginTop: 40,
  },
  footer: {
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookDetails;
