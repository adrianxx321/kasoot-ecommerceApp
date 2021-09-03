import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, AsyncStorage } from  "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

const SearchScreen = ({navigation}) => {
    const [search, setSearch] = useState('')

    const [searchHistoryList, setSearchHistoryList] = useState([]);

    useEffect( () => {
        readSearchHistory();
    }, []);


   const updateSearchHistory = async (searchHistoryList) => {
        try {
            await AsyncStorage.setItem('searchHistoryList', JSON.stringify(searchHistoryList));
            console.log("History updated")
        } catch (error) {
            console.log('## ERROR SAVING ITEM ##: ', error);
        }
    };

    const readSearchHistory = async () => {
        try {
            const searchHistoryListString = await AsyncStorage.getItem('searchHistoryList');
            if (searchHistoryListString !== null) {
                setSearchHistoryList(JSON.parse(searchHistoryListString));
            }
        } catch (error) {
            console.log('## ERROR READING ITEM ##: ', error);
        }
    };

    const clearSearchHistory = async () => {
        try{
            await AsyncStorage.removeItem('searchHistoryList');
            const reset = [];
            setSearchHistoryList(reset);
        } catch (error) {
            console.log('## ERROR CLEARING ITEM ##: ', error);
        }
    }


    const renderItem = ({ item }) => (
        <Item phrase={item.phrase} />
    );

    const Item = ({ phrase }) => (
        <View>
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate("Search Products", {passedSearchTerm: phrase});
                }}>
            <Text style={{
                    color: "#000000",
                    fontWeight: "500",
                    fontSize: ScreenRatio_iPhone(18),
                    padding: ScreenRatio_iPhone(7),
                    marginHorizontal: ScreenRatio_iPhone(25),
                    lineHeight: ScreenRatio_iPhone(32)
                }}>{phrase}</Text>
            </TouchableWithoutFeedback>
        </View>
    );

    return (
        <SafeAreaView>
            <View style={{
                zIndex: 1,
                marginStart: ScreenRatio_iPhone(15),
                marginVertical: ScreenRatio_iPhone(25),
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginHorizontal: ScreenRatio_iPhone(15)
            }}>
                <View style={{
                    flexDirection: "row",
                    borderWidth: ScreenRatio_iPhone(2),
                    borderRadius: ScreenRatio_iPhone(30),
                    width: "80%",
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
                        onSubmitEditing={() => {
                            if(search.length > 0) {
                                setSearchHistoryList(searchHistoryList => [{
                                    id: searchHistoryList.length.toString(),
                                    phrase: search
                                }, ...searchHistoryList]);
                                updateSearchHistory(searchHistoryList);
                                navigation.navigate("Search Products", {passedSearchTerm: search})
                            }
                        }}
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
                        if(search.length > 0) {
                            setSearchHistoryList(searchHistoryList => [{
                                id: searchHistoryList.length.toString(),
                                phrase: search
                            }, ...searchHistoryList]);
                            updateSearchHistory(searchHistoryList);
                            navigation.navigate("Search Products", {passedSearchTerm: search})
                        }
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
            </View>
            
            <TouchableOpacity style={{
                flexDirection: 'row-reverse',
                backgroundColor: '#AEA9A9',
                alignSelf: "flex-end",
                borderRadius: ScreenRatio_iPhone(30),
                marginBottom: ScreenRatio_iPhone(7),
                padding: ScreenRatio_iPhone(3),
                paddingEnd: ScreenRatio_iPhone(10),
                marginHorizontal: ScreenRatio_iPhone(10)
                }}
                onPress={() => {
                    clearSearchHistory();
                }}>
                <Image
                    source={require("../../assets/icons/close.png")}
                    resizeMode="contain"
                    style={{
                        marginEnd: ScreenRatio_iPhone(7),
                        marginStart: ScreenRatio_iPhone(10),
                        width: ScreenRatio_iPhone(24),
                        height: ScreenRatio_iPhone(24),
                    }}
                />
                <Text style={{color: "#000000", alignSelf: "center"}}>Clear all history</Text>
            </TouchableOpacity>
            <FlatList 
                data={searchHistoryList}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={{paddingBottom: ScreenRatio_iPhone(150)}}
                style={{height: "100%"}}
            />
        </SafeAreaView>
    )
}

export default SearchScreen
