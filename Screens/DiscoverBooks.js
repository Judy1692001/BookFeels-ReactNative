import React, { useState, useEffect } from "react";
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
} from "react-native";
import {
  Container,
  Colors,
  NavBarContainer,
  FooterContainer,
  IconButton,
  TextStyle2,
  ProfileIcon,
  NotificationIcon,
} from "../Components/Styles";
//API
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "./../Components/KeyboardAvoidingWrapper";
//color
const { secondary, text, heading, dark_primary, notvalid, primary, inText } =
  Colors;

const DiscoverBooks = ({ navigation }) => {
  //state variable to store the error message.
  const [message, setMessage] = useState();
  //error message,success message
  const [messageType, setMessageType] = useState();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextURL, setNextURL] = useState(null);
  const [prevURL, setPrevURL] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onChangeSearch = (query) => {
    setCurrentPage(0); //with any search query go back to page 1
    setSearchQuery(query);
    // fetchBooks();//to get data after
  };
  useEffect(() => {
    fetchBooks();
  }, [searchQuery]);
  //useEffect takes arrow function and an empty array as a parameters
  useEffect(() => {
    fetchBooks();
  }, []); // array because we want it to run after every search
  //if empty array (will run after the initial render)

  const fetchBooks = async () => {
    //try {
    setLoading(true);
    const nextPage = currentPage + 1;
    // //search APT
    // const searchResponse = await axios.get(
    //   `http://192.168.1.4:8000/api/search/?page=${nextPage}&query=${searchQuery}`
    // );
    // setSearchResults(searchResponse.data.results);
    // console.log("Search", searchResponse.data.results);

    //Discover page APT to show all books
    const URL = `http://192.168.1.4:8000/api/search/?page=${nextPage}${
      searchQuery ? `&query=${searchQuery}` : ""
    }`;
    await axios
      .get(URL)
      .then((response) => {
        const data = response.data;
        console.log("BOOKS", data);
        //console.log("title", data?.results);
        console.log("title");

        if (data?.results && Array.isArray(data.results)) {
          data.results.forEach((result, index) => {
            console.log(`Result ${index + 1}:`, result);
          });
        } else {
          console.log("No results found or 'results' is not an array.");
        }
        //to delete and reset data while searching
        if (currentPage == 0) {
          setBooks((books) => [...data.results] || []);
        } else {
          setBooks((books) => [...books, ...data.results] || []);
        }
        setCurrentPage(nextPage);

        //setNextURL(data.next);
        //setPrevURL(data.previous);
      })
      .catch((err) => {
        console.log("ERROR", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const HandleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };
  //To render Discover page books
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.title}>{item.Title}</Text>
      <Text style={styles.authors}>{item.authors}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );
  //To render search results.
  const renderSearchItems = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.title}>{item.Title}</Text>
      <Text style={styles.authors}>{item.authors}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container>
        <NavBarContainer>
          <ProfileIcon
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <MaterialCommunityIcons name="account" size={35} color="black" />
          </ProfileIcon>

          <Searchbar
            placeholder="Title or author"
            placeholderTextColor="gray"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{ flex: 1, margin: 20, backgroundColor: inText }}
          />
          <NotificationIcon>
            <MaterialCommunityIcons name="bell" size={30} color="black" />
          </NotificationIcon>
        </NavBarContainer>
        {/* <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} //assuming each item has a unique id
          contentContainerStyle={styles.list}
          onEndReached={fetchBooks}
          onEndReachedThreshold={0.1} //means that the onEndReached callback will be triggered when
          //the user has scrolled within 10% of the bottom of the list.
          ListFooterComponent={() => {
            return (
              <View style={styles.footer}>
                {loading && <ActivityIndicator size={large} />}
              </View>
            );
          }}
        /> */}
        {loading && currentPage == 0 ? (
          <View style={styles.footer}>
            {loading && <ActivityIndicator size={"large"} />}
          </View>
        ) : (
          <FlatList
            data={books}
            renderItem={renderSearchItems}
            keyExtractor={(item, index) => index.toString()} //assuming each item has a unique id
            contentContainerStyle={styles.list}
            onEndReached={fetchBooks}
            onEndReachedThreshold={0.1} //means that the onEndReached callback will be triggered when
            //the user has scrolled within 10% of the bottom of the list.
            ListFooterComponent={() => {
              return (
                <View style={styles.footer}>
                  {loading && <ActivityIndicator size={"large"} />}
                </View>
              );
            }}
            ListEmptyComponent={<Text>No results found</Text>}
          />
        )}
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
    width: 10,
    height: 5,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  authors: {
    color: text,
  },
  container: {
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

export default DiscoverBooks;
