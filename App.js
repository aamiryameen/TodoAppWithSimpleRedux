
import React, { useEffect } from 'react'
import store from './src/Redux/store'
import { LogBox } from 'react-native';
import { Provider } from 'react-redux'
import Todos from './src/screens/Todos'
import { getApi } from './src/services'
import RootStack from './src/navigation/RootStack'


const App = () => {
  LogBox.ignoreAllLogs();
  // useEffect(() =>{
  //   getApi().then((response) => console.log('response', response)).
  //   catch((error) => console.log('error', error))
  // }, [])

  return (
    
    <Provider store={store}>
      {/* <Todos /> */}
      <RootStack/>
    </Provider>
  )
}

export default App