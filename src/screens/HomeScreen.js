import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import DashboardProdCard from "../components/DashboardProdCard"

import * as FirebaseServices from "../services/firestore"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"
import { ScreenRatio_General } from "../components/ScreenRatio-General"

const CategoriesFlatList = ({ item, onPress, textColor, underline }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            marginHorizontal: ScreenRatio_iPhone(20),
        }}>
        <View style={[underline]}>
            <Text style={[textColor, {fontSize: ScreenRatio_iPhone(22)}]}>{item.title}</Text>
        </View>
    </TouchableOpacity>
)




const HomeScreen = ({navigation}) => {

    const shoeCategories = [
        {
            id: "0",
            title: "All"
        },
        {
            id: "1",
            title: "Sneakers"
        },
        {
            id: "2",
            title: "Slippers"
        },
        {
            id: "3",
            title: "Others"
        }
    ]
    const [catID, setCatID] = useState(shoeCategories[0].id)
    const [prods, fetchProds] = useState([])

    const getShoes = async(category) => {
        try {
            var response = null
            var result = []
            
            switch(category) {
                case "0":
                    response = await FirebaseServices.getAllShoes()
                    break
                case "3":
                    response = await FirebaseServices.getOtherShoes()
                    break
                default:
                    response = await FirebaseServices.getShoeByCat(shoeCategories[parseInt(catID)].title)
                    break
            }

            if(response != null) {
                response.forEach(doc => result.push(doc.data()))
                fetchProds(result)
            }

        } catch(err) {
            console.error(err)
        }
    }



    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getShoes(catID)
        })

        // Fetch products (not from Firebase)
        getShoes(catID)

        return unsubscribe
    }, [catID])


    const renderHeader = () => {
        const renderItem = ({ item }) => {
            const color = item.id === catID ? "#000000" : "#c2c2c2"
            const borderBottomWidth = item.id ===  catID ? ScreenRatio_iPhone(2) : 0
            
            return (
                <CategoriesFlatList
                    item={item}
                    onPress={() => setCatID(item.id)}
                    textColor={{color}}
                    underline={{borderBottomWidth}}
                />
            )
        }

        return (
            <SafeAreaView>
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
                        onPress={() => {
                                navigation.navigate("Profile Screen")
                        }}
                        style={{
                            marginStart: ScreenRatio_iPhone(15)
                        }}>
                        <Image
                            source={require("../../assets/icons/profile.png")}
                            resizeMode="contain"
                            style={styles.headerButtons}
                        />
                    </TouchableOpacity>

                    {/* KASOOT LOGO - middle of header */}
                    <Image
                            source={require("../../assets/icons/kasoot_logo.png")}
                            resizeMode="contain"
                            style={{width: ScreenRatio_General(110), height: ScreenRatio_General(42)}}
                    />

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
                <FlatList
                    horizontal={true}
                    data={shoeCategories}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        marginTop: ScreenRatio_iPhone(96),
                        marginHorizontal: ScreenRatio_iPhone(15)
                    }}
                />
            </SafeAreaView>
        )
    }

    const renderProducts = ({item}) => (
        <DashboardProdCard
            prodID={item.id}
            prodImg={item.prodImg[0]}
            prodBrand={item.prodBrand}
            prodName={item.prodName}
            prodPrice={item.prodPrice}
            prodDiscount={item.prodDiscount}
            prodCat={item.prodCat}
            prodGender={item.prodGender}
            key={item.id}
        />
    )

    return (
        <View>
            {renderHeader()}
            <FlatList
                data={prods}
                renderItem={renderProducts}
                keyExtractor={item => `${item.id}`}
                contentContainerStyle={{flexGrow: 1}}
                style={{marginTop: ScreenRatio_iPhone(20), marginBottom: ScreenRatio_iPhone(196)}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headerButtons: {
        width: ScreenRatio_iPhone(30),
        height: ScreenRatio_iPhone(30),
    },
})

export default HomeScreen