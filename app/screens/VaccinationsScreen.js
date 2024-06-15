import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { FormContext } from '../App';

const VaccinationsScreen = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [vaccinations, setVaccinations] = useState([{ date: '', vaccId: '' }]);

  const handleNext = () => {
    setFormData({ ...formData, vaccinations });
    navigation.navigate('Insurance');
  };

  return (
    <View style={styles.container}>
      {vaccinations.map((vacc, index) => (
        <View key={index} style={styles.vaccinationContainer}>
          <TextInput
            style={styles.input}
            placeholder="Vaccination Date"
            value={vacc.date}
            onChangeText={(text) => {
              setVaccinations((prevVaccinations) => {
                const newVaccinations = [...prevVaccinations];
                newVaccinations[index].date = text;
                return newVaccinations;
              });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Vaccination ID"
            value={vacc.vaccId}
            onChangeText={(text) => {
              setVaccinations((prevVaccinations) => {
                const newVaccinations = [...prevVaccinations];
                newVaccinations[index].vaccId = text;
                return newVaccinations;
              });
            }}
          />
        </View>
      ))}
      <Button style={styles.button} title="Add Vaccination" onPress={() => setVaccinations([...vaccinations, { date: '', vaccId: '' }])} />
      <Button style={styles.button} title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#141B2D',
  },
  vaccinationContainer: {
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: '#1F2A40',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#1F2A40',
    color: '#fff',
  },
  button: {
    padding: 12,
    backgroundColor: 'blue',
    borderRadius: 4,
    margin: 12,
  }
});

export default VaccinationsScreen;
