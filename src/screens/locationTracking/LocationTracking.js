import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View, Dimensions, PermissionsAndroid } from "react-native";
import MapView,{Marker} from "react-native-maps";
import {NativeModules} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { useRef } from "react";
import { GOOGLE_MAPS_APIKEY } from "../../utils/constants";
import Button from "../../components/Button";
import Geolocation from '@react-native-community/geolocation';

export default function LocationTracking({navigation}) {


    
    const {ToastModule} = NativeModules;

    const mapRef = useRef()
    const { width, height } = Dimensions.get('window');

    const [
      locationStatus,
      setLocationStatus
    ] = useState('');
    const [tracking,setTracking] = useState({
PICKUP_POINTS: {
    latitude:  37.3318456,
     longitude: -122.0296002,
     latitudeDelta: 0.0922,
     longitudeDelta: 0.0421,
},
DESTINATION: {
    latitude:  37.771707,
     longitude: -122.4053769,
     latitudeDelta: 0.0922,
     longitudeDelta: 0.0421,
}
    })

   const {PICKUP_POINTS, DESTINATION} = tracking

   const fetchLocationDetails = (data) => {
     setTracking({
       PICKUP_POINTS:  {latitude: data.PICKUP_POINTS.latitude,
         longitude: data.PICKUP_POINTS.longitude},

    DESTINATION: {latitude: data.DESTINATION.latitude,
       longitude: data.DESTINATION.longitude }
    })
   }

   const onNavigate = () => {
navigation.navigate('ChooseLocation',{
  fetchDetails: fetchLocationDetails
})

   }
   useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);
    // useEffect(() => {
    //     ToastModule.showToast('This is a native toast!!');
    //  }, [])

    const getOneTimeLocation = () => {
      setLocationStatus('Getting Location ...');
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          setLocationStatus('You are Here');
  
          //getting the Longitude from the location json
          const currentLongitude = 
            JSON.stringify(position.coords.longitude);
  
          //getting the Latitude from the location json
          const currentLatitude = 
            JSON.stringify(position.coords.latitude);
  
   
          setTracking({...tracking, PICKUP_POINTS: {latitude: position.coords.latitude, longitude: position.coords.longitude}});
          
         
        },
        (error) => {
          setLocationStatus(error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000
        },
      );
    };
  
    const subscribeLocationLocation = () => {
      watchID = Geolocation.watchPosition(
        (position) => {
          //Will give you the location on location change
          
          setLocationStatus('You are Here');
          console.log(position);
  
          //getting the Longitude from the location json        
          const currentLongitude =
            JSON.stringify(position.coords.longitude);
  
          //getting the Latitude from the location json
          const currentLatitude = 
            JSON.stringify(position.coords.latitude);
  
            setTracking({...tracking, PICKUP_POINTS: {latitude: position.coords.latitude, longitude: position.coords.longitude}});
        },
        (error) => {
          setLocationStatus(error.message);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 1000
        },
      );
    };

  return (
    <View style={styles.container}>
    {/*Render our MapView*/}
      <MapView
        style={styles.map}
        ref={mapRef}
        //specify our coordinates.
        initialRegion={PICKUP_POINTS}
      >
      <Marker
          coordinate={PICKUP_POINTS}
      />
        <Marker
          coordinate={DESTINATION}
      />
         <MapViewDirections
    origin={PICKUP_POINTS}
    destination={DESTINATION}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={4}
    strokeColor={'red'}
    optimizeWaypoints={true}
    onReady={(result) =>{
        mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
    }}
  />
      </MapView>
     <View style={{width: '90%', marginBottom: 20}}>
       <Button title={'Choose Pick points'} onPress={onNavigate } />
     </View>
    </View>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});