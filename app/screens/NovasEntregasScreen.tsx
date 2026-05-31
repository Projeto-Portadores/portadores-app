import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import { cores } from '../theme';

const BASE_URL = 'http://10.0.2.2:3000';
// const BASE_URL = 'http://localhost:3000'; // iOS simulator

function CardEntrega({ entrega, onAceitar, onRecusar }: any) {
  return (
    <View style={card.container}>
      <Text style={card.id}>ID: {entrega.id}</Text>
      <View style={card.body}>
        <View style={card.left}>
          <Text style={card.valor}>R${entrega.valor.toFixed(2)}</Text>
          <Text style={card.info}>📍 {entrega.distanciaKm} km</Text>
          <Text style={card.info}>🕐 {entrega.tempoEstimadoMin} min</Text>
        </View>
        <View style={card.center}>
          <Text style={card.cep}>📌 CEP: {entrega.cepOrigem}</Text>
          <Text style={card.cep}>🚩 CEP: {entrega.cepDestino}</Text>
        </View>
        <View style={card.right}>
          <TouchableOpacity style={card.btnAceitar} onPress={onAceitar}>
            <Text style={card.btnText}>Aceitar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={card.btnRecusar} onPress={onRecusar}>
            <Text style={card.btnText}>Recusar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const card = StyleSheet.create({
  container: { backgroundColor: cores.card, borderRadius: 12, padding: 12, marginBottom: 12 },
  id: { color: cores.textoFraco, fontSize: 12, marginBottom: 8 },
  body: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  left: { width: 72, gap: 4 },
  valor: { color: cores.laranja, fontSize: 15, fontWeight: '700' },
  info: { color: cores.textoFraco, fontSize: 11 },
  center: { flex: 1, gap: 8 },
  cep: { color: cores.textoFraco, fontSize: 11 },
  right: { gap: 6 },
  btnAceitar: { backgroundColor: cores.azul, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12 },
  btnRecusar: { backgroundColor: cores.laranja, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12 },
  btnText: { color: cores.textoBranco, fontSize: 12, fontWeight: '700' },
});

export default function NovasEntregasScreen({ navigation }: any) {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);

  async function buscarEntregas() {
    setLoading(true);
    try {
      const resposta = await fetch(`${BASE_URL}/entregas?status=disponivel`);
      const dados = await resposta.json();
      setEntregas(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as entregas.');
    } finally {
      setLoading(false);
    }
  }

  async function aceitarEntrega(id: string) {
    try {
      await fetch(`${BASE_URL}/entregas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'aceita' }),
      });
      Alert.alert('Entrega aceita!');
      buscarEntregas();
    } catch {
      Alert.alert('Erro', 'Não foi possível aceitar a entrega.');
    }
  }

  async function recusarEntrega(id: string) {
    try {
      await fetch(`${BASE_URL}/entregas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'recusada' }),
      });
      Alert.alert('Entrega recusada.');
      buscarEntregas();
    } catch {
      Alert.alert('Erro', 'Não foi possível recusar a entrega.');
    }
  }

  useEffect(() => { buscarEntregas(); }, []);

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Novas entregas</Text>

        <TouchableOpacity onPress={buscarEntregas}>
          <Text style={styles.syncIcon}>🔄</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator color={cores.azul} size="large" style={{ marginTop: 20 }} />}

        {!loading && entregas.length === 0 && (
          <Text style={styles.semEntregas}>Nenhuma entrega disponível no momento.</Text>
        )}

        {entregas.map((e: any) => (
          <CardEntrega
            key={e.id}
            entrega={e}
            onAceitar={() => aceitarEntrega(e.id)}
            onRecusar={() => recusarEntrega(e.id)}
          />
        ))}

        <Text style={styles.aviso}>Os pagamentos ocorrem no ato da entrega!</Text>
      </ScrollView>

      <BottomNavBar navigation={navigation} usuarioLogado={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  scroll: { paddingHorizontal: 20, paddingBottom: 24 },
  pageTitle: { color: cores.textoBranco, fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 8, marginTop: 8 },
  syncIcon: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  semEntregas: { color: cores.textoFraco, textAlign: 'center', marginTop: 40, fontSize: 14 },
  aviso: { color: cores.laranja, fontSize: 13, textAlign: 'center', marginTop: 16, fontWeight: '600' },
});
