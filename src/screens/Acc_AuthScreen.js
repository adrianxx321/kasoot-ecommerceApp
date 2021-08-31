import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

import * as firebase from "firebase"
import * as FirebaseServices from "../services/firestore"



import auth from 'firebase/auth'

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_General } from "../components/ScreenRatio-General"
import { out } from "react-native/Libraries/Animated/src/Easing"



const CheckLogin = ({navigation}) => {

    // See user is logged in or not
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;


    // Change the logic accordingly to your screen
    if (!user) {
        //alert("Currently is GUEST!")
        navigation.navigate("Login Screen")
    } else {
        alert('Welcome To KASOOT! \nYou are logged in as "' + user.email + '" !')
        navigation.navigate("Home Page")
    }

    return (
        <View>
        </View>
    )
}

export default CheckLogin