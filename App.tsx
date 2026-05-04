import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroScreen from './app/screens/CadastroScreen';
import PrimeiroAcessoScreen from './app/screens/PrimeiroAcessoScreen';
import SobreNosScreen from './app/screens/SobreNosScreen';
import MenuScreen from './app/screens/MenuScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator   screenOptions={{ 
          headerShown: false,
        }}>
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="PrimeiroAcesso" component={PrimeiroAcessoScreen} />
        <Stack.Screen name="SobreNos" component={SobreNosScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        {/* Adicione os outros screens aqui */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});