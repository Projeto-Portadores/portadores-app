import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import { cores } from '../theme';

export default function SaqueScreen({ navigation, route }: any) {
  const valor    = route?.params?.valor    ?? 'R$ 47,00';
  const chavePix = route?.params?.chavePix ?? '8f3a9c72-b1e4-4d6f-9a21-7c5b8e3d2f90';

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.pageTitle}>Saque</Text>

        <Text style={styles.label}>Valor</Text>
        <View style={styles.valorBox}>
          <Text style={styles.valorText}>{valor}</Text>
        </View>

        <Text style={styles.label}>Chave Aleatória</Text>
        <View style={styles.chaveBox}>
          <Text style={styles.chaveText}>{chavePix}</Text>
        </View>
      </View>

      <BottomNavBar navigation={navigation} usuarioLogado={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 32, paddingTop: 24 },
  pageTitle: { color: cores.textoBranco, fontSize: 28, fontWeight: '700', marginBottom: 36 },
  label: { color: cores.textoFraco, fontSize: 14, marginBottom: 10, alignSelf: 'center' },
  valorBox: { backgroundColor: cores.card, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 40, marginBottom: 32 },
  valorText: { color: cores.amarelo, fontSize: 26, fontWeight: '700' },
  chaveBox: { borderBottomWidth: 1, borderBottomColor: '#4a5a7a', paddingVertical: 10, width: '100%', alignItems: 'center' },
  chaveText: { color: cores.textoFraco, fontSize: 13, letterSpacing: 0.5 },
});
