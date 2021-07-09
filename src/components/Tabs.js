import React from "react"
import { Image, StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeScreen from "../screens/HomeScreen"
import BagScreen from "../screens/BagScreen"
import MoreScreen from "../screens/MoreScreen"
import NewsFeed from "../screens/NewsFeed"
import Wishlist from "../screens/Wishlist"

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return(
        <SafeAreaView style={{flex: 1}} >
            <Tab.Navigator
                tabBarOptions={
                    {
                        activeTintColor: "#f58b4b",
                        style: {
                            elevation: 0, // This is for Android.
                            borderTopWidth: 0,
                            position: "absolute",
                            height: 55,
                            bottom: 30,
                            marginHorizontal: 20,
                            borderRadius: 30
                        },
                        showLabel: false
                    }
                }>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Image
                                source={focused? require("../../assets/icons/home-selected.png"): require("../../assets/icons/home.png")}
                                resizeMode="contain"
                                style={colorTabIcon({focused}).tabIcon}
                            />
                        )
                    }}></Tab.Screen>
                <Tab.Screen 
                    name="Feeds"
                    component={NewsFeed}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Image
                                source={focused? require("../../assets/icons/news-selected.png"): require("../../assets/icons/news.png")}
                                resizeMode="contain"
                                style={colorTabIcon({focused}).tabIcon}
                            />
                        )
                    }}></Tab.Screen>
                <Tab.Screen
                    name="My Bag"
                    component={BagScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Image
                                source={focused? require("../../assets/icons/bag-selected.png"): require("../../assets/icons/bag.png")}
                                resizeMode="contain"
                                style={colorTabIcon({focused}).tabIcon}
                            />
                        )
                    }}></Tab.Screen>
                <Tab.Screen
                    name="Wishlist"
                    component={Wishlist}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Image
                                source={focused? require("../../assets/icons/wishlist-selected.png"): require("../../assets/icons/wishlist.png")}
                                resizeMode="contain"
                                style={colorTabIcon({focused}).tabIcon}
                            />
                        )
                    }}></Tab.Screen>
                <Tab.Screen
                    name="More"
                    component={MoreScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Image
                                source={focused? require("../../assets/icons/more-selected.png"): require("../../assets/icons/more.png")}
                                resizeMode="contain"
                                style={colorTabIcon({focused}).tabIcon}
                            />
                        )
                    }}></Tab.Screen>
            </Tab.Navigator>
        </SafeAreaView>
    )
}

function colorTabIcon({focused}) {
    return StyleSheet.create({
        tabIcon: {
            width: 25,
            height: 25,
            tintColor: focused? "#f58b4b" : "#c2c2c2",
        }
    })
}

export default Tabs;
