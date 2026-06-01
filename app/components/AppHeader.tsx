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
      <TouchableOpacity onPress={() => navigation?.navigate('SobreNosScreen')}>
        <Image
          source={require('../../assets/images/portadores-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation?.navigate('CadastroScreen')}>
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
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: cores.fundo,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
    marginTop: 8,
  },
  logo: {
    width: 40,
    height: 40,
  },
  exitIcon: {
    fontSize: 24,
  },
});
