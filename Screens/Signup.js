import React, { useState, useContext } from "react";
import { StatusBar, View, ActivityIndicator } from "react-native";
import {
  Container,
  PageContent,
  PageLogo,
  PageTitle,
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
  StylingLinkView,
  StylingLinkText,
  ValidationText,
  ButtonWrapper2,
} from "../Components/Styles";
import { Formik } from "formik";
import { Octicons, Ionicons } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "./../Components/KeyboardAvoidingWrapper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Components/CredentialsContext";
import * as Yup from "yup";
import axios from "axios";
import { baseURL } from "../config";

const { secondary, text } = Colors;

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Please Enter your Full Name without spaces."),
  email: Yup.string().email("Invalid Email").required("Please Enter your Email Address."),
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
    .required("Confirm Password is Required"),
});

const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const { setStoredCredentials } = useContext(CredentialsContext);
  const navigation = useNavigation();

  const handleSignup = async (credentials, setSubmitting) => {
    setMessage(null);
    setSubmitting(true);
    const url = `${baseURL}api/register/`;
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    formData.append("confirm_password", credentials.confirmPassword);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "SUCCESS") {
        const userData = response.data.data;
        AsyncStorage.setItem("BookFeelsCredentials", JSON.stringify(userData))
          .then(() => {
            setMessage(response.data.message);
            setMessageType(response.data.status);
            setStoredCredentials(userData);
            navigation.replace("HomePage"); // Redirect to Homepage on successful signup
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
      console.error("Signup error:", error);
      setMessage("An error occurred. Please try again later.");
      setMessageType("FAILED");
    } finally {
      setSubmitting(false);
    }
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
              handleSignup(values, setSubmitting);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
              errors,
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
                  onBlur={handleBlur("username")}
                  value={values.username}
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
                  onBlur={handleBlur("email")}
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
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
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
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <ValidationText>{errors.confirmPassword}</ValidationText>
                )}
                <NavBox type={messageType}>{message}</NavBox>
                {!isSubmitting ? (
                  <ButtonWrapper2 onPress={handleSubmit} disabled={!isValid}>
                    <ButtonText>Signup</ButtonText>
                  </ButtonWrapper2>
                ) : (
                  <ButtonWrapper2 disabled={true}>
                    <ActivityIndicator size="large" color={secondary} />
                  </ButtonWrapper2>
                )}
                <Line />
                <StylingLinkView>
                  <StylingLinkText>Already have an account?</StylingLinkText>
                  <TextLink onPress={() => navigation.navigate("Login")}>
                    Login
                  </TextLink>
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
  setHidePassword,
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
        <StyleRightIcon onPress={() => setHidePassword(!hidePassword)}>
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
