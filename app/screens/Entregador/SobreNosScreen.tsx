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

// ─── Navbar inferior (componente reutilizável) ────────────────────────────────
export function BottomNavBar({ onPress }: { onPress?: (tab: string) => void }) {
  const tabs = [
    { key: 'home',    emoji: '🏠' },
    { key: 'caixa',   emoji: '📦' },
    { key: 'novo',    emoji: '➕', destaque: true },
    { key: 'dinheiro',emoji: '💰' },
    { key: 'perfil',  emoji: '👤' },
  ];

  return (
    <View style={nav.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={tab.destaque ? nav.btnDestaque : nav.btn}
          onPress={() => onPress?.(tab.key)}
        >
          <Text style={tab.destaque ? nav.emojiDestaque : nav.emoji}>
            {tab.emoji}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const nav = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1C2540',
    borderTopWidth: 1,
    borderTopColor: '#2e3a5c',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  btnDestaque: {
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
  emoji: {
    fontSize: 22,
  },
  emojiDestaque: {
    fontSize: 26,
  },
});

// ─── Tela principal ───────────────────────────────────────────────────────────
export default function SobreNosScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C2540" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./assets/images/portadores_logo.png')}
          style={styles.logoSmall}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={styles.exitIcon}>📤</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Sobre Nós</Text>

        {/* Missão */}
        <Text style={styles.sectionTitle}>🎯 Missão</Text>
        <Text style={styles.body}>
          Conectar pessoas ao que elas precisam, oferecendo entregas rápidas, seguras e acessíveis,
          utilizando tecnologia para simplificar o dia a dia.
        </Text>

        {/* Visão */}
        <Text style={styles.sectionTitle}>🚀 Visão</Text>
        <Text style={styles.body}>
          Ser referência em soluções de entrega inteligente no Brasil, reconhecida pela inovação,
          eficiência e pela capacidade de transportar com agilidade.
        </Text>

        {/* Valores */}
        <Text style={styles.sectionTitle}>💎 Valores</Text>
        <Text style={styles.listItem}>⚡ Agilidade</Text>
        <Text style={styles.listItem}>💡 Inovação</Text>
        <Text style={styles.listItem}>👤 Foco no cliente</Text>
      </ScrollView>

      {/* Navbar */}
      <BottomNavBar />
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
    marginBottom: 32,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 28,
  },
  body: {
    color: '#b0bcd4',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  listItem: {
    color: '#b0bcd4',
    fontSize: 14,
    lineHeight: 28,
    textAlign: 'center',
  },
});
