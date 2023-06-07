import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home/Home';
import MicrophonePermission from './components/Permissions/MicrophonePermission';
import { NativeBaseProvider } from 'native-base';


export default function App() {
  return (
    <NativeBaseProvider>
      <MicrophonePermission />
      <Home />
    </NativeBaseProvider>
  );
}