 import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Container, NavBarContainer, PageContent, FooterContainer, IconButton, TextStyle2, TextStyle, FlewRow, HistoryFlex, HistoryFlexRow, HistoryText, HistoryFlex2, HistoryFlex1, StarFlex, AboutImage, AboutSubHeader, AboutParagraph, FAQLine } from '../Components/Styles';
import { Colors} from '../Components/Styles';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function About({navigation}){

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <Container>

                <StatusBar style='dark'/>

                <ScrollView>

                    <PageContent>

                        <AboutImage source={require('../assets/aboutbooks.jpeg')}/>

                        <AboutSubHeader>

                            About us

                        </AboutSubHeader>

                        <AboutParagraph>

                            We believe in the transformative power of books.
                            Our mission is to connect you with stories that resonate
                            with your feelings and needs, providing a personalized reading
                            experience that can uplift, comfort, or inspire you.

                        </AboutParagraph>

                        <FAQLine/>

                        <AboutSubHeader>

                            What We Do

                        </AboutSubHeader>

                        <AboutParagraph>

                            Our app tailors book recommendations based on your current emotional state.
                            By analyzing your mood, we suggest books that perfectly match your feelings.
                            Whether you’re looking for a pick-me-up, a comforting read, or an inspiring tale,
                            we’ve got you covered.

                        </AboutParagraph>

                        <FAQLine/>

                        <AboutSubHeader>

                            How It Works

                        </AboutSubHeader>

                        <AboutParagraph>

                            1. Log Your Mood: Simply enter how you want to feel.

                        </AboutParagraph>

                        <AboutParagraph>

                            2. Get Personalized Recommendations:
                            Receive book suggestions curated to match your emotions.

                        </AboutParagraph>

                        <AboutParagraph>

                            3. Read and Enjoy: Dive into a book that resonates with your current state of mind.
                
                        </AboutParagraph>

                        <AboutParagraph>

                            4. Provide Feedback: Help us refine our recommendations by sharing your thoughts on the books you read.
                            
                        </AboutParagraph>

                        <FAQLine/>

                        <AboutSubHeader>

                            Our Vision

                        </AboutSubHeader>

                        <AboutParagraph>

                            We aim to create a community where books and emotions are seamlessly connected,
                            enhancing your reading experience and well-being.

                        </AboutParagraph>

                        <FAQLine/>

                        <AboutSubHeader>

                            Meet the Team

                        </AboutSubHeader>

                        <AboutParagraph>

                            We are a passionate group of book lovers, tech enthusiasts,
                            and mental health advocates dedicated to bringing you the best personalized
                            reading experience. Our team works tirelessly to ensure that every book
                            recommendation you receive is thoughtfully chosen to match your emotional needs.

                        </AboutParagraph>

                        <FAQLine/>

                        <AboutSubHeader>

                            Join Us

                        </AboutSubHeader>

                        <AboutParagraph>

                            Embark on a reading journey tailored just for you.
                            Log your mood and let BookFeels guide you to your next great read.

                        </AboutParagraph>

                        <AboutParagraph>

                            Thank you for being a part of our community.

                        </AboutParagraph>

                        <AboutParagraph>

                            Happy reading!

                        </AboutParagraph>
                
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