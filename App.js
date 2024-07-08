// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './Navigation/RootNavigator';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './Components/CredentialsContext';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = async () => {
    try {
      const results = await AsyncStorage.getItem("BookFeelsCredentials");
      if (results !== null) {
        setStoredCredentials(JSON.parse(results));
      } else {
        setStoredCredentials(null);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    checkLoginCredentials().then(() => setAppReady(true));
  }, []);

  if (!appReady) {
    return (
      <AppLoading 
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </CredentialsContext.Provider>
  );
}
