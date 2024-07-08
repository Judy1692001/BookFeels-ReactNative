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
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  Container,
  Colors,
  NavBarContainer,
  IconButton,
  ProfileIcon,
} from "../Components/Styles";
import axios from "axios";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { baseURL } from "../config";

const { secondary, text, primary, inText } = Colors;

const DiscoverBooks = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const DiscoverRef = useRef(null);

  const focusKeyboard = () => {
    DiscoverRef.current?.focus();
  };

  useEffect(() => {
    focusKeyboard();
  }, []);

  const onChangeSearch = (query) => {
    setCurrentPage(0);
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchBooks();
  }, [searchQuery]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    const nextPage = currentPage + 1;

    const URL = `${baseURL}api/search/?page=${nextPage}${
      searchQuery ? `&query=${searchQuery}` : ""
    }`;
    await axios
      .get(URL)
      .then((response) => {
        const data = response.data;
        if (data?.results && Array.isArray(data.results)) {
          setBooks((prevBooks) =>
            currentPage === 0 ? data.results : [...prevBooks, ...data.results]
          );
        }
        setCurrentPage(nextPage);
      })
      .catch((err) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePress = (book) => {
    Alert.alert("Book Pressed", `You pressed ${book.Title}`);
    navigation.navigate("BookDetails", { bookTitle: book.Title });
  };

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
          color="#A67FBF"
          onPress={() => handlePress(item)}
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container>
        <NavBarContainer>
          <ProfileIcon onPress={() => navigation.navigate("Profile")}>
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
        </NavBarContainer>

        {loading && currentPage === 0 ? (
          <View style={styles.footer}>
            {loading && <ActivityIndicator size={"large"} />}
          </View>
        ) : (
          <FlatList
            data={books}
            renderItem={renderSearchItems}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.list}
            onEndReached={fetchBooks}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => (
              <View style={styles.footer}>
                {loading && <ActivityIndicator size={"large"} />}
              </View>
            )}
            ListEmptyComponent={<Text>No results found</Text>}
          />
        )}

      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
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
  title: {
    fontWeight: "bold",
    fontSize: 16,
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
    elevation: 10,
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
