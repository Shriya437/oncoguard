import { Redirect } from 'expo-router';

export default function Index() {
  // This immediately pushes the user to the Role Selection screen
  return <Redirect href="/(auth)" />;
}