import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Switch, Image,Dimensions, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView, {Marker, AnimatedRegion, Polyline} from 'react-native-maps';
import PubNubReact from 'pubnub-react';
import { PUBNUB_PUBLISH_KEY, PUBNUB_SUBSCRIBE_KEY } from '../../utils/constants';


const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class App extends React.Component {
 

  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
       latitude: LATITUDE,
       longitude: LONGITUDE
      })
    };
  }
  componentDidMount() {
    this.watchID = navigator?.geolocation?.watchPosition(
      position => {
        const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
        const { latitude, longitude } = position.coords;
        
        const newCoordinate = {
          latitude,
          longitude
        };
        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
           }
         } else {
           coordinate.timing(newCoordinate).start();
         }
         this.setState({
           latitude,
           longitude,
           routeCoordinates: routeCoordinates.concat([newCoordinate]),
           distanceTravelled:
           distanceTravelled + this.calcDistance(newCoordinate),
           prevLatLng: newCoordinate
         });
       },
       error => console.log(error),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

calcDistance = newLatLng => {
  const { prevLatLng } = this.state;
  return haversine(prevLatLng, newLatLng) || 0;
}

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
        <MapView
  style={styles.map}
  showUserLocation
  followUserLocation
  loadingEnabled
  region={this.getMapRegion()}
>
  <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
  <Marker.Animated
    ref={marker => {
      this.marker = marker;
    }}
    coordinate={this.state.coordinate}
  />
</MapView>
        </View>
        <View style={styles.buttonContainer}>
  <TouchableOpacity style={[styles.bubble, styles.button]}>
    <Text style={styles.bottomBarContent}>
      {parseFloat(this.state.distanceTravelled).toFixed(2)} km
    </Text>
  </TouchableOpacity>
</View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
 