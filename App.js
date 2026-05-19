import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar
} from 'react-native';

import axios from 'axios';

const moedas = [
  { codigo: 'USD', nome: 'Dólar Americano' },
  { codigo: 'EUR', nome: 'Euro' },
  { codigo: 'GBP', nome: 'Libra Esterlina' },
  { codigo: 'ARS', nome: 'Peso Argentino' },
  { codigo: 'BTC', nome: 'Bitcoin' },
];

export default function App() {

  const [moedaSelecionada, setMoedaSelecionada] = useState('USD');
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);

  async function buscarCotacao() {

    setLoading(true);

    try {

      const response = await axios.get(
        `https://economia.awesomeapi.com.br/json/last/${moedaSelecionada}-BRL`
      );

      const chave = `${moedaSelecionada}BRL`;

      setDados(response.data[chave]);

    } catch (error) {
      alert('Erro ao buscar cotação');
    }

    setLoading(false);
  }

  useEffect(() => {
    buscarCotacao();
  }, [moedaSelecionada]);

  return (

    <ScrollView contentContainerStyle={styles.container}>

      <StatusBar barStyle="light-content" />

      <View style={styles.bordaTitulo}>
        <Text style={styles.titulo}>
           Fncotas$
    </Text>
      </View>

      <Text style={styles.subtitulo}>
         Atualizados em tempo real
      </Text>

      <View style={styles.areaMoedas}>

        {moedas.map((item) => (

          <TouchableOpacity
            key={item.codigo}
            style={[
              styles.botaoMoeda,
              moedaSelecionada === item.codigo &&
              styles.botaoSelecionado
            ]}
            onPress={() => setMoedaSelecionada(item.codigo)}
          >

            <Text style={styles.codigo}>
              {item.codigo}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {loading ? (

        <ActivityIndicator
          size="large"
          color="#ff4fd8"
          style={{ marginTop: 40 }}
        />

      ) : (

        dados && (

          <View style={styles.card}>

            <View style={styles.bordaNome}>
              <Text style={styles.nomeMoeda}>
                {dados.name}
              </Text>
            </View>

            <View style={styles.infoBox}>

              <Text style={styles.label}>
                Valor Atual
              </Text>

              <Text style={styles.valor}>
                R$ {Number(dados.bid).toFixed(2)}
              </Text>

            </View>

            <View style={styles.linha}>

              <View style={styles.miniCard}>

                <Text style={styles.label}>
                  Máxima
                </Text>

                <Text style={styles.miniValor}>
                  R$ {Number(dados.high).toFixed(2)}
                </Text>

              </View>

              <View style={styles.miniCard}>

                <Text style={styles.label}>
                  Mínima
                </Text>

                <Text style={styles.miniValor}>
                  R$ {Number(dados.low).toFixed(2)}
                </Text>

              </View>

            </View>

            <View style={styles.infoBox}>

              <Text style={styles.label}>
                Última atualização
              </Text>

              <Text style={styles.atualizacao}>
                {dados.create_date}
              </Text>

            </View>

          </View>

        )

      )}

      <TouchableOpacity
        style={styles.botaoAtualizar}
        onPress={buscarCotacao}
      >

        <Text style={styles.textoAtualizar}>
          Atualizar Cotação
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20
  },

  bordaTitulo: {
    borderWidth: 3,
    borderColor: '#ff4fd8',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 20,
    backgroundColor: '#3b1f3d'
  },

  titulo: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  subtitulo: {
    color: '#ffc8f4',
    marginBottom: 40,
    fontSize: 16
  },

  areaMoedas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10
  },

  botaoMoeda: {
    width: 90,
    height: 90,
    backgroundColor: '#31f3d',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff4fd8'
  },

  botaoSelecionado: {
    backgroundColor: '#5a2a5c',
    borderColor: '#ff9cec'
  },

  codigo: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },

  card: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 25,
    marginTop: 40,
    borderWidth: 2,
    borderColor: '#ff4fd8'
  },

  bordaNome: {
    borderWidth: 2,
    borderColor: '#ff4fd8',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    alignItems: 'center',
    backgroundColor: '#000'
  },

  nomeMoeda: {
    color: '#ff4fd8',
    fontSize: 24,
    fontWeight: 'bold'
  },

  infoBox: {
    backgroundColor: '#000',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ff4fd8'
  },

  label: {
    color: '#ffc8f4',
    fontSize: 14
  },

  valor: {
    color: '#ff4fd8',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  miniCard: {
    width: '48%',
    backgroundColor: '#2d1b2e',
    borderRadius: 18,
    padding: 18,
    borderWidth: 2,
    borderColor: '#ff4fd8'
  },

  miniValor: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },

  atualizacao: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 16
  },

  botaoAtualizar: {
    marginTop: 30,
    backgroundColor: '#ff4fd8',
    width: '100%',
    padding: 18,
    borderRadius: 18
  },

  textoAtualizar: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff'
  }

});