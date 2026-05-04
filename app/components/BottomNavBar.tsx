import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export function BottomNavBar({ onPress }: { onPress?: (tab: string) => void }) {
  const tabs = [
    { key: 'home',    emoji: '🏠' },
    { key: 'caixa',   emoji: '📦' },
    { key: 'novo',    emoji: '➕', destaque: true },
    { key: 'dinheiro',emoji: '💰' },
    { key: 'perfil',  emoji: '👤' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={tab.destaque ? styles.btnDestaque : styles.btn}
          onPress={() => onPress?.(tab.key)}
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
    backgroundColor: '#1C2540',
    borderTopWidth: 1,
    borderTopColor: '#2e3a5c',
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
    backgroundColor: '#2e3a5c',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: '#4A90D9',
  },
  emoji: {
    fontSize: 22,
  },
  emojiDestaque: {
    fontSize: 26,
  },
});