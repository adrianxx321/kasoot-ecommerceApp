import React, { useState, useEffect, Component } from "react"
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView } from "react-native"
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

    const amount = 799.99;
    const [selectedId, setSelectedId] = useState('');

    const [cardName, setcardName] = useState('');
    const [cardNumber, setcardNumber] = useState('');
    const [cardMonth, setcardMonth] = useState('');
    const [cardYear, setcardYear] = useState('');
    const [cardCVV, setcardCVV] = useState('');

    const [TnGPhoneNo, setTnGPhoneNo] = useState('');
    const [BoostPhoneNo, setBoostPhoneNo] = useState('');


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

    const renderPaymentBox = () => {
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
                            fontWeight: "bold",
                        }}>
                            Total amount to pay:
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

    const renderPaymentFlatList = () => {
        

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

    const renderBankCardInputForm = () => {  
        return (
            <SafeAreaView style={{
                marginHorizontal: ScreenRatio_General(50),
                flex: 1,
                height: ScreenRatio_General(400),
                backgroundColor: "#ffffff",
                borderRadius: 7, 
                borderWidth: 3,
                borderColor: "#c2c2c2",    
            }}>
            <Text
                style={{
                    fontSize: ScreenRatio_General(22),
                    textAlign: 'left',
                    marginTop: ScreenRatio_General(10),
                    marginHorizontal: ScreenRatio_General(30),
                    color: "#000000",
                    fontWeight: "bold",
                }}>
                    Card Name:
            </Text>
            <TextInput
                    placeholder="Card Name"
                    keyboardType="default"
                    onChangeText={(input) => setcardName(input)}
                    style={{
                            flexShrink: 1, 
                            fontSize: ScreenRatio_General(18),
                            marginHorizontal: ScreenRatio_General(30),
                            backgroundColor: "#ffffff",
                            height: ScreenRatio_General(50),
                            margin: ScreenRatio_General(15),
                            borderColor: "#4f4f4f",
                            borderWidth: 1,                           
                            borderRadius: 5,
                            padding: 10,
                            width: ScreenRatio_General(365), 
                    }}
                />
                <Text
                style={{
                    fontSize: ScreenRatio_General(22),
                    textAlign: 'left',
                    marginTop: ScreenRatio_General(10),
                    marginHorizontal: ScreenRatio_General(30),
                    color: "#000000",
                    fontWeight: "bold",
                }}>
                    Card Details:
            </Text>
            <TextInput
                    placeholder="Card Number"
                    keyboardType="numeric"
                    maxLength = {16}
                    onChangeText={(input) => setcardNumber(input)}
                    style={{
                            flexShrink: 1, 
                            fontSize: ScreenRatio_General(18),
                            marginHorizontal: ScreenRatio_General(30),
                            backgroundColor: "#ffffff",
                            height: ScreenRatio_General(50),
                            margin: ScreenRatio_General(15),
                            borderColor: "#4f4f4f",
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: ScreenRatio_General(10),   
                            width: ScreenRatio_General(365),                        
                    }}
                />
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginBottom:ScreenRatio_General(10),
                    width: ScreenRatio_General(450),
                }}>
            <TextInput
                    placeholder="MM"
                    keyboardType="number-pad"
                    maxLength = {2}
                    onChangeText={(input) => setcardMonth(input)}
                    style={{
                            flexShrink: 1, 
                            fontSize: ScreenRatio_General(18),
                            marginLeft: ScreenRatio_General(30),
                            marginRight: ScreenRatio_General(10),
                            textAlign: "center", 
                            backgroundColor: "#ffffff",
                            height: ScreenRatio_General(50),
                            margin: ScreenRatio_General(15),
                            borderColor: "#4f4f4f",
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 10,
                            width: ScreenRatio_General(70),
                    }}
                />
                <Text
                style={{
                    fontSize: ScreenRatio_General(22),
                    textAlign: 'left',
                    marginTop: ScreenRatio_General(25),
                    color: "#000000",
                    fontWeight: "bold",
                }}>
                    /
                </Text>
                <TextInput
                            placeholder="YY"
                            keyboardType="number-pad"
                            maxLength = {2}
                            onChangeText={(input) => setcardYear(input)}
                            style={{
                                    flexShrink: 1, 
                                    fontSize: ScreenRatio_General(18),
                                    marginLeft: ScreenRatio_General(10),
                                    marginRight: ScreenRatio_General(60),
                                    textAlign: "center", 
                                    backgroundColor: "#ffffff",
                                    height: ScreenRatio_General(50),
                                    margin: ScreenRatio_General(15),
                                    borderColor: "#4f4f4f",
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    padding: 10,
                                    width: ScreenRatio_General(70), 
                            }}
                        />
                    <TextInput
                        placeholder="CVV"
                        keyboardType="numeric"
                        
                        maxLength = {3}
                        onChangeText={(input) => setcardCVV(input)}
                        style={{
                                flexShrink: 1, 
                                fontSize: ScreenRatio_General(18),
                                marginHorizontal: ScreenRatio_General(30),
                                textAlign: "center", 
                                backgroundColor: "#ffffff",
                                height: ScreenRatio_General(50),
                                margin: ScreenRatio_General(15),
                                borderColor: "#4f4f4f",
                                borderWidth: 1,
                                borderRadius: 5,
                                padding: 10,
                                width: ScreenRatio_General(100), 
                        }}
                    />
                </View>                
            </SafeAreaView>
        )
    }

    const renderTouchnGoInputForm = () => {  
        return (
            <SafeAreaView style={{
                marginHorizontal: ScreenRatio_General(50),
                flex: 1,
                height: ScreenRatio_General(200),
                backgroundColor: "#ffffff",
                borderRadius: 7, 
                borderWidth: 3,
                borderColor: "#c2c2c2",    
            }}>
            <Text
                style={{
                    fontSize: ScreenRatio_General(22),
                    textAlign: 'left',
                    marginTop: ScreenRatio_General(10),
                    marginHorizontal: ScreenRatio_General(30),
                    color: "#000000",
                    fontWeight: "bold",
                }}>
                    Phone Number (Touch n Go):
            </Text>
            <TextInput
                    placeholder="e.g. 01X-XXX XXXX"
                    keyboardType="numeric"
                    onChangeText={(input) => setTnGPhoneNo(input)}
                    style={{
                            flexShrink: 1, 
                            fontSize: ScreenRatio_General(18),
                            marginHorizontal: ScreenRatio_General(30),
                            backgroundColor: "#ffffff",
                            height: ScreenRatio_General(50),
                            margin: ScreenRatio_General(15),
                            borderColor: "#4f4f4f",
                            borderWidth: 1,                           
                            borderRadius: 5,
                            padding: 10,
                            width: ScreenRatio_General(365), 
                    }}
                />             
            </SafeAreaView>
        )
    }

    const renderBoostInputForm = () => {  
        return (
            <SafeAreaView style={{
                marginHorizontal: ScreenRatio_General(50),
                flex: 1,
                height: ScreenRatio_General(200),
                backgroundColor: "#ffffff",
                borderRadius: 7, 
                borderWidth: 3,
                borderColor: "#c2c2c2",    
            }}>
            <Text
                style={{
                    fontSize: ScreenRatio_General(22),
                    textAlign: 'left',
                    marginTop: ScreenRatio_General(10),
                    marginHorizontal: ScreenRatio_General(30),
                    color: "#000000",
                    fontWeight: "bold",
                }}>
                    Phone Number (Boost):
            </Text>
            <TextInput
                    placeholder="e.g. 01X-XXX XXXX"
                    keyboardType="numeric"
                    onChangeText={(input) => setBoostPhoneNo(input)}
                    style={{
                            flexShrink: 1, 
                            fontSize: ScreenRatio_General(18),
                            marginHorizontal: ScreenRatio_General(30),
                            backgroundColor: "#ffffff",
                            height: ScreenRatio_General(50),
                            margin: ScreenRatio_General(15),
                            borderColor: "#4f4f4f",
                            borderWidth: 1,                           
                            borderRadius: 5,
                            padding: 10,
                            width: ScreenRatio_General(365), 
                    }}
                />             
            </SafeAreaView>
        )
    }

    const renderPaymentSelection = () => {
        if (selectedId == "1") {
            return (
                <View>
                {renderBankCardInputForm()}
                </View>
            )
        }
        else if (selectedId == "2") {
            return (
                <View>
                {renderTouchnGoInputForm()}
                </View>
            )
        }
        else if (selectedId == "3") {
            return (
                <View>
                {renderBoostInputForm()}
                </View>
            )
        }
        else {
            return <View></View>
        }        
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
                            bottomOffset: ScreenRatio_General(110),
                        })
                    }}>
                    <Text style={{
                        backgroundColor: "#000000",
                        marginVertical: ScreenRatio_General(20),
                        marginHorizontal: ScreenRatio_General(120),
                        color: "#ffffff",
                        paddingVertical: ScreenRatio_General(20),
                        borderRadius: ScreenRatio_General(35),
                        fontSize: ScreenRatio_General(22),
                        fontWeight: "bold",
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
            <ScrollView>
            {renderHeader()}
            {renderTitle()}           
            {renderDescription()}
            {renderPaymentBox()}
            {renderPaymentFlatList()}
            {renderPaymentSelection()}
            {renderPaymentButton()}
            {paymentSuccessfulToast()}
            </ScrollView>          
        </View>
    )  
}

const styles = StyleSheet.create({
    item: {
        padding: ScreenRatio_General(17),
        marginVertical: ScreenRatio_General(10),
        marginHorizontal: ScreenRatio_General(10),
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