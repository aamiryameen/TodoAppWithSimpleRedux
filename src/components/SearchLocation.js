import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '../utils/constants';


const SearchLocation = ({placeholderText, onFetchLocation}) => {
  return (
    <View style={styles.container}>
<GooglePlacesAutocomplete
fetchDetails={true}
      placeholder={placeholderText}
      onPress={(data, details = null) => {
        let lat = details.geometry.location.lat;
        let lng = details.geometry.location.lng
        // 'details' is provided when fetchDetails = true
        onFetchLocation(lat,lng)
        // console.log(data, details);
      }}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,

    }
})

export default SearchLocation