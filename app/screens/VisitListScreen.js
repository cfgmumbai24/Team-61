import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VisitListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { beneficiary } = route.params;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://100.72.59.2:3080/api/v1/visit/find/XWcKwN9oTfScr99ABtj0aaQH4Yd2`);
        if (response && response.data && response.data.data) {
          await AsyncStorage.setItem('visitData', JSON.stringify(response.data.data)); // Cache the data
          setData(response.data.data);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        setError(error);
        console.error('Fetch Error:', error); // Log the error
        const cachedData = await AsyncStorage.getItem('visitData');
        if (cachedData) {
          console.log('Using Cached Data'); // Log when using cached data
          setData(JSON.parse(cachedData));
        } else {
          console.error('No cached data available');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error && data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const handlePress = (beneficiary) => {
    navigation.navigate('GoatDetails', { beneficiary: beneficiary });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visit List:</Text>
      {data.length === 0 ? (
        <Text style={styles.errorText}>No visits available.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            // console.log(item),
            console.log(data),
            <TouchableOpacity onPress={() => handlePress(data[0].beneficiary)} style={styles.itemContainer}>
              <Text style={styles.itemDescription}>Beneficiary ID: {data[0].beneficiaryId}</Text>
              <Text style={styles.itemDescription}>Beneficiary Name: {data[0].beneficiary.name}</Text>
              <Text style={styles.itemDescription}>Beneficiary Address: {data[0].beneficiary.address}</Text>
              <Text style={styles.itemDescription}>Status: {data[0].status}</Text>
              <Text style={styles.itemDescription}>Date: {new Date(data[0].date).toLocaleDateString()}</Text>
              <Text style={styles.itemDescription}>Comments: {data[0].comments}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#141B2D',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: "#fff"
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#1F2A40',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemDescription: {
    fontSize: 14,
    color: '#fff',
  },
});

export default VisitListScreen;
