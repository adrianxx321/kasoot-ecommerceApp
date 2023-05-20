import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, TouchableWithoutFeedback, AsyncStorage, StyleSheet, Alert } from  "react-native"
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

    // Just a helper function that executes the rendering of individual history cell
    const renderItem = ({ item }) => (
        <Item phrase={item.phrase}/>
    );

    // Renders the individual cell of search history FlatList
    const Item = ({ phrase }) => (
      <View style={{borderBottomWidth: 1, borderBottomColor: "#AEA9A9"}}>
        <TouchableWithoutFeedback
          onPress={() => {
              navigation.navigate("Search Products", {passedSearchTerm: phrase});
          }}>
        <Text style={{
          color: "#000000",
          fontWeight: "500",
          fontSize: ScreenRatio_iPhone(18),
          marginHorizontal: ScreenRatio_iPhone(15),
          paddingVertical: ScreenRatio_iPhone(12),
          lineHeight: ScreenRatio_iPhone(32)
        }}>{phrase}</Text>
        </TouchableWithoutFeedback>
      </View>
    );

    return (
      <SafeAreaView
        style={{
          marginHorizontal: ScreenRatio_iPhone(15),
          marginVertical: ScreenRatio_iPhone(24)
        }}>
        {/* Heading (back button, search bar & search button) */}
        <View style={{
          zIndex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/icons/back.png")}
              resizeMode="contain"
              style={styles.backBtn}
            />
          </TouchableOpacity>

          {/* Spacing */}
          <View style={{ width: ScreenRatio_iPhone(10) }} />

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Image
              source={require("../../assets/icons/search.png")}
              resizeMode="contain"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search in Kasoot"
              keyboardType="web-search"
              onChangeText={(input) => setSearch(input)}
              style={styles.searchInput}
              value={search}
              onSubmitEditing={() => {
                if (search.length > 0) {
                  setSearchHistoryList((searchHistoryList) => [
                    {
                      id: searchHistoryList.length.toString(),
                      phrase: search
                    },
                    ...searchHistoryList
                  ]);
                  updateSearchHistory(searchHistoryList);
                  navigation.navigate("Search Products", {
                    passedSearchTerm: search
                  });
                }
              }}
            />
            {search !== "" && (
              <TouchableWithoutFeedback onPress={() => setSearch("")}>
                <Image
                  source={require("../../assets/icons/close.png")}
                  resizeMode="contain"
                  style={styles.clearBtn}
                />
              </TouchableWithoutFeedback>
            )}
          </View>

          {/* Spacing */}
          <View style={{ width: ScreenRatio_iPhone(10) }} />

          {/* Search Button */}
          <TouchableOpacity
            onPress={() => {
              if (search.length > 0) {
                setSearchHistoryList((searchHistoryList) => [
                  {
                    id: searchHistoryList.length.toString(),
                    phrase: search
                  },
                  ...searchHistoryList
                ]);
                updateSearchHistory(searchHistoryList);
                navigation.navigate("Search Products", {
                  passedSearchTerm: search
                });
              }
            }}
          >
            <Text
              style={{
                color: "#f58b4b",
                fontWeight: "500",
                fontSize: ScreenRatio_iPhone(16),
                textAlign: "center",
                padding: ScreenRatio_iPhone(7)
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>

        {/* Clear History Button */}
        { searchHistoryList.length > 0 && 
        <TouchableOpacity style={{
            flexDirection: 'row-reverse',
            alignSelf: "flex-end",
            marginHorizontal: ScreenRatio_iPhone(10),
            marginTop: ScreenRatio_iPhone(20),
            marginBottom: ScreenRatio_iPhone(8)
          }}
          onPress={() => {
            Alert.alert(
              'Clear History',
              'Are you sure want to clear search history?', // <- this part is optional, you can pass an empty string
              [
                {text: 'OK', onPress: () => clearSearchHistory()},
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {text: "Cancel"}
              ]
            )
          }}>
          <Text style={{color: "#000000", alignSelf: "center"}}>Clear History</Text>
          <Image
            source={require("../../assets/icons/trash.png")}
            resizeMode="contain"
            style={{
              marginHorizontal: ScreenRatio_iPhone(5),
              width: ScreenRatio_iPhone(18),
              height: ScreenRatio_iPhone(18),
            }}
          />
        </TouchableOpacity> }
        
        {/* Search History List */}
        <FlatList 
            data={searchHistoryList}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: ScreenRatio_iPhone(150)}}
        />

      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  backBtn: {
    width: ScreenRatio_iPhone(30),
    height: ScreenRatio_iPhone(30),
    marginHorizontal: ScreenRatio_iPhone(5) // Adjust the margin value as desired
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: ScreenRatio_iPhone(2),
    borderRadius: ScreenRatio_iPhone(30),
    borderColor: "#f58b4b",
    paddingHorizontal: ScreenRatio_iPhone(10)
  },
  searchIcon: {
    width: ScreenRatio_iPhone(20),
    height: ScreenRatio_iPhone(20),
    marginEnd: ScreenRatio_iPhone(10)
  },
  searchInput: {
    flex: 1,
    fontSize: ScreenRatio_iPhone(16),
    paddingVertical: ScreenRatio_iPhone(7)
  },
  clearBtn: {
    width: ScreenRatio_iPhone(24),
    height: ScreenRatio_iPhone(24),
    marginHorizontal: ScreenRatio_iPhone(10)
  }
});

export default SearchScreen
