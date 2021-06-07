/* eslint-disable no-alert, react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
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
import Header from '../Custom/Header';
import {AuthContext} from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListingScreen = ({navigation, route}) => {
  const {BACKEND} = useContext(AuthContext);
  const [Cryptos, setCryptos] = useState([]);

  async function getCryptos(tkn) {
    return fetch(`${BACKEND}/api/cryptocurrency`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', authorization: tkn},
    })
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          setCryptos(
            data.data.map((CryptoItem, index) => ({
              key: `${index}`,
              id: CryptoItem.id_cryptocurrency,
              stockSymbol: CryptoItem.symbol,
              fullname: CryptoItem.name,
              link: `https://s2.coinmarketcap.com/static/img/coins/64x64/${CryptoItem.id_cryptocurrency}.png`,
              rawValue: CryptoItem.price.toFixed(2),
              variation: CryptoItem.percent_change_1h.toFixed(2),
            })),
          );
          return;
        }
        alert(data.error);
      })
      .catch(error => alert(error));
  }

  async function getCryptosWallet(tkn) {
    return fetch(`${BACKEND}/api/wallet/symbols`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', authorization: tkn},
    })
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          setCryptos(
            data.data.map((CryptoItem, index) => ({
              key: `${index}`,
              id: CryptoItem.id,
              stockSymbol: CryptoItem.symbol,
              fullname: CryptoItem.name,
              link: `https://s2.coinmarketcap.com/static/img/coins/64x64/${CryptoItem.id}.png`,
            })),
          );
          return;
        }
        alert(data.error);
      })
      .catch(error => alert(error));
  }

  useEffect(() => {
    const init = async () => {
      await AsyncStorage.getItem('@userToken').then(data => {
        if (route.params) {
          getCryptosWallet(JSON.parse(data));
        } else {
          getCryptos(JSON.parse(data));
        }
      });
    };
    init();
  }, [navigation]);

  const Item = ({id, stockSymbol, fullname, link, rawValue, variation}) => (
    <View>
      <TouchableHighlight
        style={styles.rowFrontVisible}
        onPress={() => {
          if (route.params) {
            navigation.navigate('WalletListingAddAmount', {
              AddCryptoRoute: true,
              idCrypto: id,
              stockSymbol,
              fullname,
            });
          } else {
            navigation.navigate('CryptoDetail', {
              idCrypto: id,
              stockSymbol,
              fullname,
              rawValue,
              variation,
              link,
            });
          }
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
          {!route.params && (
            <View style={{marginLeft: 'auto', width: 100}}>
              <Text style={styles.rawValue} numberOfLines={1}>
                {rawValue}$
              </Text>
              <Text
                style={variation >= 0 ? {color: 'green'} : {color: 'red'}}
                numberOfLines={1}>
                {variation}%
              </Text>
            </View>
          )}
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
      <Header
        navigation={route.params ? navigation : ''}
        title={route.params ? 'Choose Crypto' : 'Markets'}
      />
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
