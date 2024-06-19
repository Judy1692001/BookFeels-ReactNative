import * as React from 'react';
import {Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
    Container, PageContent, NavBarContainer2,
    FooterContainer, IconButton, TextStyle2,
    SearchIcon, SettingsIcon, BioSection,
    ProfilePicture, UserName,
    BioText, LeftFlex, FollowButton,
    FollowText, TopFlex, BottomFlex, Group,
    Number, GroupText, RightFlex, SubHeader,
    Line3, FavouritesFlex, FavoriteGroup,
    FavoriteGroupBox, FavoriteGroupBoxName,
    SubHeader2, Line4, QuoteBox, SubHeaderGroup,
    EditGroup, FlewRow
} from '../Components/Styles';


export default function Profile({navigation}){
    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <Container>

                <StatusBar style='dark'/>

                <ScrollView>

                    <PageContent>

                        <NavBarContainer2>

                            <SearchIcon>

                                <Ionicons name="search" size={30} color="black" />

                            </SearchIcon>

                            <SettingsIcon>

                                <Ionicons name="settings" size={30} color="black" />

                            </SettingsIcon>

                        </NavBarContainer2>

                        <BioSection>

                            <LeftFlex>

                                <ProfilePicture>
                                    
                                    <Ionicons name="camera" size={24} color="black" />

                                </ProfilePicture>

                                <FollowButton>
                                    
                                    <FollowText>Follow</FollowText>

                                </FollowButton>

                            </LeftFlex>

                            <RightFlex>

                                <TopFlex>

                                    <UserName>Judy Soliman</UserName>

                                    <BioText>Bio</BioText>

                                </TopFlex>

                                <BottomFlex>
                                    
                                    <Group>
                                        
                                        <Number>104</Number>

                                        <GroupText>Books</GroupText>

                                    </Group>

                                    <Group>

                                        <Number>55</Number>

                                        <GroupText>Reviews</GroupText>

                                    </Group>

                                    <Group>

                                        <Number>744</Number>

                                        <GroupText>Followers</GroupText>

                                    </Group>

                                </BottomFlex>

                            </RightFlex>

                        </BioSection>

                        <SubHeader>Judy's Favourites</SubHeader>

                        <Line3 />

                        <FavouritesFlex>

                            <FavoriteGroup>

                                <FavoriteGroupBox>

                                    <Ionicons name="camera" size={24} color="black" />
                                    
                                </FavoriteGroupBox>

                                <FavoriteGroupBoxName>BookName1</FavoriteGroupBoxName>

                            </FavoriteGroup>

                            <FavoriteGroup>

                                <FavoriteGroupBox>

                                    <Ionicons name="camera" size={24} color="black" />

                                </FavoriteGroupBox>

                                <FavoriteGroupBoxName>BookName2</FavoriteGroupBoxName>

                            </FavoriteGroup>

                            <FavoriteGroup>

                                <FavoriteGroupBox>

                                    <Ionicons name="camera" size={24} color="black" />
                                    
                                </FavoriteGroupBox>

                                <FavoriteGroupBoxName>BookName3</FavoriteGroupBoxName>

                            </FavoriteGroup>

                        </FavouritesFlex>

                        <FlewRow>

                            <SubHeaderGroup>
                                
                                <SubHeader2>Judy's Quotes</SubHeader2>

                                <Line4 />

                            </SubHeaderGroup>

                            <EditGroup>
                                
                                <Text style={{paddingLeft: 20, fontSize: 12}}>edit quote</Text>

                                <MaterialIcons name="edit" size={12} color="black" />

                            </EditGroup>

                        </FlewRow>

                        <QuoteBox>

                            <MaterialIcons name="add" size={24} color="black"/>

                            <Text>Add your quote here</Text>

                        </QuoteBox>
                    
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