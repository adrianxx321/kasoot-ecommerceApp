import React from 'react';
// createAppContainer has been changed to NavigationContainer
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SearchScreen from './src/screens/SearchScreen';
import SearchProductsScreen from './src/screens/SearchProductsScreen';
import Product from './src/screens/Product'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Search Screen" component={SearchScreen} />
          <Stack.Screen name="Search Products" component={SearchProductsScreen} />
          <Stack.Screen name="Product" component={Product} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}
