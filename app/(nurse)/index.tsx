import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PatientCard } from '../../components/PatientCard';
import { RiskLevel } from '../../components/RiskBadge';

const MOCK_PATIENTS = [
  { patientId: '1', name: 'John Doe', riskLevel: 'Red' as RiskLevel, explanation: 'Critical Oxygen (88%). Needs intervention.', updatedAt: '10:05 AM' },
  { patientId: '2', name: 'Alice Smith', riskLevel: 'Yellow' as RiskLevel, explanation: 'Fever detected (38.5°C). Check vitals again in 1hr.', updatedAt: '09:45 AM' },
  { patientId: '3', name: 'Bob Wilson', riskLevel: 'Green' as RiskLevel, explanation: 'Stable. No anomalies detected.', updatedAt: '08:30 AM' },
];

export default function NurseDashboard() {
  // Sort by severity (Red first)
  const sortedPatients = [...MOCK_PATIENTS].sort((a, b) => {
    const priority = { Red: 0, Yellow: 1, Green: 2 };
    return priority[a.riskLevel] - priority[b.riskLevel];
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Patient Monitoring</Text>
      <Text style={styles.subtitle}>Sorted by Severity</Text>
      
      <FlatList
        data={sortedPatients}
        keyExtractor={(item) => item.patientId}
        renderItem={({ item }) => <PatientCard patient={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F2F2F7' },
  header: { fontSize: 28, fontWeight: 'bold', marginTop: 40 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
});