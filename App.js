import React ,{ useState } from 'react';
import RootNavigator from './Navigation/RootNaviagtor';
import DiscoverBooks from './Screens/DiscoverBooks';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Credentials Context
import { CredentialsContext } from './Components/CredentialsContext';
export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");
  const checkLoginCredentials = () => {
    //this will return a promise(then part)
    //"BookFeelsCredentials" this is the key we will use to set and get credentials in asyncStorage
    AsyncStorage.getItem("BookFeelsCredentials")
      .then((results) => {
        if (results !== null) {
          //storing results in storedCredentials
          setStoredCredentials(JSON.parse(results));
        } else {
          setStoredCredentials(null);
        }
       })
      .catch(error => console.log("ERROR", error))
  }
  if (!appReady) {
    return (
      <AppLoading 
      //takes a function that will run when the app is open
        startAsync={checkLoginCredentials}
        //will perform an action when startasync is done
        onFinish={() => setAppReady(true)}
        //warn when an errr occurs.
        onError={console.warn}
      />
    );
  }
  return (
    //provider in order to pass the values to the context.
    //Now we can set the intial values of the context.
    //value should be of the same format as the context.
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      {/* we want to access the values at the RootNavigator to determine what we will show to the user(go to RootNavigator) */}
      <RootNavigator />
    </CredentialsContext.Provider>
    //<DiscoverBooks/>
   
  );
  
}