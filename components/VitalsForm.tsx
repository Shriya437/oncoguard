import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Define the Interface for props
interface VitalsFormProps {
  onSubmit: (data: any) => void;
}

export const VitalsForm = ({ onSubmit }: VitalsFormProps) => {
  const [vitals, setVitals] = useState({ heartRate: '', spo2: '', temperature: '' });

  const handleSubmit = () => {
    const { heartRate, spo2, temperature } = vitals;
    if (!heartRate || !spo2 || !temperature) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // This calls the function in your index.tsx
    onSubmit(vitals);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Vitals Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Heart Rate (bpm)"
        keyboardType="numeric"
        value={vitals.heartRate}
        onChangeText={(t) => setVitals({ ...vitals, heartRate: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="SpO2 (%)"
        keyboardType="numeric"
        value={vitals.spo2}
        onChangeText={(t) => setVitals({ ...vitals, spo2: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Temperature (°C)"
        keyboardType="numeric"
        value={vitals.temperature}
        onChangeText={(t) => setVitals({ ...vitals, temperature: t })}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Vitals to AI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 12, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});