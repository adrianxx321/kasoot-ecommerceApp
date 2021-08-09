import React from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native"

import 'intl';
import 'intl/locale-data/jsonp/en';
import { ScreenRatio_iPhone } from "./ScreenRatio-iPhone"

const formatter = Intl.NumberFormat('en-UK',{
    style: "currency",
    currency: "MYR"
})

const ProductCard = ({prodImg, prodName, prodPrice, prodDiscount}) => {
    return (
        <TouchableWithoutFeedback>
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
                    source={prodImg[0]}
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
                }}>
                    <Text style={[styles.cardText, {fontWeight: "bold", lineHeight: ScreenRatio_iPhone(22)}]}>
                        {prodName}
                    </Text>
                    <Text style={[styles.cardText, {textDecorationLine: (prodDiscount) ? "line-through" : "none"}]}>
                        {formatter.format(prodPrice)}
                    </Text>
                    <Text style={[styles.cardText, {display: (prodDiscount) ? "flex" : "none", fontWeight: "bold", color: "#de651d", lineHeight: ScreenRatio_iPhone(0)}]}>
                        {formatter.format(prodPrice * (1 - prodDiscount / 100))}
                    </Text>
                </View>
                <View style={{marginHorizontal: ScreenRatio_iPhone(16), justifyContent: "center"}}>
                    <TouchableOpacity>
                        <Image 
                            source={require("../../assets/icons/wishlist.png")}
                            style={{
                                width: ScreenRatio_iPhone(24),
                                height: ScreenRatio_iPhone(24),
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