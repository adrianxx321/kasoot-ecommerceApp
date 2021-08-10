import React from 'react';
// createAppContainer has been changed to NavigationContainer
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Product from './src/screens/Product'
import SearchProductsScreen from './src/screens/SearchProductsScreen';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Search Products" component={SearchProductsScreen} />
          <Stack.Screen name="Product" component={Product} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}
