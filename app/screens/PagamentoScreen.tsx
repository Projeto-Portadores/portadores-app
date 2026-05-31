import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import { cores } from '../theme';

export default function PagamentoScreen({ navigation, route }: any) {
  const valor = route?.params?.valor ?? 'R$ 47,00';

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.pageTitle}>Pagamento da{'\n'}entrega</Text>

        <Text style={styles.label}>Valor</Text>
        <View style={styles.valorBox}>
          <Text style={styles.valorText}>{valor}</Text>
        </View>

        <Text style={styles.label}>QR-Code PIX</Text>
        <View style={styles.qrBox}>
          <Image
            source={require('../assets/images/qrcode_placeholder.png')}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.instrucao}>
          Peça ao cliente para escanear e efetuar o{'\n'}pagamento ao final da entrega
        </Text>
      </View>

      <BottomNavBar navigation={navigation} usuarioLogado={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 32, paddingTop: 16 },
  pageTitle: { color: cores.textoBranco, fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 28, lineHeight: 36 },
  label: { color: cores.textoFraco, fontSize: 14, marginBottom: 10 },
  valorBox: { backgroundColor: cores.card, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 40, marginBottom: 28 },
  valorText: { color: cores.amarelo, fontSize: 26, fontWeight: '700' },
  qrBox: { backgroundColor: '#ffffff', borderRadius: 12, padding: 12, marginBottom: 24 },
  qrImage: { width: 180, height: 180 },
  instrucao: { color: cores.textoFraco, fontSize: 13, textAlign: 'center', lineHeight: 20 },
});
