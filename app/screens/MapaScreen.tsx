import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';
import AppHeader from '../components/AppHeader';
import BottomNavBar from '../components/BottomNavBar';
import Button from '../components/Button';
import { cores } from '../theme';
import db from '../Back-End/db.json';

// Importar MapView apenas em plataformas nativas
let MapView: any;
let Marker: any;
let PROVIDER_GOOGLE: any;

if (Platform.OS !== 'web') {
  const MapViewModule = require('react-native-maps');
  MapView = MapViewModule.default;
  Marker = MapViewModule.Marker;
  PROVIDER_GOOGLE = MapViewModule.PROVIDER_GOOGLE;
}

interface Entrega {
  id: string;
  usuarioId: string | null;
  status: string;
  valor: number;
  distanciaKm: number;
  tempoEstimadoMin: number;
  cepOrigem: string;
  cepDestino: string;
  criadoEm: string;
  atualizadoEm: string;
}

interface Coordenada {
  latitude: number;
  longitude: number;
}

interface CepComCoordenadas {
  cep: string;
  coordenadas: Coordenada | null;
}

// Cache de CEPs já buscados
const cepCache: { [key: string]: Coordenada | null } = {};

async function buscarCoordenadaDosCep(cep: string): Promise<Coordenada | null> {
  // Se já está em cache, retornar
  if (cepCache[cep] !== undefined) {
    return cepCache[cep];
  }

  try {
    // Remover caracteres especiais do CEP
    const cepLimpo = cep.replace(/\D/g, '');
    const urlViaCep = `https://viacep.com.br/ws/${cepLimpo}/json/`;

    const responseViaCep = await fetch(urlViaCep);
    const dataViaCep = await responseViaCep.json();

    if (dataViaCep.erro) {
      console.warn(`CEP ${cep} não encontrado no ViaCEP`);
      cepCache[cep] = null;
      return null;
    }

    // Construir endereço para geocodificação
    const endereco = `${dataViaCep.logradouro}, ${dataViaCep.bairro}, ${dataViaCep.localidade}, ${dataViaCep.uf}`;

    // Usar Nominatim para geocodificar
    const urlNominatim = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&limit=1`;

    const responseNominatim = await fetch(urlNominatim, {
      headers: { 'User-Agent': 'PortadoresApp/1.0' },
    });
    const dataNominatim = await responseNominatim.json();

    if (!dataNominatim || dataNominatim.length === 0) {
      console.warn(`Não foi possível geocodificar o endereço: ${endereco}`);
      cepCache[cep] = null;
      return null;
    }

    const coordenadas: Coordenada = {
      latitude: parseFloat(dataNominatim[0].lat),
      longitude: parseFloat(dataNominatim[0].lon),
    };

    cepCache[cep] = coordenadas;
    return coordenadas;
  } catch (error) {
    console.error(`Erro ao buscar coordenadas do CEP ${cep}:`, error);
    cepCache[cep] = null;
    return null;
  }
}

export default function MapaScreen({ navigation }: any) {
  const [localizacao, setLocalizacao] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [entregasComCoordenadas, setEntregasComCoordenadas] = useState<(Entrega & { coordenadasOrigem: Coordenada | null; coordenadasDestino: Coordenada | null })[]>([]);

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

  // Carregar entregas e buscar coordenadas
  async function carregarEntregas() {
    try {
      // Filtrar entregas: disponíveis, aceitas e entregues
      const entregasDisponiveis = db.entregas.filter((e: Entrega) => e.status === 'disponivel' && e.usuarioId === null);
      const entregasAceitas = db.entregas.filter((e: Entrega) => e.usuarioId !== null && e.status === 'disponivel');
      const entregasEntregues = db.entregas.filter((e: Entrega) => e.status === 'entregue');

      const todasAsEntregas = [...entregasDisponiveis, ...entregasAceitas, ...entregasEntregues];
      setEntregas(todasAsEntregas);

      // Buscar coordenadas para cada entrega
      const entregasProcessadas = await Promise.all(
        todasAsEntregas.map(async (entrega) => {
          const coordenadasOrigem = await buscarCoordenadaDosCep(entrega.cepOrigem);
          const coordenadasDestino = await buscarCoordenadaDosCep(entrega.cepDestino);

          return {
            ...entrega,
            coordenadasOrigem,
            coordenadasDestino,
          };
        })
      );

      // Filtrar apenas entregas com coordenadas válidas
      const entregasComCoords = entregasProcessadas.filter(
        (e) => e.coordenadasOrigem && e.coordenadasOrigem.latitude !== 0 && e.coordenadasOrigem.longitude !== 0
      );

      setEntregasComCoordenadas(entregasComCoords);
    } catch (error) {
      console.error('Erro ao carregar entregas:', error);
      Alert.alert('Erro', 'Erro ao carregar entregas: ' + (error instanceof Error ? error.message : String(error)));
    }
  }

  useEffect(() => {
    pedirPermissao();
  }, []);

  useEffect(() => {
    if (localizacao && !loading) {
      carregarEntregas();
    }
  }, [localizacao, loading]);

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      {loading && (
        <View style={styles.centro}>
          <ActivityIndicator color={cores.azul} size="large" />
          <Text style={styles.loadingText}>Buscando sua localização...</Text>
        </View>
      )}

      {!loading && Platform.OS === 'web' && (
        <View style={styles.centro}>
          <Text style={styles.erroText}>Mapa não disponível na versão web</Text>
          <Text style={styles.subText}>Use a versão mobile para visualizar o mapa</Text>
        </View>
      )}

      {!loading && localizacao && Platform.OS !== 'web' && (
        <>
          {/* Debug info */}
          <View style={{ position: 'absolute', top: 100, left: 10, backgroundColor: 'rgba(0,0,0,0.8)', padding: 10, borderRadius: 4, zIndex: 10 }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>🎯 Entregas carregadas: {entregasComCoordenadas.length}</Text>
            <Text style={{ color: '#fff', fontSize: 12 }}>📍 Localização: {localizacao?.latitude.toFixed(4)}, {localizacao?.longitude.toFixed(4)}</Text>
          </View>

          <MapView
            style={styles.mapa}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: localizacao.latitude,
              longitude: localizacao.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {/* Marker da localização do usuário */}
            <Marker
              coordinate={{ latitude: localizacao.latitude, longitude: localizacao.longitude }}
              title="Você está aqui"
              description="Sua posição atual"
              pinColor={cores.azul}
            />

            {/* Markers das entregas */}
            {entregasComCoordenadas.map((entrega) => {
              if (!entrega.coordenadasOrigem) return null;

              const isDisponivel = entrega.usuarioId === null && entrega.status === 'disponivel';
              const isAceita = entrega.usuarioId !== null && entrega.status === 'disponivel';
              const isEntregue = entrega.status === 'entregue';

              let pinColor = '#6B7280'; // Cinza para entregue (padrão)
              let statusText = 'Entrega Entregue';

              if (isDisponivel) {
                pinColor = '#3B82F6'; // Azul para disponível
                statusText = 'Entrega Disponível';
              } else if (isAceita) {
                pinColor = '#10B981'; // Verde para aceita
                statusText = 'Entrega Aceita';
              }

              return (
                <Marker
                  key={`${entrega.id}-${entrega.usuarioId}`}
                  coordinate={{
                    latitude: entrega.coordenadasOrigem.latitude,
                    longitude: entrega.coordenadasOrigem.longitude,
                  }}
                  title={`${statusText} - ${entrega.id}`}
                  description={`R$ ${entrega.valor.toFixed(2)} • ${entrega.distanciaKm}km • ${entrega.tempoEstimadoMin}min`}
                  pinColor={pinColor}
                />
              );
            })}
          </MapView>
        </>
      )}

      {!loading && !localizacao && Platform.OS !== 'web' && (
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
  subText: { color: cores.textoFraco, fontSize: 13, textAlign: 'center', paddingHorizontal: 40 },
});
