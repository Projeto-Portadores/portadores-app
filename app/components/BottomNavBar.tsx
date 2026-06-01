import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { cores } from '../theme';

export default function BottomNavBar({
  navigation,
  usuarioLogado = false,
  onPress,
}: {
  navigation?: any;
  usuarioLogado?: boolean;
  onPress?: (tab: string) => void;
}) {
  const tabs = [
    { key: 'home', emoji: '🏠', screen: 'MenuScreen' },
    { key: 'caixa', emoji: '📦', screen: 'MinhasEntregasScreen' },
    { key: 'novo', emoji: '➕', destaque: true, screen: 'NovasEntregasScreen' },
    { key: 'dinheiro', emoji: '💰', screen: 'MeusGanhosScreen' },
    { key: 'perfil', emoji: '👤', screen: 'ConsultaScreen' },
  ];

  const handlePress = (tab: { key: string; screen: string }) => {
    if (onPress) {
      onPress(tab.key);
    } else if (navigation && usuarioLogado) {
      navigation.navigate(tab.screen);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={tab.destaque ? styles.btnDestaque : styles.btn}
          onPress={() => handlePress(tab)}
        >
          <Text style={tab.destaque ? styles.emojiDestaque : styles.emoji}>
            {tab.emoji}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: cores.fundo,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  btnDestaque: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: cores.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: cores.azul,
  },
  emoji: {
    fontSize: 22,
  },
  emojiDestaque: {
    fontSize: 26,
  },
});