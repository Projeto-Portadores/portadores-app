import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { BottomNavBar } from '../components/BottomNavBar';

export default function MenuScreen({ navigation }: any) {
  const menuItems = [
    { label: 'Consultar pedido', key: 'consultar-pedido' },
    { label: 'Consultar histórico', key: 'consultar-historico' },
    { label: 'Consultar cupons', key: 'consultar-cupons' },
    { label: 'Minhas avaliações', key: 'minhas-avaliacoes' },
  ];

  const handleMenuPress = (key: string) => {
    // Navegar para as telas correspondentes
    console.log('Navegando para:', key);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C2540" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/portadores-logo.png')}
          style={styles.logoSmall}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={styles.exitIcon}>📤</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Início</Text>
        <Text style={styles.subtitle}>O que deseja fazer?</Text>

        {/* Menu Buttons */}
        <View style={styles.buttonsContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.menuButton}
              onPress={() => handleMenuPress(item.key)}
            >
              <Text style={styles.menuButtonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Navbar */}
      <BottomNavBar onPress={(tab) => {if (tab === 'home') {
      navigation.navigate('MenuScreen');
    }} }/>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  pageTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#b0bcd4',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
  },
  menuButton: {
    backgroundColor: '#1a1f2e',
    borderWidth: 2,
    borderColor: '#4A90D9',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});