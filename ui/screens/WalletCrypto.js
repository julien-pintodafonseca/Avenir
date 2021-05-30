import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  Icon,
  Button,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Form, 
  Item,
  Input,
} from 'native-base';

// fetch de crypto selon le route.params.cryptoId
const Crypto = {
  id: 1,
  stockSymbol: 'BTC',
  fullname: 'Bitcoin',
  symbol: 'U+20BF',
  amount: 10,
  amountConverted: 272727,
};

const WalletCrypto = ({route, navigation}) => {
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
            Amount
          </Title>
        </Body>
        <Right />
      </Header>
      <Container style={{backgroundColor: 'black', margin: 10}}>
        <View style={{flexDirection: 'row',}}>
          <Text style={{fontSize: 30, backgroundColor:'red',color: '#FFF', fontWeight: 'bold'}}>
          {Crypto.Symbol} 
          </Text>
          <Text style={{fontSize: 30, color: '#FFF', fontWeight: 'bold'}}>
          {Crypto.stockSymbol} 
          </Text>
          <Text style={{fontSize: 30, color: '#FFF', fontWeight: 'bold'}}>
          {Crypto.fullname} 
          </Text>
        </View>
        <View>
          <Form>
            <Item>
              <Input style={{color: '#FFF'}} placeholder="Amount" value={`${Crypto.amount}`}/>
            </Item>
          </Form>
          <Button
            onPress={() => console.log('pressed')}
            block
            style={{margin: 15, marginTop: 25, backgroundColor: 'orange'}}>
            <Text style={{color: '#FFF'}}>Confirm</Text>
          </Button>
        </View>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default WalletCrypto;
