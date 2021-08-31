import React from 'react';
// createAppContainer has been changed to NavigationContainer
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './src/screens/HomeScreen';

import AuthScreen from './src/screens/Acc_AuthScreen'
import LoginScreen from './src/screens/Acc_LoginScreen';
import SignUpScreen from './src/screens/Acc_RegisterScreen';
import ProfileScreen from './src/screens/Acc_ProfileScreen';

import SearchScreen from './src/screens/SearchScreen';
import SearchProductsScreen from './src/screens/SearchProductsScreen';
import BagScreen from './src/screens/BagScreen';
import Wishlist from './src/screens/Wishlist';
import Product from './src/screens/Product'
import Payment from './src/screens/Payment';

import { LogBox } from "react-native";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log nitification by msg
LogBox.ignoreAllLogs(); // Ignore all log nitifications








const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator 
          headerMode="none"
          initialRouteName='AuthScreen' ///the name of the initial screen
          >


          <Stack.Screen name="Home Page" component={HomeScreen} />

          {/* CALVIN -  Stack */}
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="Login Screen" component={LoginScreen} />
          <Stack.Screen name="Sign Up Screen" component={SignUpScreen} />
          <Stack.Screen name="Profile Screen" component={ProfileScreen} />

          <Stack.Screen name="Search Screen" component={SearchScreen} />
          <Stack.Screen name="Search Products" component={SearchProductsScreen} />
          <Stack.Screen name="My Bag" component={BagScreen} />
          <Stack.Screen name="My Wishlist" component={Wishlist} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Checkout" component={Payment} /> 
        </Stack.Navigator>
    </NavigationContainer>
  )
}
