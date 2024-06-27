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
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
//color
const { secondary, text, primary, inText } = Colors;

const DiscoverBooks = () => {
  const navigation = useNavigation();

  //state variable to store the error message.
  const [message, setMessage] = useState();
  //error message,success message
  const [messageType, setMessageType] = useState();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const DiscoverRef = useRef(null);

  const focusKeyboard = () => {
    DiscoverRef.current?.focus();
  };

  //focus the keyboard when the component mounts
  useEffect(() => {
    focusKeyboard();
  }, []);

  const onChangeSearch = (query) => {
    setCurrentPage(0); //with any search query go back to page 1
    setSearchQuery(query);
    // fetchBooks();//to get data after
  };

  //useeffect is a listener
  useEffect(() => {
    fetchBooks();
  }, [searchQuery]); // because we want it to run after every search update
  //useEffect takes arrow function and an empty array as a parameters
  useEffect(() => {
    fetchBooks();
  }, []); // empty array (will run once after the initial render)

  const fetchBooks = async () => {
    setLoading(true);
    const nextPage = currentPage + 1;

    const URL = `http://192.168.1.3:8000/api/search/?page=${nextPage}${
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
      })
      .catch((err) => {
        console.log("ERROR", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //navigates to BookDetails page
  const handlePress = (book) => {
    Alert.alert("Book Pressed", `You pressed ${book.Title}`);
    navigation.navigate("BookDetails", { bookTitle: book.Title });
  };

  //To render search results.
  const renderSearchItems = ({ item }) => (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.authors}>{item.authors}</Text>
      </View>
      <View styles={styles.button}>
        <Button
          title="Book Details"
          color="#A67FBF" //secondary
          onPress={() => handlePress(item)}
        />
      </View>
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
            ref={DiscoverRef}
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
