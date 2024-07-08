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
    
    useEffect(() => {
        ViewAppRates();
    }, [userToken]);
    const ViewAppRates = async () => {
        setLoading(true);
        console.log("userToken", userToken);
        await axios
            .get(`${baseURL}api/viewrateapp/`, {
                headers: { Authorization: `Bearer ${userToken}` },
            })
            .then((res) => {
                console.log("Res", res);
                console.log("Res.data", res.data);
                if (res.data.status !== "SUCCESS") {
                    console.log("Error Message:", res.data.message);
                } else {
                    console.log("Message:", res.data.message);
                    console.log("ViewRates:", res.data.data);
                    setRating(res.data.data.rating);
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

    const RateApp = async () => {
        setLoading(true);
    await axios
      .post(
        `${baseURL}api/rateapp/`,
        {
          rating: rating,
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
          
          setRating(res.data.data.rating);
          Alert.alert("Rating Added Successfully");
         
          ViewAppRates();
        }
      })
      .catch((err) => {
        console.log("ERROR Add", err);
        setLoading(false);
        Alert.alert("Rate ia already added!");
      })
      .finally(() => {
        setLoading(false);
      });
    };
//     const handleSubmit = async () => {
//     if (!userToken) {
//         Alert.alert('Error', 'You must be logged in to rate the app.');
//         return;
//     }

//     setLoading(true);
//     try {
//         const response = await axios.post(`${baseURL}/api/rateapp/`, {
//             rating: rating,
//         }, {
//             headers: {
//                 "Authorization": `Bearer ${userToken}`,
//                 "Content-Type": "application/json", // Ensure correct content type
//             },
//         });
//         console.log("Response:", response); // Log response for debugging
//         if (response.data.status === "SUCCESS") {
//             Alert.alert('Success', 'Thank you for your rating!');
//             ViewAppRates();
//             // Optionally, update user profile with the new rating
//         } else {
//             Alert.alert('Error', 'Failed to submit rating. Please try again later.');
//         }
//     } catch (error) {
//         Alert.alert('Sorry', 'You have already rated.');
//     } finally {
//         setLoading(false);
//     }
// };


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
                        <RateSubmitButton onPress={RateApp}>
                            <SubmitText> Submit </SubmitText>
                        </RateSubmitButton>
                        <RejectionTextContainer onPress={() => navigation.navigate('HomePage')}>
                            <RejectionText> No Thanks </RejectionText>
                            <FeedbackTextContainer>

                                <FeedbackText onPress={() => navigation.navigate('Feedback')}> Give Feedback? </FeedbackText>

                            </FeedbackTextContainer>
                        </RejectionTextContainer>
                    </PageContent>
                </ScrollView>
                
    

            </Container>
        </KeyboardAvoidingView>
    );
}
