import React, { useState } from 'react';
import { Platform, View, Text, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, PageContent, FooterContainer, IconButton, TextStyle2, FeedbackTitle, FeedbackImage } from '../Components/Styles';
import { Colors } from '../Components/Styles';
import { Feather } from '@expo/vector-icons';

const { primary, inText, faqPar, secondary } = Colors;

const FeedbackInput = styled.TextInput`
  border-width: 1px;
  border-color: ${faqPar};
  padding: 10px;
  margin-left: 30px;
  margin-bottom: 20px;
  width: 80%;
  height: 30%;
  border-radius: 8px;
  font-size: 16px;
  color: ${faqPar};
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${secondary};
  padding: 15px;
  border-radius: 25px;
  align-items: center;
  border: 1px solid black;
  margin-left: 140px;
  width: 30%;
`;

const SubmitButtonText = styled.Text`
  color: black;
  font-size: 16px;
`;

export default function Feedback({ navigation }) {
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (feedback.trim() === '') {
            Alert.alert('Error', 'Please enter your feedback.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${baseURL}feedback/`, { feedback });
            Alert.alert('Success', 'Thank you for your feedback!');
            setFeedback('');
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={true}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Container>
                <StatusBar style='dark' />
                <PageContent>
                    <FeedbackImage source={require('../assets/feedback.png')} />
                    <FeedbackTitle> Do you have any thoughts to share? </FeedbackTitle>
                    <FeedbackInput
                        placeholder="Enter your feedback here..."
                        placeholderTextColor="gray"
                        value={feedback}
                        onChangeText={setFeedback}
                        multiline
                    />
                    <SubmitButton onPress={handleSubmit} disabled={loading}>
                        <SubmitButtonText>{loading ? 'Submitting...' : 'Submit'}</SubmitButtonText>
                    </SubmitButton>
                </PageContent>
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
        </KeyboardAwareScrollView>
    );
}
