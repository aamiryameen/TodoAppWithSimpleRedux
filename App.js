
import React, { useEffect } from 'react'
import store from './src/Redux/store'
import { Provider } from 'react-redux'
import Todos from './src/screens/Todos'
import { getApi } from './src/services'


const App = () => {

  useEffect(() =>{
    getApi().then((response) => console.log('response', response)).
    catch((error) => console.log('error', error))
  }, [])

  return (
    <Provider store={store}>
      <Todos />
    </Provider>
  )
}

export default App