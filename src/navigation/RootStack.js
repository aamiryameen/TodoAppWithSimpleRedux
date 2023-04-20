    import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationTracking from "../screens/locationTracking/LocationTracking"
import ChooseLocation from "../screens/locationTracking/ChooseLocation"
const Stack = createNativeStackNavigator();

function RootStack () {

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="LocationTracking" component={LocationTracking} />
      <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default RootStack