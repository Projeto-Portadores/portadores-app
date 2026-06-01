import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { cores } from '../theme';

export default function AppHeader({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/portadores-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation?.goBack()}>
        <Text style={styles.exitIcon}>📤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: cores.fundo,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  logo: {
    width: 40,
    height: 40,
  },
  exitIcon: {
    fontSize: 24,
  },
});
