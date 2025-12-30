import { AudioModule, RecordingPresets, useAudioRecorder } from 'expo-audio';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface VoiceRecorderProps {
  onComplete: (uri: string) => void;
}

export const VoiceRecorder = ({ onComplete }: VoiceRecorderProps) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const recorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    extension: '.wav',
  });

  useEffect(() => {
    let timer: any;

    if (recorder.isRecording && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && recorder.isRecording) {
      console.log('⏹ Auto stop triggered');
      handleStop();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, recorder.isRecording]);

  const handleStart = async () => {
    try {
      console.log('🎤 Requesting microphone permission');

      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Denied', 'Microphone access is required.');
        return;
      }

      console.log('🎙 Preparing recorder');
      await recorder.prepareToRecordAsync();

      setTimeLeft(7);
      recorder.record();

      console.log('🔴 Recording started');
    } catch (error) {
      console.error('❌ Recording start error:', error);
      Alert.alert('Error', 'Could not start recording.');
    }
  };

  const handleStop = async () => {
    try {
      console.log('⏹ Stopping recording');
      await recorder.stop();

      if (recorder.uri) {
        console.log('📁 Recording saved at:', recorder.uri);
        onComplete(recorder.uri);
      } else {
        console.log('❌ Recorder stopped but URI is null');
      }
    } catch (error) {
      console.error('❌ Recording stop error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, recorder.isRecording ? styles.recording : null]}
        onPress={recorder.isRecording ? handleStop : handleStart}
      >
        <Text style={styles.text}>
          {recorder.isRecording
            ? `Recording... (${timeLeft}s)`
            : 'Start 7s Voice Check-In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 15 },
  button: {
    backgroundColor: '#34C759',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  recording: { backgroundColor: '#FF3B30' },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
