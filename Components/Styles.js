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
    historyColor: '#424866' ,
    faqPar: '#4B3B3B' ,
    faqLine: '#C1B2B2' ,
};

const { primary, secondary, heading, text,inText,dark_primary, notvalid , notvalidtxt, light_primary, Bio, Follow, subHeader, groupBox, quoteBox, moreColor, nameColor, historyColor, faqPar, faqLine } = Colors;

//used
export const Container = styled.View`
flex: 1;
padding: 10px; 
padding-top:${StatusBarHeight + 10}px; 
backgroundColor:${primary};
contentContainerStyle={{ justifyContent: 'space-between' }};
justifyContent: 'space-between';
`;

//used
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

//used
export const WelcomePageLogo = styled.Image` 
    height: 199px;
    width: 314px;
    margin-top:150px;
    margin-left: 4%;
`;

//used
export const PageLogo = styled.Image`
    height: 150px;
    width: 300px;
    margin-left: 50px;
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

//used
export const HeadingStyle = styled.Text`
    padding-top: 20%;
    padding-left: 3%;
    fontSize: 25px;
    color: ${heading};
    text-align: center;
    font-weight: 700;
`;

//used
export const TextStyle = styled.Text`
    padding: 25px;
    fontSize: 20px;
    color: ${text};
    text-align: center;
`;

//used
export const ButtonWrapper = styled.TouchableOpacity`
    width: 250px;
    border-radius: 5px;
    padding: 15px;
    flexDirection: 'row';
    justify-content: center;
    alignItems:center;
    background-color: ${({ disabled }) => (disabled ? notvalid : secondary)};
    margin-left:72px;
    margin-bottom: 100px;
    height:60px;
    
`;

//used
export const ButtonWrapper2 = styled.TouchableOpacity`
    width: 150px;
    border-radius: 5px;
    flexDirection: 'row';
    justify-content: center;
    alignItems:center;
    background-color: ${({ disabled }) => (disabled ? notvalid : secondary)};
    margin-left:110px;
    margin-top: 20px;
    margin-bottom: 30px;
    height:60px;
    
`;

//used
export const ButtonText = styled.Text`
    font-size: 25px;
    color: ${heading};
    text-align: center;
    font-weight: 700;

`;

//used
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
    width: 290px;
    margin-left: 30px;
    margin-bottom:20px;
    
 `;

 //used
 export const GoogleButtonText = styled.Text`
    font-size: 25px;
    color: ${heading};
    text-align: center;
    font-weight: 700;
    margin-left:10px;

   
`;

//used
export const PageTitle = styled.Text`
    font-size:40px;
    color: ${secondary};
    text-align: center;
    font-weight: 700;
    padding-left: 110px;
    margin-bottom:5px;

`;

//used
export const SubTitle = styled.Text`
    font-size:40px;
    color: ${heading};
    font-weight: 700;
    margin-bottom:30px;
    letter-spacing:1px;
    margin-top: 25px;
    margin-left: 140px;
`;

//used
export const StyleForm = styled.View`
   width:90%;
   margin-left: 20px;
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
//used
export const Line = styled.View`
height:1px;
width:100%;
backgroundColor:${inText};
margin-top:5px;
margin-bottom:25px;

`; 

export const StylingLinkView = styled.View`
    padding: 10px;
    flexDirection: 'row';
    justify-content: center;
    align-items:center;
`;

//used
export const StylingLinkText = styled.Text`
justify-content: center;
font-size:18px;
align-content:center;
color:${text};
margin-bottom: 10px;
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

//used
export const NavBarContainer = styled.View`;
width: 100%;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 10px;
background-color: ${primary};
`; 

//used
export const ProfileIcon = styled.TouchableOpacity`
  padding-top: 5%;
  padding-left: 5%;
`;

/* export const NotificationIcon = styled.TouchableOpacity` 
  padding: 5px;
`;  */

//used
export const EmotionContainer = styled.View`
align-items: center;
flex-direction: 'row';
height: 40%;
`;

//used
export const RowContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 100px;
    justify-content: center;
    margin-top: 20%;
`; 

//used
export const EmotionText = styled.Text`
  font-size: 30px;
  color: ${text};
  margin-top: 10%;
`; 

 export const EmotionName = styled.Text`
  font-size: 18px;
  padding-top: 10px;
`;  

//used
export const StyleOr = styled.Text`
color: ${text};
padding: 20px;
padding-left: 47%;
${'' /* fontSize:16px; */}
`; 

//used
export const Line2 = styled.View`
height:1px;
width:100%;
backgroundColor:${inText};
${'' /* margin-vertical:10px; */}
margin-top: 10%;
`; 

//used
export const InsightInput = styled.TextInput`
  flex: 1;
  border-radius: 15px;
  border: 1px solid #ccc;
  padding-left: 15px;
  backgroundColor: ${inText};
  height: 80px;
  margin-left: 70px;
  margin-right: 5%;
  margin-bottom: 5%;
  fontSize:16px;

`;

//used
export const FooterContainer = styled.View`
  padding: 10px 0;
  flex-direction: row;
  justify-content: space-around;
  ${'' /* margin-top: 10px; */}
`; 

//used
export const IconButton = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
`;

//used
export const IconButton2 = styled(TouchableOpacity)`
  margin-left: 10%;
  margin-bottom: 11%;
  margin-right: 10%;
`;

export const Emotion = styled(TouchableOpacity)`
    align-items: center;
    flex: 1;
`; 

/* export const CorrectIcon = styled(TouchableOpacity)`
margin-right: 19%;
margin-bottom: 18%;
`; */ 

//used
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

//used
export const BioSection = styled.View`
flex-direction: row;
${'' /* padding-left: 10%; */}
padding-top: 10%;
`;

//used
export const LeftFlex = styled.View`
flex-direction: column;
justify-content: space-between;
margin-right: 10%;
`;

//used
export const ProfilePicture = styled.TouchableOpacity`
border-radius: 50px;
width: 95px;
height: 95px;
background-color: ${light_primary};
padding: 35px;
padding-bottom: px;

`;

//used
export const FollowButton = styled.TouchableOpacity`
border-radius: 50px;
width: 100px;
height: 45px;
${'' /* margin-top: 5px; */}
margin-left: 10px;
padding-top: 8px;
padding-left: 26px;
background-color: ${Follow};
`;

//used
export const FollowText = styled.Text`
font-size: 16px;
font-weight: semi-bold;
`;

//used
export const RightFlex = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top:30px;
`;

//used
export const TopFlex = styled.View`
flex-direction: column;
`;

//used
export const UserName = styled.Text`
font-size: 18px;
font-weight: bold;
padding-top: 15px;
padding-left: 5px;
`;

//used
export const BioText = styled.Text`
color: ${Bio};
padding-top: 20px;
padding-left: 27px;
`;

//used
export const BottomFlex = styled.View`
flex-direction: column;
justify-content: space-around;
height: 50px;
width: 200px;
margin-left: 40px;

`;

//used
export const Group = styled.View`
flex-direction: column;
justify-content: space-between;
flex-wrap: wrap;
margin-left: 1px;
margin-top: 7px;
`;

//used
export const Number = styled.Text`
font-size: 17px;
font-weight: bold;
text-align: center;
`;

//used
export const GroupText = styled.Text`
font-size: 17px;
font-weight: semi-bold;
text-align: center;
`;

//used
export const SubHeader = styled.Text`
font-size: 16px;
font-weight: bold;
margin-top: 10%;
margin-left: 31%;
color: ${subHeader};
`;

//used
export const Line3 = styled.View`
height:1px;
width:45%;
margin-vertical:10px;
margin-top: 10px;
margin-left: 31%;
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

export const FavoriteGroupBoxTitle = styled.Text`
${'' /* fontWeight:bold; */}
fontSize: 17px;
text-align: center;
${'' /* font-size: 15px; */}
${'' /* text-align: center; */}
padding-top: 10px;
padding-left: 10px;
font-weight: bold;
`;

export const FavoriteGroupBoxAuthor = styled.Text`
${'' /* fontWeight:bold; */}
fontSize: 16px;
text-align: center;
color:${dark_primary};
${'' /* font-size: 15px; */}
${'' /* text-align: center; */}
padding-top: 10px;
`;

//used
export const FlewRow = styled.View`
flex-direction: row;
width: 70%;
height: 100px;
align-content: center; 
${'' /* margin-left: 1%; */}
margin-top: 1%;

`;

//used
export const SubHeaderGroup = styled.View`
flex-direction: column;
width: 80%;
`;

//used
export const SubHeader2 = styled.Text`
font-size: 16px;
font-weight: bold;
margin-top: 50px;
margin-left: 43%;
color: ${subHeader};

`;

//used
export const Line4 = styled.View`
height:2px;
width:57%;
margin-vertical:10px;
margin-bottom:10px;
margin-left: 39%;
background-color: ${text};
`;

/* export const Line5 = styled.View`
height:2px;
width:57%;
margin-vertical:10px;
margin-bottom:10px;
margin-left: 22%;
background-color: ${text};
`; */

//used
export const Line5 = styled.View`
height:2px;
width:52.5%;
margin-vertical:10px;
margin-bottom:20px;
margin-left: 24%;
background-color: ${text};
`;

//used
export const EditGroup = styled.TouchableOpacity`
width: 30%;
`;

//used
export const QuoteBox = styled.TextInput`
flex-direction: row;
justify-content: space-around;
align-items: center; 

border-radius: 50px;
${'' /* width: 300px; */}
height: 109px;
background-color: ${quoteBox};
${'' /* margin-left: 10px; */}
padding: 20px;
${'' /* margin-left: 3%; */}

fontSize:17px;
`;

//used
export const ProfileInfo = styled.View`
flex-direction: row;
align-items: center;
border-radius: 15px;
width: 85%;
height: 75px;
background-color: ${moreColor};
margin-top: 25%;
margin-left: 7%;
margin-bottom: 50px;
padding-top: 30px;
padding-left: 30px;
`;

//used
export const ProfilePicture2 = styled.TouchableOpacity`
border-radius: 50px;
width: 50px;
height: 50px;
background-color: ${light_primary};
padding: 15px;
margin-left: 15%;
margin-right: 15%;
margin-bottom: 30px;
`;

//used
export const UserName2 = styled.Text`
font-size: 16px;
font-weight: bold;
padding-bottom: 20px;
padding-right: 30px;
padding-right: 50%;
color: ${nameColor};
`;

//used
export const Flex1 = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
margin: 8px;
`;

//used
export const Flex2 = styled.TouchableOpacity`
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 20px;
margin-left: 10px;
`;

//used
export const Preferences = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
border-radius: 15px;
width: 85%;
height: 80px;
background-color: ${moreColor};
margin-left: 7%;
margin-bottom: 15px;
`;

//used
export const Theme = styled.Text`
font-size: 13px;
font-weight: bold;
padding-left: 25px;
padding-right: 25px;
color: ${nameColor};
`;

//used
export const Theme2 = styled.Text`
font-size: 15px;
font-weight: bold;
color: ${nameColor};
padding-left: 25px;
`;

//used
export const RightArrow = styled.View`
padding-right: 20px;
`;

//used
export const BookManagement = styled.View`
border-radius: 15px;
width: 85%;
height: 100px;
background-color: ${moreColor};
margin-left: 7%;
margin-bottom: 50px;
`;

//used
export const Support = styled.View`
border-radius: 15px;
width: 85%;
height: 130px;
background-color: ${moreColor};
margin-left: 7%;
margin-bottom: 50px;
`;

//used
export const LogOut = styled.View`
border-radius: 15px;
width: 85%;
height: 55px;
background-color: ${moreColor};
margin-left: 7%;
margin-bottom: 15px;
`;

//used
export const LogOutFlex = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
margin-top: 5%;
margin-left: 10%;
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

export const HistoryFlex1 = styled.View`
flex-direction: column;
width: 90%;
height: 90%;
border: 1px solid #424866;
margin-top: 10px;
margin-left: 11px;
background-color: ${moreColor};
border-radius: 15px;
`;

export const HistoryFlex2 = styled.View`
flex-direction: column;
width: 80%;
height: 22%;
border: 1px solid ${historyColor};
margin-top: 70px;
margin-left: 40px;
background-color: ${moreColor};
border-radius: 15px;
`;


export const HistoryFlexRow = styled.View`
flex-direction: row;
${'' /* justify-content: space-between; */}
align-items: center;
width: 1vw;
height: 0.25vh;
margin: 3%;
`;

export const HistoryText = styled.Text`
font-size: 16px;
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
${'' /* justify-content: space-around; */}
width: 75%;
height: 50%;
margin-top: 10px;

`;

export const FavoritesImage = styled.Image`
    height: 140px;
    width: 90px;
   margin-bottom:10px;
`;

export const FavoritesBox = styled.View`
${'' /* flex:1px; //caused problem. */}
backgroundColor: ${primary};
marginTop: 10;
justify-content:center;
`;

export const ReadingHistoryContainer = styled.View`
flex-direction: column;
margin-top: 25%;
margin-left: 3%;
height: 70%;
width: 95%;
`;

export const ReadingHistoryFlex = styled.View`
flex-direction: row;
justify-content: space-around;
align-items: center;
margin-bottom: 15%;
height: 40%;
width: 100%;
background-color: ${moreColor};
border-radius: 15px;
`;

export const BookDetails = styled.View`
flex-direction: column;
margin-right: 5%;
`;

export const BookDetailsText = styled.Text`
padding-bottom: 15%;
fontSize:16px;
margin-left:9px;
margin-top:11px;
`;

export const StarFlex2 = styled.View`
flex-direction: row;
margin-left: 4%;
`;

export const FAQHeader = styled.Text`
font-size: 28px;
color: ${nameColor};
margin-top: 25%;
margin-left: 3%;
`;

export const FAQParagraph = styled.Text`
font-size: 15px;
color: ${faqPar};
margin-top: 13%;
margin-left: 3%;
`;

export const FAQLine = styled.View`
height:1px;
width:100%;
backgroundColor:${faqLine};
margin-vertical:10px;
margin-top: 30px;
`; 

export const FAQLine2 = styled.View`
height:1px;
width:100%;
backgroundColor:${faqLine};
margin-vertical:10px;
margin-top: 15px;
`;

export const FAQQuestion = styled.Text`
font-size: 15px;
color: ${faqPar};
font-weight: bold;
margin-top: 5%;
margin-left: 19%;
`;

export const FAQButton = styled.TouchableOpacity`
margin-top: 30px;
margin-left: 21%;
margin-bottom: 5%;
width: 60%;
height: 50px;
border-radius: 50px;
background-color: ${moreColor};
border: 1px solid ${historyColor};
`;

export const FAQSubmitText = styled.Text`
font-size: 15px;
color: ${faqPar};
font-weight: bold;
margin-top: 14px;
margin-left: 20%;
`; 

export const AboutImage = styled.Image`
height: 199px;
width: 97%;
margin-top: 50px;
margin-left: 1.5%;
`;

export const AboutSubHeader = styled.Text`
font-size: 36px;
color: ${subHeader};
font-weight: bold;
margin-top: 25px;
margin-left: 1.5%;
`;

export const AboutParagraph = styled.Text`
font-size: 16px;
color: ${faqPar};
margin-top: 10%;
margin-left: 1.5%;
`;

export const RateHeader = styled.Text`
font-size: 24px;
font-weight: bold;
color: ${faqPar};
margin-top: 10%;
margin-left: 12%;
`;

export const RateParagraph = styled.Text`
font-size: 18px;
color: ${faqPar};
margin-top: 10%;
margin-left: 3%;
text-align: center;
`;

export const StarContainer = styled.View`
flex-direction: row;
justify-content: space around;
margin-top: 10%;
margin-left: 31%;
`;

export const RateSubmitButton = styled.TouchableOpacity`
margin-top: 40px;
margin-left: 33%;
margin-bottom: 5%;
width: 35%;
height: 38px;
border-radius: 50px;
background-color: ${moreColor};
border: 1px solid ${historyColor};
`;

export const SubmitText = styled.Text`
font-size: 20px;
color: ${faqPar};
text-align: center;
padding-top: 4%;
padding-right: 5%;
`;

export const RejectionTextContainer = styled.TouchableOpacity`
width: 50%;
margin-top: 1%;
margin-left: 21%;
`;

export const RejectionText = styled.Text`
font-size: 16px;
color: ${faqPar};
padding-left: 40.5%;
`;

export const FeedbackTextContainer = styled.TouchableOpacity`
width: 100%;
`;

export const FeedbackText = styled.Text`
font-size: 18px;
color: ${faqPar};
padding-top: 15%;
padding-left: 30%;
`;

export const FeedbackTitle = styled.Text`
    font-size:20px;
    color: ${faqPar};
    font-weight: 500;
    margin-bottom:50px;
    margin-top: 50px;
    margin-left: 30px;
`;

export const FeedbackImage = styled.Image`
height: 205px;
width: 60%;
margin-top: 80px;
margin-left: 70px;
`;