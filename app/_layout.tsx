import { Stack } from 'expo-router';
import { useState } from 'react';

export default function RootLayout() {
  // In a real app, this would be managed by Firebase, Supabase, or a custom Backend
  const [userRole, setUserRole] = useState<'patient' | 'nurse' | null>(null);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 1. Auth Flow */}
      <Stack.Screen name="(auth)/index" options={{ title: 'Login' }} />
      
      {/* 2. Patient Flow */}
      <Stack.Screen name="(patient)/index" options={{ title: 'OncoGuard Patient' }} />
      
      {/* 3. Nurse Flow */}
      <Stack.Screen name="(nurse)/index" options={{ title: 'Nurse Portal' }} />
    </Stack>
  );
}