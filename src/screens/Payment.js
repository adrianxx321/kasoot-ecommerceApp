import React, { useState, useEffect, Component } from "react"
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_General } from "../components/ScreenRatio-General"
import Toast from "react-native-toast-message"

// Currency formatter
const formatter = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "MYR"
})

const PaymentType = [
    {
        id: "1",
        title: "Bank Card"
    },
    {
        id: "2",
        title: "Touch n Go"
    },
    {
        id: "3",
        title: "Boost"
    }
];

const FlatListItem = ({ item, onPress, backgroundColor, textColor, borderColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor, borderColor]}>
        <Text style={[textColor]}>{item.title}</Text>
    </TouchableOpacity>
);

const Payment = ({navigation}) => {

    const amount = 599.99;

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

    const renderTitle = () => {
        return (
            <SafeAreaView>               
                <Text
                    style={{
                        fontSize: ScreenRatio_General(35),
                        textAlign: 'center',
                        marginTop: ScreenRatio_General(40),
                        marginHorizontal: ScreenRatio_General(30),
                        color: "#de651d",
                        fontWeight: "bold",
                    }}>
                        Confirm Order and Pay
                </Text>
            </SafeAreaView>
        )
    }

    const renderDescription = () => {
        return (
            <SafeAreaView>               
                <Text
                    style={{
                        fontSize: ScreenRatio_General(20),
                        textAlign: 'justify',
                        marginHorizontal: ScreenRatio_General(60),
                        color: "#000000",
                    }}>
                        Please make payment with the amount stated below, and confirm to place the purchase order.
                </Text>
            </SafeAreaView>
        )
    }

    const RenderPaymentBox = () => {
        return (
            <SafeAreaView
                style={{
                    backgroundColor: "#de651d",
                    marginTop: ScreenRatio_General(30),
                    marginHorizontal: ScreenRatio_General(40),
                    borderRadius: 7,
                    borderWidth: 3,
                    borderColor: "#d4570d",
                    }}>               
                    <Text
                        style={{
                            fontSize: ScreenRatio_General(22),
                            textAlign: 'left',
                            marginTop: ScreenRatio_General(10),
                            marginHorizontal: ScreenRatio_General(30),
                            marginBottom: ScreenRatio_General(30),
                            color: "#ffffff",
                        }}>
                            You have to pay:
                    </Text>

                    <Text
                        style={{
                            fontSize: ScreenRatio_General(40),
                            textAlign: 'right',
                            marginHorizontal: ScreenRatio_General(20),
                            marginTop: ScreenRatio_General(30),
                            marginBottom: ScreenRatio_General(40),
                            color: "#ffffff",
                            fontWeight: "bold",
                            textDecorationLine: 'underline'
                        }}>
                            {formatter.format(amount)}
                    </Text>
            </SafeAreaView>
        )
    }

    const RenderPaymentFlatList = () => {
        const [selectedId, setSelectedId] = useState(null);

        const renderItem = ({ item }) => {
            const backgroundColor = item.id === selectedId ? "#de651d" : "#c2c2c2";
            const color = item.id === selectedId ? 'white' : 'black';
            const borderColor = item.id === selectedId ? "#d4570d" : "#b0b0b0";

            return (
            <FlatListItem
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
                borderColor={{ borderColor }}
            />
            );
        };

        return (
            <SafeAreaView>
            <Text
                style={{
                    fontSize: ScreenRatio_General(22),
                    textAlign: 'left',
                    marginVertical: ScreenRatio_General(10),
                    marginHorizontal: ScreenRatio_General(60),
                    color: "#000000",
                    fontWeight: "bold",
                }}>
                    PAYMENT METHODS:
                </Text>

            <FlatList
                style={{
                    marginHorizontal: ScreenRatio_General(50),                   
                }}
                horizontal
                data={PaymentType}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
            </SafeAreaView>
        );
    };

    const renderPaymentButton = () => {
        return (
            <SafeAreaView>
            <TouchableOpacity
                        onPress={() => {
                            Toast.show({
                                type: "success",
                                position: "bottom",
                                text1: "Payment Successful!",
                                text2: "Order Placed!", 
                                visibilityTime: 1000,
                                bottomOffset: ScreenRatio_General(100),
                            })
                        }}>
                        <Text style={{
                            backgroundColor: "#de651d",
                            marginTop: ScreenRatio_General(50),
                            marginHorizontal: ScreenRatio_General(120),
                            color: "#ffffff",
                            paddingVertical: ScreenRatio_General(20),
                            borderRadius: ScreenRatio_General(35),
                            borderWidth: 3,
                            borderColor: "#d4570d",
                            fontSize: ScreenRatio_General(22),
                            overflow: "hidden",
                            textAlign: "center",
                        }}> Pay {formatter.format(amount)}
                        </Text>
                    </TouchableOpacity>
            </SafeAreaView>
        )
    }

    const paymentSuccessfulToast = () => {
        return (
            <Toast ref={(ref => Toast.setRef(ref))}/>
        )
    }

    return (
        <View>
            {renderHeader()}
            {/* <View style={styles.space} /> */}
            <ScrollView style={{
                height: "84%",
                Color: "#ffffff",
            }}>
            {renderTitle()}           
            {renderDescription()}
            {RenderPaymentBox()}
            {RenderPaymentFlatList()}
            </ScrollView>
            {renderPaymentButton()}
            {paymentSuccessfulToast()}
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
    item: {
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 3,
    },
      headerButtons: {
        width: ScreenRatio_General(30),
        height: ScreenRatio_General(30),
    },
    space: { 
        height: ScreenRatio_General(40),
    },
}); 

export default Payment