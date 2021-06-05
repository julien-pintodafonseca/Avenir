import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import {CheckBox} from 'native-base';
import Header from '../Custom/Header';

const Cryptos = [
  {
    id: 1,
    stockSymbol: 'BTC',
    fullname: 'Bitcoin',
    graph: 'pathtograph',
    rawValue: 25,
    variation: 2,
  },
  {
    id: 2,
    stockSymbol: 'DOGE',
    fullname: 'Doge',
    graph: 'pathtograph',
    rawValue: 2,
    variation: 4,
  },
  {
    id: 3,
    stockSymbol: 'ETH',
    fullname: 'Etherum',
    graph: 'pathtograph',
    rawValue: 225,
    variation: 6,
  },
  {
    id: 4,
    stockSymbol: 'CHA',
    fullname: 'Chia',
    graph: 'pathtograph',
    rawValue: 12,
    variation: -1,
  },
  {
    id: 5,
    stockSymbol: 'SHBA',
    fullname: 'Shiba',
    graph: 'pathtograph',
    rawValue: 25,
    variation: -4,
  },
];

const ListingScreen = ({navigation, route}) => {
  const Item = ({
    id,
    stockSymbol,
    fullname,
    link,
    graph,
    rawValue,
    variation,
  }) => (
    <View>
      <TouchableHighlight
        style={styles.rowFrontVisible}
        onPress={() => {
          console.log('Element touched');
          console.log('setcolor to red if green ');
          console.log('setcolor to green if red');
        }}
        underlayColor={'#aaa'}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: link}}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <View style={{marginLeft: 20, width: 70}}>
            <Text style={styles.stockSymbol} numberOfLines={1}>
              {stockSymbol}
            </Text>
            <Text style={styles.fullname} numberOfLines={1}>
              {fullname}
            </Text>
          </View>
          <View style={{marginLeft: 'auto', width: 50}}>
            <CheckBox
              onPress={() => {
                console.log('Element touched');
                console.log('setcolor to red if green ');
                console.log('setcolor to green if red');
              }}
            />
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
      link={
        'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
        item.id +
        '.png'
      }
      graph={item.graph}
      rawValue={item.rawValue}
      variation={item.variation}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Our Crypto" />
      <FlatList
        data={Cryptos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
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
    backgroundColor: '#303030',
    borderRadius: 5,
    height: 60,
    padding: 10,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 2,
  },
});

export default ListingScreen;
