import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Animated from "react-native-reanimated"
import Paginator from "../components/Paginator"
import CollapsibleList from "../components/CollapsibleList"
import { LinearGradient } from "expo-linear-gradient"

import * as FirebaseServices from "../services/firestore"

import 'intl';
import 'intl/locale-data/jsonp/en';
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

import Toast from "react-native-toast-message"

// Currency formatter
const formatter = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "MYR"
})

const Product = ({route, navigation}) => {
    const {shoeID} = route.params
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [wishlist, setWishlist] = useState([])
    const [cart, setCart] = useState([])
    const [scrollX, setScrollX] = useState(new Animated.Value(0))

    const fetchProduct = async (shoeID) => {
        try {
            const response = await FirebaseServices.getProduct(shoeID).get()

            if(response.exists) {
                let prod = response.data()
                // Append id property after appending the queried shoe itself
                // as Firestore by default doesn't include id in returned document
                prod.id = response.id

                setProduct(prod)
                setLoading(false)
            }
        } catch(err) {
            console.error(err)
        }
    }

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

    const fetchCart = async (uid) => {
        try {
            const response = await FirebaseServices.getCart(uid).get()

            if(response.exists) {
              setCart(response.data().items)
            }
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchProduct(shoeID)
        fetchWishlist(FirebaseServices.getUserID())
        fetchCart(FirebaseServices.getUserID())
    }, [scrollX])

    // Back and "more options" buttons ...
    const renderHeader = () => {
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
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={require("../../assets/icons/back.png")}
                        resizeMode="contain"
                        style={styles.headerButtons}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
    
    // Product images (carousell) ...
    const renderShoeImages = () => {
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
                                source={{uri: imgPath}}/>
                        )
                    }
                </Animated.ScrollView>
                <Paginator data={product.prodImg} scrollX={scrollX}/>
            </Animated.View>
        )
    }

    // Product information (name, price, rating, description etc.) ...
    const renderShoeInfo = () => {
        const highlightSizeType = (sizeType) => {
            return StyleSheet.create({
                selectedSizeType: {
                    fontSize: ScreenRatio_iPhone(18),
                    marginEnd: ScreenRatio_iPhone(10),
                    color: (sizeType == product.sizeType) ? "#000000" : "#c2c2c2",
                    fontWeight: (sizeType == product.sizeType) ? "600" : "400"
                }
            })
        }

        return (
            <View>
                {/* Shoe category... */}
                <View style={styles.prodInfoAlignment}>
                    <Text style={{
                        fontSize: ScreenRatio_iPhone(18),
                        color: "#c2c2c2"
                    }}>{product.prodGend} {product.prodCat}</Text>
                </View>
                {/* Shoe name & price... */}
                <View style={styles.prodInfoAlignment}>
                    <Text style={{
                        fontSize: ScreenRatio_iPhone(24),
                        fontWeight: "500",
                        width: ScreenRatio_iPhone(Dimensions.get("window").width * 0.55),
                    }}>{product.prodBrand} {product.prodName}</Text>
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
                                    setSelectedSize(sizeNum)
                                }}
                                disabled={(product.sizes[sizeNum] != '0') ? false : true}>
                                <Text
                                    style={{
                                        backgroundColor: (selectedSize != null && selectedSize == sizeNum) ? "#f58b4b" : "#e3e5ea",
                                        color: (selectedSize != null && selectedSize == sizeNum) ? "#ffffff" : (product.sizes[sizeNum] == '0') ? "#93959e" : "#000000",
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
                {/* Product description & delivery policies... */}
                <View style={{marginTop: ScreenRatio_iPhone(30), marginBottom: ScreenRatio_iPhone(100)}}>
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
                </View>
            </View>
        )
    }

    // Add to wishlist/cart...
    const renderAddTo = () => {
        return (
            <LinearGradient
                colors={['rgba(242, 242, 242, 0.9)', 'rgba(242, 242, 242, 1)']}
                start={{ x: 0.5, y: -1 }}
                style={{
                    position: "absolute",
                    bottom: 0,
                    paddingBottom: ScreenRatio_iPhone(28),
                    zIndex: 3,
                    width: "100%",
                }}>
                <View style={{
                        flexDirection: "row",
                        marginHorizontal: ScreenRatio_iPhone(25),
                        justifyContent:"space-between",
                    }}>
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
                        <View style={{
                            borderRadius: Dimensions.get("screen").height * 0.5,
                            paddingHorizontal: ScreenRatio_iPhone(16),
                            paddingVertical: ScreenRatio_iPhone(16),
                            borderWidth: ScreenRatio_iPhone(2),
                            borderColor: "#c2c2c2",
                        }}>
                            <Image
                                source={(wishlist.includes(product.id) && wishlist.length > 0) ? require("../../assets/icons/wishlist-selected.png") : require("../../assets/icons/wishlist.png")}
                                style={{
                                    height: ScreenRatio_iPhone(24),
                                    width: ScreenRatio_iPhone(24),
                                    tintColor: (wishlist.includes(product.id)) ? "#e30022" : "#000000"
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={(selectedSize == null) ? true : false}
                        onPress={() => {
                            const index = cart.findIndex(item => {
                                return (item.id == shoeID && item.size == selectedSize)
                            })
                            let newCart = cart

                            if (index != -1) {
                                // Modify current cart array and send back to database
                                newCart[index].quantity += 1
                                
                                setCart(newCart)
                                FirebaseServices.addToCartDup(FirebaseServices.getUserID(), newCart)
                            }
                            else {
                                // Add new cart item to dataabse
                                newCart.push({
                                    id: product.id,
                                    quantity: 1,
                                    size: selectedSize,
                                    // REMOVE START
                                    prodImg: product.prodImg,
                                    prodBrand: product.prodBrand,
                                    prodName: product.prodName,
                                    prodPrice: product.prodPrice,
                                    prodDiscount: product.prodDiscount,
                                    // REMOVE END
                                    sizeType: product.sizeType
                                })
                                
                                setCart(newCart)
                                FirebaseServices.addToCart(FirebaseServices.getUserID(), newCart[newCart.length - 1])
                            }
                            Toast.show({
                                type: "success",
                                position: "bottom",
                                text1: "Item added to cart!",
                                text2: "Enjoy your shopping!", 
                                visibilityTime: 1000,
                                bottomOffset: ScreenRatio_iPhone(128),
                            })
                        }}>
                        <Text style={{
                            fontWeight: "500",
                            backgroundColor: (selectedSize != null) ? "#000000" : "#d6d6d6",
                            color: (selectedSize != null) ? "#ffffff" : "#93959e",
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
            </LinearGradient>
        )
    }

    const addToCartToast = () => {
        return (
            <Toast ref={(ref => Toast.setRef(ref))}/>
        )
    }

    if(loading) {
        return <View></View>
    }
    else {
        return (
            <View>
                {renderHeader()}
                <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
                    {renderShoeImages()}
                    {renderShoeInfo()}
                </ScrollView>
                {renderAddTo()}
                {addToCartToast()}
            </View>
        )
    }
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

export default Product
