import React, { useContext, useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView, Switch, Pressable, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Container, PageContent, ProfileInfo, ProfilePicture2, UserName2, Preferences, BookManagement, Support, Flex1, Flex2, Theme, Theme2, RightArrow, LogOut, LogOutFlex, FooterContainer, IconButton, TextStyle2 } from '../Components/Styles';
import { Colors } from '../Components/Styles';
import { AntDesign,  Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from '../Components/CredentialsContext';
import axios from 'axios';
import { baseURL } from "../config";

const { inText } = Colors;

export default function More({ navigation }) {
  const { setStoredCredentials } = useContext(CredentialsContext);
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  /* useEffect(() => {
    // Fetch user data and token from AsyncStorage
    AsyncStorage.getItem("BookFeelsCredentials").then((res) => {
      const userdata = JSON.parse(res);
      setUserToken(userdata.token);
      setUserData(userdata.user);
    }).catch((err) => {
      console.error("Error fetching user data:", err);
    });
  }, []);

  const handlePress = () => {
    navigation.navigate('Profile', { username: userData.username });
  };

  const handleLogout = async () => {
    try {
      // Get the stored credentials
      const jsonValue = await AsyncStorage.getItem("BookFeelsCredentials");
      if (jsonValue !== null) {
        const userdata = JSON.parse(jsonValue);

        // Print the token for debugging
        console.log("Access Token:", userdata.token);
        console.log("Refresh Token:", userdata.refresh_token);

        // Make a request to the logout endpoint
        const response = await axios.post(`${baseURL}api/logout/`, {
          refresh: userdata.refresh_token, // Use the correct key based on your backend expectation
        }, {
          headers: {
            'Authorization': `Bearer ${userdata.token}`, // Send the access token in the headers
          }
        });

        // Check if the response status is success
        if (response.status === 205) {
          // Remove credentials from storage and update context
          await AsyncStorage.removeItem("BookFeelsCredentials");
          setStoredCredentials(null);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Get Started' }],
          });
        } else {
          console.error("Logout failed:", response.data);
          Alert.alert('Error', 'Failed to logout. Please try again.');
        }
      }
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  }; */

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("BookFeelsCredentials");
        if (jsonValue !== null) {
          const userdata = JSON.parse(jsonValue);
          setUserData(userdata.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const toggleSwitch = () => setIsEnabled(prevState => !prevState);

  const handlePress = () => {
    navigation.navigate('Profile', { username: userData.username });
  };

  const handleLogout = () => {
    AsyncStorage.removeItem("BookFeelsCredentials").then(() => {
      setStoredCredentials(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Get Started' }],
      });
    }).catch(error => console.error(error));
  }; 



/* not working
const handleLogout = async () => {
  try {
    // Get the stored credentials
    const jsonValue = await AsyncStorage.getItem("BookFeelsCredentials");
    if (jsonValue !== null) {
      const userdata = JSON.parse(jsonValue);

      // Make a request to the logout endpoint
      const response = await axios.post(`${baseURL}api/logout/`, {
        refresh: userdata.refresh_token, // Use the correct key based on your backend expectation
      }, {
        headers: {
          'Authorization': `Bearer ${userdata.token}`, // Send the access token in the headers
        }
      });

      // Check if the response status is success
      if (response.status === 205) {
        // Remove credentials from storage and update context
        await AsyncStorage.removeItem("BookFeelsCredentials");
        setStoredCredentials(null);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Get Started' }],
        });
      } else {
        console.error("Logout failed:", response.data);
      }
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
}; */

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Container>
        <StatusBar style='dark' />
        <ScrollView>
          <PageContent>
            <ProfileInfo>
              <ProfilePicture2>
                <AntDesign name="camera" size={20} color="black" />
              </ProfilePicture2>
              <Pressable onPress={handleLogout}>
                <UserName2>{userData.username}</UserName2>
              </Pressable>
            </ProfileInfo>
            {/* <Preferences>
              <Flex1>
                <Theme>Theme and Appearance</Theme>
                <Switch
                  trackColor={{ false: '#424866', true: '#D0BFDA' }}
                  thumbColor={isEnabled ? '#424866' : '#f4f3f4'}
                  ios_backgroundColor="#424866"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </Flex1>
            </Preferences> */}
            <BookManagement>
              {/* <Flex2 onPress={() => navigation.navigate('ActivityHistory')}>
                <Theme2>Emotional States History</Theme2>
                <RightArrow>
                  <AntDesign name="right" size={15} color="#424866" />
                </RightArrow>
              </Flex2> */}
              <Flex2 onPress={() => navigation.navigate('Favorites')}>
                <Theme2>My BookShelf</Theme2>
                <RightArrow>
                  <AntDesign name="right" size={15} color="#424866" />
                </RightArrow>
              </Flex2>
              <Flex2 onPress={() => navigation.navigate('ReadingHistory')}>
                <Theme2>Reading History</Theme2>
                <RightArrow>
                  <AntDesign name="right" size={15} color="#424866" />
                </RightArrow>
              </Flex2>
            </BookManagement>
            <Support>
              <Flex2 onPress={() => navigation.navigate('FAQ')}>
                <Theme2>FAQ</Theme2>
                <RightArrow>
                  <AntDesign name="right" size={15} color="#424866" />
                </RightArrow>
              </Flex2>
              <Flex2 onPress={() => navigation.navigate('About')}>
                <Theme2>About</Theme2>
                <RightArrow>
                  <AntDesign name="right" size={15} color="#424866" />
                </RightArrow>
              </Flex2>
              <Flex2 onPress={() => navigation.navigate('RateApp')}>
                <Theme2>Rate the App</Theme2>
                <RightArrow>
                  <AntDesign name="right" size={15} color="#424866" />
                </RightArrow>
              </Flex2>
            </Support>
            <LogOut>
              <LogOutFlex onPress={handleLogout}>
                <AntDesign name="logout" size={24} color="black" />
                <Theme2>Log Out</Theme2>
              </LogOutFlex>
            </LogOut>
          </PageContent>
        </ScrollView>
        
      

      </Container>
    </KeyboardAvoidingView>
  );
}
