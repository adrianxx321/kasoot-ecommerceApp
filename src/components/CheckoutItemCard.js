import React from "react"
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from "react-native"

import 'intl';
import 'intl/locale-data/jsonp/en';
import { ScreenRatio_iPhone } from "./ScreenRatio-iPhone"

const formatter = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "MYR"
})

/* This is a card view component made for the Checkout Screen */
const CheckoutItemCard = ({item}) => {
    return (
        <TouchableWithoutFeedback>
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: "#ebedf2",
                    marginBottom: ScreenRatio_iPhone(15),
                    padding: ScreenRatio_iPhone(10),
                    borderRadius: ScreenRatio_iPhone(40),
                    alignItems: "center",
                }}>
                <Image
                    source={{uri: item.prodImg[0]}}
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
                }}>
                    {/* Shoe name... */}
                    <Text style={[styles.itemInfoText, {fontWeight: "bold"}]}>
                        {item.prodBrand} {item.prodName}
                    </Text>
                    {/* Selected shoe item.size... */}
                    <Text style={[styles.itemInfoText, {color: "#a3a3a3"}]}>
                        Size: {item.size} ({item.sizeType}) x{item.quantity}
                    </Text>
                    {/* Shoe final price... */}
                    <Text style={[styles.priceText, {display: (item.prodDiscount) ? "flex" : "none", fontWeight: "bold", color: "#de651d"}]}>
                        {formatter.format((item.prodPrice * (1 - item.prodDiscount / 100) * item.quantity))}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
})

export default CheckoutItemCard
