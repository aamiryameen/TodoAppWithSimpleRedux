    import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationTracking from "../screens/locationTracking/LocationTracking"
import LocationTracker from "../screens/locationTracking/LocationTracker"
import ChooseLocation from "../screens/locationTracking/ChooseLocation"
import BackgroundServices from "../screens/backgroundServices"
import {  useSelector } from 'react-redux';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();


function RootStack () {
  const {isLogedIn} = useSelector(state => state.auth);

  useEffect(() =>{
    console.log('isLog',isLogedIn)
  }, [isLogedIn])

  return (
    isLogedIn ?     <NavigationContainer>
      <Stack.Navigator  initialRouteName='LocationTracker'>
        <Stack.Screen name="LocationTracking" component={LocationTracking} />
        <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
        <Stack.Screen name="BackgroundServices" component={BackgroundServices} />
        <Stack.Screen name="LocationTracker" component={LocationTracker} />
      </Stack.Navigator>
    </NavigationContainer> : <AuthStack/>

  )
}

export default RootStack