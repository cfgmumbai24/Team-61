import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VisitListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { uid } = route.params;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://100.72.59.2:3080/api/v1/visit/find/${uid}`);
        if (response && response.data && response.data.data) {
          const today = new Date().toISOString().split('T')[0];
          const filteredData = response.data.data.filter(item => {
            const itemDate = new Date(item.date).toISOString().split('T')[0];
            return itemDate === today;
          });
          setData(filteredData);
          await AsyncStorage.setItem('visitData', JSON.stringify(filteredData)); // Cache the data
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        setError(error);
        const cachedData = await AsyncStorage.getItem('visitData');
        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          console.error('No cached data available');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uid]);

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

  const handlePress = (beneficiaryId) => {
    navigation.navigate('GoatDetails', { benefId: beneficiaryId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visit List:</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.beneficiaryId)} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Paravat ID: {item.paravatId}</Text>
            <Text style={styles.itemDescription}>Beneficiary ID: {item.beneficiaryId}</Text>
            <Text style={styles.itemDescription}>Status: {item.status}</Text>
            <Text style={styles.itemDescription}>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.itemDescription}>Comments: {item.comments}</Text>
          </TouchableOpacity>
        )}
      />
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
