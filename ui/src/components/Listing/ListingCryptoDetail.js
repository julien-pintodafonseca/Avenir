/* eslint-disable no-alert, react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {Text, StyleSheet, Image, Dimensions} from 'react-native';
import {Container, View} from 'native-base';

import Header from '../Custom/Header';
import LineChart from '../LineChart';
// fetch de crypto selon le route.params.cryptoId
const Crypto = {
  id: 1,
  stockSymbol: 'BTC',
  fullname: 'Bitcoin',
  graph: 'pathtograph',
  rawValue: 25,
  variation: 2,
};

import {AuthContext} from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CryptoDetail = ({route, navigation}) => {
  const {BACKEND} = useContext(AuthContext);
  const {idCrypto, stockSymbol, fullname, link, rawValue, variation} =
    route.params;
  const [lineData, setLineData] = useState(null);
  const [token, setToken] = useState('');
  const getCryptoDetails = tkn => {
    return fetch(`${BACKEND}/api/cryptocurrency/${idCrypto}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', authorization: tkn},
    })
      .then(response => response.json())
      .then(res => {
        if (res.list_time && res.list_price) {
          const data = res.list_price;
          setLineData({
            labels: res.list_time,
            datasets: [{data, strokeWidth: 5}],
          });
          return;
        }
        alert(res.error);
      })
      .catch(error => alert(error));
  };

  useEffect(() => {
    const init = async () => {
      await AsyncStorage.getItem('@userToken').then(data => {
        setToken(JSON.parse(data));
      });
    };
    init();
  }, []);

  useEffect(() => {
    if (token) {
      getCryptoDetails(token);
    }
  }, [token]);

  return (
    <Container style={styles.bgColor}>
      <Header navigation={navigation} title={stockSymbol + ' ' + fullname} />
      <Container
        style={{
          backgroundColor: '#303030',
          margin: 10,
          flexDirection: 'column',
        }}>
        <Text style={styles.cryptoValue}>$ {rawValue}</Text>
        <Text
          style={variation >= 0 ? styles.varValueGreen : styles.varValueRed}>
          {Crypto.variation >= 0
            ? '+ ' + Crypto.variation
            : '- ' + Crypto.variation}
          %
        </Text>
        {lineData && <LineChart line={lineData} />}
        <View
          style={{
            marginHorizontal: Dimensions.get('window').width * 0.4,
            marginVertical: Dimensions.get('window').height * 0.1,
          }}>
          <Image
            source={{uri: link}}
            style={{
              width: 60,
              height: 60,
            }}
          />
        </View>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  bgColor: {backgroundColor: '#303030'},
  headerBanner: {
    backgroundColor: '#303030',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  title: {
    color: '#FF7F50',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cryptoValue: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  varValueRed: {
    color: 'red',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
  },
  varValueGreen: {
    color: 'green',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
  },
});

export default CryptoDetail;
