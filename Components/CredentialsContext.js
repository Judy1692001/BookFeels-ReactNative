import { createContext } from 'react';

//to make sure that the value of storedcredentials can be accessed by all components.
//will pass two parameters: storedCredentials and a method to set the values of storedCredentials
//initial value is an empty object.
export const CredentialsContext=createContext({storedCredentials:{} , setStoredCredentials:()=>{}})