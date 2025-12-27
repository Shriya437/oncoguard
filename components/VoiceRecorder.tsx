import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const VoiceRecorder = ({ onComplete }: { onComplete: () => void }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') return;

      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      
      setRecording(recording);
      setTimeLeft(20);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

 useEffect(() => {
    // Use ReturnType to dynamically determine if it's a number or NodeJS.Timeout
    let timer: ReturnType<typeof setTimeout>;

    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && recording) {
      stopRecording();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, recording]); // Added recording to dependency array for safety

  async function stopRecording() {
    setRecording(null);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    console.log('Recording saved at:', uri);
    onComplete();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.recordButton, recording ? styles.recording : null]} 
        onPress={startRecording}
        disabled={!!recording}
      >
        <Text style={styles.text}>
          {recording ? `Recording... (${timeLeft}s)` : "Start 20s Voice Check-In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 15 },
  recordButton: { backgroundColor: '#34C759', padding: 20, borderRadius: 12, alignItems: 'center' },
  recording: { backgroundColor: '#FF3B30' },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});