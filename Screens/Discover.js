import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator,StyleSheet } from 'react-native';
import {
    Container, PageContent, HeadingStyle, PageTitle,PageLogo, SubTitle, StyleForm,
    StyleInputLabel, StyleLeftIcon, StyleRightIcon, StyleTextInput, Colors, ButtonText, ButtonWrapper,
    NavBox,Line,GoogleButton,GoogleButtonText,Link,TextLink,StylingLinkView,StylingLinkText,
    ValidationText
  
} from '../Components/Styles';


const Discover = ({navigation}) => {
   //state variable to store the error message.
   const [message, setMessage] = useState();
   //error message,success message
    const [messageType, setMessageType] = useState();
    const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://192.168.1.4:8000/api/search/');
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    // const HandleSignup = async(credentials, setSubmitting,navigation) => {
    //    //clear the message whenever the button is pressed
    //    HandleMessage(null);
    //     setSubmitting(false);
    //     const url = 'http://192.168.1.4:8000/api/register/';
    //     console.log("credintials", credentials);
    //     //  try {
    //     let formdata = new FormData();
    //     formdata.append("username", credentials.username)
    //     formdata.append("email", credentials.email)
    //     formdata.append("password", credentials.password)
    //     formdata.append("confirm_password", credentials.confirmPassword)
    //     console.log("formdata", formdata);
    //         axios.post(url, formdata, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         }).then((res) => {
    //             console.log("res", res);
    //             setSubmitting(false);
    //             //navigation.navigate('WelcomeScreen');
    //             //const result = res.data;
    //             //destructure from the result.
    //             //const {user,token,status,message} = result;

    //             if (res.data.status !== "SUCCESS") {
    //                 console.log("Error Message:", res.data.message);
    //                 HandleMessage(res.data.message, res.data.status);
    //             } else {
    //                 if (res.data.message) {
    //                     console.log("Message:", res.data.message);
    //                     HandleMessage(res.data.message, res.data.status);
    //                     // Optionally show the message to the user
    //                 }
    //                 navigation.navigate('WelcomeScreen');
    //             }
    //            // setSubmitting(false);
    //         }).catch((err) => {
    //             console.log("Error", err.res);
    //             // setSubmitting(false);
    //             // HandleMessage("An Error Occurred! Check your network and try again ");
    //         })
  
    //};
    //Function to handle the message
    const HandleMessage = (message,type='FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    return (
        <View style={styles.container}>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
          )}
        />
      </View>
    );
      
    

};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    bookItem: {
      marginBottom: 20,
      padding: 20,
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    author: {
      fontSize: 16,
      color: '#666',
    },
  });



export default Discover;
