import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

import * as firebase from "firebase"
import * as FirebaseServices from "../services/firestore"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_General } from "../components/ScreenRatio-General"



const RegisterScreen = ({navigation}) => {

    const [typedEmail,setTypedEmail] = useState('');
    const [typedPassword, setTypedPassword] = useState('')
    const [typedConfirmPassword, setTypedConfirmPassword] = useState('')


    // Do Register & Data Verification
    const SignUpToApp = (typedEmail, typedPassword) => {
        try{
            if (typedEmail == '' && typedPassword == '') {
                
                alert("Email and Password are required for register!")
                console.log("Register FAILED: Email and Password are both EMPTY!")

            } else if (typedEmail == '') {
                   
                alert("Email is required for register!")
                console.log("Register FAILED: Email is EMPTY!")

            } else if (typedPassword == '') {
                       
                alert("Password is required for register!")
                console.log("Register FAILED: Password is EMPTY!")
  
            } else if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(typedEmail) == false) {
                
                alert("Please enter a valid email for register!")
                console.log("Register FAILED: User entered an INVALID email format!")

            } else if (typedPassword.length < 6) {
               
                alert("Password must be at least 6 characters!")
                console.log("Register FAILED: User entered password LESS THAN 6 characters!")
            
            } else if (typedPassword != typedConfirmPassword) {

                alert("The two Passwords do not match!")
                console.log("Register FAILED: User's Password & Confirm Password NOT MATCH!")

            } else {

                //Do Register
                FirebaseServices.signUp(String(typedEmail).toLowerCase(), typedPassword)
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    // Set the Header - Back Button
    const renderHeader = () => {
        return (
            <SafeAreaView
                style={{
                    zIndex: 3,
                    marginHorizontal: ScreenRatio_General(15),
                    marginVertical: ScreenRatio_General(15),
                    flexDirection: "row",
                    justifyContent: "space-between",
                    position: "absolute",
                    left: 0,
                    right: 0
                }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home Page")}
                    //onPress={() => navigation.goBack()}
                    >
                    <Image
                        source={require("../../assets/icons/back.png")}
                        resizeMode="contain"
                        style={styles.headerButtons}
                    />
                </TouchableOpacity>
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
                        marginTop: ScreenRatio_General(60),
                        marginHorizontal: ScreenRatio_General(30),
                        color: "#de651d",
                        fontWeight: "bold",
                    }}>
                        Register a Kasoot! Account
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
                
                {/* Ask Email */}
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
                            width: ScreenRatio_General(430), 
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
                            width: ScreenRatio_General(430), 
                    }}
                />

                {/* Ask Confirm Password */}
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
                    Confirm Password
                </Text>

                <TextInput
                    placeholder="Your Confirm Password"
                    keyboardType= 'default'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}

                    onChangeText={(input) => setTypedConfirmPassword(input)}

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
                            width: ScreenRatio_General(430), 
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

                {/* For Register Button */}
                <TouchableOpacity
                    style={{
                        width: '50%',
                    }}

                    onPress={() => SignUpToApp(typedEmail,typedPassword)}
                    //onPress={() => alert(typedPassword)}
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
                        Register
                    </Text>
                </TouchableOpacity>


                {/* Have Account - Go To Login Account */}
                <TouchableOpacity
                    style={{
                        width: '50%'
                    }}
                    onPress={() => navigation.navigate("Login Screen")}
                    >

                    <Text style={{
                        //backgroundColor: "#000000",
                        color: "#000000",
                        fontWeight: "500",
                        paddingVertical: ScreenRatio_General(20),
                        //borderRadius: ScreenRatio_General(32),
                        fontSize: ScreenRatio_General(18),
                        overflow: "hidden",
                        textAlign: "center",
                    }}>
                        Have an account? Login
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
                {/*renderHeader()*/}
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

export default RegisterScreen