import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      getNearbyRepairShops(location.coords.latitude, location.coords.longitude);
    }
  };

  const getNearbyRepairShops = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=electronics_repair&key=ADD YOUR GOOGLE MAPS API KEY`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      const newMarkers = json.results.map((place) => ({
        name: place.name,
        address: place.vicinity,
        coordinate: {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        },
      }));
      setMarkers(newMarkers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.name}
              description={marker.address}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
});
