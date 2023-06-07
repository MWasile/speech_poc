import { Box, Text, Center, NativeBaseProvider, VStack, Divider, HStack, Avatar, Heading, Pressable } from "native-base";
import { useState } from "react";
import { ImageSourcePropType } from "react-native";


interface SpeakerCardProps {
    avatarSrc: string;
    name: string;
    description: string;
}

function SpeakerCard({avatarSrc, name, description, showBtn}: SpeakerCardProps) {
    const [isSelected, setIsSelected] = useState(false);


    return (
        <Pressable
            onPress={() => {
                setIsSelected(!isSelected)
                showBtn((prev) => (!prev))
            }
            }
        >
            <Box
            bg={isSelected ? "cyan.50" : "white"}
            shadow={2}
            rounded={'lg'}
            maxWidth={'90%'}
            p={4}
            alignSelf={'center'}
            mt={5}
            >
            <HStack space={3} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'}>
                <Avatar
                size={'lg'}
                source={avatarSrc as ImageSourcePropType}
                />
                <VStack>
                <Heading size={'xs'}>{name}</Heading>
                <Text>{description}</Text>
                </VStack>
            </HStack>
            </Box>
            </Pressable>
    )
}

export default SpeakerCard;