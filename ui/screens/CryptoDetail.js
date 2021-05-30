import React, {useState} from 'react';
import {
  Text
} from 'react-native';
import {
  Icon,
  Button,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';

const Crypto = {
  id: 1,
  stockSymbol: 'BTC',
  fullname: 'Bitcoin',
  symbol: 'U+20BF',
  graph: 'pathtograph',
  rawValue: 25,
  variation: 2,
};

const CryptoDetail = ({route, navigation}) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>CryptoDetail n°{route.params.cryptoId}</Title>
        </Body>
        <Right />
      </Header>
      <Text>CryptoDetail</Text>
      <Button title="Click" onPress={() => alert('button clicked')} />
    </Container>
  );
};
export default CryptoDetail;
