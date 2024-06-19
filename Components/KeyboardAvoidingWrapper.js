import React from 'react';


import { KeyboardAvoidingView, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
//TouchableWithoutFeedback to mack sure that the keyboard will automatically
///closes whenever the user touches anywhere on the screen.
// Keyboard to close the keyboard.
const KeyboardAvoidingWrapper =({children}) => {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                   {children}
                </TouchableWithoutFeedback>
            </ScrollView>
 
        </KeyboardAvoidingView>

    );
}
export default KeyboardAvoidingWrapper;