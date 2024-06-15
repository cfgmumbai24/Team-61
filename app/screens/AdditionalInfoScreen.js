import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { FormContext } from '../App';

const AdditionalInfoScreen = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [additionalInfo, setAdditionalInfo] = useState({
    isAlive: true,
    diseases: '',
    sellingPrice: '',
    numberOfChildren: '',
    children: '',
    comments: '',
    beneficId: '',
    health: ''
  });

  const handleNext = () => {
    setFormData({ ...formData, ...additionalInfo });
    navigation.navigate('ReviewSubmit');
  };

  return (
    <View style={styles.container}>
      <TextInput
        
        style={styles.input}
        placeholder="Is Alive"
        value={additionalInfo.isAlive.toString()}
        onChangeText={(text) => setAdditionalInfo({ ...additionalInfo, isAlive: text === 'true' })}
      />
      <TextInput
        style={styles.input}
        placeholder="Diseases"
        value={additionalInfo.diseases}
        onChangeText={(text) => setAdditionalInfo({ ...additionalInfo, diseases: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Selling Price"
        value={additionalInfo.sellingPrice}
        onChangeText={(text) => setAdditionalInfo({ ...additionalInfo, sellingPrice: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Children"
        value={additionalInfo.numberOfChildren}
        onChangeText={(text) => setAdditionalInfo({ ...additionalInfo, numberOfChildren: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Children"
        value={additionalInfo.children}
        onChangeText={(text) => setAdditionalInfo({ ...additionalInfo, children: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Comments"
        value={additionalInfo.comments}
        onChangeText={(text) => setAdditionalInfo({ ...additionalInfo, comments: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Beneficial ID"
        value={additionalInfo.beneficId}
        onChangeText={(text) => setAdditionalInfo({ ...additionalInfo, beneficId: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Health"
        value={additionalInfo.health}
        onChangeText={(text) => setAdditionalInfo({ ...additionalInfo, health: text })}
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

export default AdditionalInfoScreen;
