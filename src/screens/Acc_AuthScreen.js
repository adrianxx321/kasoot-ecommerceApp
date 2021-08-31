import React, { useState, useEffect } from "react"
import { View } from "react-native"

import * as firebase from "firebase"

import 'intl'
import 'intl/locale-data/jsonp/en'

// Check the user is logged in or not
const CheckLogin = ({navigation}) => {

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
        navigation.navigate("Login Screen")
    } else {
        navigation.navigate("Home Page")
    }

    return (
        <View>
        </View>
    )
}

export default CheckLogin