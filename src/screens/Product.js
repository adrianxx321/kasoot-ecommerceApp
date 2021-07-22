import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Animated from "react-native-reanimated"
import Paginator from "../components/Paginator"
import CollapsibleList from "../components/CollapsibleList"
import { LinearGradient } from "expo-linear-gradient"

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
}

// Currency formatter
const formatter = Intl.NumberFormat('en-UK',{
    style: "currency",
    currency: "MYR"
})

const Product = ({navigation}) => {
    const [selectedShoe, setSelectedShoe] = useState(null)

    // Back and "more options" buttons ...
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

    // Product images (carousell) ...
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
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: false})}
                    scrollEventThrottle={16}>
                    {
                        product.prodImg.map((imgPath, index) =>
                            <Image
                                key={`img-${index}`}
                                style={{
                                    width: Dimensions.get('window').width,
                                    height: Dimensions.get("window").height * 0.35,
                                    resizeMode: "contain",
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

    // Product information (name, price, rating, description etc.) ...
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
                        width: "70%"
                    }}>{product.prodName}</Text>
                    <View>
                        <Text style={{
                            fontSize: ScreenRatio_iPhone(20),
                            textDecorationLine: (product.prodDiscount) ? "line-through" : "none"}}>
                                {formatter.format(product.prodPrice)}
                        </Text>
                        <Text style={{
                            fontSize: ScreenRatio_iPhone(22),
                            display: (product.prodDiscount) ? "flex" : "none",
                            right: ScreenRatio_iPhone(10),
                            fontWeight: "bold", color: "#de651d"}}>
                                {formatter.format(product.prodPrice * (1 - product.prodDiscount / 100))}
                        </Text>
                    </View>
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
                        Object.keys(product.sizes).map((sizeNum, index) =>
                            <TouchableOpacity
                                key={`${product.prodID}-${index}`}
                                onPress={() => {
                                    setSelectedShoe({ID: product.prodID, size: sizeNum})
                                }}
                                disabled={(product.sizes[sizeNum] != '0') ? false : true}>
                                <Text
                                    style={{
                                        backgroundColor: (selectedShoe != null && selectedShoe.size == sizeNum) ? "#f58b4b" : "#e3e5ea",
                                        color: (selectedShoe != null && selectedShoe.size == sizeNum) ? "white" : (product.sizes[sizeNum] == '0') ? "#93959e" : "black",
                                        paddingHorizontal: ScreenRatio_iPhone(26),
                                        paddingVertical: ScreenRatio_iPhone(20),
                                        marginHorizontal: ScreenRatio_iPhone(10),
                                        fontSize: ScreenRatio_iPhone(20),
                                        borderRadius: ScreenRatio_iPhone(15),
                                        overflow: "hidden",
                                    }}>
                                    {sizeNum}
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
                    {/* Reviews not implemented yet... */}
                    <CollapsibleList title={"See Reviews"}>
                        <Text style={{fontSize: ScreenRatio_iPhone(16), lineHeight: ScreenRatio_iPhone(24), textAlign: "justify"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id diam maecenas ultricies mi eget mauris pharetra. Amet risus nullam eget felis eget nunc. Bibendum at varius vel pharetra vel turpis nunc. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Senectus et netus et malesuada fames. Nunc vel risus commodo viverra maecenas accumsan. Arcu bibendum at varius vel pharetra. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Erat pellentesque adipiscing commodo elit. At erat pellentesque adipiscing commodo elit at imperdiet dui. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Sit amet consectetur adipiscing elit. Malesuada fames ac turpis egestas maecenas pharetra convallis.</Text>
                    </CollapsibleList>
                </View>
            </View>
        )
    }

    // Add to wishlist/cart ...
    function renderAddTo() {
        return (
            <LinearGradient
                colors={['rgba(242, 242, 242, 0)', 'rgba(242, 242, 242, 1)']}
                //colors={['red', 'green']}
                start={{ x: 0, y: 0 }}
                style={{
                    position: "absolute",
                    bottom: 0,
                    zIndex: 3}}>
                <SafeAreaView>
                    <View style={{flexDirection: "row", marginHorizontal: ScreenRatio_iPhone(25)}}>
                        <TouchableWithoutFeedback>
                            <View style={{
                                borderRadius: "50%",
                                paddingHorizontal: ScreenRatio_iPhone(16),
                                paddingVertical: ScreenRatio_iPhone(16),
                                borderWidth: ScreenRatio_iPhone(2),
                                borderColor: "#c2c2c2",
                                marginEnd: ScreenRatio_iPhone(20)
                            }}>
                                <Image
                                    source={require("../../assets/icons/wishlist.png")}
                                    style={{
                                        height: ScreenRatio_iPhone(24),
                                        width: ScreenRatio_iPhone(24),
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableOpacity>
                            <Text style={{
                                backgroundColor: "black",
                                color: "white",
                                fontWeight: "500",
                                //backgroundColor: (selectedShoe != null && selectedShoe.size == sizeNum) ? "#f58b4b" : "#e3e5ea",
                                //color: (selectedShoe != null && selectedShoe.size == sizeNum) ? "white" : (product.sizes[sizeNum] == '0') ? "#93959e" : "black",
                                paddingHorizontal: "24%",
                                paddingVertical: ScreenRatio_iPhone(16),
                                borderRadius: ScreenRatio_iPhone(32),
                                fontSize: ScreenRatio_iPhone(22),
                                overflow: "hidden",
                                textAlign: "center",
                            }}>Add to Cart
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }

    return (
        <View>
            {renderHeader()}
            <ScrollView style={{zIndex: 2}}>
                {renderShoeImages()}
                {renderShoeInfo()}
            </ScrollView>
            {renderAddTo()}
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