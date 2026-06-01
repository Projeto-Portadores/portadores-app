import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import { cores } from '../theme';
import db from '../Back-End/db.json';

const USUARIO_LOGADO = 'u001'; // Usuário logado

function Estrelas({ quantidade }: { quantidade: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} style={{ fontSize: 14, color: i <= quantidade ? cores.amarelo : cores.borda }}>★</Text>
      ))}
    </View>
  );
}

function CardEntregaFeita({ item }: { item: any }) {
  return (
    <View style={card.container}>
      <Text style={card.id}>ID: {item.id}</Text>
      <View style={card.row}>
        <View style={card.left}>
          <View style={[card.statusBadge, { borderColor: cores.azul }]}>
            <Text style={[card.statusText, { color: cores.azul }]}>{item.status === 'aceita' ? 'Aceita' : 'Entregue'}</Text>
          </View>
          {item.avaliacao && (
            <>
              <Text style={card.avaliacaoLabel}>Avaliação</Text>
              <Estrelas quantidade={item.avaliacao.estrelas} />
              <Text style={card.data}>Avaliado em {item.avaliacao.dataAvaliacao}</Text>
            </>
          )}
        </View>
        <View style={card.right}>
          <Text style={card.cep}>CEP: {item.cepOrigem}</Text>
          <Text style={card.valor}>R${item.valor.toFixed(2)}</Text>
          <Text style={card.cep}>CEP: {item.cepDestino}</Text>
        </View>
      </View>
    </View>
  );
}

const card = StyleSheet.create({
  container: { backgroundColor: cores.card, borderRadius: 12, padding: 14, marginBottom: 14 },
  id: { color: cores.textoFraco, fontSize: 12, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  left: { gap: 6, flex: 1 },
  statusBadge: { borderWidth: 1.5, borderRadius: 20, paddingVertical: 3, paddingHorizontal: 14, alignSelf: 'flex-start' },
  statusText: { fontSize: 13, fontWeight: '700' },
  avaliacaoLabel: { color: cores.textoFraco, fontSize: 12, marginTop: 2 },
  data: { color: cores.textoFraco, fontSize: 10, marginTop: 2 },
  right: { alignItems: 'flex-end', gap: 6, flex: 1 },
  cep: { color: cores.textoFraco, fontSize: 12 },
  valor: { color: cores.laranja, fontSize: 16, fontWeight: '700' },
});

export default function MinhasEntregasScreen({ navigation }: any) {
  const [entregasFeitas, setEntregasFeitas] = useState<any[]>([]);

  useEffect(() => {
    const entregas = db.entregas.filter(
      (e: any) => e.usuarioId === USUARIO_LOGADO && e.status !== 'disponivel'
    );
    setEntregasFeitas(entregas);
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Minhas entregas</Text>
        {entregasFeitas.map((item) => (
          <CardEntregaFeita key={item.id} item={item} />
        ))}
      </ScrollView>

      <BottomNavBar navigation={navigation} usuarioLogado={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  scroll: { paddingHorizontal: 20, paddingBottom: 24 },
  pageTitle: { color: cores.textoBranco, fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 24, marginTop: 8 },
});
