import React,{useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import {NativeModules} from 'react-native';

export default function App() {
    const {ToastModule} = NativeModules;


    useEffect(() => {
        ToastModule.showToast('This is a native toast!!');
     }, [])

  return (
    <View style={styles.container}>
    {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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