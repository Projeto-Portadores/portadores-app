import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Switch,
} from 'react-native';

export default function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C2540" />

      {/* Logo + título */}
      <Image
        source={require('./assets/images/portadores_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>PORTADORES</Text>
      <Text style={styles.title}>Cadastro</Text>

      {/* Campos */}
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

      {/* Lembrar login */}
      <View style={styles.row}>
        <Switch
          value={lembrar}
          onValueChange={setLembrar}
          thumbColor={lembrar ? '#E8733A' : '#888'}
          trackColor={{ false: '#444', true: '#c45a1e' }}
        />
        <Text style={styles.lembrarText}>Me lembrar login</Text>
      </View>

      {/* Botão */}
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Primeiro Acesso</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2540',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  logo: {
    width: 90,
    height: 90,
  },
  appName: {
    color: '#D4CCBA',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: 4,
  },
  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 32,
  },
  label: {
    color: '#D4CCBA',
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    width: '100%',
    backgroundColor: '#2e3a5c',
    borderRadius: 24,
    height: 44,
    paddingHorizontal: 18,
    color: '#ffffff',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 20,
    gap: 10,
  },
  lembrarText: {
    color: '#D4CCBA',
    fontSize: 14,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#1a1a2e',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
