import React, { useState, useEffect } from "react"
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Animated from "react-native-reanimated"
import Paginator from "../components/Paginator"
import CollapsibleList from "../components/CollapsibleList"
import { LinearGradient } from "expo-linear-gradient"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_General } from "../components/ScreenRatio-General"

const Payment = ({navigation}) => {

    const [loading, setLoading] = useState(true)

    // Back and "more options" buttons ...
    const renderHeader = () => {
        return (
            <SafeAreaView
                style={{
                    zIndex: 3,
                    marginHorizontal: ScreenRatio_General(15),
                    marginVertical: ScreenRatio_General(15),
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

    
        return (
            <View>
                {renderHeader()}
                <Text style={styles.title}>
                    Payment Screen
                </Text>
            </View>
        )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        margin: 20,
    },
      headerButtons: {
        width: ScreenRatio_General(30),
        height: ScreenRatio_General(30),
    },
    imageViewBorders: {
        borderBottomLeftRadius: ScreenRatio_General(50),
        borderBottomRightRadius: ScreenRatio_General(50),
    },
    prodInfoAlignment: {
        flexDirection: "row",
        marginHorizontal: ScreenRatio_General(25),
        marginBottom: ScreenRatio_General(20),
        justifyContent: "space-between"
    },
    prodDescriptions: {
        fontSize: ScreenRatio_General(16),
        lineHeight: ScreenRatio_General(24),
        textAlign: "justify"
    }
}); 

export default Payment