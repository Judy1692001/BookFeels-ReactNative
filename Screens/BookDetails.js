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
  Line2,
  Line4,
  NavBarContainer,
  FooterContainer,
  IconButton,
  TextStyle2,
  ProfileIcon,
  NotificationIcon,
} from "../Components/Styles";
//API
import axios from "axios";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper"; // Correct import for useTheme
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BlurView } from "@react-native-community/blur";
// import StarRating from 'react-native-star-rating';
const { secondary, text, primary, inText, heading } = Colors;
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

  const [userData, setUserData] = useState({});

  //Function to handle the message
  const HandleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  //useEffect listener for book details whenever we click on a book.
  useEffect(() => {
    fetchBookDetails();
  }, [bookTitle]); // because we want it to run after we click on a book

  const fetchBookDetails = async () => {
    setLoading(true);

    const URL = `http://192.168.1.3:8000/api/bookdetails/${bookTitle}`;
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

    
    useEffect(() => {
      const user = AsyncStorage.getItem("BookFeelsCredentials").then((res) => {
        console.log("res", res);
        const userdata = JSON.parse(res);
        console.log("USERDATA", userdata);
        setUserData(userdata);
          
         
    }); // Get the user data from AsyncStorage
  }, []);
    
  const HandleAddToBookShelf = async () => {
    //clear the message whenever the button is pressed
    HandleMessage(null);
    setLoading(true);
    console.log("UserData", userData);
    console.log("Name", userData.username);

    const url = `http://192.168.1.3:8000/api/bookshelf/${userData.username}/add/`;
    console.log("credintials", bookTitle);
     axios.post(url, {"title" : bookTitle},{
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        console.log("res", res);
        setLoading(false);
        if (res.data.status !== "SUCCESS") {
          console.log("Error Message:", res.data.message);
          HandleMessage(res.data.message, res.data.status);
        } else {
          if (res.data.message) {
            console.log("Message:", res.data.message);
            HandleMessage(res.data.message, res.data.status);
            console.log("Books", res.data.data.books);
            console.log("Bookshelf", bookTitle, "user", userData.username);
            // Optionally show the message to the user
            // navigation.replace('Homepage');
          }
        }
        // setSubmitting(false);
      })
      .catch((err) => {
        console.log("ERROR", err);
        console.log("res", res);
        setLoading(false);
        HandleMessage(err);
      });
  }
   
  const HandleRemoveFromBookShelf = async () => {
    //clear the message whenever the button is pressed
    HandleMessage(null);
    setLoading(true);
    console.log("UserData", userData);
    console.log("Name", userData.username);

    const url = `http://192.168.1.3:8000/api/bookshelf/${userData.username}/remove/`;
    console.log("credintials", bookTitle);
     axios.post(url, {"title" : bookTitle},{
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        console.log("res", res);
        setLoading(false);
        if (res.data.status !== "SUCCESS") {
          console.log("Error Message:", res.data.message);
          HandleMessage(res.data.message, res.data.status);
        } else {
          if (res.data.message) {
            console.log("Message:", res.data.message);
            HandleMessage(res.data.message, res.data.status);
            console.log("Books", res.data.data.books);
            console.log("Bookshelf", bookTitle, "user", userData.username);
            // Optionally show the message to the user
            // navigation.replace('Homepage');
          }
        }
        // setSubmitting(false);
      })
      .catch((err) => {
        console.log("ERROR", err);
        console.log("res", res);
        setLoading(false);
        HandleMessage(err);
      });
  }
        
  

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
            <Line4></Line4>
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
          <View style={styles.buttoncontainer}>
           <Button
              title="Add to BookShelf"
              mode="outlined"
              color="#A67FBF"
              onPress={ HandleRemoveFromBookShelf }
              style={styles.button}
            ></Button>
          </View>

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
    marginTop: 40,
    borderRadius: 80,
    shadowColor: secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10, //to control the drop shadow of a component.
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
