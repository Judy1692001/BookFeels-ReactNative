import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import {
  Container,
  PageContent,
  HeadingStyle,
  PageTitle,
  PageLogo,
  SubTitle,
  StyleForm,
  StyleInputLabel,
  StyleLeftIcon,
  StyleRightIcon,
  StyleTextInput,
  Colors,
  ButtonText,
  ButtonWrapper,
  NavBox,
  Line,
  GoogleButton,
  GoogleButtonText,
  Link,
  TextLink,
  StylingLinkView,
  StylingLinkText,
  ValidationText,
} from "../Components/Styles";
import { Formik } from "formik";

// Yup is a JavaScript schema builder for value parsing and validation.
import * as Yup from "yup";
//icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";

import KeyboardAvoidingWrapper from "./../Components/KeyboardAvoidingWrapper";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Components/CredentialsContext";

//color
const { secondary, text, heading, dark_primary, notvalid } = Colors;

//API
import axios from "axios";
import { baseURL } from "../config";

//Sign up validation
const SignupSchema = Yup.object().shape({
  username: Yup.string().required(
    "Please Enter your Full Name without spaces."
  ),
  email: Yup.string()
    .email("Invalid Email")
    .required("Please Enter your Email AAddress."),
  password: Yup.string()
    .min(8)
    .required("Please Enter your Password.")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one special character and one number ."
    ),
  confirmPassword: Yup.string()
    .min(8, "Must contain minimum 8 characters.")
    .oneOf([Yup.ref("password")], "Your Passwords does not match.")

    .required("Confirm Password is Requird"),
});
const Signup = ({ navigation }) => {
  //hide password or not hook
  const [hidePassword, sethidePassword] = useState(true);
  //state variable to store the error message.
  const [message, setMessage] = useState();
  //error message,success message
  const [messageType, setMessageType] = useState();

  //Destructure the values stored in Credentials using useContext
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const navi = useNavigation();

  const HandleSignup = async (credentials, setSubmitting) => {
    //clear the message whenever the button is pressed
    HandleMessage(null);
    setSubmitting(false);
    const url = `${baseURL}api/register/`;
    console.log("credintials", credentials);
    //  try {
    let formdata = new FormData();
    formdata.append("username", credentials.username);
    formdata.append("email", credentials.email);
    formdata.append("password", credentials.password);
    formdata.append("confirm_password", credentials.confirmPassword);
    console.log("formdata", formdata);
    axios
      .post(url, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res", res);
        setSubmitting(false);
        //navigation.navigate('WelcomeScreen');
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
            // navigation.replace('Homepage');
            keepMeLogedIn(
              { ...res.data },
              res.data.message,
              res.data.status
            );
          }
        }
        // setSubmitting(false);
      })
      .catch((err) => {
        console.log("ERROR", err);
        let op = err?.response?.data?.errors;
        let val = op[Object.keys(op)[0]][0];
        console.log("Val", val);
        //console.log("Error", err?.response?.Error?.data?.errors);
        setSubmitting(false);
        HandleMessage(val);
      });
  };
  //Function to handle the message
  const HandleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  const keepMeLogedIn = (credentials, message, status) => {
    AsyncStorage.setItem("BookFeelsCredentials", JSON.stringify(credentials))
      .then(() => {
        HandleMessage(message, status);
        setStoredCredentials(credentials);
        console.log("Stored Credentials", storedCredentials);
      })
      .catch((error) => {
        console.log("ERROR", error);
        HandleMessage("Failed to keep you logged in");
      });
  };
  return (
    <KeyboardAvoidingWrapper>
      <Container>
        <StatusBar style="dark" />
        <PageContent>
          <PageTitle>BookFeels</PageTitle>
          <SubTitle>Signup</SubTitle>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              HandleSignup(values, setSubmitting);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
              errors,
              setFieldTouched,
              touched,
              isValid,
            }) => (
              <StyleForm>
                <LoginTextInput
                  label="Full Name"
                  icon="person"
                  placeholder="Enter your full name"
                  placeholderTextColor={text}
                  onChangeText={handleChange("username")}
                  onBlur={() => {
                    setFieldTouched("username");
                  }}
                  //onBlur={handleBlur('hhh')}
                  value={values.username}
                  //autoCapitalize={false}
                />
                {touched.username && errors.username && (
                  <ValidationText>{errors.username}</ValidationText>
                )}
                <LoginTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="Enter your email address"
                  placeholderTextColor={text}
                  onChangeText={handleChange("email")}
                  onBlur={() => {
                    setFieldTouched("email");
                  }}
                  // onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize={false}
                />
                {touched.email && errors.email && (
                  <ValidationText>{errors.email}</ValidationText>
                )}
                <LoginTextInput
                  label="Password"
                  icon="lock"
                  placeholder="Enter your password"
                  placeholderTextColor={text}
                  onChangeText={handleChange("password")}
                  onBlur={() => {
                    setFieldTouched("password");
                  }}
                  // onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  sethidePassword={sethidePassword}
                  autoCapitalize={false}
                />
                {touched.password && errors.password && (
                  <ValidationText>{errors.password}</ValidationText>
                )}
                <LoginTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="Confirm your password"
                  placeholderTextColor={text}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={() => {
                    setFieldTouched("confirmPassword");
                  }}
                  //onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  sethidePassword={sethidePassword}
                  autoCapitalize={false}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <ValidationText>{errors.confirmPassword}</ValidationText>
                )}
                {/* msg box to output the msg   disabled={!isValid}*/}
                <NavBox type={messageType}>{message}</NavBox>
                {!isSubmitting && (
                  <ButtonWrapper onPress={handleSubmit} disabled={!isValid}>
                    <ButtonText>Signup</ButtonText>
                  </ButtonWrapper>
                )}
                {isSubmitting && (
                  <ButtonWrapper disabled={true}>
                    <ActivityIndicator size="large" color={secondary} />
                  </ButtonWrapper>
                )}
                <Line />
                <GoogleButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" size={25} color={heading} />
                  <GoogleButtonText google={true}>
                    Signup with Google
                  </GoogleButtonText>
                </GoogleButton>
                <StylingLinkView>
                  <StylingLinkText>Already have an account?</StylingLinkText>
                  <Link>
                    <TextLink
                      onPress={() => {
                        navigation.navigate("Login");
                      }}
                    >
                      Login
                    </TextLink>
                  </Link>
                </StylingLinkView>
              </StyleForm>
            )}
          </Formik>
        </PageContent>
      </Container>
    </KeyboardAvoidingWrapper>
  );
};

const LoginTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  sethidePassword,
  ...props
}) => {
  return (
    <View>
      <StyleLeftIcon>
        <Octicons name={icon} size={30} color={text} />
      </StyleLeftIcon>
      <StyleInputLabel>{label}</StyleInputLabel>
      <StyleTextInput {...props} />
      {isPassword && (
        <StyleRightIcon onPress={() => sethidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "eye-off" : "eye"}
            size={30}
            color={text}
          />
        </StyleRightIcon>
      )}
    </View>
  );
};

export default Signup;
