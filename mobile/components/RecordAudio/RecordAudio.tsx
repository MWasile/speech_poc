import { Text, Button, Box } from "native-base";
import { useEffect } from "react";
import LiveAudioStream from 'react-native-live-audio-stream';


const options = {
    sampleRate: 32000, 
    channels: 1, 
    bitsPerSample: 16, 
    audioSource: 6,
    bufferSize: 4096 
  };


function RecordAudio({navigation}) {
    LiveAudioStream.init(options);
    

    useEffect(() => {

      const socket = new WebSocket('ws://127.0.0.1:8000/ws/audio-analysis/');
      

      socket.onopen = () => {
        LiveAudioStream.on('data', (chunk) => {
            socket.send(chunk);
        });
        LiveAudioStream.start();
        console.log('Połączono z WebSocket');
        
      };
  
      socket.onmessage = (e) => {
        console.log('Otrzymano wiadomość: ', e.data);
      };
  
      socket.onclose = (e) => {
        console.log('Połączenie WebSocket zamknięte: ', e.code, e.reason);
        LiveAudioStream.stop();
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