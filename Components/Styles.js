import styled from 'styled-components';
import { View, Text, Image, TextInput,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

const StatusBarHeight = Constants.statusBarHeight;
//exported objects

export const Colors = {
    //for background
    primary: '#EEEEEE',
    //for buttons
    secondary: '#A67FBF',
    //for headings
    heading: 'black',
    //for text
    text: '#343434',
    //for input textboxes
    inText: '#FFFFFF',
    dark_primary:'gray'
};

const { primary, secondary, heading, text,inText,dark_primary } = Colors;

export const Container = styled.View`
flex: 1;
padding: 24px;
padding-top:${StatusBarHeight + 10}px; 
backgroundColor:${primary};
justifyContent: 'space-between';

`;
export const PageContainer = styled.View`
flex: 1;
padding-bottom: 20px; 
backgroundColor:${primary};
justifyContent: 'space-between';

`;
export const ImageContainer = styled.View`
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
  height: 20%;

`;
export const PageContent = styled.View`
    flex: 1;
    justifyContent: 'center';
    alignItems: 'center';
    
    
`;
export const WelcomePageLogo = styled.Image`
    height: 199px;
    width: 314px;
   margin-top:150px

`
export const PageLogo = styled.Image`
    height: 150px;
    width: 300px;
`;
export const HeaderImage1 = styled.Image`
      width: 200px;
      height: 90px;
    
      
`
export const HeaderImage2 = styled.Image`
    width: 100px;
    height: 160px;
    bottom:100px;
    
`
export const HeadingStyle = styled.Text`
    padding: 10px;
    fontSize: 30px;
    color: ${heading};
    text-align: center;
    font-weight: 700;
`;

export const TextStyle = styled.Text`
    padding: 10px;
    fontSize: 20px;
    color: ${text};
    text-align: center;
`;

export const ButtonWrapper = styled.TouchableOpacity`
    border-radius: 5px;
    padding: 15px;
    flexDirection: 'row';
    justify-content: center;
    alignItems:center;
    background-color: ${secondary};
    margin-vertical:5px;
    height:60px;
`;

export const ButtonText = styled.Text`
    font-size: 25px;
    color: ${heading};
    text-align: center;
    font-weight: 700;

`;
export const GoogleButton = styled.TouchableOpacity`
   border-radius: 5px;
    padding: 15px;
    flex-direction: 'row';
    justify-content: center;
    align-items:center;
    margin-vertical:5px;
    height:60px;
    background-color:${dark_primary};
    flex-direction:row;
    justify-content:center;
    
 `;
 export const GoogleButtonText = styled.Text`
    font-size: 25px;
    color: ${heading};
    text-align: center;
    font-weight: 700;
    margin-left:10px;

   
`;

export const PageTitle = styled.Text`
    font-size:40px;
    color: ${secondary};
    text-align: center;
    font-weight: 700;
    padding:10px;
    margin-bottom:5px;

`;

export const SubTitle = styled.Text`
    font-size:30px;
    color: ${heading};
    text-align: center;
    font-weight: 700;
    margin-bottom:5px;
    letter-spacing:1px;
`;

export const StyleForm = styled.View`
   width:100%;
`;

export const StyleTextInput = styled.TextInput`
backgroundColor:${inText};
padding:15px;
padding-left:55px;
padding-right:55px;
border-radius:5px;
margin-vertical:3px;
margin-bottom:10px;
fontSize:16px;
height:60px;
color:${text};


`;

export const StyleInputLabel = styled.Text`
color:${text};
font-size:13px;
text-align:left;
`;

export const StyleLeftIcon = styled.View`
left:15px;
top:33px;
position:absolute;
z-index:1;
`;

export const StyleRightIcon = styled.TouchableOpacity`
right:15px;
top:33px;
position:absolute;
z-index:1;
`;
//dots in the middle of the screen
export const NavBox = styled.Text`
text-align:center;
font-size:13px;
`;

//will be displayed after pressing the login button 
export const Line = styled.View`
height:1px;
width:100%;
backgroundColor:${inText};
margin-vertical:10px;
`; 

export const StylingLinkView = styled.View`
    padding: 10px;
    flexDirection: 'row';
    justify-content: center;
    align-items:center;
`;

export const StylingLinkText = styled.Text`
justify-content: center;
font-size:18px;
align-content:center;
color:${text};
`;

export const Link = styled.TouchableOpacity`
flexDirection: 'row';
justify-content:center;
align-items:center;
`;

export const TextLink = styled.Text`
font-size:18px;
color:${secondary};
`;