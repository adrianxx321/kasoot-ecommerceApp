import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"

const Wishlist = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
            Wishlist Screen
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
    fontSize: 48,
    textAlign: 'center',
    margin: 20,
  },
}); 
export default Wishlist     