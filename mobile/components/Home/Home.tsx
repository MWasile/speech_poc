import { Text } from "react-native";
import { Box, Button, Center, NativeBaseProvider } from "native-base";
import { useState } from "react";
import LiveAudioStream from 'react-native-live-audio-stream';

const options = {
    sampleRate: 32000,  // default is 44100 but 32000 is adequate for accurate voice recognition
    channels: 1,        // 1 or 2, default 1
    bitsPerSample: 16,  // 8 or 16, default 16
    audioSource: 6,     // android only (see below)
    bufferSize: 4096    // default is 2048
  };


function Home (){
    const [record, setRecord] = useState();

    LiveAudioStream.init(options);
    LiveAudioStream.on('data', data => {
        console.log(data);
    });

    const startRecording = () => {
        LiveAudioStream.start();
    }

    const stopRecording = () => {
        LiveAudioStream.stop();
    }

    return (
            <Box safeAreaTop={8}>
                <Center>
                    <Text>Home</Text>
                    <Button
                        onPress={startRecording}
                    >Zacznij nagrywać!</Button>
                    <Button
                        onPress={stopRecording}
                    >Zakończ nagrywać!</Button>
                </Center>
            </Box>
    )
}

export  default Home;