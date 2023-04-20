import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import SearchLocation from '../../components/SearchLocation'
import Button from '../../components/Button'

const ChooseLocation = ({navigation, route}) => {
  const [tracking,setTracking] = useState({
   
    PICKUP_POINTS: {
        latitude: null,
         longitude: null
    },
    DESTINATION: {
      latitude: null,
      longitude: null
    }
        })

        const {PICKUP_POINTS, DESTINATION} = tracking

  const onLocatoinSelect = () => {
  route.params.fetchDetails({PICKUP_POINTS, DESTINATION})
navigation.goBack()
  }
  const fetchPickupLocation =(lat, lng) => {
    setTracking({...tracking, PICKUP_POINTS: {latitude: lat, longitude: lng}})
 console.log(lat, lng)

  }
  const fetchDestinationLocation =(lat, lng) => {
    setTracking({...tracking, DESTINATION: {latitude: lat, longitude: lng}})
    console.log(lat, lng)
     }

  return (
    <View style={styles.container}>
<ScrollView  style={{flex: 0.6}} keyboardShouldPersistTaps={'always'}>
<SearchLocation onFetchLocation={fetchPickupLocation}  placeholderText={'pickup point'} />
<View style={{marginTop: 70}}>
<SearchLocation onFetchLocation={fetchDestinationLocation} placeholderText={'destination point'} />
</View>
</ScrollView>

<Button title={'DONE'} onPress={onLocatoinSelect} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex:0.99
  }
})
export default ChooseLocation