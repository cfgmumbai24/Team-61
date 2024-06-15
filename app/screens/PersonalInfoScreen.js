import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { FormContext } from '../App';

const PersonalInfoScreen = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [personalInfo, setPersonalInfo] = useState({
    tag: '',
    dob: '',
    weight: '',
    breed: '',
    gender: '',
    color: ''
  });

  const handleNext = () => {
    setFormData({ ...formData, ...personalInfo });
    navigation.navigate('Vaccinations');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="white"
        style={styles.input}
        placeholder="Tag"
        value={personalInfo.tag}
        onChangeText={(text) => setPersonalInfo({ ...personalInfo, tag: text })}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Date of Birth"
        value={personalInfo.dob}
        onChangeText={(text) => setPersonalInfo({ ...personalInfo, dob: text })}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Weight"
        value={personalInfo.weight}
        onChangeText={(text) => setPersonalInfo({ ...personalInfo, weight: text })}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Breed"
        value={personalInfo.breed}
        onChangeText={(text) => setPersonalInfo({ ...personalInfo, breed: text })}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Gender"
        value={personalInfo.gender}
        onChangeText={(text) => setPersonalInfo({ ...personalInfo, gender: text })}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Color"
        value={personalInfo.color}
        onChangeText={(text) => setPersonalInfo({ ...personalInfo, color: text })}
      />
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

export default PersonalInfoScreen;
