import React, { useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  View,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Container,
  PageContent,
  FooterContainer,
  IconButton,
  TextStyle2,
  FavoritesFlex,
  FavoritesFlexRow,
  FavoriteGroup,
  FavoriteGroupBoxAuthor,
  FavoriteGroupBoxTitle,
    FavoritesBox,
    FavoritesImage,
  FollowText,
  Heart,
  NavBarContainer,
} from "../Components/Styles";
import { Colors } from "../Components/Styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { RemoveFromBookShelf, baseURL } from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { secondary, text, primary, inText, heading } = Colors;

//colors

export default function Favorites({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  //to get userdata
  useEffect(() => {
    const user = AsyncStorage.getItem("BookFeelsCredentials").then((res) => {
      console.log("res", res);
      const userdata = JSON.parse(res);
      console.log("USERDATA", userdata);
      setUserData(userdata.user);
      setUserToken(userdata.access);
      //viewBookShelf(userData);
    }); // Get the user data from AsyncStorage
  }, []);
  useEffect(() => {
   
      viewBookShelf();
    
  }, [userToken]);

  const viewBookShelf = async () => {
    setLoading(true);
    const URL = `${baseURL}api/bookshelf/`;
    await axios
      .get(URL,{headers : {"Authorization" : `Bearer ${userToken}`}})
      .then((res) => {
        // const data = response.data;
        console.log("BOOKS Res", res);
        console.log("BOOKS.data", res.data);
        if (res.data?.data.books && Array.isArray(res.data.data.books)) {
          res.data.data.books.forEach((result, index) => {
            console.log(`Result ${index + 1}:`, result);
          });
        } else {
          console.log("No results found or 'results' is not an array.");
        }
        setBooks(res.data.data.books || []);
        setBookTitle(res.data.data.books.Title);
      })
      .catch((err) => {
        console.log("ERRROR", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // console.log("BookTitle before entering remove", bookTitle);
  // const HandleRemoveFromBookShelf = async () => {
  //   setLoading(true);
  //   try {
  //     //this res is carrying res.data
  //     const res = await RemoveFromBookShelf(userToken, bookTitle);
  //     if (res.status !== "SUCCESS") {
  //       console.log("Error Message:", res.message);
  //     } else {
  //       console.log("res:", res);
  //       console.log("Bookshelf", bookTitle, "user", userData.username);
  //       console.log("Book In Shelf", res.data.is_on_shelf);
  //       setBookInShelf(res.data.is_on_shelf);
  //       //to ensure that the book is removed from bookshelf
  //     }
  //   } catch (error) {
  //     console.log("ERROR", error);
  //     console.log("res", res);
  //     setLoading(false);
  //   }
  // }
  //To render search results.
  const renderBookShelf = ({ item }) => (
    <View style={styles.container}>
      <FavoritesFlexRow>
          <FavoritesImage source={{ uri: item.image }} />
          <FavoritesBox>
            <FavoriteGroupBoxTitle>{item.Title}</FavoriteGroupBoxTitle>
            <FavoriteGroupBoxAuthor> by {item.authors}</FavoriteGroupBoxAuthor>
        </FavoritesBox>
        <View styles={styles.button}>
        {/* <Button
          title="Remove Book from Bookshelf"
          color="#A67FBF" //secondary
          onPress={HandleRemoveFromBookShelf}
        /> */}
      </View>
      </FavoritesFlexRow> 
     </View>
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container>
        <StatusBar style="dark" />

        {/* <ScrollView> */}
        <PageContent>
        <NavBarContainer>
           
           <Text style={styles.screenTitle}>       My BookShelf </Text>
             
           </NavBarContainer>
          <View >
            {loading && <ActivityIndicator size={"large"} />}
          </View>
          <FlatList
            data={books}
            renderItem={renderBookShelf}
            keyExtractor={(item, index) => index.toString()} //assuming each item has a unique id
            contentContainerStyle={styles.list}
            ListFooterComponent={() => {
              return (
                <View >
                  {loading && <ActivityIndicator size={"large"} />}
                </View>
              );
            }}
            ListEmptyComponent={<Text>No results found</Text>}
          />
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
    button: {
      width: 50,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
      borderRadius: 5,
      overflow: "hidden",
      backgroundColor: secondary,
      alignItems: "center",
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
  screenTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: heading,
    marginLeft: 35,
  },
    title: {
      fontWeight: "bold",
      fontSize: 16,
    },
    authors: {
      color: text,
    },
    container: {
      flexDirection: 'row',
      flex: 1,
      padding: 10,
      borderRadius: 10,
      shadowColor: secondary,
      shadowOffset: { width: 0, height: 1 },
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