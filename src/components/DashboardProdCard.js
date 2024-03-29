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

const DashboardProdCard = ({product}) => {
    const navigation = useNavigation()
    const [wishlist, setWishlist] = useState([])
    
    const fetchWishlist = async (uid) => {
        try {
            const response = await FirebaseServices.getWishlist(uid).get()

            if(response.exists) {
                setWishlist(response.data().products)
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
                navigation.navigate("Product", {shoeID: product.id})
            }}>
            <View
                style={{
                    flexDirection: "column",
                    backgroundColor: "#ebedf2",
                    marginHorizontal: ScreenRatio_iPhone(40),
                    marginBottom: ScreenRatio_iPhone(15),
                    padding: ScreenRatio_iPhone(10),
                    borderRadius: ScreenRatio_iPhone(40),
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: ScreenRatio_iPhone(15),
                    }}>
                    <Image 
                        source={{uri: product.prodImg[0]}}
                        style={{
                            width: ScreenRatio_iPhone(224),
                            height: ScreenRatio_iPhone(224),
                            backgroundColor: "#e3e5ea",
                            borderRadius: ScreenRatio_iPhone(40),
                        }}
                    />
                    <View style={{justifyContent: "center", left: ScreenRatio_iPhone(15)}}>
                        <TouchableOpacity
                            onPress={() => {
                                if (wishlist.includes(product.id)) {
                                    // remove
                                    setWishlist(wishlist.filter((e)=>(e !== product.id)))
                                    FirebaseServices.removeProdFromWishlist(FirebaseServices.getUserID(), product.id)
                                }
                                else {
                                    // add
                                    setWishlist([...wishlist, product.id])
                                    FirebaseServices.addProdToWishlist(FirebaseServices.getUserID(), product.id)
                                }
                            }}>
                            <Image 
                                source={(wishlist.includes(product.id) && wishlist.length > 0) ? require("../../assets/icons/wishlist-selected.png") : require("../../assets/icons/wishlist.png")}
                                style={{
                                    width: ScreenRatio_iPhone(32),
                                    height: ScreenRatio_iPhone(32),
                                    tintColor: (wishlist.includes(product.id)) ? "#e30022" : "#000000",
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flexShrink: 1,
                    marginHorizontal: ScreenRatio_iPhone(16),
                    marginVertical: ScreenRatio_iPhone(20),
                }}>
                    <Text style={[styles.cardText, {fontWeight: "bold", lineHeight: ScreenRatio_iPhone(22)}]}>
                        {product.prodBrand} {product.prodName}
                    </Text>
                    <Text style={[styles.cardText, {fontSize: ScreenRatio_iPhone(18), color: "#c2c2c2", lineHeight: ScreenRatio_iPhone(44)}]}>
                        {product.prodGend} {product.prodCat}
                    </Text>
                    <Text style={[styles.cardText, {textDecorationLine: (product.prodDiscount) ? "line-through" : "none"}]}>
                        {formatter.format(product.prodPrice)}
                    </Text>
                    <Text style={[styles.cardText, {display: (product.prodDiscount) ? "flex" : "none", fontWeight: "bold", color: "#de651d"}]}>
                        {formatter.format(product.prodPrice * (1 - product.prodDiscount / 100))}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    cardText: {
        fontSize: ScreenRatio_iPhone(22),
        lineHeight: ScreenRatio_iPhone(44),
        textAlign: "center"
    }
})

export default DashboardProdCard
