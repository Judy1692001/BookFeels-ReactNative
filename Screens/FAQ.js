/* import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Container, PageContent, FooterContainer, IconButton, TextStyle2, FavoritesFlex, FavoritesFlexRow, FavoriteGroup, FavoriteGroupBoxName, FavoriteGroupBox, FavoritesBox, FollowText, Heart, FAQHeader, FAQParagraph, Line2, Line, Line3, Line4, FAQLine, FAQFlex, FAQFlexText, FAQLine2, FAQQuestion, FAQButton, FAQSubmitText } from '../Components/Styles';
import { Colors} from '../Components/Styles';
import { Feather, Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';


//colors

const {} = Colors;

export default function FAQ({navigation}){

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <Container>

                <StatusBar style='dark'/>

                <ScrollView>

                    <PageContent>

                        <FAQHeader>

                            We’re here to help you with anything and everything on BookFeels

                        </FAQHeader>

                        <FAQParagraph>

                            BookFeels recommends books tailored to your emotional needs.
                            We have got you covered share your concern or check our frequently
                            asked questions listed below.

                        </FAQParagraph>

                        <FAQLine/>

                        <FAQFlex>

                            <FAQFlexText>

                                FAQ1

                            </FAQFlexText>

                            <Icon name="add" size={25} color="#4B3B3B" />

                        </FAQFlex>

                        <FAQParagraph>

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                        </FAQParagraph>

                        <FAQLine2/>

                        <FAQFlex>

                            <FAQFlexText>

                                FAQ2

                            </FAQFlexText>

                            <Icon name="add" size={25} color="#4B3B3B" />

                        </FAQFlex>

                        <FAQLine2/>

                        <FAQQuestion>

                            Still stuck? Help us a mail away

                        </FAQQuestion>

                        <FAQButton>

                            <FAQSubmitText>

                                Send a message

                            </FAQSubmitText>

                        </FAQButton>

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

import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Container, PageContent, FooterContainer, IconButton, TextStyle2, FAQHeader, FAQParagraph, FAQLine, FAQFlex, FAQFlexText, FAQLine2, FAQQuestion, FAQButton, FAQSubmitText } from '../Components/Styles';
import { Colors } from '../Components/Styles';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';


const { primary } = Colors;

const ExpandableFAQ = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const toggleExpand = () => {
        const initialValue = expanded ? 1 : 0;
        const finalValue = expanded ? 0 : 1;

        setExpanded(!expanded);

        Animated.timing(animation, {
            toValue: finalValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 150],
    });

    return (
        <View>
            <TouchableOpacity onPress={toggleExpand} style={styles.faqFlex}>
                <Text style={styles.faqFlexText}>{title}</Text>
                {/* <Icon name={expanded ? "remove" : "add"} size={25} color="#4B3B3B" /> */}
            </TouchableOpacity>
            <Animated.View style={{ height: heightInterpolate, overflow: 'hidden' }}>
                <Text style={styles.faqParagraph}>{content}</Text>
            </Animated.View>
            <FAQLine2 />
        </View>
    );
};

export default function FAQ({ navigation }) {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <Container>

                <StatusBar style='dark' />

                <ScrollView>

                    <PageContent>

                        <FAQHeader>
                            We’re here to help you with anything and everything on BookFeels
                        </FAQHeader>

                        <FAQParagraph>
                            BookFeels recommends books tailored to your emotional needs.
                            We have got you covered share your concern or check our frequently
                            asked questions listed below.
                        </FAQParagraph>

                        <FAQLine />

                        <ExpandableFAQ
                            title="How does the app recommend books based on my emotions?"

                            content="The app uses advanced emotional intelligence, Natural Language Processing (NLP),
                            and Machine Learning (ML) techniques to analyze your input.
                            When you select an emotion you want to feel or type in your insights,
                            the app processes this information and matches it with a curated database of books.
                            These books have been analyzed for their emotional content, themes,
                            and overall impact on readers. By understanding the emotional triggers
                            in the books, the app can recommend titles that are likely to evoke the
                            desired emotions, helping you find the perfect read to suit your mood."
                        />

                        <FAQLine2 />

                        <ExpandableFAQ
                            title="Can I trust the book recommendations to be accurate?"

                            content="Yes, the book recommendations provided by the app are
                            designed to be highly accurate and tailored to your emotional
                            preferences. The app's recommendation system is built on a robust
                            algorithm that combines user input, emotional content analysis,
                            and user feedback to continually improve its suggestions.
                            While individual experiences with books can vary,
                            the system aims to offer personalized recommendations that
                            align with your emotional goals. Additionally, user reviews and
                            ratings are factored into the recommendation process, ensuring a
                            community-driven approach to discovering emotionally resonant books."
                        />

                        <FAQLine2 />

                    </PageContent>

                </ScrollView>
               
            </Container>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    faqFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    faqFlexText: {
        fontSize: 18,
        paddingLeft: 3
    },
    faqParagraph: {
        padding: 10,
        fontSize: 15,
        // backgroundColor: '#F5F1F8',
    },
    /* faqButton: {
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#4b3b3b',
    }, */
  /*   faqSubmitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }, */
});
