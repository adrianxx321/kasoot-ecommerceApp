import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native"
import Animated from "react-native-reanimated";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import * as FirebaseServices from "../services/firestore"

import 'intl';
import 'intl/locale-data/jsonp/en';
import { ScreenRatio_iPhone } from "./ScreenRatio-iPhone"

const formatter = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "MYR"
})

const ProductCard = ({prodID, prodImg, prodBrand, prodName, prodPrice, prodDiscount, sizeType, size, quantity, index, cartArray}) => {
    const navigation = useNavigation()
    const [qty, setQty] = useState(quantity)
    const [cart, setCart] = useState(cartArray)

    const rightSwipe = () => {
        return (
            <TouchableOpacity
                onPress={() => {removeItem()}}
                style={{
                    backgroundColor: "#ffe9dd",
                    justifyContent: "center",
                    borderRadius: ScreenRatio_iPhone(30),
                    paddingHorizontal: ScreenRatio_iPhone(30),
                    marginBottom: ScreenRatio_iPhone(15),
                    marginEnd: ScreenRatio_iPhone(25),
            }}>
                <Animated.Image
                    source={require("../../assets/icons/trash.png")}
                    style={{
                        width: ScreenRatio_iPhone(42),
                        height: ScreenRatio_iPhone(42),
                        tintColor: "#f58b4b",
                        justifyContent: "center",

                }}/>
            </TouchableOpacity>
        )
    }

    const modifyCart = (qtyParam) => {
        let cartItems = cart
        cartItems[index].quantity = qtyParam

        setQty(qtyParam)
        setCart(cartItems)
        FirebaseServices.addToCartDup("caXHZssX32hRElZez1uFRd7LTIN2", cartItems)
    }

    const removeItem = () => {
        let cartItems = cart
        cartItems.splice(index, 1)

        setCart(cartItems)
        FirebaseServices.addToCartDup("caXHZssX32hRElZez1uFRd7LTIN2", cartItems)
    }

    return (
        <Swipeable renderRightActions={rightSwipe}>
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate("Product", {shoeID: prodID})
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "#ebedf2",
                        marginHorizontal: ScreenRatio_iPhone(25),
                        marginBottom: ScreenRatio_iPhone(15),
                        padding: ScreenRatio_iPhone(10),
                        borderRadius: ScreenRatio_iPhone(40),
                        alignItems: "center",
                    }}>
                    <Image 
                        source={{uri: prodImg}}
                        style={{
                            width: ScreenRatio_iPhone(128),
                            height: ScreenRatio_iPhone(128),
                            backgroundColor: "#e3e5ea",
                            borderRadius: ScreenRatio_iPhone(40),
                        }}
                    />
                    <View style={{
                        flexShrink: 1,
                        marginLeft: ScreenRatio_iPhone(16),
                        marginRight: ScreenRatio_iPhone(16),
                        marginTop: ScreenRatio_iPhone(12),
                        width: "100%",
                    }}>
                        <Text style={[styles.itemInfoText, {fontWeight: "bold"}]}>
                            {prodBrand} {prodName}
                        </Text>
                        <Text style={[styles.itemInfoText, {color: "#a3a3a3"}]}>
                            Size: {size} ({sizeType})
                        </Text>
                        <Text style={[styles.priceText, {textDecorationLine: (prodDiscount) ? "line-through" : "none"}]}>
                            {formatter.format(prodPrice)}
                        </Text>
                        <Text style={[styles.priceText, {display: (prodDiscount) ? "flex" : "none", fontWeight: "bold", color: "#de651d"}]}>
                            {formatter.format(prodPrice * (1 - prodDiscount / 100))}
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if(qty >= 2) {
                                        modifyCart(qty - 1)
                                    }
                                }}>
                                <Image
                                    source={require("../../assets/icons/minus.png")}
                                    style={[styles.addMinusBtn, {tintColor: "#a6a6a6"}]}
                                />
                            </TouchableOpacity>
                            <Text style={{fontWeight: "bold", marginHorizontal: ScreenRatio_iPhone(10)}}>{qty}</Text>
                            <TouchableOpacity onPress={() => {modifyCart(qty + 1)}}>
                                <Image
                                    source={require("../../assets/icons/add.png")}
                                    style={[styles.addMinusBtn, {tintColor: "#f58b4b"}]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    itemInfoText: {
        fontSize: ScreenRatio_iPhone(18),
        lineHeight: ScreenRatio_iPhone(30),        
    },
    priceText: {
        fontSize: ScreenRatio_iPhone(18),
        lineHeight: ScreenRatio_iPhone(44),
    },
    addMinusBtn: {
        width: ScreenRatio_iPhone(32),
        height: ScreenRatio_iPhone(32),
    }
})

export default ProductCard
