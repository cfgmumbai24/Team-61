import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormListScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const loadFormDataFromCache = async () => {
      try {
        const existingData = await AsyncStorage.getItem('formData');
        console.log(existingData)
        if (existingData) {
          setFormData(JSON.parse(existingData));
        }
      } catch (error) {
        console.error('Failed to load form data from cache:', error);
      }
    };

    loadFormDataFromCache();
  }, []);

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('formData');
      setFormData([]);
    } catch (error) {
      console.error('Failed to clear form data from cache:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Saved Form Data:</Text>
        <View style={styles.dataContainer}>
        <Text style={styles.data}>{JSON.stringify(formData, null, 2)}</Text>
        </View>
      <Button title="Clear Data" onPress={clearData} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  noData: {
    fontSize: 16,
    color: '#999',
  },
  dataContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  data: {
    fontSize: 14,
    color: '#333',
  },
});

export default FormListScreen;
