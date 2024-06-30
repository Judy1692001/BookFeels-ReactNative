import React, { useContext, useEffect, useState } from "react";
import {View, KeyboardAvoidingView, Platform, ScrollView, Switch, Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {
    Container, NavBarContainer, PageContent, ProfileIcon, NotificationIcon, HeadingStyle, EmotionContainer,
    EmotionText, EmotionName, StyleOr, Line2, InsightInput, FooterContainer, IconButton, RowContainer, Emotion,
    CorrectIcon, TextStyle2, ProfileInfo, ProfilePicture2, UserName2, Preferences, BookManagement, Support, Flex1, Flex2, Theme, Theme2, Tutorials, RightArrow } from '../Components/Styles';
import { Colors} from '../Components/Styles';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
const {inText} = Colors;

export default function More({navigation}){
  
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState({});
    const [isEnabled, setIsEnabled] = useState(false);

    const onChangeSearch = query => {
        setSearchQuery(query);
    };
    const handleFocus = () => {
        navigation.navigate("Discover");
      };
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        const user = AsyncStorage.getItem("BookFeelsCredentials").then((res) => {
          console.log("res", res);
          const userdata = JSON.parse(res);
  
          console.log("USERDATA", userdata);
          setUserData(userdata);
          
       // const username = userData.username;
      }); // Get the user data from AsyncStorage
    }, []);

    //to navigate to profilepage when the name is pressed
    const handlePress = () => {
        navigation.navigate('Profile', { username: userData.username });
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <Container>

                <StatusBar style='dark'/>

                <ScrollView>

                    <PageContent>

                    <NavBarContainer>

                        <Searchbar
                            placeholder="Search"
                            placeholderTextColor="gray"
                                onChangeText={onChangeSearch}
                                onFocus={handleFocus}
                            value={searchQuery}
                            style={{ flex: 1, margin: 20, backgroundColor: inText}} 
                        />

                    </NavBarContainer>

                    <ProfileInfo>
                        
                        <ProfilePicture2>
                                    
                            <Ionicons name="camera" size={20} color="black" />

                        </ProfilePicture2>
                           <Pressable onPress={handlePress}>
                                <UserName2>{userData.username}</UserName2>
                            </Pressable>

                    </ProfileInfo>

                    <Preferences>

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

                    </Preferences>

                    <BookManagement>
                        
                        <Flex2 onPress={() => navigation.navigate('ActivityHistory')}>

                            <Theme2>Emotional States History</Theme2>

                            <RightArrow>

                                <AntDesign name="right" size={15} color="#424866" />

                            </RightArrow>

                        </Flex2>

                        <Flex2 onPress={() => navigation.navigate('Favorites')}>

                            <Theme2>Favorite Books</Theme2>

                            <RightArrow>

                                <AntDesign name="right" size={15} color="#424866" />

                            </RightArrow>

                        </Flex2>

                    </BookManagement>

                    <Tutorials>

                        <Flex2 onPress={() => navigation.navigate('Homepage')}>

                            <Theme2>User Guides / Tutorials</Theme2>

                            <RightArrow>

                                <AntDesign name="right" size={15} color="#424866" />

                            </RightArrow>

                        </Flex2>

                    </Tutorials>

                    <Support>

                        <Flex2 onPress={() => navigation.navigate('Homepage')}>

                            <Theme2>FAQ</Theme2>

                            <RightArrow>

                                <AntDesign name="right" size={15} color="#424866" />

                            </RightArrow>

                        </Flex2>

                        <Flex2 onPress={() => navigation.navigate('Homepage')}>

                            <Theme2>About</Theme2>

                            <RightArrow>

                                <AntDesign name="right" size={15} color="#424866" />

                            </RightArrow>

                        </Flex2>

                        <Flex2 onPress={() => navigation.navigate('Homepage')}>

                            <Theme2>Rate the App</Theme2>

                            <RightArrow>

                                <AntDesign name="right" size={15} color="#424866" />

                            </RightArrow>

                        </Flex2>

                    </Support>
                    
                    </PageContent>

                </ScrollView>

                    <FooterContainer>
                        
                        <IconButton onPress={() => navigation.navigate('Homepage')}>
                            
                            <Feather name="home" size={24} color="black" />

                            <TextStyle2>Home</TextStyle2>
                        
                        </IconButton>

                        <IconButton onPress={() => navigation.navigate('Discover')}>
                            
                            <Feather name="compass" size={24} color="black" />

                            <TextStyle2>Discover</TextStyle2>
                        
                        </IconButton>

                        <IconButton onPress={() => navigation.navigate('More')}>
                            
                            <Feather name="menu" size={24} color="black" />

                            <TextStyle2>More</TextStyle2>
                        
                        </IconButton>
                    
                    </FooterContainer>

            </Container>

        </KeyboardAvoidingView>
    );
}