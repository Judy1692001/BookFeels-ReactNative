import * as React from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView, Switch } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {
    Container, NavBarContainer, PageContent, ProfileIcon, NotificationIcon, HeadingStyle, EmotionContainer,
    EmotionText, EmotionName, StyleOr, Line2, InsightInput, FooterContainer, IconButton, RowContainer, Emotion,
    CorrectIcon, TextStyle2, ProfileInfo, ProfilePicture2, UserName2, Preferences, BookManagement, Support, Flex1, Flex2, Theme, Theme2, Tutorials, RightArrow, ReadingHistoryContainer, ReadingHistoryFlex, BookDetails, FavoriteGroupBox, FavoriteGroupBoxName, StarFlex, HistoryText, BookDetailsText, StarFlex2 } from '../Components/Styles';
import { Colors} from '../Components/Styles';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

const {inText} = Colors;

export default function ReadingHistory({navigation}){

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => {
        setSearchQuery(query);
    };

    const [isEnabled, setIsEnabled] = React.useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <Container>

                <StatusBar style='dark'/>

                <ScrollView>

                    <PageContent>

                        <ReadingHistoryContainer>

                            <ReadingHistoryFlex>

                                <FavoriteGroupBox>

                                    <Ionicons name="camera" size={24} color="black" />
                                    
                                </FavoriteGroupBox>

                                <BookDetails>

                                    <BookDetailsText> BookName </BookDetailsText>

                                    <BookDetailsText> Genre </BookDetailsText>

                                    <StarFlex2>

                                        <Icon name="star" size={20} color="#424866" />

                                        <Icon name="star" size={20} color="#424866" />

                                        <Icon name="star" size={20} color="#424866" />

                                        <Icon name="star" size={20} color="#424866" />

                                    </StarFlex2>

                                </BookDetails>

                            </ReadingHistoryFlex>

                            <ReadingHistoryFlex>

                                <FavoriteGroupBox>

                                    <Ionicons name="camera" size={24} color="black" />
                                    
                                </FavoriteGroupBox>

                                <BookDetails>

                                    <BookDetailsText> BookName </BookDetailsText>

                                    <BookDetailsText> Genre </BookDetailsText>

                                    <StarFlex2>

                                        <Icon name="star" size={20} color="#424866" />

                                        <Icon name="star" size={20} color="#424866" />

                                        <Icon name="star" size={20} color="#424866" />

                                        <Icon name="star" size={20} color="#424866" />

                                    </StarFlex2>

                                </BookDetails>

                            </ReadingHistoryFlex>

                            <ReadingHistoryFlex>

                                <FavoriteGroupBox>

                                    <Ionicons name="camera" size={24} color="black" />
                                    
                                </FavoriteGroupBox>

                                <BookDetails>

                                    <BookDetailsText> BookName </BookDetailsText>

                                    <BookDetailsText> Genre </BookDetailsText>

                                    <StarFlex2>

                                        <Icon name="star" size={20} color="#424866" />

                                        <Icon name="star" size={20} color="#424866" />

                                        <Icon name="star" size={20} color="#424866" />

                                        <Icon name="star" size={20} color="#424866" />

                                    </StarFlex2>

                                </BookDetails>

                            </ReadingHistoryFlex>

                        </ReadingHistoryContainer>
                    
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