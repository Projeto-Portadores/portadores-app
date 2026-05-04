import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

// ─── Barra de progresso ───────────────────────────────────────────────────────
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
  label: {
    color: '#b0bcd4',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 6,
  },
  track: {
    height: 28,
    backgroundColor: '#2e3a5c',
    borderRadius: 14,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#4A90D9',
    borderRadius: 14,
  },
  pctLabel: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    paddingRight: 12,
  },
});

// ─── Item de missão ───────────────────────────────────────────────────────────
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
    borderBottomColor: '#2e3a5c',
    gap: 14,
  },
  emoji: { fontSize: 26 },
  texto: { color: '#b0bcd4', fontSize: 14 },
});

// ─── Tela principal ───────────────────────────────────────────────────────────
export default function ConquistasScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C2540" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.navigate('SobreNos')}>
          <Image
            source={require('./assets/images/portadores_logo.png')}
            style={styles.logoSmall}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={styles.exitIcon}>📤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Conquistas</Text>

        {/* Nível */}
        <Text style={styles.nivel}>Nível: Ferro 🥉 Aspirante</Text>
        <View style={styles.divider} />

        {/* Barra de XP */}
        <ProgressBar atual={52} total={100} />

        <View style={styles.divider} />

        {/* Missões */}
        <Text style={styles.missaoTitulo}>Missões para subir de nível</Text>

        <MissaoItem emoji="🔴" texto="Primeira entrega (+10 XP)" />
        <MissaoItem emoji="⏳" texto="Entrega dentro do prazo (+15 XP)" />
        <MissaoItem emoji="🌀" texto="Entrega com avaliação positiva (+10 XP)" />
      </ScrollView>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navEmoji}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navEmoji}>📦</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtnDestaque}>
          <Text style={styles.navEmojiDestaque}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navEmoji}>💰</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navEmoji}>👤</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 24,
    marginTop: 8,
  },
  nivel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#2e3a5c',
    marginVertical: 16,
  },
  missaoTitulo: {
    color: '#4A90D9',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#1C2540',
    borderTopWidth: 1,
    borderTopColor: '#2e3a5c',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navBtnDestaque: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2e3a5c',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: '#4A90D9',
  },
  navEmoji: { fontSize: 22 },
  navEmojiDestaque: { fontSize: 26 },
});
