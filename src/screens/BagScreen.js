import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as algolia from "../services/algolia"
import CartItemCard from "../components/CartItemCard"

import * as FirebaseServices from "../services/firestore"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

const formatter = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "MYR"
})

const BagScreen = ({navigation}) => {
    const [cartItems, fetchCartItems] = useState([])

    const fetchCart = async (uid) => {
        try {
            const response = await FirebaseServices.getCart(uid).get()

            if(response.exists) {
                if(response.data().hasOwnProperty("cart")) {
                    fetchCartItems(response.data().cart)
                }
            }
        } catch(err) {
            console.error(err)
        }
    }

    const getTotalPrice = (arr) => {
        return arr.reduce((sum, item) => {
            return sum + (item.prodPrice * (1 - item.prodDiscount / 100) * item.quantity)
        }, 0)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchCart("caXHZssX32hRElZez1uFRd7LTIN2")
        })

        // Fetch products (not from Firebase)
        fetchCart("caXHZssX32hRElZez1uFRd7LTIN2")

        return unsubscribe
    }, [navigation, cartItems])

    const renderTitle = () => {
        return (
            <SafeAreaView style={{
                marginHorizontal: ScreenRatio_iPhone(25),
                marginTop: ScreenRatio_iPhone(25),
                marginBottom: ScreenRatio_iPhone(10),
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-between",
            }}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: ScreenRatio_iPhone(36)
                }}>My Bag</Text>
                <Text style={{
                    color: "#a3a3a3",
                    fontSize: ScreenRatio_iPhone(24)
                }}>{cartItems.length} items</Text>
            </SafeAreaView>
        )
    }

    const renderCartItem = ({item, index}) => (
        <CartItemCard
            prodID={item.prodID}
            prodImg={item.prodImg[0]}
            prodBrand={item.prodBrand}
            prodName={item.prodName}
            prodPrice={item.prodPrice}
            prodDiscount={item.prodDiscount}
            sizeType={item.sizeType}
            quantity={item.quantity}
            size={item.size}
            index={index}
            cartArray={cartItems}
        />
    )

    const renderFooter = () => {
        return (
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    paddingBottom: ScreenRatio_iPhone(28),
                    width: "90%",
                    marginHorizontal: ScreenRatio_iPhone(25),
                }}>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: ScreenRatio_iPhone(48)}}>
                    <Text style={{fontSize: ScreenRatio_iPhone(26), color: "#919191"}}>Total</Text>
                    <Text style={{fontSize: ScreenRatio_iPhone(26)}}>{formatter.format(getTotalPrice(cartItems))}</Text>
                </View>
                <TouchableOpacity
                    style={{}}
                    onPress={() => {}}>
                    <Text style={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        fontWeight: "500",
                        paddingVertical: ScreenRatio_iPhone(16),
                        borderRadius: ScreenRatio_iPhone(32),
                        fontSize: ScreenRatio_iPhone(22),
                        overflow: "hidden",
                        textAlign: "center",
                    }}>Checkout
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
            {renderTitle()}
            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={item => `${item.prodID}-${item.size}${item.sizeType}`}
                contentContainerStyle={{flexGrow: 1}}
                style={{marginTop: ScreenRatio_iPhone(20), marginBottom: ScreenRatio_iPhone(196)}}
            />
            {renderFooter()}
        </View>
    )
}

export default BagScreen
