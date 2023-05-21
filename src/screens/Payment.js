import React, { useState } from "react"
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, TouchableWithoutFeedback, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CheckoutItemCard from "../components/CheckoutItemCard"
import BankCardInput from "../components/BankCardInput"

import 'intl'
import 'intl/locale-data/jsonp/en'
import { ScreenRatio_General } from "../components/ScreenRatio-General"
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone"

import * as FirebaseServices from "../services/firestore"

// Currency formatter
const formatter = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "MYR"
})

const PaymentType = [
    {
        id: "1",
        title: "Credit/Debit Card",
        icon:require( "../../assets/icons/card.png")
    },
    {
        id: "2",
        title: "Touch n Go",
        icon: require("../../assets/icons/tng.png")
    },
    {
        id: "3",
        title: "Boost",
        icon: require("../../assets/icons/boost.png")
    }
];

const Payment = ({route, navigation}) => {
    const {amount, cartItems} = route.params
    const [selectedMethod, setSelectedMethod] = useState('');
    const phoneNumRegex = /^01[0-9]-\d{7}$/;
    const [cardInfo, setCardInfo] = useState(null);
    const [TnGPhoneNo, setTnGPhoneNo] = useState('');
    const [BoostPhoneNo, setBoostPhoneNo] = useState('');

    const orderCompleted = async ({payment_method}) => {
      Alert.alert(
        "Payment Successful",
        "Your order has been placed!",
        [
            {
              text: "OK",
              onPress: () => {
                console.log("AlertBox: PAYMENT SUCCESSFUL")
              }
            }
        ],
        {cancelable: true}
      )

      await FirebaseServices.deleteCart(FirebaseServices.getUserID())
    }

    const renderHeader = () => {
      return (
        <View style={styles.headerText}>
          <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <Image
                  source={require("../../assets/icons/back.png")}
                  resizeMode="contain"
                  style={{
                      width: ScreenRatio_iPhone(30),
                      height: ScreenRatio_iPhone(30)
                  }}
              />
          </TouchableOpacity>
          {/* Future Purchase T&C Screen */}
          <TouchableWithoutFeedback onPress={() => {}}>
              <Text style={{
                  color: "#a3a3a3",
                  fontSize: ScreenRatio_iPhone(20),
                  textDecorationLine: "underline"
              }}>Terms & Conditions</Text>
          </TouchableWithoutFeedback>
        </View>
      )
    }

    const renderTitle = () => {
      return (
        <View style={styles.headerText}>
          <Text style={{
              fontWeight: "bold",
              fontSize: ScreenRatio_iPhone(36)
          }}>Checkout</Text>
          <Text style={{
              color: "#a3a3a3",
              fontSize: ScreenRatio_iPhone(24)
          }}>{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</Text>
        </View>
      )
    }

    const renderPaymentFlatList = () => {
        const renderItem = ({ item }) => {
            const backgroundColor = item.id === selectedMethod ? "#de651d" : "#d6d6d6";
            const color = item.id === selectedMethod ? "#ffffff" : "#93959e";

            const FlatListItem = ({ item, onPress, backgroundColor, textColor }) => (
              <TouchableOpacity onPress={onPress} style={[styles.paymentOption, backgroundColor]}>
                <View style={{flexDirection: "row", alignItems: "center", }}>
                  <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={{
                      width: ScreenRatio_iPhone(24),
                      height: ScreenRatio_iPhone(24),
                      tintColor: selectedMethod === item.id ? "#ffffff" : "#93959e",
                      marginRight: ScreenRatio_iPhone(8)
                    }}
                  />
                  <Text style={[textColor]}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );

            return (
              <FlatListItem
                item={item}
                onPress={() => setSelectedMethod(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
              />
            );
        };

        return (
            <View style={{marginBottom: ScreenRatio_iPhone(16)}}>
              <Text style={[styles.subHeaderText, {marginBottom: ScreenRatio_iPhone(8)}]}>
                Select a payment method:
              </Text>
              <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={PaymentType}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  extraData={selectedMethod}
              />
            </View>
        );
    };

    // Renders the appropriate payment fields according to selected payment method
    const renderPaymentSelection = () => {
      switch (selectedMethod) {
        case "1":
          return (
              renderBankCardInputForm()
            )
          case "2":
            return (
              renderTouchnGoInputForm()
            )
          case "3":
            return (
              renderBoostInputForm()
            )
          default:
            return (
              <View></View>
            )
      } 
    };

    const renderBankCardInputForm = () => {
      return (
        <View>
          <Text style={[styles.subHeaderText, {marginBottom: ScreenRatio_iPhone(8)}]}>Enter your credit/debit card details:</Text>
          <BankCardInput cardInfo={cardInfo} setCardInfo={setCardInfo}/>
          <Text style={{marginTop: ScreenRatio_iPhone(12), color: "darkgray"}}>Disclaimer: We won't save your card details for the sake of data security.</Text>
        </View>
      )
    }

    const renderTouchnGoInputForm = () => {
      return (
        <View>
          <Text style={[styles.subHeaderText, {marginBottom: ScreenRatio_iPhone(6)}]}>Enter your registered phone number:</Text>
          <View style={{
            marginVertical: ScreenRatio_iPhone(6),
            flexDirection: "row",
            marginHorizontal: ScreenRatio_iPhone(14)
          }}>
            <TextInput
              onChangeText={(input) => setTnGPhoneNo(input)}
              keyboardType="phone-pad"
              placeholder="012-3456789"
              placeholderTextColor={"darkgray"}
              style={{
                flex: 1,
                fontSize: ScreenRatio_iPhone(16),
                color: phoneNumRegex.test(TnGPhoneNo) ? "green" : "red"
              }}
            ></TextInput>
            <Image
              source={require("../../assets/tng-colored.png")}
              style={{height: ScreenRatio_iPhone(32), width: ScreenRatio_iPhone(32)}}  
            />
          </View>
          <Text style={{marginTop: ScreenRatio_iPhone(8), color: "darkgray"}}>
            You will be directed to TnG payment network to proceed for payment.
          </Text>
        </View>
      )
    }

    const renderBoostInputForm = () => {
      return (
        <View>
          <Text style={[styles.subHeaderText, {marginBottom: ScreenRatio_iPhone(6)}]}>Enter your registered phone number:</Text>
          <View style={{
            marginVertical: ScreenRatio_iPhone(6),
            flexDirection: "row",
            marginHorizontal: ScreenRatio_iPhone(14)
          }}>
            <TextInput
              onChangeText={(input) => setBoostPhoneNo(input)}
              keyboardType="phone-pad"
              placeholder="012-3456789"
              placeholderTextColor={"darkgray"}
              style={{
                flex: 1,
                fontSize: ScreenRatio_iPhone(16),
                color: phoneNumRegex.test(TnGPhoneNo) ? "green" : "red"
              }}
            ></TextInput>
            <Image
              source={require("../../assets/boost-colored.png")}
              style={{height: ScreenRatio_iPhone(32), width: ScreenRatio_iPhone(32)}}  
            />
          </View>
          <Text style={{marginTop: ScreenRatio_iPhone(8), color: "darkgray"}}>
            You will be directed to Boost™ payment network to proceed for payment.
          </Text>
        </View>
      )
    }

    // Total payable and place order button
    const renderFooter = () => {
        const canProceed = () => {
          switch (selectedMethod) {
            case "1":
              return cardInfo != null && cardInfo.status.number === "valid" 
              && cardInfo.status.expiry === "valid" 
              && cardInfo.status.cvc === "valid";
            case "2":
              return phoneNumRegex.test(TnGPhoneNo);
            case "3":
              return phoneNumRegex.test(BoostPhoneNo);
            case '':
              return false;
            default:
              return false;
          }
        }
        
        return (
          <View style={{
            position: "absolute",
            bottom: 0,
            paddingBottom: ScreenRatio_iPhone(28),
            width: "100%"
          }}>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: ScreenRatio_iPhone(48)}}>
                <Text style={{fontSize: ScreenRatio_iPhone(26), color: "#919191"}}>Total Payable</Text>
                <Text style={{fontSize: ScreenRatio_iPhone(26)}}>{formatter.format(amount)}</Text>
            </View>
            <TouchableOpacity
                disabled={!canProceed()}
                onPress={async () => {
                  // TODO: Create order in Firebase & Thank you page 
                  // FirebaseServices.deleteCart(FirebaseServices.getUserID())
                  await orderCompleted(selectedMethod)
                  navigation.navigate("Home Page")
                }}>
                <Text style={{
                  backgroundColor: canProceed() ? "#000000" : "#d6d6d6",
                  color: canProceed() ? "#ffffff" : "#93959e",
                  fontWeight: "500",
                  paddingVertical: ScreenRatio_iPhone(16),
                  borderRadius: ScreenRatio_iPhone(32),
                  fontSize: ScreenRatio_iPhone(22),
                  overflow: "hidden",
                  textAlign: "center",
                }}>Place Order
                </Text>
            </TouchableOpacity>
          </View>
        )
    }

    const paymentToast = () => {
      return (
          <Toast ref={(ref => Toast.setRef(ref))}/>
      )
    }

    return (
      <SafeAreaView style={styles.masterView}>
        {renderHeader()}
        {renderTitle()}
        <ScrollView showsVerticalScrollIndicator={false} style={{maxHeight: "60%"}}>
          <FlatList
            data={cartItems}
            renderItem={({item}) => { return <CheckoutItemCard item={item}/> }}
            keyExtractor={(item) => item.id}
            style={{marginTop: ScreenRatio_iPhone(20)}}
            showsVerticalScrollIndicator={false}
          />
          <View style={{marginVertical: ScreenRatio_iPhone(16)}}>
            {renderPaymentFlatList()}
            {renderPaymentSelection()}
          </View>
        </ScrollView>
        {renderFooter()}
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    masterView: {
      flex: 1,
      marginHorizontal: ScreenRatio_iPhone(25),
    },
    headerText: {
      marginTop: ScreenRatio_iPhone(25),
      marginBottom: ScreenRatio_iPhone(10),
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
    },
    subHeaderText: {
      fontSize: ScreenRatio_General(22),
      fontWeight: "bold",
    },
    paymentOption: {
        padding: ScreenRatio_General(16),
        marginVertical: ScreenRatio_General(10),
        marginHorizontal: ScreenRatio_General(10),
        borderRadius: ScreenRatio_General(30),
    },
});

export default Payment
