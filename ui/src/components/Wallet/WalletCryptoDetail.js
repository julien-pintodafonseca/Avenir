import React from 'react';
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

// import Header from '../Custom/Header';

// fetch de crypto selon le route.params.cryptoId
const Crypto = {
  id: 1,
  stockSymbol: 'BTC',
  fullname: 'Bitcoin',
  symbol: 'U+20BF',
  amount: 10,
  amountConverted: 272727,
};

const WalletCryptoDetail = ({route, navigation}) => {
  return (
    <Container style={styles.bgColor}>
      <Header style={styles.headerBanner}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={styles.headerIcon} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={styles.title}>Amount</Title>
        </Body>
        <Right />
      </Header>
      <Container style={{backgroundColor: '#303030', margin: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.subtitle}>{Crypto.stockSymbol}</Text>
          <Text style={styles.subtitle}>{Crypto.fullname}</Text>
        </View>
        <View>
          <Form>
            <Item>
              <Input
                style={{color: '#FFF'}}
                placeholder="Amount"
                value={`${Crypto.amount}`}
              />
            </Item>
          </Form>
          <Button
            onPress={() => {
              console.log('pressed');
              navigation.goBack();
            }}
            block
            style={styles.button}>
            <Text style={{color: '#FFF'}}>Confirm</Text>
          </Button>
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
  headerIcon: {color: '#FF7F50'},
  title: {
    color: '#FF7F50',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {fontSize: 30, color: '#FFF', fontWeight: 'bold'},
  button: {margin: 15, marginTop: 25, backgroundColor: '#FF7F50'},
});

export default WalletCryptoDetail;
