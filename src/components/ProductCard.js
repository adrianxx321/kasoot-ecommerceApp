import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { useNavigation } from "@react-navigation/native";

import * as FirebaseServices from "../services/firestore"

import 'intl';
import 'intl/locale-data/jsonp/en';
import { ScreenRatio_iPhone } from "./ScreenRatio-iPhone"

const formatter = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "MYR"
})

const ProductCard = ({prodID, prodImg, prodBrand, prodName, prodPrice, prodDiscount}) => {
    const navigation = useNavigation()
    const [wishlist, setWishlist] = useState([])
    
    const fetchWishlist = async (uid) => {
        try {
            const response = await FirebaseServices.getWishlist(uid).get()

            if(response.exists) {
                setWishlist(response.data().shoes)
            }
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchWishlist(FirebaseServices.getUserID())
        })

        // Fetch wishlist from Firebase
        fetchWishlist(FirebaseServices.getUserID())

        return unsubscribe
    }, [navigation])
    
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate("Product", {shoeID: prodID})
            }}>
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: "#ebedf2",
                    marginHorizontal: ScreenRatio_iPhone(15),
                    marginBottom: ScreenRatio_iPhone(15),
                    padding: ScreenRatio_iPhone(10),
                    borderRadius: ScreenRatio_iPhone(40),
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
                    marginTop: ScreenRatio_iPhone(12),
                    width: "100%"
                }}>
                    <Text style={[styles.cardText, {fontWeight: "bold", lineHeight: ScreenRatio_iPhone(22)}]}>
                        {prodBrand} {prodName}
                    </Text>
                    <Text style={[styles.cardText, {textDecorationLine: (prodDiscount) ? "line-through" : "none"}]}>
                        {formatter.format(prodPrice)}
                    </Text>
                    <Text style={[styles.cardText, {display: (prodDiscount) ? "flex" : "none", fontWeight: "bold", color: "#de651d"}]}>
                        {formatter.format(prodPrice * (1 - prodDiscount / 100))}
                    </Text>
                </View>
                <View style={{marginEnd: ScreenRatio_iPhone(16), justifyContent: "center"}}>
                    <TouchableOpacity
                        onPress={() => {
                            if (wishlist.includes(prodID)) {
                                // remove
                                setWishlist(wishlist.filter((e)=>(e !== prodID)))
                                FirebaseServices.removeShoeFromWishlist(FirebaseServices.getUserID(), prodID)
                            }
                            else {
                                // add
                                setWishlist([...wishlist, prodID])
                                FirebaseServices.addToShoeWishlist(FirebaseServices.getUserID(), prodID)
                            }
                        }}>
                        <Image 
                            source={(wishlist.includes(prodID) && wishlist.length > 0) ? require("../../assets/icons/wishlist-selected.png") : require("../../assets/icons/wishlist.png")}
                            style={{
                                width: ScreenRatio_iPhone(24),
                                height: ScreenRatio_iPhone(24),
                                tintColor: (wishlist.includes(prodID)) ? "#e30022" : "#000000"
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    cardText: {
        fontSize: ScreenRatio_iPhone(18),
        lineHeight: ScreenRatio_iPhone(44),
    }
})

export default ProductCard
