import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Container, PageContent, FooterContainer, IconButton, TextStyle2, FavoritesFlex, FavoritesFlexRow, FavoriteGroup, FavoriteGroupBoxName, FavoriteGroupBox, FavoritesBox, FollowText, Heart } from '../Components/Styles';
import { Colors} from '../Components/Styles';
import { Feather, Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


//colors

const {} = Colors;

export default function Favorites({navigation}){

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <Container>

                <StatusBar style='dark'/>

                <ScrollView>

                    <PageContent>

                        <FavoritesFlex>

                            <FavoritesFlexRow>

                                <FavoriteGroup>

                                    <FavoritesBox>

                                        <Ionicons name="camera" size={24} color="black" />

                                    </FavoritesBox>

                                    <FavoriteGroupBoxName> BookName1 </FavoriteGroupBoxName>

                                </FavoriteGroup>

                                <FavoriteGroup>

                                    <FavoritesBox>

                                        <Ionicons name="camera" size={24} color="black" />

                                    </FavoritesBox>

                                    <FavoriteGroupBoxName> BookName2 </FavoriteGroupBoxName>

                                </FavoriteGroup>

                            </FavoritesFlexRow>

                            <FavoritesFlexRow>

                                <FavoriteGroup>

                                    <FavoritesBox>

                                        <Ionicons name="camera" size={24} color="black" />

                                    </FavoritesBox>


                                    <FavoriteGroupBoxName> BookName3 </FavoriteGroupBoxName>

                                </FavoriteGroup>

                                <FavoriteGroup>

                                    <FavoritesBox>

                                        <Ionicons name="camera" size={24} color="black" />

                                    </FavoritesBox>


                                    <FavoriteGroupBoxName> BookName4 </FavoriteGroupBoxName>

                                </FavoriteGroup>

                            </FavoritesFlexRow>

                        </FavoritesFlex>

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