import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CadastroScreen from './app/screens/CadastroScreen';
import PrimeiroAcessoScreen from './app/screens/PrimeiroAcessoScreen';
import SobreNosScreen from './app/screens/SobreNosScreen';
import MenuScreen from './app/screens/MenuScreen';
import MinhasEntregasScreen from './app/screens/MinhasEntregasScreen';
import NovasEntregasScreen from './app/screens/NovasEntregasScreen';
import MeusGanhosScreen from './app/screens/MeusGanhosScreen';
import ConsultaScreen from './app/screens/ConsultaScreen';
import SolicitacaoScreen from './app/screens/SolicitacaoScreen';
import ConquistasScreen from './app/screens/ConquistasScreen';
import SaqueScreen from './app/screens/SaqueScreen';
import PagamentoScreen from './app/screens/PagamentoScreen';
import RegistroScreen from './app/screens/RegistroScreen';
import MapaScreen from './app/screens/MapaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator   screenOptions={{ 
            headerShown: false,
          }}>
        <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
        <Stack.Screen name="PrimeiroAcesso" component={PrimeiroAcessoScreen} />
        <Stack.Screen name="SobreNosScreen" component={SobreNosScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="MinhasEntregasScreen" component={MinhasEntregasScreen} />
        <Stack.Screen name="NovasEntregasScreen" component={NovasEntregasScreen} />
        <Stack.Screen name="MeusGanhosScreen" component={MeusGanhosScreen} />
        <Stack.Screen name="ConsultaScreen" component={ConsultaScreen} />
        <Stack.Screen name="SolicitacaoScreen" component={SolicitacaoScreen} />
        <Stack.Screen name="ConquistasScreen" component={ConquistasScreen} />
        <Stack.Screen name="SaqueScreen" component={SaqueScreen} />
        <Stack.Screen name="PagamentoScreen" component={PagamentoScreen} />
        <Stack.Screen name="RegistroScreen" component={RegistroScreen} />
        <Stack.Screen name="MapaScreen" component={MapaScreen} />
        <Stack.Screen name="PrimeiroAcessoScreen" component={PrimeiroAcessoScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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