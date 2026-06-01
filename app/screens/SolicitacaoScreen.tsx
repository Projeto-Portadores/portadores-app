import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import { cores } from '../theme';

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
    if (!formData.cepOrigem || !formData.refOrigem || !formData.cepDestino || !formData.refDestino) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }
    Alert.alert('Sucesso', 'Pedido solicitado com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={cores.fundo} />
      <AppHeader navigation={navigation} />

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
    marginBottom: 32,
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
    marginBottom: 20,
    textAlign: 'center',
  },
  valorContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  valorLabel: {
    color: cores.textoBranco,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  valorAmount: {
    color: cores.laranja,
    fontWeight: '700',
  },
  valorInfo: {
    color: cores.textoFraco,
    fontSize: 12,
    textAlign: 'center',
  },
  concludeButton: {
    backgroundColor: cores.card,
    borderWidth: 2,
    borderColor: cores.textoBranco,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  concludeButtonText: {
    color: cores.textoBranco,
    fontSize: 16,
    fontWeight: '700',
  },
});