import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  const handleRoleSelection = (role: 'patient' | 'nurse') => {
    // Navigate to the respective group based on choice
    if (role === 'patient') {
      router.replace('/(patient)' as any);
    } else {

      router.replace('/(nurse)' as any);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.title}>OncoGuard</Text>
        <Text style={styles.subtitle}>Intelligent Oncology Support</Text>
      </View>

      <Text style={styles.prompt}>Please select your role to continue:</Text>

      <TouchableOpacity 
        style={[styles.roleButton, styles.patientButton]} 
        onPress={() => handleRoleSelection('patient')}
      >
        <Text style={styles.buttonText}>I am a Patient</Text>
        <Text style={styles.buttonSubText}>Access my daily check-ins</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.roleButton, styles.nurseButton]} 
        onPress={() => handleRoleSelection('nurse')}
      >
        <Text style={styles.buttonText}>I am a Caregiver / Nurse</Text>
        <Text style={styles.buttonSubText}>Monitor patient vitals & risk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25, justifyContent: 'center' },
  headerArea: { alignItems: 'center', marginBottom: 50 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#007AFF' },
  subtitle: { fontSize: 16, color: '#666' },
  prompt: { fontSize: 18, marginBottom: 25, textAlign: 'center', color: '#333' },
  roleButton: { padding: 25, borderRadius: 15, marginBottom: 20, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  patientButton: { backgroundColor: '#007AFF' },
  nurseButton: { backgroundColor: '#34C759' },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  buttonSubText: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 5 },
});