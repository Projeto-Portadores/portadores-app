import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import Button from '../components/Button';
import { cores } from '../theme';

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
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.pageTitle}>Meus ganhos</Text>

        {/* Filtro */}
        <View style={styles.filtroRow}>
          {(['Hoje', 'Semana', 'Mês'] as Periodo[]).map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.filtroBtn, periodo === p && styles.filtroBtnAtivo]}
              onPress={() => setPeriodo(p)}
            >
              <Text style={[styles.filtroText, periodo === p && styles.filtroTextAtivo]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Saldo */}
        <View style={styles.saldoCard}>
          <Text style={styles.walletEmoji}>👛</Text>
          <View>
            <Text style={styles.saldoLabel}>Saldo disponível</Text>
            <Text style={styles.saldoValor}>{dados.saldo}</Text>
          </View>
        </View>

        <Text style={styles.detalhesLabel}>Detalhes da {periodo}</Text>

        <View style={styles.detalheRow}>
          <Text style={styles.boxEmoji}>📦</Text>
          <View style={styles.detalheTextos}>
            <Text style={styles.detalheTitle}>Entregas concluídas</Text>
            <Text style={styles.detalheSubtitle}>{dados.entregas} entregas</Text>
          </View>
          <Text style={styles.detalheValor}>{dados.total}</Text>
        </View>

        <Button
          texto="Resgatar pagamento"
          onPress={() => navigation.navigate('Saque', { valor: dados.saldo, chavePix: '' })}
        />
      </View>

      <BottomNavBar navigation={navigation} usuarioLogado={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 8 },
  pageTitle: { color: cores.textoBranco, fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 24 },
  filtroRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 24 },
  filtroBtn: { borderWidth: 1.5, borderColor: '#4a5a7a', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 20 },
  filtroBtnAtivo: { backgroundColor: cores.azul, borderColor: cores.azul },
  filtroText: { color: cores.textoFraco, fontSize: 14 },
  filtroTextAtivo: { color: cores.textoBranco, fontWeight: '700' },
  saldoCard: { backgroundColor: cores.card, borderRadius: 14, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 28 },
  walletEmoji: { fontSize: 32 },
  saldoLabel: { color: cores.textoFraco, fontSize: 13, marginBottom: 4 },
  saldoValor: { color: cores.textoBranco, fontSize: 22, fontWeight: '700' },
  detalhesLabel: { color: cores.textoFraco, fontSize: 14, marginBottom: 14 },
  detalheRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 40 },
  boxEmoji: { fontSize: 28 },
  detalheTextos: { flex: 1 },
  detalheTitle: { color: cores.textoBranco, fontSize: 14, fontWeight: '600' },
  detalheSubtitle: { color: '#6a7a9a', fontSize: 12, marginTop: 2 },
  detalheValor: { color: cores.laranja, fontSize: 15, fontWeight: '700' },
});
