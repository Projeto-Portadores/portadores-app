import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import { cores } from '../theme';

export default function ConsultaScreen({ navigation }: any) {
  const [idPedido, setIdPedido] = useState('');
  const [statusPedido, setStatusPedido] = useState<string | null>(null);
  const [consulted, setConsulted] = useState(false);

  const handleConsultar = () => {
    if (idPedido.trim()) {
      // Simular consulta - em produção, seria uma chamada à API
      setStatusPedido('Pedido Entregue');
      setConsulted(true);
    } else {
      Alert.alert('Erro', 'Digite um ID válido');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={cores.fundo} />
      <AppHeader navigation={navigation} />

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Consulta</Text>

        {/* ID do Pedido */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>ID do Pedido</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o ID"
            placeholderTextColor={cores.textoFraco}
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
      <BottomNavBar navigation={navigation} usuarioLogado={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  scroll: {
    paddingHorizontal: 28,
    paddingBottom: 24,
  },
  pageTitle: {
    color: cores.textoBranco,
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
    color: cores.textoFraco,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    backgroundColor: cores.input,
    borderWidth: 2,
    borderColor: cores.azul,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: cores.textoBranco,
    textAlign: 'center',
    fontSize: 16,
  },
  consultarButton: {
    backgroundColor: cores.card,
    borderWidth: 2,
    borderColor: cores.textoBranco,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 40,
  },
  consultarButtonText: {
    color: cores.textoBranco,
    fontSize: 16,
    fontWeight: '700',
  },
  resultContainer: {
    alignItems: 'center',
  },
  statusLabel: {
    color: cores.textoFraco,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  statusBadge: {
    backgroundColor: cores.azul,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  statusText: {
    color: cores.textoBranco,
    fontSize: 16,
    fontWeight: '700',
  },
});