import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import { cores } from '../theme';

export default function SobreNosScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Sobre Nós</Text>

        <Text style={styles.sectionTitle}>🎯 Missão</Text>
        <Text style={styles.body}>
          Conectar pessoas ao que elas precisam, oferecendo entregas rápidas, seguras e acessíveis,
          utilizando tecnologia para simplificar o dia a dia.
        </Text>

        <Text style={styles.sectionTitle}>🚀 Visão</Text>
        <Text style={styles.body}>
          Ser referência em soluções de entrega inteligente no Brasil, reconhecida pela inovação,
          eficiência e pela capacidade de transportar com agilidade.
        </Text>

        <Text style={styles.sectionTitle}>💎 Valores</Text>
        <Text style={styles.listItem}>⚡ Agilidade</Text>
        <Text style={styles.listItem}>💡 Inovação</Text>
        <Text style={styles.listItem}>👤 Foco no cliente</Text>
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
    marginBottom: 32,
    marginTop: 8,
  },
  sectionTitle: {
    color: cores.textoBranco,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 28,
  },
  body: {
    color: cores.textoFraco,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  listItem: {
    color: cores.textoFraco,
    fontSize: 14,
    lineHeight: 28,
    textAlign: 'center',
  },
});
