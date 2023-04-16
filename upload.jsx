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
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
import { useNavigation } from "@react-navigation/native";

import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { RadioButton } from "react-native-paper";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const electronic = [
  "Phone",
  "Tablet",
  "Desktop",
  "Laptop",
  "Camera",
  "Gaming device",
  "TV/Monitor",
  "Kitchen Appliances",
];
const condition = [
  "New",
  "Like-new",
  "Good",
  "Fair",
  "Poor",
  "Used",
  "Refurbished",
  "Other",
];

//DELETE THIS LATER
const firebaseConfig = {

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = firebase.storage();

export default function Upload() {
  const [uploading, setUploading] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
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
  const [image, setImage] = useState(null);
  const [url2, seturl2] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const ref = storage.ref().child("example.jpg");
      await ref.put(blob);
    }
  };

  const [deviceName, setDeviceName] = useState("");
  const [parts, setParts] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [condition2, setCondition2] = useState("");
  const [checked, setChecked] = useState("buy");
  const [value, setValue] = useState("buy");

  const handleSubmit = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(`Pictures/${new Date().getTime()}`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download URL: ", url);
          seturl2(url);
          blob.close();
          return url;
        });
      }
    );

    try {
      const docRef = await addDoc(collection(db, "store"), {
        deviceName: deviceName,
        parts: parts,
        notes: notes,
        price: price,
        condition: condition2,
        type: type,
        latitude: latitude,
        longitude: longitude,
        image: url2,
        checked: checked,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    Alert.alert("Succsessful", "Uploaded item to server!");
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("./assets/background.jpg")}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text style={styles.label}>Device Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g Iphone 11"
            value={deviceName}
            onChangeText={setDeviceName}
          />
          <View style={{ width: "100%", padding: 20 }}>
            <RadioButton.Group
              onValueChange={(newValue) => setChecked(newValue)}
              value={checked}
            >
              <RadioButton.Item
                label="Buying"
                value="buy"
                style={{
                  height: 50,
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 2,
                  color: "#FFFFFF",
                  borderColor: "#FFFFFF",
                }}
                labelStyle={{ fontSize: 18, color: "#FFFFFF" }}
                uncheckedColor="#B2B2B2"
                color="#007AFF"
              />
              <RadioButton.Item
                label="Selling"
                value="sell"
                style={{
                  height: 50,
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 2,
                  marginTop: 10,
                  borderColor: "#FFFFFF",
                }}
                labelStyle={{ fontSize: 18, color: "#FFFFFF" }}
                uncheckedColor="#B2B2B2"
                color="#007AFF"
              />
            </RadioButton.Group>
          </View>
          <Text style={styles.label}>Type of Device:</Text>

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <SelectDropdown
              style={{ color: "#FFFFFF" }}
              color="#FFFFFF"
              data={electronic}
              defaultButtonText={"Select Type of Device"}
              onSelect={(selectedItem, index) => {}}
              buttonTextAfterSelection={(selectedItem, index) => {
                setType(selectedItem);
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>

          <Text style={styles.label}>Parts:</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g Speaker, Display, Camera Module"
            value={parts}
            onChangeText={setParts}
          />
          <Text style={styles.label}>Condition:</Text>

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <SelectDropdown
              data={condition}
              defaultButtonText={"Select Condition"}
              onSelect={(selectedItem, index) => {}}
              buttonTextAfterSelection={(selectedItem, index) => {
                setCondition2(selectedItem);
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <Text style={styles.label}>Notes:</Text>
          <TextInput
            style={styles.biginput}
            placeholder="e.g Device was used for 2 years..."
            value={notes}
            onChangeText={setNotes}
          />
          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g 30$"
            value={price}
            onChangeText={setPrice}
          />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <TouchableOpacity
          style={{
            marginTop: 30,
            backgroundColor: "#98ff98",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "black", fontSize: 16 }}>Upload Now</Text>
        </TouchableOpacity>
        <View style={{ height: 90 }}></View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 25,
    color: "#3EB489",
  },
  input: {
    height: 40,
    borderColor: "#3EB489",
    fontVariant: "bold",
    color: "#FFFFFF",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  biginput: {
    height: 60,
    borderColor: "#3EB489",
    color: "#FFFFFF",
    borderWidth: 1,
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 2,
    resizeMode: "cover", // or 'stretch'
  },
});
