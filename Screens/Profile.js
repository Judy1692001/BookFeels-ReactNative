import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
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
  FavoritesFlexRow,
  FavoritesImage,
  FavoritesBox,
  FavoriteGroupBoxTitle,
  FavoriteGroupBoxAuthor,
} from "../Components/Styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Components/CredentialsContext";
import { baseURL } from "../config";
import axios from "axios";


const { secondary, text, primary, inText, heading } = Colors;

export default function Profile({ navigation }) {
  const [quote, setQuote] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [editOrAdd, setEditOrAdd] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  //Destructure the values stored in Credentials using useContext
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  //   console.log("User", storedCredentials);
  //   const { username } = storedCredentials;

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
  const navigateToDiscover = () => {
    navigation.navigate("Discover");
  };
  useEffect(() => {
    ViewQuotes();
  }, [userToken]);

  const ViewQuotes = async () => {
    setLoading(true);
    console.log("userToken", userToken);
    await axios
      .get(`${baseURL}api/viewquote/`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        console.log("Res", res);
        console.log("Res.data", res.data);
        if (res.data.status !== "SUCCESS") {
          console.log("Error Message:", res.data.message);
        } else {
          console.log("Message:", res.data.message);
          console.log("ViewQuote:", res.data.data.text);
          setQuote(res.data.data.text);
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

  const AddQuotes = async () => {
    setLoading(true);
    await axios
      .post(
        `${baseURL}api/addquote/`,
        {
          text: quote,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        console.log("Res", res);
        console.log("Res.data", res.data);
        if (res.data.status !== "SUCCESS") {
          console.log("Error Message:", res.data.message);
          // HandleMessage(res.data.message, res.data.status);
        } else {
          console.log("Message:", res.data.message);
          console.log("Quote:", res.data.data.text);
          setQuote(res.data.data.text);
          Alert.alert("Quote Added Successfully");
          setEditOrAdd(false);
          ViewQuotes();
        }
      })
      .catch((err) => {
        console.log("ERROR Add", err);
        setLoading(false);
        Alert.alert("Quote ia already added,you can edit it!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const DelQuotes = async () => {
    setLoading(true);
    await axios
      .delete(`${baseURL}api/removequote/`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if (res.data.status !== "SUCCESS") {
          console.log("Error Message:", res.data.message);
          Alert.alert(res.data.message);
          
        } else {
          console.log("Message:", res.data.message);
          Alert.alert(res.data.message);
          setQuote("");
          ViewQuotes();
        }
      })
      .catch((err) => {
        console.log("ERROR Del", err); //it entered this part and deleted the quote
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const EditQuotes = async () => {
    setLoading(true);
    await axios
      .put(
        `${baseURL}api/editquote/`,
        {
          text: quote,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        console.log("Res", res);
        console.log("Res.data", res.data);
        if (res.data.status !== "SUCCESS") {
          console.log("Error Message:", res.data.message);
          // HandleMessage(res.data.message, res.data.status);
        } else {
          console.log("Message:", res.data.message);

          console.log("Quote:", res.data.data.text);
        }
        setQuote(res.data.data.text);
        Alert.alert("Quote Edited Successfully");
        setEditOrAdd(false);
        ViewQuotes();
      })
      .catch((err) => {
        console.log("ERROR Edit", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
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
        setBookCount(res.data.books_count);
        // setBookTitle(res.data.data.books.Title);
      })
      .catch((err) => {
        console.log("ERROR", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
   
    viewBookShelf();
  
  }, [userToken]);
  
  const renderBookShelf = ({ item }) => (
    <View style={styles.container}>
      
      <FavoritesFlexRow>
          <FavoritesImage source={{ uri: item.image }} />
          <FavoritesBox>
            <FavoriteGroupBoxTitle>{item.Title}</FavoriteGroupBoxTitle>
            <FavoriteGroupBoxAuthor>by {item.authors}</FavoriteGroupBoxAuthor>
        </FavoritesBox>
        <View styles={styles.button}>
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

        <ScrollView>
          <PageContent>
            {/* <NavBarContainer2>
              <SearchIcon onPress={navigateToDiscover}>
                <Ionicons name="search" size={30} color="black" />
              </SearchIcon>
            </NavBarContainer2> */}

            <BioSection>
              <LeftFlex>
                <ProfilePicture>
                <Ionicons name="camera" size={24} color="black" />
                  
                </ProfilePicture>
                <UserName>{userData.username}</UserName>
              </LeftFlex>
                 
              <RightFlex>
                <TopFlex>
                <Group>
                    <Number>{bookCount}</Number>

                    <GroupText>Books In Shelf</GroupText>
                  </Group>
                
                </TopFlex>
{/* 
                <BottomFlex>
                <FollowButton>
                  <FollowText>Reading History</FollowText>
            </FollowButton>
                
                </BottomFlex> */}
              </RightFlex>
            </BioSection>
            
            <TouchableOpacity onPress={()=> navigation.navigate('Favorites')}>
            <SubHeader>{userData.username}'s BookShelf</SubHeader>
              {/* <Line3 /> */}
              </TouchableOpacity>
              <FlatList
            data={books}
            renderItem={renderBookShelf}
              keyExtractor={(item, index) => index.toString()} //assuming each item has a unique id
              horizontal
            showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />

            <SubHeaderGroup>
              <SubHeader2>{userData.username}'s Quote</SubHeader2>

              {/* <Line4 /> */}
            </SubHeaderGroup>

            <FlewRow>
              <EditGroup
                onPress={() => {
                  setEditOrAdd(true);
                  AddQuotes();
                }}
              >
                <MaterialIcons name="add" size={24} color="black" />
              </EditGroup>
              <EditGroup
                onPress={() => {
                  setEditOrAdd(true);
                  EditQuotes();
                }}
                style={{ marginLeft: 50 }}
              >
                <MaterialIcons name="edit" size={24} color="black" />
              </EditGroup>
              <EditGroup
                onPress={() => {
                  DelQuotes();
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

            <QuoteBox
              placeholder="Add your quote here"
              value={quote}
              onChangeText={setQuote}
            />
          </PageContent>
        </ScrollView>

        
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
    width: 50,
    height: 70,
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
    flexDirection: "row",
    flex: 1,
    padding: 20,
    borderRadius: 10,
    // shadowColor: secondary,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 10, //to control the drop shadow of a component.
    backgroundColor: primary,
  },
  footer: {
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});