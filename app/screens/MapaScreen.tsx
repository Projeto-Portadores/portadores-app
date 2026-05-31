import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import Button from '../components/Button';
import { cores } from '../theme';

export default function MapaScreen({ navigation }: any) {
  const [localizacao, setLocalizacao] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function pedirPermissao() {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos da sua localização para mostrar o mapa.');
      setLoading(false);
      return;
    }

    const posicao = await Location.getCurrentPositionAsync({});
    setLocalizacao(posicao.coords);
    setLoading(false);
  }

  useEffect(() => { pedirPermissao(); }, []);

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      {loading && (
        <View style={styles.centro}>
          <ActivityIndicator color={cores.azul} size="large" />
          <Text style={styles.loadingText}>Buscando sua localização...</Text>
        </View>
      )}

      {!loading && localizacao && (
        <MapView
          style={styles.mapa}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: localizacao.latitude,
            longitude: localizacao.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{ latitude: localizacao.latitude, longitude: localizacao.longitude }}
            title="Você está aqui"
            description="Sua posição atual"
          />
        </MapView>
      )}

      {!loading && !localizacao && (
        <View style={styles.centro}>
          <Text style={styles.erroText}>Não foi possível obter sua localização.</Text>
          <Button texto="Tentar novamente" onPress={pedirPermissao} />
        </View>
      )}

      <BottomNavBar navigation={navigation} usuarioLogado={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  mapa: { flex: 1 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  loadingText: { color: cores.textoFraco, fontSize: 15 },
  erroText: { color: cores.textoFraco, fontSize: 15, textAlign: 'center', paddingHorizontal: 40 },
});
