import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import CadastroScreen from '../screens/CadastroScreen';
import PrimeiroAcessoScreen from '../screens/PrimeiroAcessoScreen';
import SobreNosScreen from '../screens/SobreNosScreen';
import MenuScreen from '../screens/MenuScreen';

export default function Rotas() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="PrimeiroAcesso" component={PrimeiroAcessoScreen} />
      <Stack.Screen name="SobreNos" component={SobreNosScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
    </Stack.Navigator>
  );
}