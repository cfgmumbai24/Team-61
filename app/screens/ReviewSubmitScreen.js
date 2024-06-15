import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormContext } from '../App';

const ReviewSubmitScreen = ({ navigation }) => {
  const { formData } = useContext(FormContext);

  useEffect(() => {
    const saveFormDataToCache = async () => {
      try {
        console.log('formData:', formData); // Check formData content
        await AsyncStorage.setItem('formData', JSON.stringify(formData));
        console.log('Form data saved successfully.');
      } catch (error) {
        console.error('Failed to save form data to cache:', error);
        // Optionally, alert the user or retry saving the data
      }
    };
  
    saveFormDataToCache();
  }, [formData]);

  const handleSubmit = () => {
    // Submit the form data to the server or handle it as needed
    // console.log(formData);
    navigation.navigate('FormList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Your Data:</Text>
      <Text style={styles.data}>{JSON.stringify(formData, null, 2)}</Text>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
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
  data: {
    marginBottom: 20,
  },
});

export default ReviewSubmitScreen;
