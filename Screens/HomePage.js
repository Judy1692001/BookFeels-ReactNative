import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Container,
  NavBarContainer,
  PageContent,
  ProfileIcon,
  HeadingStyle,
  EmotionContainer,
  EmotionText,
  EmotionName,
  StyleOr,
  Line2,
  InsightInput,
  IconButton,
  TextStyle2,
  FooterContainer,
  Emotion
} from '../Components/Styles';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../Components/CredentialsContext';
import { baseURL } from '../config';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [insightQuery, setInsightQuery] = useState('');
  const [userToken, setUserToken] = useState('');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [emotion, setEmotion] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCredentials = await AsyncStorage.getItem('BookFeelsCredentials');
        if (storedCredentials) {
          const { access, user } = JSON.parse(storedCredentials);
          setUserToken(access);
          setUserData(user);
        }
      } catch (error) {
        console.error('Error retrieving credentials:', error);
      }
    };

    fetchData();
  }, []);

  const Recommendation = async (inputEmotion) => {
    setLoading(true);
    const url = `${baseURL}api/recommendbooks/`;

    try {
      const response = await axios.post(
        url,
        { user_input: inputEmotion },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (response.data.status !== 'SUCCESS') {
        console.log('Error Message:', response.data.message);
      } else {
        console.log('Message:', response.data.message);
        console.log('HistoryData', response.data.data);
        setEmotion(inputEmotion);
        navigation.navigate('Recommend', { books: response.data.data });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const onChangeInsight = () => {
    console.log('Insights', insightQuery);
    if (insightQuery) {
      Recommendation(insightQuery);
    } else {
      console.log('Empty insight query');
    }
  };

  const onChangeEmotion = (chosenEmotion) => {
    console.log('Selected Emotion:', chosenEmotion);
    setEmotion(chosenEmotion);
    Recommendation(chosenEmotion);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleDiscoverPress = () => {
    navigation.navigate('Discover');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Container>
        <ScrollView>
          <PageContent>
            <NavBarContainer>
              <ProfileIcon onPress={handleProfilePress}>
                <MaterialCommunityIcons name="account" size={35} color="black" />
              </ProfileIcon>

              <Searchbar
                placeholder="Title or author"
                placeholderTextColor="gray"
                onChangeText={onChangeSearch}
                onFocus={handleDiscoverPress}
                value={searchQuery}
                style={{ flex: 1, marginTop: 20, marginLeft: 50, backgroundColor: '#fff' }}
              />
            </NavBarContainer>

            <HeadingStyle>Pick an emotion and get started</HeadingStyle>

            <EmotionContainer>
              <View style={{ flexDirection: 'row' }}>
                <Emotion onPress={() => onChangeEmotion('happy')}>
                  <EmotionText>😀</EmotionText>
                  <EmotionName>Happiness</EmotionName>
                </Emotion>

                <Emotion onPress={() => onChangeEmotion('attracted')}>
                  <EmotionText>😍</EmotionText>
                  <EmotionName>Attracted</EmotionName>
                </Emotion>

                <Emotion onPress={() => onChangeEmotion('sad')}>
                  <EmotionText>😢</EmotionText>
                  <EmotionName>Sad</EmotionName>
                </Emotion>

                <Emotion onPress={() => onChangeEmotion('focused')}>
                  <EmotionText>🎯</EmotionText>
                  <EmotionName>Focused</EmotionName>
                </Emotion>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Emotion onPress={() => onChangeEmotion('love')}>
                  <EmotionText>🥰</EmotionText>
                  <EmotionName>Love</EmotionName>
                </Emotion>

                <Emotion onPress={() => onChangeEmotion('fear')}>
                  <EmotionText>😨</EmotionText>
                  <EmotionName>Fear</EmotionName>
                </Emotion>

                <Emotion onPress={() => onChangeEmotion('anxious')}>
                  <EmotionText>😰</EmotionText>
                  <EmotionName>Anxious</EmotionName>
                </Emotion>

                <Emotion onPress={() => onChangeEmotion('angry')}>
                  <EmotionText>😡</EmotionText>
                  <EmotionName>Angry</EmotionName>
                </Emotion>
              </View>
            </EmotionContainer>

            <Line2 />

            <StyleOr>or</StyleOr>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <InsightInput
                placeholder="Enter your insights here...."
                placeholderTextColor="gray"
                onChangeText={setInsightQuery}
                value={insightQuery}
                style={{ textAlign: 'left' }}
              />

              <IconButton onPress={onChangeInsight}>
                <Feather name="check-circle" size={24} color="black" />
              </IconButton>
            </View>
          </PageContent>
        </ScrollView>

        {/* <BottomTabNavigator /> */}

        {/* <BottomNavigator /> */}
        
      </Container>
    </KeyboardAvoidingView>
  );
};

export default HomePage;
