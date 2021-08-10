import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as firebase from "firebase"
import "firebase/firestore"
import ProductCard from "../components/ProductCard"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyA3vh9VqlkPZfTEosvvRnTb8EW80A5aDGo',
    authDomain: 'kasoot-1920c.firebaseapp.com',
    projectId: 'kasoot-1920c',
    databaseURL: 'https://kasoot-1920c.firebaseio.com',
    storageBucket: 'kasoot-1920c.appspot.com',
  };
!firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore(): firebase.app().firestore()


const SearchProductsScreen = ({navigation}) => {
    const [search, setSearch] = useState('Adidas NMD')
    const [products, fetchProducts] = useState(Array())
    
    useEffect(() => {
        firebase.firestore().collection('shoes').get().then((querySnapshot)=>{            
            let shoeArray = []  
            querySnapshot.forEach((shoe) => {
                shoeArray.push(shoe.data());
            });
            fetchProducts(shoeArray)
        });
    })

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
            prodImg={item.prodImg[0]}
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