import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import { cores } from '../theme';

function ProgressBar({ atual, total }: { atual: number; total: number }) {
  const pct = Math.min((atual / total) * 100, 100);
  return (
    <View style={progress.wrapper}>
      <Text style={progress.label}>{atual}/{total}</Text>
      <View style={progress.track}>
        <View style={[progress.fill, { width: `${pct}%` }]} />
        <Text style={progress.pctLabel}>{Math.round(pct)}%</Text>
      </View>
    </View>
  );
}

const progress = StyleSheet.create({
  wrapper: { width: '100%', marginTop: 8 },
  label: { color: cores.textoFraco, fontSize: 13, textAlign: 'center', marginBottom: 6 },
  track: {
    height: 28,
    backgroundColor: cores.input,
    borderRadius: 14,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  fill: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    backgroundColor: cores.azul,
    borderRadius: 14,
  },
  pctLabel: { color: cores.textoBranco, fontSize: 13, fontWeight: '700', textAlign: 'right', paddingRight: 12 },
});

function MissaoItem({ emoji, texto }: { emoji: string; texto: string }) {
  return (
    <View style={missao.row}>
      <Text style={missao.emoji}>{emoji}</Text>
      <Text style={missao.texto}>{texto}</Text>
    </View>
  );
}

const missao = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
    gap: 14,
  },
  emoji: { fontSize: 26 },
  texto: { color: cores.textoFraco, fontSize: 14 },
});

export default function ConquistasScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Conquistas</Text>
        <Text style={styles.nivel}>Nível: Ferro 🥉 Aspirante</Text>
        <View style={styles.divider} />
        <ProgressBar atual={52} total={100} />
        <View style={styles.divider} />
        <Text style={styles.missaoTitulo}>Missões para subir de nível</Text>
        <MissaoItem emoji="🔴" texto="Primeira entrega (+10 XP)" />
        <MissaoItem emoji="⏳" texto="Entrega dentro do prazo (+15 XP)" />
        <MissaoItem emoji="🌀" texto="Entrega com avaliação positiva (+10 XP)" />
      </ScrollView>

      <BottomNavBar navigation={navigation} usuarioLogado={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  scroll: { paddingHorizontal: 28, paddingBottom: 24 },
  pageTitle: {
    color: cores.textoBranco,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  nivel: { color: cores.textoBranco, fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  divider: { height: 1, backgroundColor: cores.borda, marginVertical: 16 },
  missaoTitulo: { color: cores.azul, fontSize: 14, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
});
