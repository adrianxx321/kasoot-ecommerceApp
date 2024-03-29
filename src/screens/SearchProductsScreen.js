import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as FirebaseServices from "../services/firestore";
import * as algolia from "../services/algolia"
import ProductCard from "../components/ProductCard"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

const SearchProductsScreen = ({route, navigation}) => {
    const {passedSearchTerm} = route.params
    const [products, fetchProducts] = useState([])
    const [wishlist, fetchWishlist] = useState([])

    const queryProducts = async () => {
        try {
            const response = await algolia.searchProducts(passedSearchTerm)

            if(response.length > 0) {
              var result = []
              const dbResponse = await FirebaseServices.getProdsByID(response.map((hit) => hit.objectID))

              if(!dbResponse.empty) {
                result = dbResponse.docs.map((doc) => {
                  var temp = doc.data()
                  temp.id = doc.id

                  return temp
                })

                fetchProducts(result)
              }
            }
        } catch(err) {
            console.error(err)
        }
    }

    const queryWishlist = async (uid) => {
      try {
        const response = await FirebaseServices.getWishlist(uid).get()

        if(response.exists) {
          fetchWishlist(response.data().products)
        }
      }
      catch(err) {
        console.error(err)
      }
    }

    useEffect(() => {
      const uid = FirebaseServices.getUserID()
      const unsubscribe = navigation.addListener("focus", () => {
          queryProducts()
          queryWishlist(uid)
      })

      queryProducts()
      queryWishlist(uid)

      return unsubscribe
    }, [navigation])

    const handleLikeUnlike = async (product, isLiked) => {
      const uid = FirebaseServices.getUserID();
    
      try {
        if(isLiked) {
          await FirebaseServices.addProdToWishlist(uid, product.id);
          fetchWishlist([...wishlist, product.id]);
        } else {
          await FirebaseServices.removeProdFromWishlist(uid, product.id);
          fetchWishlist(wishlist.filter((e) => e !== product.id));
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    // Back and cart buttons ...
    const renderHeader = () => {
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
                    onPress={() => navigation.navigate("Home Page")}>
                    <Image
                        source={require("../../assets/icons/back.png")}
                        resizeMode="contain"
                        style={styles.headerButtons}
                    />
                </TouchableOpacity>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Search Screen")
                        }}>
                        <Image
                            source={require("../../assets/icons/search.png")}
                            resizeMode="contain"
                            style={[styles.headerButtons, {
                                marginEnd: ScreenRatio_iPhone(25)
                            }]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate("My Bag")}}>
                        <View style={{
                            backgroundColor: "black",
                            paddingEnd: ScreenRatio_iPhone(20),
                            paddingStart: ScreenRatio_iPhone(15),
                            paddingVertical: ScreenRatio_iPhone(10),
                            justifyContent: "center",
                            borderTopLeftRadius: ScreenRatio_iPhone(30),
                            borderBottomLeftRadius: ScreenRatio_iPhone(30),
                            bottom: 10,
                        }}>
                            <Image
                                source={require("../../assets/icons/bag.png")}
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

    const renderTitle = () => {
        return (
            <View style={{
                marginHorizontal: ScreenRatio_iPhone(25),
                zIndex: 1,
            }}>
                <Text style={styles.titleText}>Search Results for "{passedSearchTerm}"</Text>
            </View>
        )
    }

    const renderProductCard = ({item}) => (
        <ProductCard
            product={item}
            isLiked={wishlist.includes(item.id)}
            onLikeUnlike={handleLikeUnlike}
            key={item.id}
        />
    )

    return (
        <View>
            {renderHeader()}
            <View style={{marginVertical: ScreenRatio_iPhone(128)}}>
                {renderTitle()}
                <FlatList
                    data={products}
                    renderItem={renderProductCard}
                    keyExtractor={(item) => {item.id}}
                    style={{marginTop: ScreenRatio_iPhone(20), height: "100%"}}
                    showsVerticalScrollIndicator={false}
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
