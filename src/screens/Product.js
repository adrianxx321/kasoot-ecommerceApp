import React, { Component } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Animated from "react-native-reanimated"
import Paginator from "../components/Paginator"
import CollapsibleList from "../components/CollapsibleList"

import 'intl';
import 'intl/locale-data/jsonp/en';
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

// Dummy data
const product = {
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
    sizes: [4, 5, 6, 7, 8, 9, 10, 11, 12]
}
// Currency formatter
const formatter = Intl.NumberFormat('en-UK',{
    style: "currency",
    currency: "MYR"
})

const Product = ({navigation}) => {
    // Back and "more options" buttons...
    function renderHeader() {
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
                    onpress={() => navigation.goBack()}>
                    <Image
                        source={require("../../assets/icons/back.png")}
                        resizeMode="contain"
                        style={styles.headerButtons}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onpress={() => {}}>
                    <Image
                        source={require("../../assets/icons/more-options.png")}
                        resizeMode="contain"
                        style={styles.headerButtons}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    // Product images (carousell)...
    function renderShoeImages() {
        const scrollX = new Animated.Value(0)
        
        return (
            <Animated.View
                style={[
                    styles.imageViewBorders,
                    {
                        backgroundColor: "#e3e5ea",
                        height: Dimensions.get('window').height * 0.4,
                        marginBottom: ScreenRatio_iPhone(30)
                    }
                ]}>
                <Animated.ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    style={[styles.imageViewBorders]}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: false})}>
                    {
                        product.prodImg.map((imgPath, index) =>
                            <Image
                                key={`img-${index}`}
                                style={{
                                    width: Dimensions.get('window').width,
                                    height: Dimensions.get("window").height * 0.35,
                                    resizeMode: "contain",
                                    zIndex: 2,
                                    marginVertical: Dimensions.get("window").height * 0.05
                                }}
                                source={imgPath}/>
                        )
                    }
                </Animated.ScrollView>
                <Paginator data={product.prodImg} scrollX={scrollX}/>
            </Animated.View>
        )
    }

    function renderShoeInfo() {
        return (
            <View>
                {/* Shoe category & rating... */}
                <View style={styles.prodInfoAlignment}>
                    <Text style={{
                        fontSize: ScreenRatio_iPhone(18),
                        color: "#c2c2c2"
                    }}>{product.prodCat}</Text>
                    <View style={{flexDirection: "row"}}>
                        <Image 
                            source={(product.rating > 0) ? require("../../assets/icons/star.png"): require("../../assets/icons/star-outline.png")}
                            style={{
                                width: ScreenRatio_iPhone(22),
                                height: ScreenRatio_iPhone(22),
                                tintColor: "#f58b4b",
                                marginEnd: ScreenRatio_iPhone(5)
                            }}/>
                        <Text style={{
                            fontSize: ScreenRatio_iPhone(18),
                            color: "#c2c2c2"
                        }}>({product.rating})</Text>
                    </View>
                </View>
                {/* Shoe name & price... */}
                <View style={styles.prodInfoAlignment}>
                    <Text style={{
                        fontSize: ScreenRatio_iPhone(24),
                        fontWeight: "500",
                        width: "60%"
                    }}>{product.prodName}</Text>
                    <Text style={{fontSize: ScreenRatio_iPhone(20)}}>{formatter.format(product.prodPrice)}</Text>
                </View>
                {/* Shoe size info... */}
                <View style={[styles.prodInfoAlignment, {marginTop: ScreenRatio_iPhone(20)}]}>
                    <Text style={{
                        fontSize: ScreenRatio_iPhone(18),
                        fontWeight: "bold"
                    }}>Size:</Text>
                    <View style={{flexDirection: "row"}}>
                        <Text style={highlightSizeType("UK").selectedSizeType}>UK</Text>
                        <Text style={highlightSizeType("US").selectedSizeType}>US</Text>
                        <Text style={highlightSizeType("EU").selectedSizeType}>EU</Text>
                    </View>
                </View>
                {/* Shoe sizes selection... */}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{marginHorizontal: ScreenRatio_iPhone(15)}}>
                    {
                        product.sizes.map((size, index, {focused}) =>
                            <TouchableOpacity
                            onpress={() => {}}>
                                <Text
                                    key={`${product.prodID}-${index}`}
                                    style={{
                                        backgroundColor: "#e3e5ea",
                                        //backgroundColor: ({focused}) ? "#f58b4b" : "#e3e5ea",
                                        paddingHorizontal: ScreenRatio_iPhone(25),
                                        paddingVertical: ScreenRatio_iPhone(22),
                                        marginHorizontal: ScreenRatio_iPhone(10),
                                        fontSize: ScreenRatio_iPhone(20),
                                        borderRadius: ScreenRatio_iPhone(15),
                                        overflow: "hidden"
                                    }}>
                                    {size}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
                {/* Product description, delivery policies & reviews... */}
                <View style={{marginVertical: ScreenRatio_iPhone(30)}}>
                    <CollapsibleList title={"Description"}>
                        <Text style={styles.prodDescriptions}>{product.prodDesc}</Text>
                    </CollapsibleList>
                    <CollapsibleList title={"Free Delivery and Returns"}>
                        <View style={{marginBottom: ScreenRatio_iPhone(20)}}>
                            <Text style={[styles.prodDescriptions, {fontWeight: "bold"}]}>No returns, no refunds</Text>
                            <Text style={styles.prodDescriptions}>Item is considered sold once payment has been made. Any request for refund, return or exchange will not be entertained except for the case of defective item.</Text>
                        </View>
                        <View>
                            <Text style={[styles.prodDescriptions, {fontWeight: "bold"}]}>Free shipping</Text>
                            <Text style={styles.prodDescriptions}>Each customer is entitled for free shipping for every order they have made (only applicable across Peninsula Malaysia).</Text>
                        </View>
                    </CollapsibleList>
                    <CollapsibleList title={"See Reviews"}>
                        <Text style={{fontSize: ScreenRatio_iPhone(16), lineHeight: ScreenRatio_iPhone(24), textAlign: "justify"}}>Each customer is entitled for free shipping for every order they have made (only applicable across Peninsula Malaysia).</Text>
                    </CollapsibleList>
                </View>
            </View>
        )
    }

    return (
        <View>
            {renderHeader()}
            <ScrollView>
                {renderShoeImages()}
                {renderShoeInfo()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerButtons: {
        width: ScreenRatio_iPhone(30),
        height: ScreenRatio_iPhone(30),
    },
    imageViewBorders: {
        borderBottomLeftRadius: ScreenRatio_iPhone(50),
        borderBottomRightRadius: ScreenRatio_iPhone(50),
    },
    prodInfoAlignment: {
        flexDirection: "row",
        marginHorizontal: ScreenRatio_iPhone(25),
        marginBottom: ScreenRatio_iPhone(20),
        justifyContent: "space-between"
    },
    prodDescriptions: {
        fontSize: ScreenRatio_iPhone(16),
        lineHeight: ScreenRatio_iPhone(24),
        textAlign: "justify"
    }
})

function highlightSizeType(sizeType) {
    return StyleSheet.create({
        selectedSizeType: {
            fontSize: ScreenRatio_iPhone(18),
            marginEnd: ScreenRatio_iPhone(10),
            color: (sizeType == product.sizeType) ? "#000000" : "#c2c2c2",
            fontWeight: (sizeType == product.sizeType) ? "600" : "400"
        }
    })
}

export default Product