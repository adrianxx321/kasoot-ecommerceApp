import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

import * as FirebaseServices from "../services/firestore"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_General } from "../components/ScreenRatio-General"
import { out } from "react-native/Libraries/Animated/src/Easing"

const LoginScreen = ({navigation}) => {

    const [typedEmail,setTypedEmail] = useState('');
    const [typedPassword, setTypedPassword] = useState('')


    // Do Login & Data Verification
    const LoginToApp = (typedEmail, typedPassword) => {
        try {
            
            if (typedEmail == '' && typedPassword == '') {

                alert("Email and Password are required for login!")
                console.log("Login FAILED: Email and Password are both EMPTY!")

            }else if (typedEmail == '') {

                alert("Email is required for login!")
                console.log("Login FAILED: Email is EMPTY!")

            } else if (typedPassword == '') {

                alert("Password is required for login!")
                console.log("Login FAILED: Password is EMPTY!")

            } else if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(typedEmail) == false) {
                
                alert("Please enter a valid email for login!")
                console.log("Login FAILED: User entered an INVALID email format!")

            } else {
                
                // Do Login
                FirebaseServices.signIn(String(typedEmail).toLowerCase(),typedPassword)
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    // Set the Kasoot! Logo
    const renderKasootLogo = () => {
        return (
            <SafeAreaView
                style={{
                    marginTop: ScreenRatio_General(50),
                    marginHorizontal: ScreenRatio_General(30),
                    alignItems: 'center',
                }}>
                <Image
                    source={require("../../assets/icons/kasoot_logo.png")}
                    resizeMode='contain'
                    style={{
                        height: ScreenRatio_General(125), 
                        width: ScreenRatio_General(350), 
                    }}/>
            </SafeAreaView>
        )
    }

    // Set the Header Title
    const renderTitle = () => {
        return (
            <SafeAreaView>
                <Text
                    style={{
                        fontSize: ScreenRatio_General(50),
                        textAlign: 'center',
                        marginTop: ScreenRatio_General(10),
                        marginHorizontal: ScreenRatio_General(30),
                        color: "#de651d",
                        fontWeight: "bold",
                    }}>
                        Login to your KASOOT! Account
                </Text>
            </SafeAreaView>
        )
    }

    const renderLoginBox = () => {
        return (
            <SafeAreaView
                style={{
                    backgroundColor: "#ffffff",
                    marginTop: ScreenRatio_General(50),
                    marginHorizontal: ScreenRatio_General(60),
                    paddingTop: ScreenRatio_General(10),
                    paddingBottom: ScreenRatio_General(30),
                    borderRadius: ScreenRatio_General(30),
                    borderWidth: 1,
                    borderColor: "#A9A9A9",
                }}>
                
                {/* Ask Username */}
                <Text
                    style={{
                    fontSize: ScreenRatio_General(22),
                    textAlign: 'left',
                    marginHorizontal: ScreenRatio_General(40),
                    color: "#000000",
                    fontWeight: "bold",
                }}>
                    Email
                </Text>
                <TextInput
                    placeholder="Your_Email@Email.com"
                    keyboardType= 'email-address'
                    autoCapitalize="none"
                    autoCorrect={false}

                    onChangeText={(input) => setTypedEmail(input)}

                    style={{
                            flexShrink: 1, 
                            fontSize: ScreenRatio_General(20),
                            marginHorizontal: ScreenRatio_General(30),
                            backgroundColor: "#ffffff",
                            height: ScreenRatio_General(70),
                            margin: ScreenRatio_General(15),
                            borderColor: "#4f4f4f",
                            borderBottomWidth:1,                           
                            borderRadius: 5,
                            padding: 10,
                            width: "80%", 
                    }}
                />

                {/* Ask Password */}
                <Text
                    style={{
                    fontSize: ScreenRatio_General(22),
                    textAlign: 'left',
                    marginTop: ScreenRatio_General(30),
                    marginHorizontal: ScreenRatio_General(40),
                    marginBottom: ScreenRatio_General(0),
                    color: "#000000",
                    fontWeight: "bold",
                }}>
                    Password
                </Text>
                <TextInput
                    placeholder="Your Password"
                    keyboardType= 'default'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(input) => setTypedPassword(input)}
                    style={{
                            flexShrink: 1, 
                            fontSize: ScreenRatio_General(20),
                            marginHorizontal: ScreenRatio_General(30),
                            backgroundColor: "#ffffff",
                            height: ScreenRatio_General(70),
                            margin: ScreenRatio_General(15),
                            borderColor: "#4f4f4f",
                            borderBottomWidth:1,                           
                            borderRadius: 5,
                            padding: 10,
                            width: "80%",
                    }}
                />   
             
             <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',

                    bottom: -20,
                    paddingBottom: ScreenRatio_General(28),
                    width: "90%",
                    marginHorizontal: ScreenRatio_General(25),
                }}>

                {/* For Login Button */}
                <TouchableOpacity
                    style={{
                        width: '50%',
                    }}

                    onPress={() => {
                        LoginToApp(typedEmail,typedPassword)
                    }}
                    >
                    <Text style={{
                        backgroundColor: "#de651d",
                        color: "#ffffff",
                        fontWeight: "500",
                        paddingVertical: ScreenRatio_General(16),
                        borderRadius: ScreenRatio_General(32),
                        fontSize: ScreenRatio_General(25),
                        overflow: "hidden",
                        textAlign: "center",
                    }}>
                        Login
                    </Text>
                </TouchableOpacity>


                {/* No Account - Go To Sign Up */}
                <TouchableOpacity
                    style={{
                        width: '70%'
                    }}
                    onPress={() => navigation.navigate("Sign Up Screen")}
                    >

                    <Text style={{
                        color: "#000000",
                        fontWeight: "500",
                        paddingVertical: ScreenRatio_General(20),
                        fontSize: ScreenRatio_General(18),
                        overflow: "hidden",
                        textAlign: "center",
                    }}>
                        Don't have an account? Create here
                    </Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        )
    }

    //Shows all the inputted screen
    return (
        <View>
            <ScrollView>
                {renderKasootLogo()}
                {renderTitle()}
                {renderLoginBox()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: ScreenRatio_General(17),
        marginVertical: ScreenRatio_General(10),
        marginHorizontal: ScreenRatio_General(10),
        borderRadius: 10,
        borderWidth: 3,
    },
      headerButtons: {
        width: ScreenRatio_General(30),
        height: ScreenRatio_General(30),
    },
    space: { 
        height: ScreenRatio_General(40),
    },
}); 

export default LoginScreen