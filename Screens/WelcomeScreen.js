import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useColorScheme,
} from 'react-native';
import {
  Container, PageContent, HeadingStyle, PageTitle,PageLogo, SubTitle, StyleForm, ButtonText, ButtonWrapper,
  TextStyle,WelcomePageLogo,HeaderImage1,HeaderImage2,
  ImageContainer,PageContainer

} from '../Components/Styles';
export default function WelcomeScreen({ navigation }) {
  // const [subscribe, subscribedd] = React.useState(false);
  return (
    <Container>
 
      <PageContent>
        <WelcomePageLogo resizeMode="cover"
          source={require('../assets/undraw_Reading_time_re_phf7-removebg-preview.png')}
          accessible={true}
          accessibilityLabel={'Reading Time Logo'}
              />
        <HeadingStyle>
        Welcome to BookFeels 
        </HeadingStyle>
        <TextStyle>
        Enter an Emotion & enjoy your Reading Session {'.'}
        </TextStyle>
      </PageContent>
      <ButtonWrapper onPress={() => {navigation.navigate("Login");}}>
        <ButtonText> Get Started</ButtonText>
        </ButtonWrapper>
 
    </Container>
   
  );
}



 

