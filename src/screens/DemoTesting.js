import { View, Text, TextInput, NativeModules } from 'react-native'
import React, {  useState, } from 'react'



const demoTesting = () => {
    const [counter, setCounter] = useState(3)
    const {ToastModule} = NativeModules;

 useEffect(() => {

    ToastModule.showToast('This is a native toast!!');
  
  
 }, [])

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