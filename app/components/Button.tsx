import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { cores } from '../theme';

interface ButtonProps {
  texto: string;
  onPress: () => void;
  cor?: 'azul' | 'laranja' | 'verde';
  loading?: boolean;
  estilo?: ViewStyle;
  desabilitado?: boolean;
}

export default function Button({
  texto,
  onPress,
  cor = 'azul',
  loading = false,
  estilo,
  desabilitado = false,
}: ButtonProps) {
  const corFundo: Record<string, string> = {
    azul: cores.azul,
    laranja: cores.laranja,
    verde: '#22c55e',
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: corFundo[cor] },
        desabilitado && styles.desabilitado,
        estilo,
      ]}
      onPress={onPress}
      disabled={desabilitado || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{texto}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  text: {
    color: cores.textoBranco,
    fontSize: 15,
    fontWeight: '700',
  },
  desabilitado: {
    opacity: 0.5,
  },
});
