import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoatDetailScreen = ({ route }) => {
  const { data } = route.params; // Assuming data is the object containing the goats array
  const navigation = useNavigation();

    const handleNext = () => {
        navigation.navigate('PersonalInfo');
    }

  return <Button title="Add Goat" onPress={handleNext} />;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Details for {data.name}</Text>
//       <Text style={styles.subtitle}>Address: {data.address}</Text>
//       <Text style={styles.subtitle}>Phone Number: {data.PhoneNumber}</Text>
//       <Text style={styles.subtitle}>Location: {data.latitude}, {data.longitude}</Text>
//       <Text style={styles.subtitle}>Goats:</Text>
//       <FlatList
//         data={data.Goats}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.goatItem}>
//             <Text style={styles.goatName}>{item.name}</Text>
//             <Text style={styles.goatDetails}>Age: {item.age}</Text>
//             <Text style={styles.goatDetails}>Color: {item.color}</Text>
//             {/* Add more goat details as needed */}
//           </View>
//         )}
//       />
//     </View>
//   );
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
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  goatItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  goatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goatDetails: {
    fontSize: 14,
    color: '#333',
  },
});

export default GoatDetailScreen;
