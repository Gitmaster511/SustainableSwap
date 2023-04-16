import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Linking } from "react-native";
import MapView from "react-native-maps";
import { LogBox } from "react-native";
import * as Location from "expo-location";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "firebase/compat/storage";
import { Card } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { useNavigation } from "@react-navigation/native";

const firebaseConfig = {
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Sell() {
  const navigation = useNavigation();
  return (
    <NavigationContainer independent="true">
      <Stack.Navigator>
        <Stack.Screen
          name="MyComp"
          component={MyComponent2}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Newscreen" component={Newscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Newscreen = ({ route }) => {
  const { imageUri } = route.params;
  const [Real2, setReal2] = useState("");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");

  const data2 = [];
  const [latitude, setLatitude] = useState("null");
  const [longitude, setLongitude] = useState("null");
  const [url9, seturl9] = useState("");

  const handleNavigation = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${Real2.latitude},${Real2.longitude}`;
    Linking.openURL(url);
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "store"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const set = {
          deviceName: data.deviceName,
          image: data.image,
          price: data.price,
          condition: data.condition,
          latitude: data.latitude,
          longitude: data.longitude,
          notes: data.notes,
          type: data.type,
          parts: data.parts,
        };
        if (imageUri == data.image) {
          data2.push(set);
          setReal2(set);
        }
      });
    };
    fetchData();
  });
  useEffect(() => {
    const originLat = { latitude };
    const originLng = { longitude }; 
    const destLat = Real2.latitude; 
    const destLng = Real2.longitude; 
    const apiKey = ""; // replace with your Google Maps API key

    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${latitude},${longitude}&destinations=${destLat},${destLng}&key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const distance = data.rows[0].elements[0].distance.text;
        const duration = data.rows[0].elements[0].duration.text;
        setTime(duration);
        setDistance(distance);
      })
      .catch((error) => console.log(error));
  });

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.container}>
          <Image source={{ uri: imageUri }} style={styles.image2} />
          <Text style={styles.heading}>{Real2.deviceName}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Parts:</Text>
            <Text>{Real2.parts}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Notes:</Text>
            <Text>{Real2.notes}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Price:</Text>
            <Text>{Real2.price}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Condition:</Text>
            <Text>{Real2.condition}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Type:</Text>
            <Text>{Real2.type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location:</Text>
            <Text>It would take about {time} to get there</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Distance:</Text>
            <Text>It it about {distance} away</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              borderRadius: 10,
              padding: 10,
              alignItems: "center",
              margin: 10,
            }}
            onPress={handleNavigation}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Open in maps
            </Text>
          </TouchableOpacity>
          <View style={{ height: 50 }}></View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

function MyComponent2({ navigation }) {
  const [Real, setReal] = useState("");
  const [loading, setLoading] = useState(true);
  const data2 = [];
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "store"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const set = {
          deviceName: data.deviceName,
          checked: data.checked,
          image: data.image,
          price: data.price,
          parts: data.parts,
        };
        if (data.checked == "buy") {
          data2.push(set);
        }
      });
      setReal(data2);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    fetchData();
  });

  if (loading) {
    // render the loading indicator for the first 3 seconds
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {Real.map((item) => (
        <Card
          key={item.deviceName}
          style={styles.card}
          onPress={() =>
            navigation.navigate("Newscreen", { imageUri: item.image })
          }
        >
          <Card.Cover source={{ uri: item.image }} />
          <Card.Title title={item.deviceName} />
          <Card.Content>
            <Text>Parts: {item.parts}</Text>
            <Text style={{ color: "red", fontSize: 30 }}>{item.price}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#2ecc71",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
  image2: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
});
