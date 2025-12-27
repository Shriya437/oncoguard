import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// These should now be white/blue (no red) once you create the files above
import { RiskBadge } from '../../components/RiskBadge';
import { VitalsForm } from '../../components/VitalsForm';
import { VoiceRecorder } from '../../components/VoiceRecorder';

export default function PatientDashboard() {
  const [voiceCompleted, setVoiceCompleted] = useState(false);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);

  const mockRisk = {
    level: "Yellow" as const,
    explanation: "Heart rate slightly elevated. Monitor for next 2 hours."
  };

  const handleVoiceComplete = () => {
    setVoiceCompleted(true);
    setLastCheckIn(new Date().toLocaleTimeString());
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>OncoGuard Patient</Text>
      
      <View style={styles.statusSection}>
        <Text style={styles.statusText}>
          Daily Status: <Text style={{fontWeight: 'bold'}}>{voiceCompleted ? "✅ Completed" : "⚠️ Pending"}</Text>
        </Text>
        {lastCheckIn && <Text style={styles.subText}>Last updated: {lastCheckIn}</Text>}
      </View>

      <RiskBadge level={mockRisk.level} explanation={mockRisk.explanation} />
      <VitalsForm />
      <VoiceRecorder onComplete={handleVoiceComplete} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  statusSection: { marginBottom: 20 },
  statusText: { fontSize: 18 },
  subText: { fontSize: 14, color: '#666' },
});