import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

type Periodo = 'Hoje' | 'Semana' | 'Mês';

const DADOS: Record<Periodo, { saldo: string; entregas: number; total: string }> = {
  Hoje:   { saldo: 'R$ 0,00',  entregas: 0, total: 'R$ 0,00'  },
  Semana: { saldo: 'R$ 47,00', entregas: 2, total: 'R$ 47,00' },
  Mês:    { saldo: 'R$ 47,00', entregas: 2, total: 'R$ 47,00' },
};

export default function MeusGanhosScreen({ navigation }: any) {
  const [periodo, setPeriodo] = useState<Periodo>('Semana');
  const dados = DADOS[periodo];

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

      <View style={styles.content}>
        <Text style={styles.pageTitle}>Meus ganhos</Text>

        {/* Filtro de período */}
        <View style={styles.filtroRow}>
          {(['Hoje', 'Semana', 'Mês'] as Periodo[]).map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.filtroBtn, periodo === p && styles.filtroBtnAtivo]}
              onPress={() => setPeriodo(p)}
            >
              <Text style={[styles.filtroText, periodo === p && styles.filtroTextAtivo]}>
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Card saldo */}
        <View style={styles.saldoCard}>
          <Text style={styles.walletEmoji}>👛</Text>
          <View>
            <Text style={styles.saldoLabel}>Saldo disponível</Text>
            <Text style={styles.saldoValor}>{dados.saldo}</Text>
          </View>
        </View>

        {/* Detalhes */}
        <Text style={styles.detalhesLabel}>Detalhes da {periodo}</Text>

        <View style={styles.detalheRow}>
          <Text style={styles.boxEmoji}>📦</Text>
          <View style={styles.detalheTextos}>
            <Text style={styles.detalheTitle}>Entregas concluídas</Text>
            <Text style={styles.detalheSubtitle}>{dados.entregas} entregas</Text>
          </View>
          <Text style={styles.detalheValor}>{dados.total}</Text>
        </View>

        {/* Botão resgatar */}
        <TouchableOpacity style={styles.btnResgatar} onPress={() => {}}>
          <Text style={styles.btnResgatarText}>Resgatar pagamento</Text>
        </TouchableOpacity>
      </View>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navBtn}><Text style={styles.navEmoji}>🏠</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}><Text style={styles.navEmoji}>📦</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navBtnDestaque}><Text style={styles.navEmojiDestaque}>➕</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}><Text style={styles.navEmoji}>💰</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}><Text style={styles.navEmoji}>👤</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C2540' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 8,
  },
  logoSmall: { width: 48, height: 48 },
  exitIcon: { fontSize: 26 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  pageTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },

  // Filtro
  filtroRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  filtroBtn: {
    borderWidth: 1.5,
    borderColor: '#4a5a7a',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  filtroBtnAtivo: {
    backgroundColor: '#4A90D9',
    borderColor: '#4A90D9',
  },
  filtroText: { color: '#b0bcd4', fontSize: 14 },
  filtroTextAtivo: { color: '#ffffff', fontWeight: '700' },

  // Saldo
  saldoCard: {
    backgroundColor: '#243055',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 28,
  },
  walletEmoji: { fontSize: 32 },
  saldoLabel: { color: '#b0bcd4', fontSize: 13, marginBottom: 4 },
  saldoValor: { color: '#ffffff', fontSize: 22, fontWeight: '700' },

  // Detalhes
  detalhesLabel: {
    color: '#b0bcd4',
    fontSize: 14,
    marginBottom: 14,
  },
  detalheRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  boxEmoji: { fontSize: 28 },
  detalheTextos: { flex: 1 },
  detalheTitle: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  detalheSubtitle: { color: '#6a7a9a', fontSize: 12, marginTop: 2 },
  detalheValor: { color: '#E8733A', fontSize: 15, fontWeight: '700' },

  // Botão
  btnResgatar: {
    backgroundColor: '#1a1a2e',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  btnResgatarText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },

  // Navbar
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
  navBtn: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  navBtnDestaque: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#2e3a5c',
    alignItems: 'center', justifyContent: 'center',
    marginHorizontal: 8, borderWidth: 2, borderColor: '#4A90D9',
  },
  navEmoji: { fontSize: 22 },
  navEmojiDestaque: { fontSize: 26 },
});
