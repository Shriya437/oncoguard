import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type RiskLevel = 'Green' | 'Yellow' | 'Red';

interface RiskBadgeProps {
  level: RiskLevel;
  explanation: string;
}

export const RiskBadge = ({ level, explanation }: RiskBadgeProps) => {
  const colors = {
    Green: '#4CAF50',
    Yellow: '#FFC107',
    Red: '#F44336',
  };

  return (
    <View style={[styles.container, { borderColor: colors[level] }]}>
      <View style={[styles.indicator, { backgroundColor: colors[level] }]} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>Status: {level}</Text>
        <Text style={styles.explanation}>{explanation}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  indicator: {
    width: 12,
    height: '100%',
    borderRadius: 6,
    marginRight: 12,
  },
  textContainer: { flex: 1 },
  label: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  explanation: { color: '#555', fontSize: 14 },
});