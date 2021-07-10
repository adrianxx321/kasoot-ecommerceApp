import React from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Animated from "react-native-reanimated"

const {height, width} = Dimensions.get('window');

// Dummy data
const product = {
    prodName: "Women's adidas Originals NMD Racer Primeknit Shoes",
    prodID: "AH2430",
    prodPrice: 749.9,
    prodDiscount: 60,
    prodBrand: "Adidas",
    prodDesc: "Channeling the streamlined look of an '80s racer, these shoes are updated with modern features. The foot-hugging adidas Primeknit upper offers a soft, breathable feel. The Boost midsole provides responsive comfort accented with a contrast-color EVA heel plug. Embroidered details add a distinctive finish.",
    prodImg: [require("../../assets/dummy/WOMEN_Originals_SHOES_LOW_AH2430_2.png"), require("../../assets/dummy/WOMEN_Originals_SHOES_LOW_AH2430_1.png"), require("../../assets/dummy/WOMEN_Originals_SHOES_LOW_AH2430_3.png"), require("../../assets/dummy/WOMEN_Originals_SHOES_LOW_AH2430_4.png")],
    prodCat: "Sneakers",
    prodGender: "Female"
}

const Product = ({navigation}) => {
    // Back and "more options" buttons...
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    zIndex: 3,
                    marginHorizontal: 15,
                    marginVertical: 15,
                    justifyContent: "space-between",
                }}>
                <TouchableOpacity
                    onpress={() => navigation.goBack()}>
                    <Image
                        source={require("../../assets/icons/back.png")}
                        resizeMode="contain"
                        style={styles.headerButtons}
                    />
                </TouchableOpacity>
                <Image
                    source={require("../../assets/adidas-logo.png")}
                    resizeMode="contain"
                    style={{
                        height: 46,
                        width: 46
                    }}
                />
                <TouchableOpacity
                    onpress={() => {}}>
                    <Image
                        source={require("../../assets/icons/more-options.png")}
                        resizeMode="contain"
                        style={styles.headerButtons}
                    />
                </TouchableOpacity>
            </View>
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
                        height: 320,
                        position: "absolute",
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
                                    width: width,
                                    height: 320,
                                    resizeMode: "center",
                                    zIndex: 2,
                                }}
                                source={imgPath}
                            />
                        )
                    }
                </Animated.ScrollView>
            </Animated.View>
        )
    }

    return (
        <SafeAreaView>
            {renderHeader()}
            {renderShoeImages()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerButtons: {
        width: 30,
        height: 30,
    },
    imageViewBorders: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    }
})

export default Product