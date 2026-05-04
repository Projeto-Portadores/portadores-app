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

export default function ConsultarScreen({ navigation }: any) {
  const [idPedido, setIdPedido] = useState('');
  const [statusPedido, setStatusPedido] = useState<string | null>(null);
  const [consulted, setConsulted] = useState(false);

  const handleConsultar = () => {
    if (idPedido.trim()) {
      // Simular consulta - em produção, seria uma chamada à API
      setStatusPedido('Pedido Entregue');
      setConsulted(true);
    }
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
        <Text style={styles.pageTitle}>Consulta</Text>

        {/* ID do Pedido */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>ID do Pedido</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o ID"
            placeholderTextColor="#666"
            value={idPedido}
            onChangeText={setIdPedido}
            keyboardType="numeric"
          />
        </View>

        {/* Botão Consultar */}
        <TouchableOpacity style={styles.consultarButton} onPress={handleConsultar}>
          <Text style={styles.consultarButtonText}>Consultar</Text>
        </TouchableOpacity>

        {/* Resultado da Consulta */}
        {consulted && (
          <View style={styles.resultContainer}>
            <Text style={styles.statusLabel}>Status do Pedido</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{statusPedido}</Text>
            </View>
          </View>
        )}
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
    marginBottom: 40,
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
    textAlign: 'center',
    fontSize: 16,
  },
  consultarButton: {
    backgroundColor: '#1a1f2e',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 40,
  },
  consultarButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  resultContainer: {
    alignItems: 'center',
  },
  statusLabel: {
    color: '#b0bcd4',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  statusBadge: {
    backgroundColor: '#a0a0a0',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  statusText: {
    color: '#2d8659',
    fontSize: 16,
    fontWeight: '700',
  },
});