import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, TextInput, TouchableWithoutFeedback } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as algolia from "../services/algolia"
import ProductCard from "../components/ProductCard"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

const SearchScreen = ({navigation}) => {
    const [search, setSearch] = useState('')

    return (
        <SafeAreaView
            style={{
                zIndex: 1,
                marginStart: ScreenRatio_iPhone(15),
                marginVertical: ScreenRatio_iPhone(25),
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: ScreenRatio_iPhone(15)
            }}>
            <TouchableOpacity style={{marginEnd: ScreenRatio_iPhone(5)}}
                onPress={() => {navigation.goBack()}}>
                <Image
                    source={require("../../assets/icons/back.png")}
                    resizeMode="contain"
                    style={{
                        width: ScreenRatio_iPhone(30),
                        height: ScreenRatio_iPhone(30)
                    }}/>
            </TouchableOpacity>
            <View style={{
                flexDirection: "row",
                borderWidth: ScreenRatio_iPhone(2),
                borderRadius: ScreenRatio_iPhone(30),
                width: "70%",
                borderColor: "#f58b4b",
                justifyContent: "space-evenly",
                bottom: ScreenRatio_iPhone(7)
            }}>
                <Image
                    source={require("../../assets/icons/search.png")}
                    resizeMode="contain"
                    style={{
                        width: ScreenRatio_iPhone(30),
                        height: ScreenRatio_iPhone(30),
                        marginStart: ScreenRatio_iPhone(7),
                        marginVertical: ScreenRatio_iPhone(7),
                        marginEnd: ScreenRatio_iPhone(10)
                    }}
                />
                <TextInput
                    placeholder="Search in Kasoot"
                    keyboardType="web-search"
                    onChangeText={(input) => setSearch(input)}
                    style={{width: "70%", flexShrink: 1, fontSize: ScreenRatio_iPhone(18)}}
                    value={search}
                />
                <TouchableWithoutFeedback onPress={() => setSearch("")}>
                    <Image
                        source={require("../../assets/icons/close.png")}
                        resizeMode="contain"
                        style={{
                            marginEnd: ScreenRatio_iPhone(7),
                            marginVertical: ScreenRatio_iPhone(10),
                            marginStart: ScreenRatio_iPhone(10),
                            width: ScreenRatio_iPhone(24),
                            height: ScreenRatio_iPhone(24),
                        }}
                    />
                </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Search Products", {passedSearchTerm: search})
                }}>
                <Text style={{
                    color: "#f58b4b",
                    fontWeight: "500",
                    fontSize: ScreenRatio_iPhone(16),
                    textAlign: "center",
                    padding: ScreenRatio_iPhone(7),
                }}>Search
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SearchScreen