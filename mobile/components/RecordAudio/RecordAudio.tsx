import { Text, Button, Box } from "native-base";
import { useEffect } from "react";
import LiveAudioStream from 'react-native-live-audio-stream';
import { encode } from 'base-64';

const options = {
    sampleRate: 32000, 
    channels: 1, 
    bitsPerSample: 16, 
    audioSource: 6,
    bufferSize: 4096 
  };


function RecordAudio({navigation}) {


    useEffect(() => {
    LiveAudioStream.start();
      const socket = new WebSocket('ws://127.0.0.1:8000/ws/audio-analysis/');
  
      const options = {
        sampleRate: 44100,  // default is 44100 but 32000 is adequate for accurate voice recognition
        channels: 2,        // 1 or 2, default 1
        bitsPerSample: 16,  // 8 or 16, default 16
        // audioSource: 6,     // android only (see below)
        bufferSize: 4096    // default is 2048
      };

      socket.onopen = () => {
        
        LiveAudioStream.init(options);
        LiveAudioStream.on('data', (chunk) => {
                socket.send(chunk);
        });
        console.log('Połączono z WebSocket');
        
      };
  
      socket.onmessage = (e) => {
        console.log('Otrzymano wiadomość: ', e.data);
      };
  
      socket.onclose = (e) => {
        console.log('Połączenie WebSocket zamknięte: ', e.code, e.reason);
      };
  
      socket.onerror = (e) => {
        console.log('Błąd połączenia WebSocket: ', e.message);
      };
  
      return () => {
        if (socket) {
          socket.close();
        }
      };
    }, []);
  
    return (
      <Box safeArea={8}>
        <Button
            onPress={() => {
                navigation.navigate('Home');
            }}
        >Wróć</Button>
      </Box>  
    );

  };


  export default RecordAudio;