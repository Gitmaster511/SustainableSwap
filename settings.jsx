import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Settings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'store'));
      const docs = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setData(docs);
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: '#fff', marginVertical: 10, padding: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.deviceName}</Text>
        <Text>{item.deviceName}</Text>
        <Text>{item.type}</Text>
        <Text>{item.parts}</Text>
        <Text>{item.notes}</Text>
        <Text>{item.condition}</Text>
        <Text>{item.latitude}</Text>
        <Text>{item.longitude}</Text>
        <Text>${item.price}</Text>

      </View>
    );
  };

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.container}>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: "#3EB489" }}>
        Available items:
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
  });
  

export default Settings;
