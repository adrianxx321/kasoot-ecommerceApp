import React from 'react';
// createAppContainer has been changed to NavigationContainer
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import SearchProductsScreen from './src/screens/SearchProductsScreen';
import BagScreen from './src/screens/BagScreen';
import Product from './src/screens/Product'
import Payment from './src/screens/Payment';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home Page" component={HomeScreen} />
          <Stack.Screen name="Search Screen" component={SearchScreen} />
          <Stack.Screen name="Search Products" component={SearchProductsScreen} />
          <Stack.Screen name="My Bag" component={BagScreen} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Checkout" component={Payment} /> 
        </Stack.Navigator>
    </NavigationContainer>
  )
}
