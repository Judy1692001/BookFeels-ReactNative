import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating }) => {
    //takes the integer part of the rating and calculate the number of filled stars.
    const filledStars = Math.floor(rating);
    //calculate the number of empty stars 
    const emptyStars = 5 - filledStars;
    return (
        <View style={{ flexDirection: 'row' }} >
            {/* Creates an array with the length of filled stars and maps over it 
            to render icon component. */}
            {[...Array(filledStars)].map((_, index) => (
                <Icon key={index} name="star" size={24} color = "#A67FBF" />
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <Icon key={index} name="star-o" size={24} color = "#A67FBF" />
            ))}

        </View>

    );
}
export default StarRating;