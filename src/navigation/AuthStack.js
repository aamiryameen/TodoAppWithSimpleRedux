import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from "../screens/auth/Signin"
import Signup from "../screens/auth/Signup"

const Stack = createNativeStackNavigator();

function AuthStack () {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AuthStack