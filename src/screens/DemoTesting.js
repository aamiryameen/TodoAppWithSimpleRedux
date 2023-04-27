import { View, Text, TextInput } from 'react-native'
import React, {  useState, } from 'react'

const demoTesting = () => {


  return (
    <View>
      <TextInput
      placeholder='username'
      testID='name'
      />
    </View>
  )
}

export default demoTesting