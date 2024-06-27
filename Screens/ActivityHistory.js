import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Container, NavBarContainer, PageContent, FooterContainer, IconButton, TextStyle2, TextStyle, FlewRow, HistoryFlex, HistoryFlexRow, HistoryText, HistoryFlex2, HistoryFlex1, StarFlex } from '../Components/Styles';
import { Colors} from '../Components/Styles';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function ActivityHistory({navigation}){

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <Container>

                <StatusBar style='dark'/>

                <ScrollView>

                    <PageContent>

                        <HistoryFlex1>

                            <HistoryFlexRow>

                                <HistoryText> Date </HistoryText>

                                <HistoryText> Sun 02 Jun </HistoryText>

                            </HistoryFlexRow>

                            <HistoryFlexRow>

                                <HistoryText> Emotional State </HistoryText>

                                <HistoryText> Romance </HistoryText>
                                
                            </HistoryFlexRow>

                            <HistoryFlexRow>

                                <HistoryText> Feedback </HistoryText>

                                <StarFlex>

                                    <Icon name="star" size={20} color="#424866" />

                                    <Icon name="star" size={20} color="#424866" />

                                    <Icon name="star" size={20} color="#424866" />

                                    <Icon name="star" size={20} color="#424866" />

                                </StarFlex>
                                
                            </HistoryFlexRow>

                        </HistoryFlex1>

                        <HistoryFlex2>

                            <HistoryFlexRow>

                                <HistoryText> Date </HistoryText>

                                <HistoryText> Thu 16 May </HistoryText>

                            </HistoryFlexRow>

                            <HistoryFlexRow>

                                <HistoryText> Emotional State </HistoryText>

                                <HistoryText> Joy </HistoryText>
                                
                            </HistoryFlexRow>

                            <HistoryFlexRow>

                                <HistoryText> Feedback </HistoryText>

                                <StarFlex>

                                    <Icon name="star" size={20} color="#424866" />

                                    <Icon name="star" size={20} color="#424866" />

                                    <Icon name="star" size={20} color="#424866" />

                                    <Icon name="star" size={20} color="#424866" />
                                </StarFlex>
                                
                            </HistoryFlexRow>

                        </HistoryFlex2>

                        <HistoryFlex2>

                            <HistoryFlexRow>

                                <HistoryText> Date </HistoryText>

                                <HistoryText> Sat 11 May </HistoryText>

                            </HistoryFlexRow>

                            <HistoryFlexRow>

                                <HistoryText> Emotional State </HistoryText>

                                <HistoryText> Horror </HistoryText>
                                
                            </HistoryFlexRow>

                            <HistoryFlexRow>

                                <HistoryText> Feedback </HistoryText>

                                <StarFlex>

                                    <Icon name="star" size={20} color="#424866" />

                                    <Icon name="star" size={20} color="#424866" />

                                    <Icon name="star" size={20} color="#424866" />

                                    <Icon name="star" size={20} color="#424866" />

                                </StarFlex>
                                
                            </HistoryFlexRow>

                        </HistoryFlex2>
                
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