import React, { useContext, useEffect, useState } from "react";
import { Text, KeyboardAvoidingView, Platform, ScrollView,StyleSheet ,Alert} from "react-native";
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
  Colors
} from "../Components/Styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Components/CredentialsContext";
import { baseURL } from "../config";
import axios from "axios";
const { secondary, text, primary, inText, heading } = Colors;
export default function Profile({ navigation }) {
  const [quote, setQuote] = useState('');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [editOrAdd, setEditOrAdd] = useState(false);
  const [userToken, setUserToken] = useState("");
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
      .get(`${baseURL}api/viewquote/`, { headers: {"Authorization" : `Bearer ${userToken}`} })
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
          
        }).catch((err) => {
        console.log("ERROR View", err);
        setLoading(false);
      }).finally(() => {
        setLoading(false);
      })
  };


  const AddQuotes = async() => {
    setLoading(true);
    await axios
      .post(`${baseURL}api/addquote/`, {
        "text": quote,
      },
      {headers : {"Authorization" : `Bearer ${userToken}`}})
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

      }).catch((err) => {
        console.log("ERROR Add", err);
        setLoading(false);
        Alert.alert("Quote ia already added,you can edit it!");
      }).finally(() => {
        setLoading(false);
      })
  }

  const DelQuotes = async () => {
    setLoading(true);
    await axios
      .delete(`${baseURL}api/removequote/`, { headers: { "Authorization": `Bearer ${userToken}` } })
    try{
    if (status !== "SUCCESS") {
      console.log("Error Message:", message);
    } else {
      console.log("Message:", message);
      Alert.alert("Quote Deleted Successfully")
      setQuote('');
      ViewQuotes();
    }
  }catch(err) {
        console.log("ERROR Del", err); //it entered this part and deleted the quote 
        setLoading(false);
      }
  }
  
  const EditQuotes = async() => {
    setLoading(true);
    await axios
      .put(`${baseURL}api/editquote/`, {
        "text": quote,
      },{headers:{"Authorization" : `Bearer ${userToken}`}})
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

      }).catch((err) => {
        console.log("ERROR Edit", err);
        setLoading(false);
      }).finally(() => {
        setLoading(false);
      })
  }
  const renderItems = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.Title}</Text>
      </View>
      {/* <View styles={styles.button}>
        <Button
          title="Book Details"
          color="#A67FBF" //secondary
          onPress={() => handlePress(item)}
        />
      </View> */}
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

                <FollowButton>
                  <FollowText>Follow</FollowText>
                </FollowButton>

              </LeftFlex>

              <RightFlex>
                <TopFlex>
                  <UserName>{userData.username}</UserName>

                  <BioText>Bio</BioText>
                </TopFlex>

                <BottomFlex>
                  <Group>
                    <Number>104</Number>

                    <GroupText>Books</GroupText>
                  </Group>

                  <Group>
                    <Number>55</Number>

                    <GroupText>Reviews</GroupText>
                  </Group>

                  <Group>
                    <Number>744</Number>

                    <GroupText>Followers</GroupText>
                  </Group>
                </BottomFlex>
              </RightFlex>
            </BioSection>

            <SubHeader>{userData.username}'s Favourites</SubHeader>

            <Line3 />

            {/* <FavouritesFlex>
              <FavoriteGroup>
                <FavoriteGroupBox>
                  <Ionicons name="camera" size={24} color="black" />
                </FavoriteGroupBox>

                <FavoriteGroupBoxName>BookName1</FavoriteGroupBoxName>
              </FavoriteGroup>

              <FavoriteGroup>
                <FavoriteGroupBox>
                  <Ionicons name="camera" size={24} color="black" />
                </FavoriteGroupBox>

                <FavoriteGroupBoxName>BookName2</FavoriteGroupBoxName>
              </FavoriteGroup>

              <FavoriteGroup>
                <FavoriteGroupBox>
                  <Ionicons name="camera" size={24} color="black" />
                </FavoriteGroupBox>

                <FavoriteGroupBoxName>BookName3</FavoriteGroupBoxName>
              </FavoriteGroup>
            </FavouritesFlex> */}

           
              <SubHeaderGroup>
                <SubHeader2>{userData.username}'s Quote</SubHeader2>

                <Line4 />

              </SubHeaderGroup>

               <FlewRow>
              <EditGroup onPress={() => { setEditOrAdd(true); AddQuotes()}}>
                <MaterialIcons name="add" size={24} color="black" />
              </EditGroup>
              <EditGroup onPress={() => { setEditOrAdd(true); EditQuotes()}} style={{ marginLeft: 50 }}>
                <MaterialIcons name="edit" size={24} color="black" />
              </EditGroup>
              <EditGroup onPress={() => { DelQuotes() }}>
                <MaterialIcons name="delete" size={24} color="black" style={{ marginLeft: 60 }}/>
              </EditGroup>
            </FlewRow>

            <QuoteBox placeholder="Add your quote here"
              value={quote}
              onChangeText={setQuote}
               />
             

              
          
          </PageContent>
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