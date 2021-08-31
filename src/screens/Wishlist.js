import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ProductCard from "../components/ProductCard"

import * as FirebaseServices from "../services/firestore"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

const Wishlist = ({navigation}) => {
    const [wishlistItems, fetchWishlistItems] = useState([])
    const [products, fetchProducts] = useState([])

    const fetchWishlist = async (uid) => {
        try {
            const response = await FirebaseServices.getWishlist(uid).get()

            if(response.exists) {
                if(response.data().hasOwnProperty("products")) {
                    fetchWishlistItems(response.data().products)
                }
            }
        } catch(err) {
            console.error(err)
        }
    }

    const queryProducts = async() => {
        try {
            var result = []
            const response = await FirebaseServices.getShoesByID(wishlistItems)

            if(!response.empty) {
                response.forEach(doc => result.push(doc.data()))
                fetchProducts(result)
            }
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchWishlist(FirebaseServices.getUserID())
            queryProducts()
        })

        fetchWishlist(FirebaseServices.getUserID())
        queryProducts()

        return unsubscribe
    }, [navigation, wishlistItems])

    const renderHeader = () => {
        return (
            <SafeAreaView
                style={{
                    zIndex: 3,
                    marginHorizontal: ScreenRatio_iPhone(15),
                    marginVertical: ScreenRatio_iPhone(15),
                    flexDirection: "row",
                    justifyContent: "space-between",
                    position: "absolute",
                    left: 0,
                    right: 0
                }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={require("../../assets/icons/back.png")}
                        resizeMode="contain"
                        style={{
                            width: ScreenRatio_iPhone(30),
                            height: ScreenRatio_iPhone(30),
                        }}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    const renderTitle = () => {
        return (
            <SafeAreaView style={styles.pageHeader}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: ScreenRatio_iPhone(36)
                }}>My Wishlist</Text>
                <Text style={{
                    color: "#a3a3a3",
                    fontSize: ScreenRatio_iPhone(24)
                }}>{wishlistItems.length} items</Text>
            </SafeAreaView>
        )
    }

    const renderWishlistItem = ({item}) => (
        <ProductCard
            prodID={item.id}
            prodImg={item.prodImg[0]}
            prodBrand={item.prodBrand}
            prodName={item.prodName}
            prodPrice={item.prodPrice}
            prodDiscount={item.prodDiscount}
            key={item.id}
        />
    )

    return (
        <View>
            {renderHeader()}
            <View style={{marginVertical: ScreenRatio_iPhone(64)}}>
                {renderTitle()}
                <FlatList
                    data={products}
                    renderItem={renderWishlistItem}
                    keyExtractor={item => item.objectID}
                    style={{marginTop: ScreenRatio_iPhone(20), height: "100%"}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageHeader: {
        marginHorizontal: ScreenRatio_iPhone(25),
        marginTop: ScreenRatio_iPhone(25),
        marginBottom: ScreenRatio_iPhone(10),
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
    }
})

export default Wishlist
