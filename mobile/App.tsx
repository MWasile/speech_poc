import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dupas from './components/dupa';
import Home from './components/Home/Home';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Home1" component={Dupas} />
            </Stack.Navigator>
        </NavigationContainer>
    </NativeBaseProvider>

  );
}