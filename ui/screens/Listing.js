import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  Left,
  Header,
  Body,
  Right,
  Title,
  Icon,
  Input,
  Button,
  Item as Itm,
} from 'native-base';

const Cryptos = [
  {
    id: 1,
    stockSymbol: 'BTC',
    fullname: 'Bitcoin',
    symbol: 'U+20BF',
    graph: 'pathtograph',
    rawValue: 25,
    variation: 2,
  },
  {
    id: 2,
    stockSymbol: 'DOGE',
    symbol: 'U+20BF',
    fullname: 'Doge',
    graph: 'pathtograph',
    rawValue: 2,
    variation: 4,
  },
  {
    id: 3,
    stockSymbol: 'ETH',
    fullname: 'Etherum',
    symbol: 'U+20BF',
    graph: 'pathtograph',
    rawValue: 225,
    variation: 6,
  },
  {
    id: 4,
    stockSymbol: 'CHA',
    fullname: 'Chia',
    symbol: 'U+20BF',
    graph: 'pathtograph',
    rawValue: 12,
    variation: -1,
  },
  {
    id: 5,
    stockSymbol: 'SHBA',
    fullname: 'Shiba',
    symbol: 'U+20BF',
    graph: 'pathtograph',
    rawValue: 25,
    variation: -4,
  },
];

const ListingScreen = ({navigation}) => {
  const Item = ({
    id,
    stockSymbol,
    fullname,
    symbol,
    graph,
    rawValue,
    variation,
  }) => (
    <View>
      <TouchableHighlight
        style={styles.rowFrontVisible}
        onPress={() => {
          console.log('Element touched');
          navigation.navigate('CryptoDetail', {cryptoId: id});
        }}
        underlayColor={'#aaa'}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              backgroundColor: 'yellow',
              width: 30,
              height: 30,
              marginLeft: 10,
            }}
            numberOfLines={1}>
            {symbol}
          </Text>
          <View style={{marginLeft: 20, width: 70}}>
            <Text style={styles.stockSymbol} numberOfLines={1}>
              {stockSymbol}
            </Text>
            <Text style={styles.fullname} numberOfLines={1}>
              {fullname}
            </Text>
          </View>
          <Text
            style={{backgroundColor: 'red', marginLeft: 20, width: 100}}
            numberOfLines={1}>
            {graph}
          </Text>
          <View style={{marginLeft: 'auto', width: 50}}>
            <Text style={styles.rawValue} numberOfLines={1}>
              {rawValue}$
            </Text>
            <Text
              style={variation >= 0 ? {color: 'green'} : {color: 'red'}}
              numberOfLines={1}>
              {variation}%
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      title={item.title}
      id={item.id}
      stockSymbol={item.stockSymbol}
      fullname={item.fullname}
      symbol={item.symbol}
      graph={item.graph}
      rawValue={item.rawValue}
      variation={item.variation}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header style={{backgroundColor: 'black'}}>
        <Left />
        <Body>
          <Title
            style={{
              color: 'orange',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Markets
          </Title>
        </Body>
        <Right />
      </Header>

      <Header
        searchBar
        rounded
        style={{
          backgroundColor: 'black',
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          margin: 5,
          paddingBottom: 20,
        }}>
        <Itm>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Itm>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <FlatList
        data={Cryptos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{backgroundColor: 'black'}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
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

export default ListingScreen;
