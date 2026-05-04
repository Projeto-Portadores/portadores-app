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
interface EntregaFeita {
  id: string;
  status: 'Entregue' | 'Pendente' | 'Cancelada';
  cepOrigem: string;
  cepDestino: string;
  valor: string;
  estrelas: number;
  dataAvaliacao: string;
}

// ─── Estrelas ─────────────────────────────────────────────────────────────────
function Estrelas({ quantidade }: { quantidade: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} style={{ fontSize: 14, color: i <= quantidade ? '#F5C842' : '#444' }}>
          ★
        </Text>
      ))}
    </View>
  );
}

// ─── Card de entrega feita ────────────────────────────────────────────────────
function CardEntregaFeita({ item }: { item: EntregaFeita }) {
  const statusColor = item.status === 'Entregue' ? '#4A90D9'
    : item.status === 'Cancelada' ? '#E8733A' : '#888';

  return (
    <View style={card.container}>
      <Text style={card.id}>ID: {item.id}</Text>

      <View style={card.row}>
        {/* Status + avaliação */}
        <View style={card.left}>
          <View style={[card.statusBadge, { borderColor: statusColor }]}>
            <Text style={[card.statusText, { color: statusColor }]}>{item.status}</Text>
          </View>
          <Text style={card.avaliacaoLabel}>Avaliação</Text>
          <Estrelas quantidade={item.estrelas} />
          <Text style={card.data}>Avaliado em {item.dataAvaliacao}</Text>
        </View>

        {/* CEPs + valor */}
        <View style={card.right}>
          <Text style={card.cep}>CEP: {item.cepOrigem}</Text>
          <Text style={card.valor}>{item.valor}</Text>
          <Text style={card.cep}>CEP: {item.cepDestino}</Text>
        </View>
      </View>
    </View>
  );
}

const card = StyleSheet.create({
  container: {
    backgroundColor: '#243055',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  id: {
    color: '#b0bcd4',
    fontSize: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  left: {
    gap: 6,
    flex: 1,
  },
  statusBadge: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
  },
  avaliacaoLabel: {
    color: '#b0bcd4',
    fontSize: 12,
    marginTop: 2,
  },
  data: {
    color: '#6a7a9a',
    fontSize: 10,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
    flex: 1,
  },
  cep: {
    color: '#b0bcd4',
    fontSize: 12,
  },
  valor: {
    color: '#E8733A',
    fontSize: 16,
    fontWeight: '700',
  },
});

// ─── Dados mockados ───────────────────────────────────────────────────────────
const ENTREGAS_FEITAS: EntregaFeita[] = [
  {
    id: '0654963',
    status: 'Entregue',
    cepOrigem: '36.773.668',
    cepDestino: '36.773.190',
    valor: 'R$25,00',
    estrelas: 5,
    dataAvaliacao: '18/03/2026',
  },
  {
    id: '7410321',
    status: 'Entregue',
    cepOrigem: '36.773.668',
    cepDestino: '36.773.190',
    valor: 'R$22,00',
    estrelas: 4,
    dataAvaliacao: '15/03/2026',
  },
];

// ─── Tela principal ───────────────────────────────────────────────────────────
export default function MinhasEntregasScreen({ navigation }: any) {
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
        <Text style={styles.pageTitle}>Minhas entregas</Text>

        {ENTREGAS_FEITAS.map((item) => (
          <CardEntregaFeita key={item.id} item={item} />
        ))}
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
    marginBottom: 24,
    marginTop: 8,
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
