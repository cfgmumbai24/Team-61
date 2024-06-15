import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { FormContext } from '../App';

const InsuranceScreen = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [insurance, setInsurance] = useState([{ issueDate: '', expiryDate: '', insuranceId: '' }]);

  const handleNext = () => {
    setFormData({ ...formData, insurance });
    navigation.navigate('AdditionalInfo');
  };

  return (
    <View style={styles.container}>
      {insurance.map((ins, index) => (
        <View key={index} style={styles.insuranceContainer}>
          <TextInput
            style={styles.input}
            placeholder="Issue Date"
            value={ins.issueDate}
            onChangeText={(text) => {
              const newInsurance = [...insurance];
              newInsurance[index].issueDate = text;
              setInsurance(newInsurance);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Expiry Date"
            value={ins.expiryDate}
            onChangeText={(text) => {
              const newInsurance = [...insurance];
              newInsurance[index].expiryDate = text;
              setInsurance(newInsurance);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Insurance ID"
            value={ins.insuranceId}
            onChangeText={(text) => {
              const newInsurance = [...insurance];
              newInsurance[index].insuranceId = text;
              setInsurance(newInsurance);
            }}
          />
        </View>
      ))}
      <Button title="Add Insurance" onPress={() => setInsurance([...insurance, { issueDate: '', expiryDate: '', insuranceId: '' }])} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#141B2D',
  },
  insuranceContainer: {
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
});

export default InsuranceScreen;
