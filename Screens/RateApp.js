import React from 'react';
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
}