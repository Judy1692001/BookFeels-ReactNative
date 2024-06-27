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
    dark_primary:'gray',
    light_primary: '#D9D9D9',
    Bio: '#C1B2B2',
    Follow: '#D0BFDA',
    subHeader: '#424866',
    groupBox: '#D9D9D9',
    quoteBox: '#E7E0EB',
    moreColor: '#F5F1F8',
    nameColor: '#424866',
    notvalid: ' #CBC3E3' ,
    notvalidtxt:'#ff0000' ,
    historyColor: '#424866'
};

const { primary, secondary, heading, text,inText,dark_primary, notvalid , notvalidtxt, light_primary, Bio, Follow, subHeader, groupBox, quoteBox, moreColor, nameColor, historyColor } = Colors;

export const Container = styled.View`
flex: 1;
padding: 10px; 
padding-top:${StatusBarHeight + 10}px; 
backgroundColor:${primary};
contentContainerStyle={{ justifyContent: 'space-between' }};
justifyContent: 'space-between';

`;
export const PageContainer = styled.View`
flex: 1;
padding-bottom: 24px; 
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

`;
export const PageLogo = styled.Image`
    height: 150px;
    width: 300px;
`;
export const HeaderImage1 = styled.Image`
      width: 200px;
      height: 90px;
    
      
`;
export const HeaderImage2 = styled.Image`
    width: 100px;
    height: 160px;
    bottom:100px;
    
`;
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
    background-color: ${({ disabled }) => (disabled ? notvalid : secondary)};
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
//Success or Failed message in the middle of the screen
export const NavBox = styled.Text`
text-align:center;
font-size:18px;
color: ${(props)=>(props.type=='SUCCESS' ? '#00FF00' : '#FF0000')};
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

export const ValidationText = styled.Text`
font-size:10px;
color:${notvalidtxt};
`;

export const NavBarContainer = styled.View`;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 10px;
background-color: ${primary};
`; 

export const ProfileIcon = styled.TouchableOpacity`
  padding: 5px;
`;

export const NotificationIcon = styled.TouchableOpacity` 
  padding: 5px;
`; 

export const EmotionContainer = styled.View`
align-items: center;
flex-direction: 'row';
`; 

export const EmotionText = styled.Text`
  font-size: 40px;
  color: ${text};
`; 

export const EmotionName = styled.Text`
  font-size: 16px;
  padding-top: 10px;
`; 

export const StyleOr = styled.Text`
color: ${text};
padding: 20px;
padding-left: 150px;
`; 

export const Line2 = styled.View`
height:1px;
width:100%;
backgroundColor:${inText};
margin-vertical:10px;
margin-top: 30px;
`; 

export const InsightInput = styled.TextInput`
  flex: 1;
  border-radius: 15px;
  border: 1px solid #ccc;
  padding-left: 15px;
  backgroundColor: ${inText};
  height: 80px;
  margin-left: 70px;
  margin-right: 10px;

`;

export const FooterContainer = styled.View`
  padding: 10px 0;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 40px;
`; 

export const IconButton = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
`;

export const RowContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 50px;
    justify-content: center; /* Align emojis horizontally at the center */
    margin-bottom: 40px;
    margin-top: 40px;
`; 

export const Emotion = styled(TouchableOpacity)`
    align-items: center;
    flex: 1; /* Equal flex for each Emotion to distribute space evenly */
`; 

export const CorrectIcon = styled(TouchableOpacity)`
margin-right: 35px;
`; 

export const TextStyle2 = styled.Text`
    padding-top: 10px;
    fontSize: 15px;
    color: ${text};
    text-align: center;
`; 

export const NavBarContainer2 = styled.View` 
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-bottom: 30px;
background-color: ${primary};
`; 

export const SearchIcon = styled.TouchableOpacity`
padding-top: 40px;
padding-left: 10px;

`;

export const SettingsIcon = styled.TouchableOpacity`
padding-top: 40px;
padding-left: 250px;
`;

export const BioSection = styled.View`
flex-direction: row;
padding-left: 10px;
`;

export const LeftFlex = styled.View`
flex-direction: column;
justify-content: space-between;
margin-right: 10px;
`;

export const ProfilePicture = styled.View`
border-radius: 50px;
width: 98px;
height: 98px;
background-color: ${light_primary};
padding: 37px;
margin-bottom: 20px;
`;

export const FollowButton = styled.TouchableOpacity`
border-radius: 50px;
width: 85px;
height: 33px;
margin-top: 5px;
margin-left: 8px;
padding-top: 8px;
padding-left: 22px;
background-color: ${Follow};
`;

export const FollowText = styled.Text`
font-size: 15px;
font-weight: semi-bold;
`;

export const RightFlex = styled.View`
flex-direction: column;
justify-content: space-between;
`;

export const TopFlex = styled.View`
flex-direction: column;
`;

export const UserName = styled.Text`
font-size: 15px;
font-weight: bold;
padding-top: 15px;
padding-left: 25px;
`;

export const BioText = styled.Text`
color: ${Bio};
padding-top: 20px;
padding-left: 27px;
`;

export const BottomFlex = styled.View`
flex-direction: row;
justify-content: space-around;
height: 50px;
width: 200px;
margin-left: 10px;
`;

export const Group = styled.View`
flex-direction: column;
justify-content: space-between;
flex-wrap: wrap;
`;

export const Number = styled.Text`
font-size: 15px;
font-weight: bold;
text-align: center;
`;

export const GroupText = styled.Text`
font-size: 13px;
font-weight: semi-bold;
text-align: center;
`;

export const SubHeader = styled.Text`
font-size: 15px;
font-weight: bold;
margin-top: 50px;
margin-left: 100px;
color: ${subHeader};
`;

export const Line3 = styled.View`
height:1px;
width:40%;
margin-vertical:10px;
margin-top: 10px;
margin-left: 100px;
background-color: black;
`;

export const FavouritesFlex = styled.View`
flex-direction: row;
justify-content: space-around;
width: 100%;
height: 150px;
margin-top: 20px;
`;

export const FavoriteGroup = styled.View`
flex-direction: column;
`;

export const FavoriteGroupBox = styled.View`
border-radius: 0px;
width: 100px;
height: 100px;
background-color: ${groupBox};
padding-top: 38px;
padding-left: 38px;
`;

export const FavoriteGroupBoxName = styled.Text`
font-size: 15px;
text-align: center;
padding-top: 15px;
`;

export const FlewRow = styled.View`
flex-direction: row;
width: 100%;
height: 120px;
`;

export const SubHeaderGroup = styled.View`
flex-direction: column;
width: 70%;
`;

export const SubHeader2 = styled.Text`
font-size: 15px;
font-weight: bold;
margin-top: 50px;
margin-left: 110px;
color: ${subHeader};

`;

export const Line4 = styled.View`
height:2px;
width:47%;
margin-vertical:10px;
margin-bottom:10px;
margin-left: 90px;
background-color: ${text};
`;

export const EditGroup = styled.TouchableOpacity`
flex-direction: row;
justify-content: space-between;
width: 30%;
padding-top: 52px;
`;

export const QuoteBox = styled.TouchableOpacity`
flex-direction: row;
justify-content: space-around;
align-items: center;
border-radius: 5px;
width: 350px;
height: 109px;
background-color: ${quoteBox};
margin-left: 40px;
padding: 40px;
`;

export const ProfileInfo = styled.View`
flex-direction: row;
justify-content: space-around;
align-items: center;
border-radius: 15px;
width: 280px;
height: 75px;
background-color: ${moreColor};
margin-top: 15px;
margin-left: 25px;
margin-bottom: 50px;
padding-top: 30px;
padding-left: 30px;
`;

export const ProfilePicture2 = styled.TouchableOpacity`
border-radius: 50px;
width: 50px;
height: 50px;
background-color: ${light_primary};
padding: 15px;
margin-right: 30px;
margin-bottom: 30px;
`;

export const UserName2 = styled.Text`
font-size: 15px;
font-weight: bold;
padding-bottom: 30px;
padding-right: 45px;
color: ${nameColor};
`;

export const Flex1 = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
margin: 8px;
`;

export const Flex2 = styled.TouchableOpacity`
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 20px;
margin-left: 10px;
`;

export const Preferences = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
border-radius: 15px;
width: 280px;
height: 80px;
background-color: ${moreColor};
margin-left: 25px;
margin-bottom: 15px;
`;

export const Theme = styled.Text`
font-size: 13px;
font-weight: bold;
padding-left: 25px;
padding-right: 25px;
color: ${nameColor};
`;

export const Theme2 = styled.Text`
font-size: 13px;
font-weight: bold;
color: ${nameColor};
padding-left: 25px;
`;

export const RightArrow = styled.View`
padding-right: 20px;
`;

export const BookManagement = styled.View`
border-radius: 15px;
width: 280px;
height: 90px;
background-color: ${moreColor};
margin-left: 25px;
margin-bottom: 15px;
`;

export const Tutorials = styled.View`
border-radius: 15px;
width: 280px;
height: 60px;
background-color: ${moreColor};
margin-left: 25px;
margin-bottom: 15px;
`;

export const Support = styled.View`
border-radius: 15px;
width: 280px;
height: 130px;
background-color: ${moreColor};
margin-left: 25px;
margin-bottom: 15px;
`;

export const DiscoverPageContainer = styled.View`
   flex: 1;
  padding: 20px;
  background-color: ${primary};
  border-radius: 10px;
  shadow-color: ${secondary};
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  //elevation: 5;
`;

export const HistoryFlex1 = styled.TouchableOpacity`
flex-direction: column;
width: 80%;
height: 22%;
border: 1px solid #424866;
margin-top: 100px;
margin-left: 32px;
background-color: ${moreColor};
border-radius: 15px;
`;

export const HistoryFlex2 = styled.TouchableOpacity`
flex-direction: column;
width: 80%;
height: 22%;
border: 1px solid #424866;
margin-top: 30px;
margin-left: 32px;
background-color: ${moreColor};
border-radius: 15px;
`;


export const HistoryFlexRow = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 1vw;
height: 0.25vh;
margin: 3%;
`;

export const HistoryText = styled.Text`
font-size: 15px;
color: ${historyColor};
`;

export const StarFlex = styled.View`
flex-direction: row;
`;

export const FavoritesFlex = styled.View`
flex-direction: column;
width: 80%;
height: 100%;
margin-top: 80px;
margin-left: 32px;
`;

export const FavoritesFlexRow = styled.View`
flex-direction: row;
justify-content: space-around;
width: 100%;
height: 40%;
margin-top: 25px;
padding-top: 10px;
`;



export const FavoritesBox = styled.View`
width: 90px;
height: 100px;
background-color: ${groupBox};
padding-top: 38px;
padding-left: 38px;
`;
