import * as React from "react";
import { FlatList, ScrollView, Text,StyleSheet ,View,Button} from "react-native";
import {
    Container,
  FooterContainer,
  HistoryFlex1,
  HistoryFlex2,
  HistoryFlexRow,
  HistoryText,
  IconButton,
  NavBarContainer,
  PageContent,
  StarFlex,
    TextStyle2,
  Colors,
  QuoteBox,
  Line2,
  Line3,
  Line,
  HeadingStyle,
  TextStyle,
  ProfileIcon,
} from "../Components/Styles";
import StarRating from "../Components/StarRating";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const { secondary, text, primary, inText ,heading,historyColor} = Colors;
export default function Recommend({ route }) {
    const { books } = route.params;
  const navigation = useNavigation();
  const RenderRecommendations = ({ item }) => (
      
      <View style={styles.container}>
          <View style={styles.textContainer}>
              {/* will make text touchable opacity */}
        <Text style={styles.title}>{item.Title}</Text>  
              <Text style={styles.authors}>by {item.authors}</Text>
              {/* <Line></Line> */}
              <Text>                  </Text>
              <Text style={styles.text}>Genre : {item.categories}</Text>
              <Text style={styles.text}>Top Emotions : {item.top_emotions}</Text>
              <StarFlex>
    
             <StarRating rating={item.avg_rating} />
         </StarFlex>
      </View>
    </View>
              
  );
    console.log("Books", books);
    return (
        
        <Container>
            <PageContent>
            <NavBarContainer>
           
            <Text style={styles.screenTitle}>Your Recommendation List</Text>
              
            </NavBarContainer>
            
            <FlatList
              data={books}
              renderItem={RenderRecommendations}
              keyExtractor={(item, index) => index.toString()}
                />
            </PageContent>


            
          </Container>
        );
}
const styles = StyleSheet.create({
    list: {
      padding: 10,
    },
    image: {
      width: 60,
      height: 80,
      marginRight: 10,
    },
    button: {
      width: 50,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
      borderRadius: 5,
      overflow: "hidden",
      backgroundColor: secondary,
      alignItems: "center",
    },
    textContainer: {
      flex: 1,
      marginRight: 10,
      backgroundColor: primary,
    },
    title: {
      fontWeight: "bold",
        fontSize: 17,
      color:historyColor,
    
    },  screenTitle: {
        fontWeight: "bold",
          fontSize: 25,
        color: heading,
  
        paddingTop: 50,
      paddingLeft: 35
        
      },
    authors: {
        color: text,
        fontSize:16,
    },
    container: {
      flexDirection: "row",
      flex: 1,
      padding: 20,
      borderRadius: 10,
      shadowColor: secondary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 10,
      backgroundColor: primary,
      marginTop: 50,
      marginLeft: 10,
      width: 380
    },
    footer: {
      width: "90%",
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
        fontSize: 16,
        color:heading,
    }
  });