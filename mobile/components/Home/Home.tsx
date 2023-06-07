import { Text } from "react-native";
import { Box, Button, Center, NativeBaseProvider, VStack, Divider, HStack, Avatar, Heading, ScrollView } from "native-base";
import { useState } from "react";
import LiveAudioStream from 'react-native-live-audio-stream';
import SpeakerCard from "../SpeakerCard/SpeakerCard";
import avatar1 from '../../assets/avatars/a1.jpg';
import avatar2 from '../../assets/avatars/a2.jpg';
import avatar3 from '../../assets/avatars/a3.jpg';
import avatar4 from '../../assets/avatars/a4.jpg';


const speakers = [
    {
        name: 'Barack Obama',
        description: 'Former President of the United States',
        avatarSrc: avatar3,
    },
    {
        name: 'Donald Trump',
        description: 'Former President of the United States',
        avatarSrc: avatar4,
    },
    {
        name: 'Angela Merkel',
        description: 'Former Chancellor of Germany',
        avatarSrc: avatar1,
    },
    {
        name: 'Kononowicz Krzysztof',
        description: 'Former Mayor of Piotrków Trybunalski',
        avatarSrc: avatar2,
        
    }
]


function Home (){
    const [selectedCard, setSelectedCard] = useState<number>();
    const [showStartButton, setShowStartButton] = useState<boolean>(false);


    return (
            <Box safeArea={8} flex={'1'} bg={'green.100'} maxH={'100%'}>
                <Center paddingTop={'8'}>
                    <Text>Choose the speaker's style!</Text>
                </Center>

                <ScrollView>
                { speakers.map((speaker, index) => (
                    <SpeakerCard
                        key={index}
                        name={speaker.name} 
                        description={speaker.description} 
                        avatarSrc={speaker.avatarSrc}
                        showBtn={setShowStartButton}
                    />
                ))}
                </ScrollView>
                {
                    showStartButton && (
                        <Button>
                            Zacznij przemówienie!
                        </Button>
                    )
                }
            </Box>
    )
}

export  default Home;