import { Text, Button, Box } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import LiveAudioStream from 'react-native-live-audio-stream';
import TypingAnimation from "../TypingAnimation/TypingAnimation";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const options = {
    sampleRate: 32000, 
    channels: 1, 
    bitsPerSample: 16, 
    audioSource: 6,
    bufferSize: 4096,
  };

  const data = {
    data: [0.3, 0.6, 0.2]
  };

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(238, 130, 238, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,

};


function RecordAudio({navigation}) {
  const [text, setText] = useState<string[]>([]);
  const [typingText, setTypingText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const screenWidth = Dimensions.get("window").width;
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
          if (isTyping) {
              setTimeout(() => { 
                  setText(prev => [...prev, typingText]);
                  setTypingText(e.data);
              }, 400 * typingText.length);
          } else {
              setText(prev => [...prev, typingText]);
              setTypingText(e.data);
          }
          console.log('Otrzymano wiadomość:', e.data);
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
  }, [isTyping]);

  return (
      <Box safeArea={8} flex={1}>
          <Box h={'3/4'}>
              {
                  text.map((item, index) => <Text key={index}>{item}</Text>)
              }
              <TypingAnimation text={typingText} speed={100} onTypingStart={() => setIsTyping(true)} onTypingEnd={() => setIsTyping(false)} />
          </Box>
          <Box>
            <ProgressChart
                data={data}
                width={screenWidth}
                height={180}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
            >
            </ProgressChart>
          </Box>
          <Button
              onPress={() => {
                  navigation.navigate('Home');
              }}
          >Wróć</Button>
      </Box>  
  );
};


export default RecordAudio;