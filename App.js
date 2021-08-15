import React from 'react';
// createAppContainer has been changed to NavigationContainer
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './src/screens/HomeScreen';
import BagScreen from './src/screens/BagScreen';
import MoreScreen from './src/screens/MoreScreen';
import NewsFeed from './src/screens/NewsFeed';
import Wishlist from './src/screens/Wishlist';
import Payment from './src/screens/Payment';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Payment" component={Payment} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}
