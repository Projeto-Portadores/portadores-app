import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { cores } from '../theme';

interface InputProps {
  label?: string;
  valor: string;
  onChange: (text: string) => void;
  placeholder?: string;
  teclado?: KeyboardTypeOptions;
  senha?: boolean;
  erro?: string;
  maxCaracteres?: number;
}

export default function Input({
  label,
  valor,
  onChange,
  placeholder = '',
  teclado = 'default',
  senha = false,
  erro,
  maxCaracteres,
}: InputProps) {
  const handleChange = (text: string) => {
    if (maxCaracteres && text.length > maxCaracteres) {
      return;
    }
    onChange(text);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, erro && styles.inputErro]}
        value={valor}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={cores.textoFraco}
        keyboardType={teclado}
        secureTextEntry={senha}
        maxLength={maxCaracteres}
      />
      {erro && <Text style={styles.erro}>{erro}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  label: {
    color: cores.textoClaro,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: cores.input,
    borderWidth: 2,
    borderColor: cores.azul,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: cores.textoBranco,
    fontSize: 14,
  },
  inputErro: {
    borderColor: '#ff4444',
  },
  erro: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
});
