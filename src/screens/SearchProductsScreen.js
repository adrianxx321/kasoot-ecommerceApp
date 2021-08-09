import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ProductCard from "../components/ProductCard"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

const products = [
    {
        prodName: "Adidas NMD Racer Primeknit",
        prodID: "AH2430",
        prodPrice: 749.9,
        prodDiscount: 60,
        prodBrand: "Adidas",
        prodDesc: "Channeling the streamlined look of an '80s racer, these shoes are updated with modern features. The foot-hugging adidas Primeknit upper offers a soft, breathable feel. The Boost midsole provides responsive comfort accented with a contrast-color EVA heel plug. Embroidered details add a distinctive finish.",
        prodImg: [require("../../assets/DUMMY/WOMEN_Originals_SHOES_LOW_AH2430_2.png"), require("../../assets/DUMMY/WOMEN_Originals_SHOES_LOW_AH2430_1.png"), require("../../assets/DUMMY/WOMEN_Originals_SHOES_LOW_AH2430_3.png"), require("../../assets/DUMMY/WOMEN_Originals_SHOES_LOW_AH2430_4.png")],
        prodCat: "Women's Sneaker",
        rating: 4.7,
        sizeType: "UK",
        sizes: {
            4: 20,
            5: 12,
            6: 14,
            7: 8,
            8: 0,
            9: 2,
            10: 0,
            11: 7,
            12: 11
        }
    },
    {
        prodName: "Adidas NMD Racer Primeknit",
        prodID: "AH2431",
        prodPrice: 749.9,
        prodDiscount: 60,
        prodBrand: "Adidas",
        prodDesc: "Channeling the streamlined look of an '80s racer, these shoes are updated with modern features. The foot-hugging adidas Primeknit upper offers a soft, breathable feel. The Boost midsole provides responsive comfort accented with a contrast-color EVA heel plug. Embroidered details add a distinctive finish.",
        prodImg: [require("../../assets/DUMMY/WOMEN_Originals_SHOES_LOW_AH2430_2.png"), require("../../assets/DUMMY/WOMEN_Originals_SHOES_LOW_AH2430_1.png"), require("../../assets/DUMMY/WOMEN_Originals_SHOES_LOW_AH2430_3.png"), require("../../assets/DUMMY/WOMEN_Originals_SHOES_LOW_AH2430_4.png")],
        prodCat: "Women's Sneaker",
        rating: 4.7,
        sizeType: "UK",
        sizes: {
            4: 20,
            5: 12,
            6: 14,
            7: 8,
            8: 0,
            9: 2,
            10: 0,
            11: 7,
            12: 11
        }
    },
]

const SearchProductsScreen = ({navigation}) => {
    const [search, setSearch] = useState('Adidas NMD')

    // Back and filter buttons ...
    function renderHeader() {
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
                    onpress={() => navigation.goBack()}>
                    <Image
                        source={require("../../assets/icons/back.png")}
                        resizeMode="contain"
                        style={styles.headerButtons}
                    />
                </TouchableOpacity>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity
                        onpress={() => {}}>
                        <Image
                            source={require("../../assets/icons/search.png")}
                            resizeMode="contain"
                            style={[styles.headerButtons, {
                                marginEnd: ScreenRatio_iPhone(25)
                            }]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onpress={() => {}}>
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

    function renderTitle() {
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
            prodImg={item.prodImg}
            prodName={item.prodName}
            prodPrice={item.prodPrice}
            prodDiscount={item.prodDiscount}
        />
    )

    return (
        <View>
            {renderHeader()}
            <View style={{top: 128}}>
                {renderTitle()}
                <FlatList
                    data={products}
                    renderItem={renderProductCard}
                    keyExtractor={item => item.prodID}
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