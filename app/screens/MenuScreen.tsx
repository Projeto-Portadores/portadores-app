import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import { cores } from '../theme';

export default function MenuScreen({ navigation }: any) {
  const menuItems = [
    { label: 'Consultar pedido', key: 'Consulta', screen: 'ConsultaScreen' },
    { label: 'Minhas entregas', key: 'minhas-entregas', screen: 'MinhasEntregasScreen' },
    { label: 'Solicitação', key: 'solicitacao', screen: 'SolicitacaoScreen' },
    { label: 'Sobre nós', key: 'sobre-nos', screen: 'SobreNos' },
  ];

  const handleMenuPress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={cores.fundo} />
      <AppHeader navigation={navigation} />

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Início</Text>
        <Text style={styles.subtitle}>O que deseja fazer?</Text>

        {/* Menu Buttons */}
        <View style={styles.buttonsContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.menuButton}
              onPress={() => handleMenuPress(item.screen)}
            >
              <Text style={styles.menuButtonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Navbar */}
      <BottomNavBar navigation={navigation} usuarioLogado={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  scroll: {
    paddingHorizontal: 28,
    paddingVertical: 28,
  },
  pageTitle: {
    color: cores.textoBranco,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: cores.textoFraco,
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
    backgroundColor: cores.card,
    borderWidth: 2,
    borderColor: cores.azul,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  menuButtonText: {
    color: cores.textoBranco,
    fontSize: 16,
    fontWeight: '600',
  },
});