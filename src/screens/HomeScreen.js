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
                    response = await FirebaseServices.getAllProds()
                    break
                case "3":
                    response = await FirebaseServices.getOtherProds()
                    break
                default:
                    response = await FirebaseServices.getProdByCat(shoeCategories[parseInt(catID)].title)
                    break
            }

            if(response != null) {
                response.forEach(doc => {
                    result.push(doc.data())
                    // Append id property after appending the queried shoe itself
                    // as Firestore by default doesn't include id in returned document
                    result[result.length - 1].id = doc.id
                })
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
        const renderCategories = ({ item }) => {
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
                position: "absolute"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile Screen");
                }}
                style={{
                  flex: 1 / 3,
                  marginStart: ScreenRatio_iPhone(15),
                }}
              >
                <Image
                  source={require("../../assets/icons/profile.png")}
                  resizeMode="contain"
                  style={styles.headerButtons}
                />
              </TouchableOpacity>

              {/* KASOOT LOGO - middle of header */}
              <View style={{ flex: 1 / 3 }}>
                <Image
                  source={require("../../assets/icons/kasoot_logo.png")}
                  resizeMode="contain"
                  style={{
                    width: ScreenRatio_General(130),
                    height: ScreenRatio_General(50),
                    bottom: ScreenRatio_General(5)
                  }}
                />
              </View>

              <View style={{ flex: 1 / 3, flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Search Screen");
                  }}
                >
                  <Image
                    source={require("../../assets/icons/search.png")}
                    resizeMode="contain"
                    style={[
                      styles.headerButtons,
                      {
                        marginEnd: ScreenRatio_iPhone(25),
                      },
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("My Bag"); }}>
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
                        tintColor: "white",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={shoeCategories}
                renderItem={renderCategories}
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
            product={item}
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
                showsVerticalScrollIndicator={false}
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