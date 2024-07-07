import React, { useState,useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import {
    Container, PageContent, HeadingStyle, PageTitle,PageLogo, SubTitle, StyleForm,
    StyleInputLabel, StyleLeftIcon, StyleRightIcon, StyleTextInput, Colors, ButtonText, ButtonWrapper,
    NavBox,Line,GoogleButton,GoogleButtonText,Link,TextLink,StylingLinkView,StylingLinkText,ValidationText, ButtonWrapper2
  
} from '../Components/Styles';
import { Formik } from 'formik';
//icons
import { Octicons,Ionicons,Fontisto } from '@expo/vector-icons';


import KeyboardAvoidingWrapper from './../Components/KeyboardAvoidingWrapper';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../Components/CredentialsContext';

// Yup is a JavaScript schema builder for value parsing and validation.
import * as Yup from 'yup';
//color
const { secondary,text,heading ,dark_primary} = Colors;

//API
import axios from 'axios';
import { baseURL } from '../config';


//Login validation
const LoginSchema = Yup.object().shape({
    username_or_email: Yup.string()
        .required("Please Enter your Full Name."),
    password: Yup.string()
        .min(8)
        .required("Please Enter your Password.")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            "Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one special character and one number .")
    
});
// const validate = async () => {
//     Keyboard.dismiss();
//     let isValid = true;
//     if (!inputs.email) {
//       handleError('Please input email', 'email');
//       isValid = false;
//     }
//     if (!inputs.password) {
//       handleError('Please input password', 'password');
//       isValid = false;
//     }
//     if (isValid) {
//       Login();
//     }
//   };
const Login = ({navigation,onFocus = () => {}}) => {
    //hide password or not hook.
    const [hidePassword, sethidePassword] = useState(true)
    //state variable to store the error message.
    const [message, setMessage] = useState();
    //error message,success message
    const [messageType, setMessageType] = useState();

    //Destructure the values stored in Credentials using useContext
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const navi = useNavigation();

    const handleLogin = async (credentials, setSubmitting, navigation) => {
        //clear the message whenever the button is pressed
        HandleMessage(null);
        setSubmitting(false);
        const url = `${baseURL}api/login/`;
        console.log("credintials", credentials);
        //  try {
        let formdata = new FormData();
       
        formdata.append("username_or_email", credentials.username_or_email)
        formdata.append("password", credentials.password)
       
        console.log("formdata", formdata);
        axios.post(url, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            console.log("res", res);
            setSubmitting(false);
            //const result = res.data;
            //destructure from the result.
            //const {user,token,status,message} = result;
            if (res.data.status !== "SUCCESS") {
                console.log("Error Message:", res.data.message);
                HandleMessage(res.data.message, res.data.status);
            } else {
                if (res.data.message) {
                    console.log("Message:", res.data.message);
                    HandleMessage(res.data.message, res.data.status);
                    // Optionally show the message to the user
                     navi.navigate('Homepage');
                    console.log("User:", res.data.data);
                    keepMeLogedIn({... res.data.data }, res.data.message, res.data.status);
                } 
                 
            }
            
        }).catch((err) => {
            console.log("ERROR", err.response);
                let op = err?.response?.data?.errors?.message;
                setSubmitting(false);
                HandleMessage(op);
            
        })
    }
    //Function to handle the message
    const HandleMessage = (message,type='FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const keepMeLogedIn = (credentials, message, status) => {
        console.log("CredentialsInside", credentials);
        AsyncStorage.setItem("BookFeelsCredentials", JSON.stringify(credentials))
            .then(() => { 
                HandleMessage(message, status);
                setStoredCredentials(credentials);
               // console.log("Stored Credentials", storedCredentials);
              //  storedCredentials = credentials;
            })
            .catch((error) => {
                console.log("ERROR", error);
                HandleMessage("Failed to keep you logged in");
            }
            )
    }
    return (
        <KeyboardAvoidingWrapper>
        <Container>
            <StatusBar style='dark'/>
            <PageContent>
                <PageLogo  source={require('./../assets/undraw_Reading_time_re_phf7-removebg-preview.png')} />
                <PageTitle>BookFeels</PageTitle>
                <SubTitle>Login</SubTitle>
                <Formik
                        initialValues={{ username_or_email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values,{ setSubmitting }) => {
                                handleLogin(values,setSubmitting);
                            }
                        }
                   // } //try oval borders
                >
                        {({ handleChange, handleBlur, handleSubmit,
                            values, isSubmitting, errors, setFieldTouched, touched, isValid    }) => (<StyleForm>
                                <LoginTextInput
                            label="Full Name"
                            icon="person"
                            placeholder="Enter your full name"
                            placeholderTextColor={text}
                            onChangeText={handleChange('username_or_email')}
                            onBlur={()=>{setFieldTouched('username_or_email')}}
                            value={values.username_or_email}
                          
                            />
                            {touched.username_or_email && errors.username_or_email && <ValidationText>{errors.username_or_email}</ValidationText>}
                         <LoginTextInput
                            label="Password"
                            icon="lock"
                            placeholder="Enter your password"
                            placeholderTextColor={text}
                            onChangeText={handleChange('password')}
                            onBlur={()=>{setFieldTouched('password')}}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            sethidePassword={sethidePassword}
                            autoCapitalize={false}
                            /> 
                            {touched.password && errors.password && <ValidationText>{errors.password}</ValidationText>}
                            {/* msg box to output the msg */}
                            <NavBox type={messageType}>{message}</NavBox>
                            {!isSubmitting && <ButtonWrapper2 onPress={handleSubmit} disabled={!isValid}>
                                <ButtonText> 
                                    Login
                                </ButtonText>
                            </ButtonWrapper2>} 

                            {isSubmitting && (<ButtonWrapper2 disabled={true}>
                                <ActivityIndicator size="large" color={secondary} />
                            </ButtonWrapper2>)}
                        <Line />
                       
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
        <View >
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