/* import React, { useState, useContext } from 'react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { Container, PageContent, PageLogo, PageTitle, SubTitle, StyleForm, StyleInputLabel, StyleLeftIcon, StyleRightIcon, StyleTextInput, Colors, ButtonText, ButtonWrapper, NavBox, Line, StylingLinkView, StylingLinkText, ValidationText, ButtonWrapper2, TextLink } from '../Components/Styles';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from './../Components/KeyboardAvoidingWrapper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../Components/CredentialsContext';
import * as Yup from 'yup';
import axios from 'axios';
import { baseURL } from '../config';

const { secondary, text } = Colors;

const LoginSchema = Yup.object().shape({
    username_or_email: Yup.string()
        .required("Please Enter your Full Name."),
    password: Yup.string()
        .min(8)
        .required("Please Enter your Password.")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one special character and one number .")
});

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const { setStoredCredentials } = useContext(CredentialsContext);
    const navigation = useNavigation();

    const handleLogin = async (credentials, setSubmitting) => {
        setMessage(null);
        setSubmitting(true);
        const url = `${baseURL}api/login/`;
        const formData = new FormData();
        formData.append("username_or_email", credentials.username_or_email);
        formData.append("password", credentials.password);

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === "SUCCESS") {
                const userData = response.data.data;
                AsyncStorage.setItem("BookFeelsCredentials", JSON.stringify(userData))
                    .then(() => {
                        setStoredCredentials(userData);
                        setMessage(response.data.message);
                        setMessageType(response.data.status);
                        navigation.navigate('HomePage'); // Redirect to Homepage on successful login
                    })
                    .catch((error) => {
                        console.error("Failed to store credentials", error);
                        setMessage("Failed to keep you logged in");
                        setMessageType("FAILED");
                    });
            } else {
                setMessage(response.data.message);
                setMessageType("FAILED");
            }

        } catch (error) {
            console.error("Login error:", error);
            setMessage("An error occurred. Please try again later.");
            setMessageType("FAILED");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingWrapper>
            <Container>
                <StatusBar style='dark' />
                <PageContent>
                    <PageLogo source={require('./../assets/undraw_Reading_time_re_phf7-removebg-preview.png')} />
                    <PageTitle>BookFeels</PageTitle>
                    <SubTitle>Login</SubTitle>
                    <Formik
                        initialValues={{ username_or_email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values, { setSubmitting }) => handleLogin(values, setSubmitting)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors, touched, isValid }) => (
                            <StyleForm>
                                <LoginTextInput
                                    label="Full Name"
                                    icon="person"
                                    placeholder="Enter your full name"
                                    placeholderTextColor={text}
                                    onChangeText={handleChange('username_or_email')}
                                    onBlur={handleBlur('username_or_email')}
                                    value={values.username_or_email}
                                />
                                {touched.username_or_email && errors.username_or_email && <ValidationText>{errors.username_or_email}</ValidationText>}
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
                                    setHidePassword={setHidePassword}
                                />
                                {touched.password && errors.password && <ValidationText>{errors.password}</ValidationText>}
                                <NavBox type={messageType}>{message}</NavBox>
                                {!isSubmitting ? (
                                    <ButtonWrapper2 onPress={handleSubmit} disabled={!isValid}>
                                        <ButtonText>Login</ButtonText>
                                    </ButtonWrapper2>
                                ) : (
                                    <ButtonWrapper2 disabled={true}>
                                        <ActivityIndicator size="large" color={secondary} />
                                    </ButtonWrapper2>
                                )}
                                <Line />
                                <StylingLinkView>
                                    <StylingLinkText>Don't have an account?</StylingLinkText>
                                    <TextLink onPress={() => navigation.navigate("Signup")}>Signup</TextLink>
                                </StylingLinkView>
                            </StyleForm>
                        )}
                    </Formik>
                </PageContent>
            </Container>
        </KeyboardAvoidingWrapper>
    );
};

const LoginTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <StyleLeftIcon>
                <Octicons name={icon} size={30} color={text} />
            </StyleLeftIcon>
            <StyleInputLabel>{label}</StyleInputLabel>
            <StyleTextInput {...props} />
            {isPassword && (
                <StyleRightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={text} />
                </StyleRightIcon>
            )}
        </View>
    );
};

export default Login;
 */

import React, { useState, useContext } from 'react';
import { StatusBar, View, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Container, PageContent, PageLogo, PageTitle, SubTitle, StyleForm, StyleInputLabel, StyleLeftIcon, StyleRightIcon, StyleTextInput, Colors, ButtonText, ButtonWrapper, NavBox, Line, StylingLinkView, StylingLinkText, ValidationText, ButtonWrapper2, TextLink } from '../Components/Styles';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../Components/CredentialsContext';
import * as Yup from 'yup';
import axios from 'axios';
import { baseURL } from '../config';

const { secondary, text } = Colors;

const LoginSchema = Yup.object().shape({
    username_or_email: Yup.string()
        .required("Please Enter your Full Name."),
    password: Yup.string()
        .min(8)
        .required("Please Enter your Password.")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one special character and one number .")
});

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const { setStoredCredentials } = useContext(CredentialsContext);
    const navigation = useNavigation();

    const handleLogin = async (credentials, setSubmitting) => {
        setMessage(null);
        setSubmitting(true);
        const url = `${baseURL}api/login/`;
        const formData = new FormData();
        formData.append("username_or_email", credentials.username_or_email);
        formData.append("password", credentials.password);

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === "SUCCESS") {
                const userData = response.data.data;
                AsyncStorage.setItem("BookFeelsCredentials", JSON.stringify(userData))
                    .then(() => {
                        setStoredCredentials(userData);
                        setMessage(response.data.message);
                        setMessageType(response.data.status);
                        navigation.navigate('HomePage'); // Redirect to Homepage on successful login
                    })
                    .catch((error) => {
                        console.error("Failed to store credentials", error);
                        setMessage("Failed to keep you logged in");
                        setMessageType("FAILED");
                    });
            } else {
                setMessage(response.data.message);
                setMessageType("FAILED");
            }

        } catch (error) {
            console.error("Login error:", error);
            setMessage("An error occurred. Please try again later.");
            setMessageType("FAILED");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Container>
                    <StatusBar style='dark' />
                    <PageContent>
                        <PageLogo source={require('./../assets/undraw_Reading_time_re_phf7-removebg-preview.png')} />
                        <PageTitle>BookFeels</PageTitle>
                        <SubTitle>Login</SubTitle>
                        <Formik
                            initialValues={{ username_or_email: '', password: '' }}
                            validationSchema={LoginSchema}
                            onSubmit={(values, { setSubmitting }) => handleLogin(values, setSubmitting)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors, touched, isValid }) => (
                                <StyleForm>
                                    <LoginTextInput
                                        label="Full Name"
                                        icon="person"
                                        placeholder="Enter your full name"
                                        placeholderTextColor={text}
                                        onChangeText={handleChange('username_or_email')}
                                        onBlur={handleBlur('username_or_email')}
                                        value={values.username_or_email}
                                    />
                                    {touched.username_or_email && errors.username_or_email && <ValidationText>{errors.username_or_email}</ValidationText>}
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
                                        setHidePassword={setHidePassword}
                                    />
                                    {touched.password && errors.password && <ValidationText>{errors.password}</ValidationText>}
                                    <NavBox type={messageType}>{message}</NavBox>
                                    {!isSubmitting ? (
                                        <ButtonWrapper2 onPress={handleSubmit} disabled={!isValid}>
                                            <ButtonText>Login</ButtonText>
                                        </ButtonWrapper2>
                                    ) : (
                                        <ButtonWrapper2 disabled={true}>
                                            <ActivityIndicator size="large" color={secondary} />
                                        </ButtonWrapper2>
                                    )}
                                    <Line />
                                    <StylingLinkView>
                                        <StylingLinkText>Don't have an account?</StylingLinkText>
                                        <TextLink onPress={() => navigation.navigate("Signup")}>Signup</TextLink>
                                    </StylingLinkView>
                                </StyleForm>
                            )}
                        </Formik>
                    </PageContent>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const LoginTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <StyleLeftIcon>
                <Octicons name={icon} size={30} color={text} />
            </StyleLeftIcon>
            <StyleInputLabel>{label}</StyleInputLabel>
            <StyleTextInput {...props} />
            {isPassword && (
                <StyleRightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={text} />
                </StyleRightIcon>
            )}
        </View>
    );
};

export default Login;
