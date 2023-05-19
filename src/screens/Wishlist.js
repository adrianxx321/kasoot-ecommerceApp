import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ProductCard from "../components/ProductCard"

import * as FirebaseServices from "../services/firestore"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

const Wishlist = ({navigation}) => {
    const [wishlist, setWishList] = useState([])
    const [products, setProducts] = useState([])

    const fetchWishlist = async (uid) => {
        try {
            const response = await FirebaseServices.getWishlist(uid).get()
        
            if(response.exists) {
                setWishList(response.data().shoes)
            }
        }
        catch(err) {
            console.error(err)
        }
    }

    const fetchProds = async (ids) => {
        try {
            var result = []
            const response = await FirebaseServices.getShoesByID(ids)

            if(!response.empty) {
                response.docs.forEach((shoe) => {
                    result.push(shoe.data())
                    result[result.length - 1].id = shoe.id
                })
                setProducts(result)
            }
        }
        catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchWishlist(FirebaseServices.getUserID())
            fetchProds(wishlist)
        })

        fetchWishlist(FirebaseServices.getUserID())
        fetchProds(wishlist)

        return unsubscribe
    }, [navigation, wishlist, products])

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
                }}>{wishlist.length} items</Text>
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
