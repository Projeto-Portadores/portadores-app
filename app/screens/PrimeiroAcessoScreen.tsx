import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { cores } from '../theme';

export default function PrimeiroAcessoScreen() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfilSelecionado, setPerfilSelecionado] = useState<'entregador' | 'cliente' | null>(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C2540" />

      {/* Logo + título */}
      <Image
        source={require('../../assets/images/portadores-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>PORTADORES</Text>
      <Text style={styles.title}>Primeiro Acesso</Text>

      {/* Campos */}
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        value={dataNascimento}
        onChangeText={setDataNascimento}
        placeholder="DD/MM/YYYY"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        placeholderTextColor="#888"
      />

      {/* Tipo de perfil */}
      <Text style={styles.label}>Tipo de perfil</Text>
      <View style={styles.perfilContainer}>
        <TouchableOpacity
          style={[
            styles.perfilButton,
            perfilSelecionado === 'entregador' && styles.perfilButtonSelected,
          ]}
          onPress={() => setPerfilSelecionado('entregador')}
        >
          <Text
            style={[
              styles.perfilButtonText,
              perfilSelecionado === 'entregador' && styles.perfilButtonTextSelected,
            ]}
          >
            Entregador
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.perfilButton,
            perfilSelecionado === 'cliente' && styles.perfilButtonSelected,
          ]}
          onPress={() => setPerfilSelecionado('cliente')}
        >
          <Text
            style={[
              styles.perfilButtonText,
              perfilSelecionado === 'cliente' && styles.perfilButtonTextSelected,
            ]}
          >
            Cliente
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botão Continuar */}
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 40,
  },
  logo: {
    width: 90,
    height: 90,
  },
  appName: {
    color: cores.textoClaro,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: 4,
  },
  title: {
    color: cores.textoBranco,
    fontSize: 26,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 24,
  },
  label: {
    color: cores.textoClaro,
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    width: '100%',
    backgroundColor: cores.input,
    borderRadius: 24,
    height: 44,
    paddingHorizontal: 18,
    color: cores.textoBranco,
    fontSize: 15,
    marginBottom: 6,
  },
  perfilContainer: {
    flexDirection: 'row',
    gap: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 24,
  },
  perfilButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: cores.textoClaro,
  },
  perfilButtonSelected: {
    backgroundColor: cores.card,
    borderColor: cores.laranja,
  },
  perfilButtonText: {
    color: cores.textoClaro,
    fontSize: 14,
    fontWeight: '600',
  },
  perfilButtonTextSelected: {
    color: cores.laranja,
  },
  button: {
    marginTop: 20,
    backgroundColor: cores.card,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  buttonText: {
    color: cores.textoBranco,
    fontSize: 16,
    fontWeight: '700',
  },
});
