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

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface Entrega {
  id: string;
  valor: string;
  distancia: string;
  tempo: string;
  cepOrigem: string;
  cepDestino: string;
}

// ─── Card de entrega ──────────────────────────────────────────────────────────
function CardEntrega({ entrega, onAceitar, onRecusar }: {
  entrega: Entrega;
  onAceitar: () => void;
  onRecusar: () => void;
}) {
  return (
    <View style={card.container}>
      <Text style={card.id}>ID: {entrega.id}</Text>
      <View style={card.body}>
        {/* Coluna esquerda: valor + distância + tempo */}
        <View style={card.left}>
          <Text style={card.valor}>{entrega.valor}</Text>
          <Text style={card.info}>📍 {entrega.distancia}</Text>
          <Text style={card.info}>🕐 {entrega.tempo}</Text>
        </View>

        {/* Coluna centro: CEPs */}
        <View style={card.center}>
          <Text style={card.cep}>📌 CEP: {entrega.cepOrigem}</Text>
          <Text style={card.cep}>🚩 CEP: {entrega.cepDestino}</Text>
        </View>

        {/* Coluna direita: botões */}
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
  container: {
    backgroundColor: '#243055',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  id: {
    color: '#b0bcd4',
    fontSize: 12,
    marginBottom: 8,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  left: {
    width: 72,
    gap: 4,
  },
  valor: {
    color: '#E8733A',
    fontSize: 15,
    fontWeight: '700',
  },
  info: {
    color: '#b0bcd4',
    fontSize: 11,
  },
  center: {
    flex: 1,
    gap: 8,
  },
  cep: {
    color: '#b0bcd4',
    fontSize: 11,
  },
  right: {
    gap: 6,
  },
  btnAceitar: {
    backgroundColor: '#4A90D9',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  btnRecusar: {
    backgroundColor: '#E8733A',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});

// ─── Dados mockados ───────────────────────────────────────────────────────────
const ENTREGAS: Entrega[] = [
  { id: '0789456', valor: 'R$18,50', distancia: '5,2 km', tempo: '25 min', cepOrigem: '36.773.665', cepDestino: '36.773.190' },
  { id: '0963852', valor: 'R$13,10', distancia: '4,8 km', tempo: '15 min', cepOrigem: '36.773.668', cepDestino: '36.773.190' },
  { id: '0147789', valor: 'R$10,90', distancia: '2,8 km', tempo: '10 min', cepOrigem: '36.773.668', cepDestino: '36.773.190' },
];

// ─── Tela principal ───────────────────────────────────────────────────────────
export default function NovasEntregasScreen({ navigation }: any) {
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
        <Text style={styles.pageTitle}>Novas entregas</Text>

        {/* Ícone de sincronização */}
        <Text style={styles.syncIcon}>🔄</Text>

        {/* Cards */}
        {ENTREGAS.map((e) => (
          <CardEntrega
            key={e.id}
            entrega={e}
            onAceitar={() => console.log('Aceitar', e.id)}
            onRecusar={() => console.log('Recusar', e.id)}
          />
        ))}

        {/* Aviso de pagamento */}
        <Text style={styles.aviso}>Os pagamentos ocorrem no ato da entrega!</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  pageTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  syncIcon: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  aviso: {
    color: '#E8733A',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '600',
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
