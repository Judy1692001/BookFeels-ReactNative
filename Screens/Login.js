import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, Pressable,Button } from 'react-native';
import {
    Container, PageContent, HeadingStyle, PageTitle,PageLogo, SubTitle, StyleForm,
    StyleInputLabel, StyleLeftIcon, StyleRightIcon, StyleTextInput, Colors, ButtonText, ButtonWrapper,
    NavBox,Line,GoogleButton,GoogleButtonText,Link,TextLink,StylingLinkView,StylingLinkText
  
} from '../Components/Styles';
import { Formik } from 'formik';
//icons
import { Octicons,Ionicons,Fontisto } from '@expo/vector-icons';

import KeyboardAvoidingWrapper from './../Components/KeyboardAvoidingWrapper';

//color
const { secondary,text,heading ,dark_primary} = Colors;

//API
import axios from 'axios';
const Login = ({navigation}) => {
    //hide password or not hook.
    const [hidePassword, sethidePassword] = useState(true)
    // //state variable to store the error message.
    // const [message, setMessage] = useState();
    // //error message,success message
    // const [messageType, setMessageType] = useState();
    
    // const HandleLogin = (credentials) => {
    //     const url = '';
    //     axios.post(url, credentials)
    //         .then((response) => { 
    //             const result = response.data;
    //             const { } = data;

    //         })
    //         .catch(error => { console.log(error.JSON); })

  //  }
    return (
        <KeyboardAvoidingWrapper>
        <Container>
            <StatusBar style='dark'/>
            <PageContent>
                <PageLogo  source={require('./../assets/undraw_Reading_time_re_phf7-removebg-preview.png')} />
                <PageTitle>BookFeels</PageTitle>
                <SubTitle>Login</SubTitle>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => { console.log(values); }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (<StyleForm>
                        <LoginTextInput
                            label="Email Address"
                            icon="mail"
                            placeholder="Enter your email address"
                            placeholderTextColor={text}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                         <LoginTextInput
                            label="Password"
                            icon="lock"
                            placeholder="Enter your password"
                            placeholderTextColor={text}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            sethidePassword={sethidePassword}
                        />
                        <NavBox>...</NavBox>
                        <ButtonWrapper onPress={handleSubmit}>
                            <ButtonText>
                                Login
                            </ButtonText>
                        </ButtonWrapper>
                        <Line />
                        <GoogleButton google={true} onPress={handleSubmit}>
                            <Fontisto name='google' size={25} color={heading}/>
                            <GoogleButtonText google={true}>
                                Login with Google
                            </GoogleButtonText>
                        </GoogleButton>
                        <StylingLinkView>
                            <StylingLinkText>Don't have an account?</StylingLinkText>
                            <Link>
                                <TextLink onPress={() => {navigation.navigate("Signup");}}>Signup</TextLink>
                            </Link>
                        </StylingLinkView>
                    </StyleForm>)}
                    </Formik>
            </PageContent>
            </Container>
            </KeyboardAvoidingWrapper>
    );

};

const LoginTextInput = ({ label, icon,isPassword,hidePassword,sethidePassword, ...props }) => {
    return (
        <View>
            <StyleLeftIcon>
                <Octicons name={icon} size={30} color={text} />
            </StyleLeftIcon>
            <StyleInputLabel>
                {label}
            </StyleInputLabel>
            <StyleTextInput {...props} />
            {isPassword && (
                <StyleRightIcon onPress={()=>sethidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off':'eye'} size={30} color={text} />
                </StyleRightIcon>
            ) }

      
        </View>
    );
    
};


export default Login;
