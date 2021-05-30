import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
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

// fetch de crypto selon le route.params.cryptoId
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
    <Container style={{backgroundColor: 'black'}}>
      <Header
        style={{
          backgroundColor: 'black',
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
        }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{color: 'orange'}} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              color: 'orange',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {Crypto.fullname}
          </Title>
        </Body>
        <Right />
      </Header>
      <Container style={{backgroundColor: 'black', margin: 10}}>
        <Text style={{fontSize: 30, color: '#FFF', fontWeight: 'bold'}}>
          ${Crypto.rawValue}
        </Text>
        <Text style={Crypto.variation >= 0 ? {color: 'green'} : {color: 'red'}}>
          {Crypto.variation}%
        </Text>
        <Text style={{backgroundColor: 'white'}}>{Crypto.graph}</Text>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default CryptoDetail;
