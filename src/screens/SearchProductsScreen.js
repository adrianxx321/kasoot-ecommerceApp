import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as algolia from "../services/algolia"
import ProductCard from "../components/ProductCard"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

const SearchProductsScreen = ({navigation}) => {
    const [search, setSearch] = useState("nike")
    const [products, fetchProducts] = useState([])
    const queryProducts = async() => {
        try {
            const response = await algolia.getShoesQuery(search)

            if(response.length > 0) {
                fetchProducts(response)
            }
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        // Fetch products (not from Firebase)
        queryProducts()
    }, [])
    
    // Back and filter buttons ...
    const renderHeader = () => {
        return (
            <SafeAreaView
                style={{
                        zIndex: 1,
                        marginStart: ScreenRatio_iPhone(15),
                        marginVertical: ScreenRatio_iPhone(25),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        position: "absolute",
                        left: 0,
                        right: 0,
                }}>
                <TouchableOpacity
                    onPress={() => {}}>
                    <Image
                        source={require("../../assets/icons/back.png")}
                        resizeMode="contain"
                        style={styles.headerButtons}
                    />
                </TouchableOpacity>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity
                        onPress={() => {}}>
                        <Image
                            source={require("../../assets/icons/search.png")}
                            resizeMode="contain"
                            style={[styles.headerButtons, {
                                marginEnd: ScreenRatio_iPhone(25)
                            }]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {}}>
                        <View style={{
                            backgroundColor: "black",
                            paddingEnd: ScreenRatio_iPhone(20),
                            paddingStart: ScreenRatio_iPhone(10),
                            paddingVertical: ScreenRatio_iPhone(10),
                            justifyContent: "center",
                            borderTopLeftRadius: ScreenRatio_iPhone(30),
                            borderBottomLeftRadius: ScreenRatio_iPhone(30),
                            bottom: 10,
                        }}>
                            <Image
                                source={require("../../assets/icons/filter.png")}
                                resizeMode="contain"
                                style={{
                                    width: ScreenRatio_iPhone(30),
                                    height: ScreenRatio_iPhone(30),
                                    tintColor: "white"
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    const renderTitle = () => {
        return (
            <View style={{
                marginHorizontal: ScreenRatio_iPhone(25),
                zIndex: 1,
            }}>
                <Text style={styles.titleText}>Search Results for "{search}"</Text>
            </View>
        )
    }

    const renderProductCard = ({item}) => (
        <ProductCard
            prodID={item.objectID}
            prodImg={item.prodImg[0]}
            prodBrand={item.prodBrand}
            prodName={item.prodName}
            prodPrice={item.prodPrice}
            prodDiscount={item.prodDiscount}
            key={item.objectID}
        />
    )

    return (
        <View>
            {renderHeader()}
            <View style={{marginVertical: ScreenRatio_iPhone(128)}}>
                {renderTitle()}
                <FlatList
                    data={products}
                    renderItem={renderProductCard}
                    keyExtractor={item => item.objectID}
                    style={{marginTop: ScreenRatio_iPhone(20), height: "100%"}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerButtons: {
        width: ScreenRatio_iPhone(30),
        height: ScreenRatio_iPhone(30),
    },
    titleText: {
        fontWeight: "bold",
        fontSize: ScreenRatio_iPhone(20),
    },
    cardText: {
        fontSize: ScreenRatio_iPhone(18),
        lineHeight: ScreenRatio_iPhone(44),
    }
})

export default SearchProductsScreen
