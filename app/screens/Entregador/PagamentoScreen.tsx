import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

interface PagamentoScreenProps {
  navigation?: any;
  route?: {
    params?: {
      valor?: string;
      qrCodeUrl?: string; // URL da imagem do QR Code gerado pela sua API
    };
  };
}

export default function PagamentoScreen({ navigation, route }: PagamentoScreenProps) {
  const valor = route?.params?.valor ?? 'R$ 47,00';
  const qrCodeUrl = route?.params?.qrCodeUrl ?? null;

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

      {/* Conteúdo centralizado */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Pagamento da{'\n'}entrega</Text>

        {/* Valor */}
        <Text style={styles.valorLabel}>Valor</Text>
        <View style={styles.valorBox}>
          <Text style={styles.valorText}>{valor}</Text>
        </View>

        {/* QR Code */}
        <Text style={styles.qrLabel}>QR-Code PIX</Text>
        <View style={styles.qrBox}>
          {qrCodeUrl ? (
            <Image
              source={{ uri: qrCodeUrl }}
              style={styles.qrImage}
              resizeMode="contain"
            />
          ) : (
            // Placeholder enquanto não há QR Code real
            <Image
              source={require('./assets/images/qrcode_placeholder.png')}
              style={styles.qrImage}
              resizeMode="contain"
            />
          )}
        </View>

        <Text style={styles.instrucao}>
          Peça ao cliente para escanear e efetuar o{'\n'}pagamento ao final da entrega
        </Text>
      </View>

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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 16,
  },
  pageTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 36,
  },
  valorLabel: {
    color: '#b0bcd4',
    fontSize: 14,
    marginBottom: 10,
  },
  valorBox: {
    backgroundColor: '#243055',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 28,
  },
  valorText: {
    color: '#F5C842',
    fontSize: 26,
    fontWeight: '700',
  },
  qrLabel: {
    color: '#b0bcd4',
    fontSize: 14,
    marginBottom: 16,
  },
  qrBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  qrImage: {
    width: 180,
    height: 180,
  },
  instrucao: {
    color: '#b0bcd4',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
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
