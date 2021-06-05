import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Button,
} from 'native-base';
import CustomCryptoList from './WalletListing';
// fetch de user selon l'iduser
const userWallet = {
  id: 1,
  totalAssets: 2034,
  assets: [
    {
      id: 1,
      stockSymbol: 'BTC',
      fullname: 'Bitcoin',
      symbol: 'U+20BF',
      amount: 10,
      amountConverted: 272727,
    },
    {
      id: 2,
      stockSymbol: 'ETH',
      fullname: 'ether',
      symbol: 'U+20BF',
      amount: 20,
      amountConverted: 272,
    },
    {
      id: 3,
      stockSymbol: 'doge',
      fullname: 'doge',
      symbol: 'U+20BF',
      amount: 20,
      amountConverted: 272,
    },
  ],
};

const WalletView = ({navigation}) => {
  return (
    <Container style={{backgroundColor: '#303030'}}>
      <Header
        style={{
          backgroundColor: '#303030',
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
        }}>
        <Left />
        <Body>
          <Title
            style={{
              color: '#FF7F50',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Total Balance
          </Title>
        </Body>
        <Right />
      </Header>
      <Container style={{backgroundColor: '#303030', margin: 10}}>
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Asset Allocation
          </Text>
          <Text
            style={{
              color: '#FFF',
              fontSize: 20,
              fontWeight: 'bold',
              height: 200,
            }}>
            {' '}
            path to graph
          </Text>
        </View>
        <View
          style={{
            height: 250,
            paddingTop: 20,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                fontWeight: 'bold',
                paddingBottom: 30,
              }}>
              Assets
            </Text>
            <Button
              iconRight
              transparent
              style={{marginLeft: 'auto'}}
              onPress={() => {
                console.log('pressed');
                navigation.navigate('WalletListingAdd', {AddCryptoRoute: true});
              }}>
              <Text style={{color: '#FFF', fontSize: 15, marginRight: 10}}>
                Add
              </Text>
              <Icon style={{color: '#FFF'}} size={40} name="add-circle" />
            </Button>
          </View>
          <CustomCryptoList
            style={{
              paddingBottom: 20,
              paddingTop: 20,
            }}
            navigation={navigation}
          />
        </View>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF',
  },
  rawValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF',
  },
  fullname: {
    fontSize: 12,
    color: '#999',
  },
  rowFrontVisible: {
    backgroundColor: '#000000',
    borderRadius: 5,
    height: 60,
    padding: 10,
  },
});

export default WalletView;
