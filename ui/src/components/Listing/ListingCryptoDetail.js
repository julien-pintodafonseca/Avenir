import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Container} from 'native-base';

import Header from '../Custom/Header';

// fetch de crypto selon le route.params.cryptoId
const Crypto = {
  id: 1,
  stockSymbol: 'BTC',
  fullname: 'Bitcoin',
  graph: 'pathtograph',
  rawValue: 25,
  variation: 2,
};

const CryptoDetail = ({route, navigation}) => {
  return (
    <Container style={styles.bgColor}>
      <Header navigation={navigation} title={Crypto.fullname} />
      <Container
        style={{
          backgroundColor: '#303030',
          margin: 10,
          flexDirection: 'column',
        }}>
        <Text style={styles.cryptoValue}>$ {Crypto.rawValue}</Text>
        <Text
          style={
            Crypto.variation >= 0 ? styles.varValueGreen : styles.varValueRed
          }>
          {Crypto.variation >= 0
            ? '+ ' + Crypto.variation
            : '- ' + Crypto.variation}
          %
        </Text>
        <Text style={{backgroundColor: 'white'}}>{Crypto.graph}</Text>
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