import React, { useState } from "react";
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

const Check = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [peoplelooking, setPeoplelooking] = useState("0 people are");

  const generateText = () => {
    if (inputText == "iPhone 11") {
      setPeoplelooking("1 person is");
    } else {
      setPeoplelooking(0);
    }
    const API_KEY = "ADD YOUR OPENAPI KEY";
    const prompt = inputText;
    const temperature = 0.7;
    const maxTokens = 50;
    const apiUrl =
      "https://api.openai.com/v1/engines/text-curie-001/completions";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt:
          "Give me a detailed price evalution for every single part of a" +
          prompt +
          "that is sellable. Don't give anything else but the name of the component and the estimated price.",
        temperature: temperature,
        max_tokens: maxTokens,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const generatedText = data.choices[0].text;
        setOutputText(generatedText);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.container}
    >
      <Text style={{ color: "white", textAlign: "center", fontSize: 30 }}>
        {peoplelooking} currently looking for parts for this device
      </Text>

      <View
        style={{
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <TextInput
          style={{
            height: 60,
            borderColor: "white",
            borderWidth: 1,
            color: "white",
            borderRadius: 10,
            padding: 10,
          }}
          onChangeText={setInputText}
          value={inputText}
          placeholder="e.g. iphone 11"
          placeholderTextColor="grey"
        />
        <TouchableOpacity
          style={{
            marginTop: 50,
            backgroundColor: "#98ff98",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={generateText}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            Check price estimate
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20 }}>{outputText}</Text>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
export default Check;
