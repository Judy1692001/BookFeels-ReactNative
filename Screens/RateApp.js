import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { Container, PageContent, FooterContainer, IconButton, TextStyle2, RateHeader, RateParagraph, StarContainer, RateSubmitButton, SubmitText, RejectionText, AboutImage, RejectionTextContainer, FeedbackTextContainer, FeedbackText } from '../Components/Styles';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../config';

export default function RateApp({ navigation }) {
    const [rating, setRating] = useState(0);
    const [userToken, setUserToken] = useState("");
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch user data and token from AsyncStorage
        AsyncStorage.getItem("BookFeelsCredentials").then((res) => {
            const userdata = JSON.parse(res);
            setUserToken(userdata.access);
            setUserData(userdata.user);
        }).catch((err) => {
            console.error("Error fetching user data:", err);
        });
    }, []);

    const handleStarPress = (rate) => {
        setRating(rate);
    };

    const handleSubmit = async () => {
    if (!userToken) {
        Alert.alert('Error', 'You must be logged in to rate the app.');
        return;
    }

    setLoading(true);
    try {
        const response = await axios.post(`${baseURL}/api/rateapp/`, {
            rating: rating,
        }, {
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json", // Ensure correct content type
            },
        });
        console.log("Response:", response); // Log response for debugging
        if (response.data.status === "SUCCESS") {
            Alert.alert('Success', 'Thank you for your rating!');
            // Optionally, update user profile with the new rating
        } else {
            Alert.alert('Error', 'Failed to submit rating. Please try again later.');
        }
    } catch (error) {
        Alert.alert('Sorry', 'You have already rated.');
    } finally {
        setLoading(false);
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
                        <RejectionTextContainer onPress={() => navigation.navigate('Homepage')}>
                            <RejectionText> No Thanks </RejectionText>
                            <FeedbackTextContainer>

                                <FeedbackText onPress={() => navigation.navigate('Feedback')}> Give Feedback? </FeedbackText>

                            </FeedbackTextContainer>
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
