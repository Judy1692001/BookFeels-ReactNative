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
const Signup = ({navigation}) => {
    //hide password or not hook
    const [hidePassword, sethidePassword] = useState(true)
    const handleSignUp = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
            username,
            email,
            password,
          });
          console.log(response.data);
          // Handle success response
        } catch (error) {
          console.error(error);
          // Handle error
        }
      };
    return (
        <KeyboardAvoidingWrapper>
        <Container>
            <StatusBar style='dark'/>
            <PageContent>
                <PageTitle>BookFeels</PageTitle>
                <SubTitle>Signup</SubTitle>
                <Formik
                    initialValues={{ fullName:'',email: '', password: '' ,confirmpassword:''}}
                    onSubmit={values => { console.log(values); }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (<StyleForm>
                        <LoginTextInput
                            label="Full Name"
                            icon="person"
                            placeholder="Enter your full name"
                            placeholderTextColor={text}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}
                        />
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
                         <LoginTextInput
                            label="Confirm Password"
                            icon="lock"
                            placeholder="Confirm your password"
                            placeholderTextColor={text}
                            onChangeText={handleChange('confirmpassword')}
                            onBlur={handleBlur('confirmpassword')}
                            value={values.confirmpassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            sethidePassword={sethidePassword}
                        />
                        <NavBox>...</NavBox>
                        <ButtonWrapper onPress={handleSubmit}>
                            <ButtonText>
                                Signup
                            </ButtonText>
                        </ButtonWrapper>
                        <Line />
                        <GoogleButton google={true} onPress={handleSubmit}>
                            <Fontisto name='google' size={25} color={heading}/>
                            <GoogleButtonText google={true}>
                                Signup with Google
                            </GoogleButtonText>
                        </GoogleButton>
                        <StylingLinkView>
                            <StylingLinkText>Already have an account?</StylingLinkText>
                            <Link>
                                <TextLink onPress={() => {navigation.navigate("Login");}}>Login</TextLink>
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


export default Signup;
