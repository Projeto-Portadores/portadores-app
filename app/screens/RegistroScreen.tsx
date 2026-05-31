import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { cores } from '../theme';

const BASE_URL = 'http://10.0.2.2:3000';
// const BASE_URL = 'http://localhost:3000'; // iOS simulator

type TipoPerfil = 'Entregador' | 'Cliente';

export default function RegistroScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoPerfil, setTipoPerfil] = useState<TipoPerfil>('Entregador');
  const [loading, setLoading] = useState(false);

  // Erros de validação
  const [erros, setErros] = useState({ nome: '', data: '', email: '', senha: '' });

  function validar() {
    const novosErros = { nome: '', data: '', email: '', senha: '' };
    let valido = true;

    if (!nome.trim()) { novosErros.nome = 'Nome obrigatório.'; valido = false; }
    if (dataNascimento.length < 10) { novosErros.data = 'Data inválida.'; valido = false; }
    if (!email.includes('@')) { novosErros.email = 'E-mail inválido.'; valido = false; }
    if (senha.length < 6) { novosErros.senha = 'Mínimo 6 caracteres.'; valido = false; }

    setErros(novosErros);
    return valido;
  }

  function handleData(text: string) {
    const nums = text.replace(/\D/g, '').slice(0, 8);
    let masked = nums;
    if (nums.length > 2) masked = nums.slice(0, 2) + '/' + nums.slice(2);
    if (nums.length > 4) masked = nums.slice(0, 2) + '/' + nums.slice(2, 4) + '/' + nums.slice(4);
    setDataNascimento(masked);
  }

  async function cadastrar() {
    if (!validar()) return;

    setLoading(true);
    try {
      const resposta = await fetch(`${BASE_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, dataNascimento, email, senha, tipoPerfil }),
      });

      if (resposta.ok) {
        Alert.alert('Sucesso!', 'Cadastro realizado!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar. Tente novamente.');
      }
    } catch {
      Alert.alert('Erro', 'Sem conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <Image
          source={require('../assets/images/portadores_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>PORTADORES</Text>
        <Text style={styles.pageTitle}>Primeiro Acesso</Text>

        <Input label="Nome Completo"       valor={nome}           onChange={setNome}           erro={erros.nome} />
        <Input label="Data de Nascimento"  valor={dataNascimento} onChange={handleData}         erro={erros.data} placeholder="DD/MM/AAAA" teclado="numeric" maxCaracteres={10} />
        <Input label="E-mail"              valor={email}          onChange={setEmail}           erro={erros.email} teclado="email-address" />
        <Input label="Senha"               valor={senha}          onChange={setSenha}           erro={erros.senha} senha />

        <Text style={styles.label}>Tipo de perfil</Text>
        <View style={styles.perfilRow}>
          {(['Entregador', 'Cliente'] as TipoPerfil[]).map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[styles.perfilBtn, tipoPerfil === tipo && styles.perfilBtnAtivo]}
              onPress={() => setTipoPerfil(tipo)}
            >
              <Text style={[styles.perfilText, tipoPerfil === tipo && styles.perfilTextAtivo]}>
                {tipo}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <Button texto="Voltar"  onPress={() => navigation.goBack()} cor="laranja" />
        <Button texto="Seguir"  onPress={cadastrar}                  loading={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  scroll: { alignItems: 'center', paddingHorizontal: 36, paddingTop: 52, paddingBottom: 16 },
  logo: { width: 90, height: 90 },
  appName: { color: cores.textoClaro, fontSize: 12, fontWeight: '700', letterSpacing: 3, marginTop: 4 },
  pageTitle: { color: cores.textoBranco, fontSize: 26, fontWeight: '700', marginTop: 20, marginBottom: 8 },
  label: { color: cores.textoClaro, fontSize: 14, fontWeight: '600', alignSelf: 'flex-start', marginTop: 14, marginBottom: 6 },
  perfilRow: { flexDirection: 'row', gap: 12, alignSelf: 'flex-start', marginTop: 8 },
  perfilBtn: { borderWidth: 1.5, borderColor: '#4a5a7a', borderRadius: 20, paddingVertical: 7, paddingHorizontal: 22 },
  perfilBtnAtivo: { backgroundColor: cores.azul, borderColor: cores.azul },
  perfilText: { color: cores.textoFraco, fontSize: 13, fontWeight: '600' },
  perfilTextAtivo: { color: cores.textoBranco },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    backgroundColor: cores.fundo,
  },
});
