
import React, { useEffect } from 'react'
import store from './src/Redux/store'
import { Provider } from 'react-redux'
import Todos from './src/screens/Todos'
import { getApi } from './src/services'
import LocationTracking from './src/screens/locationTracking/LocationTracking'


const App = () => {

  useEffect(() =>{
    getApi().then((response) => console.log('response', response)).
    catch((error) => console.log('error', error))
  }, [])

  return (
    <Provider store={store}>
      {/* <Todos /> */}
      <LocationTracking/>
    </Provider>
  )
}

export default App