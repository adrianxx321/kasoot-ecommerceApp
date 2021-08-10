import React from 'react';
// createAppContainer has been changed to NavigationContainer
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as firebase from 'firebase'

import Product from './src/screens/Product'
import SearchProductsScreen from './src/screens/SearchProductsScreen';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyA3vh9VqlkPZfTEosvvRnTb8EW80A5aDGo',
  authDomain: 'kasoot-1920c.firebaseapp.com',
  projectId: 'kasoot-1920c',
  databaseURL: 'https://kasoot-1920c.firebaseio.com',
  storageBucket: 'kasoot-1920c.appspot.com',
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore(): firebase.app().firestore()

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
