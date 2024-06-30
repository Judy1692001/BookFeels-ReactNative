import React, { useState, useEffect, useRef } from "react";
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
  Platform,
  Alert,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../config";

import axios from "axios";
const { secondary, text, primary, inText, heading } = Colors;
const ReviewRate = () => {
  const navigation = useNavigation();
  
  const AddReviewRate = () => {
    
  };
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Container>
          <ScrollView>
            <PageContent>
             
  
             
                
  
                 
           
  
             
  
  
             
  
          
  
           
  
             
              
               
  
                
            
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
};

export default ReviewRate;
