import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RiskBadge, RiskLevel } from './RiskBadge';

interface PatientData {
  name: string;
  riskLevel: RiskLevel;
  explanation: string;
  updatedAt: string;
}

export const PatientCard = ({ patient }: { patient: PatientData }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.name}>{patient.name}</Text>
      <Text style={styles.time}>{patient.updatedAt}</Text>
    </View>
    <RiskBadge level={patient.riskLevel} explanation={patient.explanation} />
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 12, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  name: { fontSize: 18, fontWeight: '600' },
  time: { fontSize: 12, color: '#888' },
});