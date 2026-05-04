import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { BottomNavBar } from '../components/BottomNavBar';

export default function SolicitacaoScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    cepOrigem: '',
    refOrigem: '',
    cepDestino: '',
    refDestino: '',
    cupomDesconto: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleConcluir = () => {
    console.log('Pedido concluído:', formData);
  };

  const handleBottomNavPress = (tab: string) => {
    const navigationMap: Record<string, string> = {
      'home': 'MenuScreen',
      'caixa': 'MinhasEntregasScreen',
      'novo': 'NovasEntregasScreen',
      'dinheiro': 'MeusGanhosScreen',
      'perfil': 'PerfilScreen',
    };
    navigation.navigate(navigationMap[tab]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C2540" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/portadores-logo.png')}
          style={styles.logoSmall}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={styles.exitIcon}>📤</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Solicitação</Text>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* CEP de Origem */}
          <Text style={styles.label}>CEP de Origem</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o CEP"
            placeholderTextColor="#666"
            value={formData.cepOrigem}
            onChangeText={(value) => handleInputChange('cepOrigem', value)}
          />

          {/* Referência de Origem */}
          <Text style={styles.label}>Referência de Origem</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a referência"
            placeholderTextColor="#666"
            value={formData.refOrigem}
            onChangeText={(value) => handleInputChange('refOrigem', value)}
          />

          {/* CEP de Destino */}
          <Text style={styles.label}>CEP de Destino</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o CEP"
            placeholderTextColor="#666"
            value={formData.cepDestino}
            onChangeText={(value) => handleInputChange('cepDestino', value)}
          />

          {/* Referência de Destino */}
          <Text style={styles.label}>Referência de Destino</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a referência"
            placeholderTextColor="#666"
            value={formData.refDestino}
            onChangeText={(value) => handleInputChange('refDestino', value)}
          />

          {/* Cupom de Desconto */}
          <Text style={styles.label}>Cupom de Desconto</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o cupom"
            placeholderTextColor="#666"
            value={formData.cupomDesconto}
            onChangeText={(value) => handleInputChange('cupomDesconto', value)}
          />
        </View>

        {/* Valor */}
        <View style={styles.valorContainer}>
          <Text style={styles.valorLabel}>Valor: <Text style={styles.valorAmount}>R$0,00</Text></Text>
          <Text style={styles.valorInfo}>O agendamento ocorrerá no ato da entrega</Text>
        </View>

        {/* Botão Concluir */}
        <TouchableOpacity style={styles.concludeButton} onPress={handleConcluir}>
          <Text style={styles.concludeButtonText}>Concluir pedido</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Navbar */}
      <BottomNavBar onPress={handleBottomNavPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2540',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 8,
  },
  logoSmall: {
    width: 48,
    height: 48,
  },
  exitIcon: {
    fontSize: 26,
  },
  scroll: {
    paddingHorizontal: 28,
    paddingBottom: 24,
  },
  pageTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 32,
    marginTop: 8,
  },
  formContainer: {
    marginBottom: 24,
  },
  label: {
    color: '#b0bcd4',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2e3a5c',
    borderWidth: 2,
    borderColor: '#4A90D9',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  valorContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  valorLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  valorAmount: {
    color: '#FF8C00',
    fontWeight: '700',
  },
  valorInfo: {
    color: '#b0bcd4',
    fontSize: 12,
    textAlign: 'center',
  },
  concludeButton: {
    backgroundColor: '#1a1f2e',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  concludeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});