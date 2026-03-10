import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';


// the fields you want from the API response
interface Country { 
  name: {
    common: string
  }
  capital?: string[]
  region: string
  population: number
  flags: {
    png: string
  }
}

export default function App() {
  const [data, setData] = useState<Country[]>([]); // 'Country' is the interface name.

  useEffect(() => {
    axios.get<Country[]>('https://restcountries.com/v3.1/name/peru') // the api to use
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>API Test</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.flags.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.region}</Text>
            <Text>{item.population}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20
  },
  header: {
    fontSize: 24,
    marginBottom: 20
  },
  card: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f3f3f3',
    borderRadius: 8
  },
  title: {
    fontWeight: 'bold'
  }
});