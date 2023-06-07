import { Text } from "react-native";
import { Box, Center, NativeBaseProvider } from "native-base";

function Home (){
    return (
            <Box safeAreaTop={8}>
                <Center>
                    <Text>Home</Text>
                </Center>
            </Box>
    )
}

export  default Home;