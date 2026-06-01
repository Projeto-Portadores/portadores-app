import React from 'react';
import { View, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { cores } from '../theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={cores.fundo} />
      <Image
        source={require('../../assets/images/portadores-logo.png')}
        style={styles.logo}
        resizeMode="contain"
        onLoad={onFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.8,
    height: width * 0.8,
  },
});
