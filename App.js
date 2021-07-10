import React from 'react';
import Product from './src/screens/Product';
// createAppContainer has been changed to NavigationContainer
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
        >
          <Stack.Screen name="Product" component={Product} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}