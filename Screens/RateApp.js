/* import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Container, NavBarContainer, PageContent, FooterContainer, IconButton, TextStyle2, TextStyle, FlewRow, HistoryFlex, HistoryFlexRow, HistoryText, HistoryFlex2, HistoryFlex1, StarFlex, AboutImage, AboutSubHeader, AboutParagraph, FAQLine, RateHeader, RateParagraph, StarContainer, RateSubmitButton, SubmitText, RejectionText } from '../Components/Styles';
import { Colors} from '../Components/Styles';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default function ActivityHistory({navigation}){

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <Container>

                <StatusBar style='dark'/>

                <ScrollView>

                    <PageContent>

                        <AboutImage source={require('../assets/pngtree-cartoon-hands-refer-friends-with-contacts-list-digital-finance-promote-vector-png-image_50878426-removebg-preview.png')}/>

                        <RateHeader> Your opinion matters to us! </RateHeader>

                        <RateParagraph>

                            We work so hard to make BookFeels better for you,
                            and would love to know how you would rate our App!

                        </RateParagraph>

                        <StarContainer>

                            <Icon name="star" size={30} color="#FFD700" />

                            <Icon name="star" size={30} color="#FFD700" />

                            <Icon name="star" size={30} color="#FFD700" />

                            <Icon name="star" size={30} color="#FFD700" />

                            <Icon name="star" size={30} color="#FFD700" />

                        </StarContainer>

                        <RateSubmitButton>

                            <SubmitText> Submit </SubmitText>

                        </RateSubmitButton>

                        <RejectionText> No Thanks </RejectionText>
                
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
} */

import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Container, PageContent, FooterContainer, IconButton, TextStyle2, RateHeader, RateParagraph, StarContainer, RateSubmitButton, SubmitText, RejectionText, AboutImage, RejectionTextContainer } from '../Components/Styles';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RateApp({ navigation }) {
    const [rating, setRating] = useState(0);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userToken');
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.error('Failed to fetch token', error);
            }
        };

        fetchToken();
    }, []);

    const handleStarPress = (rate) => {
        setRating(rate);
    };

    const handleSubmit = async () => {
        if (!token) {
            Alert.alert('Error', 'You must be logged in to rate the app.');
            return;
        }

        try {
            const response = await axios.post(`${baseURL}api/rate/`, {
                rating: rating,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Alert.alert('Success', 'Thank you for your rating!');
        } catch (error) {
            Alert.alert('Error', 'An error occurred while submitting your rating.');
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Container>
                <StatusBar style='dark' />
                <ScrollView>
                    <PageContent>
                        <AboutImage source={require('../assets/pngtree-cartoon-hands-refer-friends-with-contacts-list-digital-finance-promote-vector-png-image_50878426-removebg-preview.png')}/>
                        <RateHeader> Your opinion matters to us! </RateHeader>
                        <RateParagraph>
                            We work so hard to make BookFeels better for you,
                            and would love to know how you would rate our App!
                        </RateParagraph>
                        <StarContainer>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                                    <Icon name="star" size={30} color={star <= rating ? "#FFD700" : "#ccc"} />
                                </TouchableOpacity>
                            ))}
                        </StarContainer>
                        <RateSubmitButton onPress={handleSubmit}>
                            <SubmitText> Submit </SubmitText>
                        </RateSubmitButton>
                        <RejectionTextContainer>
                            <RejectionText> No Thanks </RejectionText>
                        </RejectionTextContainer>
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

