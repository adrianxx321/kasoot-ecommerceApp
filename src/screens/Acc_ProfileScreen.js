import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

import * as FirebaseServices from "../services/firestore"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_General } from "../components/ScreenRatio-General"

const ProfileScreen = ({navigation}) => {

    const [currentUserEmail, setCurrentUserEmail] = useState(FirebaseServices.getUserEmail)

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
                        fontSize: ScreenRatio_General(70),
                        textAlign: 'center',
                        marginTop: ScreenRatio_General(60),
                        marginHorizontal: ScreenRatio_General(30),
                        color: "#de651d",
                        fontWeight: "bold",
                    }}>
                        Your Profile
                </Text>
            </SafeAreaView>
        )
    }

    // Display Profile Picture
    const renderProfilePicture = () => {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: "hidden",
                    
                    bottom: -20,
                    paddingBottom: ScreenRatio_General(28),
                    width: "90%",
                    marginHorizontal: ScreenRatio_General(25),
                }}>

                <View
                style={{
                    borderColor: "#000000", 
                    borderRadius: 1000,
                    borderWidth: 3,
                    height: ScreenRatio_General(220), 
                    width: ScreenRatio_General(220), 
                    alignItems: "center",
                }}>
                    <Image
                        source={require("../../assets/icons/profile.png")}
                        resizeMode="contain"
                        style={{
                            height: ScreenRatio_General(180), 
                            width: ScreenRatio_General(180), 
                            bottom: -2
                        }}/>
                </View>
            </View>
        )
    }

    const renderProfileBox = () => {

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

                {/* Show USER EMAIL */}
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
                    
                    value={currentUserEmail}
                    editable={false}

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
                            color:"#777777",
                    }}
                />

                {/* Show USER PASSWORD */}
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
                    
                    value={'****************'}
                    editable={false}

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
                            color:"#777777",
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

                        {/* For LOGOUT Button */}
                        <TouchableOpacity
                        style={{
                            width: '50%',
                        }}

                        onPress={() => {
                            FirebaseServices.signOut()
                            navigation.navigate("Login Screen")
                        }}
                        >
                        <Text style={{
                            backgroundColor: "#E3242B",
                            color: "#ffffff",
                            fontWeight: "500",
                            paddingVertical: ScreenRatio_General(16),
                            borderRadius: ScreenRatio_General(32),
                            fontSize: ScreenRatio_General(25),
                            overflow: "hidden",
                            textAlign: "center",
                        }}>
                            LOG OUT
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
                {renderHeader()}
                {renderTitle()}
                {renderProfilePicture()}
                {renderProfileBox()}
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

export default ProfileScreen