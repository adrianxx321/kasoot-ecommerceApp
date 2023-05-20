import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as FirebaseServices from "../services/firestore";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { ScreenRatio_iPhone } from "./ScreenRatio-iPhone";

const formatter = Intl.NumberFormat('en-UK', {
  style: "currency",
  currency: "MYR"
});

const ProductCard = ({ product, isLiked, onLikeUnlike }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Fetch wishlist from Firebase
      fetchWishlist(FirebaseServices.getUserID());
    });

    // Fetch wishlist from Firebase
    fetchWishlist(FirebaseServices.getUserID());

    return unsubscribe;
  }, [navigation]);

  const fetchWishlist = async (uid) => {
    try {
      const response = await FirebaseServices.getWishlist(uid).get();
      if (response.exists) {
        const wishlist = response.data().products;
        const isCurrentlyLiked = wishlist.includes(product.id);
        if (isLiked !== isCurrentlyLiked) { // Only update if the current state differs
          onLikeUnlike(product, isCurrentlyLiked);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePress = () => {
    navigation.navigate("Product", { shoeID: product.id });
  };

  const handleLikeUnlike = () => {
    onLikeUnlike(product, !isLiked);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#ebedf2",
          marginHorizontal: ScreenRatio_iPhone(15),
          marginBottom: ScreenRatio_iPhone(15),
          padding: ScreenRatio_iPhone(10),
          borderRadius: ScreenRatio_iPhone(40),
        }}
      >
        <Image
          source={{ uri: product.prodImg[0] }}
          style={{
            width: ScreenRatio_iPhone(128),
            height: ScreenRatio_iPhone(128),
            backgroundColor: "#e3e5ea",
            borderRadius: ScreenRatio_iPhone(40),
          }}
        />
        <View
          style={{
            flexShrink: 1,
            marginLeft: ScreenRatio_iPhone(16),
            marginTop: ScreenRatio_iPhone(12),
            width: "100%",
          }}
        >
          <Text
            style={[styles.cardText, { fontWeight: "bold", lineHeight: ScreenRatio_iPhone(22) }]}
          >
            {product.prodBrand} {product.prodName}
          </Text>
          <Text
            style={[
              styles.cardText,
              { textDecorationLine: product.prodDiscount ? "line-through" : "none" },
            ]}
          >
            {formatter.format(product.prodPrice)}
          </Text>
          <Text
            style={[
              styles.cardText,
              { display: product.prodDiscount ? "flex" : "none", fontWeight: "bold", color: "#de651d" },
            ]}
          >
            {formatter.format(product.prodPrice * (1 - product.prodDiscount / 100))}
          </Text>
        </View>
        <View style={{ marginEnd: ScreenRatio_iPhone(16), justifyContent: "center" }}>
          <TouchableOpacity onPress={handleLikeUnlike}>
            <Image
              source={ isLiked ? require("../../assets/icons/wishlist-selected.png") : require("../../assets/icons/wishlist.png") }
              style={{
                width: ScreenRatio_iPhone(24),
                height: ScreenRatio_iPhone(24),
                tintColor: isLiked ? "#e30022" : "#000000",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardText: {
    fontSize: ScreenRatio_iPhone(18),
    lineHeight: ScreenRatio_iPhone(44),
  },
});

export default ProductCard;
