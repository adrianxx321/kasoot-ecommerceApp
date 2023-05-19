import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import * as FirebaseServices from "../services/firestore";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { ScreenRatio_iPhone } from "../components/ScreenRatio-iPhone";

const Wishlist = ({ navigation }) => {
const [wishlist, setWishlist] = useState([]);
const [products, setProducts] = useState([]);

const fetchWishlistAndProds = async (uid) => {
    try {
      const wishlistResponse = await FirebaseServices.getWishlist(uid).get();
      
      if (wishlistResponse.exists) {
          const wishlistData = wishlistResponse.data();
          setWishlist(wishlistData.shoes);
          
          if (wishlistData.shoes.length > 0) {
            const productResponse = await FirebaseServices.getShoesByID(wishlistData.shoes);
            const productsData = [];
            
            productResponse.docs.forEach((shoe) => {
                const productData = shoe.data();
                productData.id = shoe.id;
                productsData.push(productData);
            });
            setProducts(productsData);
          }
      }
    } catch(err) {
      console.error(err);
    }
};

useEffect(() => {
    const uid = FirebaseServices.getUserID();
    fetchWishlistAndProds(uid);

    const unsubscribe = navigation.addListener("focus", () => {
      fetchWishlistAndProds(uid);
    });

    return unsubscribe;
}, [navigation]);

const handleLikeUnlike = async (product, isLiked) => {
  const uid = FirebaseServices.getUserID();

  try {
    if (isLiked) {
      await FirebaseServices.addToShoeWishlist(uid, product.id);

      setWishlist([...wishlist, product.id]);
      setProducts([...products, product]); // Push the product directly
    } else {
      await FirebaseServices.removeShoeFromWishlist(uid, product.id);

      setWishlist(wishlist.filter((e) => e !== product.id));
      setProducts(products.filter((e) => e.id !== product.id)); // Filter out the item by its id
    }
  } catch (err) {
    console.error(err);
  }
};

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
                  style={{
                      width: ScreenRatio_iPhone(30),
                      height: ScreenRatio_iPhone(30),
                  }}
              />
          </TouchableOpacity>
      </SafeAreaView>
    )
}

const renderTitle = () => {
    return (
      <SafeAreaView style={styles.pageHeader}>
          <Text style={{
              fontWeight: "bold",
              fontSize: ScreenRatio_iPhone(36)
          }}>My Wishlist</Text>
          <Text style={{
              color: "#a3a3a3",
              fontSize: ScreenRatio_iPhone(24)
          }}>{wishlist.length} items</Text>
      </SafeAreaView>
    )
}

const renderWishlistItem = ({item}) => (
    <ProductCard
      product={item}
      wishlist={wishlist}
      isLiked={wishlist.includes(item.id)}
      onLikeUnlike={handleLikeUnlike}
      key={item.id}
    />
);

return (
    <View>
      {renderHeader()}
      <View style={{ marginVertical: ScreenRatio_iPhone(64) }}>
        {renderTitle()}
        <FlatList
          data={products}
          renderItem={renderWishlistItem}
          style={{ marginTop: ScreenRatio_iPhone(20), height: "100%" }}
        />
      </View>
    </View>
);
};

const styles = StyleSheet.create({
    pageHeader: {
      marginHorizontal: ScreenRatio_iPhone(25),
      marginTop: ScreenRatio_iPhone(25),
      marginBottom: ScreenRatio_iPhone(10),
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
    }
})

export default Wishlist;
