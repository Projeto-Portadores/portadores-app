import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

interface SaqueScreenProps {
  navigation?: any;
  route?: {
    params?: {
      valor?: string;
      chavePix?: string;
    };
  };
}

export default function SaqueScreen({ navigation, route }: SaqueScreenProps) {
  const valor    = route?.params?.valor    ?? 'R$ 47,00';
  const chavePix = route?.params?.chavePix ?? '8f3a9c72-b1e4-4d6f-9a21-7c5b8e3d2f90';

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

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Saque</Text>

        <Text style={styles.label}>Valor</Text>
        <View style={styles.valorBox}>
          <Text style={styles.valorText}>{valor}</Text>
        </View>

        <Text style={styles.label}>Chave Aleatória</Text>
        <View style={styles.chaveBox}>
          <Text style={styles.chaveText}>{chavePix}</Text>
        </View>
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
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  pageTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 36,
  },
  label: {
    color: '#b0bcd4',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'center',
  },
  valorBox: {
    backgroundColor: '#243055',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 32,
  },
  valorText: {
    color: '#F5C842',
    fontSize: 26,
    fontWeight: '700',
  },
  chaveBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#4a5a7a',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  chaveText: {
    color: '#b0bcd4',
    fontSize: 13,
    letterSpacing: 0.5,
  },

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
