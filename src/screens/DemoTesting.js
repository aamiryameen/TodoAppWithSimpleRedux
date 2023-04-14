import { View, Text, TextInput } from 'react-native'
import React, {  useState, } from 'react'

const demoTesting = () => {
    const [counter, setCounter] = useState(3)

    const onValueChange = (val) =>{ 
setCounter(counter+val)
return val
    }

  return (
    <View>
      <Text>{counter}</Text>
      <TextInput
      placeholder='username'
      testID='name'
      />
    </View>
  )
}

export default demoTesting