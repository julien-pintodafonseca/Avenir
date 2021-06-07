/* eslint-disable no-alert, react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {Container, Icon, Button} from 'native-base';
import CustomCryptoList from './WalletListing';

import Header from '../Custom/Header';
import {AuthContext} from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletView = ({navigation}) => {
  const {BACKEND} = useContext(AuthContext);
  const [listData, setListData] = useState({});
  const [sum, setSum] = useState('');
  const [token, setToken] = useState('');

  // it retrieves the user's wallet and calculate the total value it holds
  const getWalletCryptoList = tkn => {
    return fetch(`${BACKEND}/api/wallet`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', authorization: tkn},
    })
      .then(response => response.json())
      .then(data => {
        if (data.data.length !== 0) {
          setListData(
            data.data.map((CryptoItem, index) => ({
              key: `${index}`,
              id: CryptoItem.id,
              stockSymbol: CryptoItem.symbol,
              fullname: CryptoItem.name,
              link: `https://s2.coinmarketcap.com/static/img/coins/64x64/${CryptoItem.id}.png`,
              quantity: CryptoItem.quantity,
              amount: Math.round(CryptoItem.price * 100) / 100,
              amountConverted: Math.round(CryptoItem.total * 100) / 100,
            })),
          );
          setSum(
            Math.round(
              data.data
                .map(item => item.total)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                ) * 100,
            ) / 100,
          );
          return;
        } else {
          setSum(0);
        }
      })
      .catch(error => alert(error));
  };

  useEffect(async () => {
    await AsyncStorage.getItem('@userToken').then(data => {
      setToken(JSON.parse(data));
      return navigation.addListener('focus', () => {
        getWalletCryptoList(JSON.parse(data));
      });
    });
  }, [navigation]);

  useEffect(() => {
    if (token) {
      getWalletCryptoList(token);
    }
  }, [token]);

  return (
    <Container style={styles.bgColor}>
      <Header title={'Balance'} />
      <Container style={{backgroundColor: '#303030', margin: 10}}>
        {/* <View style={styles.walletAsset}>
          <Text style={styles.subtitle}>Asset Allocation</Text>
          <Text style={styles.tmpText}> path to graph</Text>
        </View> */}
        <View style={styles.walletListing}>
          <View style={styles.walletListingBanner}>
            <Text style={styles.subtitle}>Total Assets</Text>
            <Text
              style={[
                styles.subtitle,
                {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  marginLeft: 30,
                },
              ]}>
              {sum}
            </Text>
            <Button
              iconRight
              transparent
              style={{marginLeft: 'auto'}}
              onPress={() => {
                navigation.navigate('WalletListingAdd', {AddCryptoRoute: true});
              }}>
              <Text style={styles.walletAddText}>Add</Text>
              <Icon style={styles.addIcon} size={40} name="add-circle" />
            </Button>
          </View>
          <CustomCryptoList
            style={styles.walletList}
            navigation={navigation}
            listData={listData}
            setListData={setListData}
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
    fontFamily: 'Helvetica',
  },
  rawValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF',
    fontFamily: 'Helvetica',
  },
  fullname: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Helvetica',
  },
  rowFrontVisible: {
    backgroundColor: '#000000',
    borderRadius: 5,
    height: 60,
    padding: 10,
  },
  general: {
    backgroundColor: '#303030',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  title: {
    color: '#FF7F50',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  walletAsset: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  tmpText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    height: 200,
    fontFamily: 'Helvetica',
  },
  subtitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  walletListing: {
    height: Dimensions.get('window').height * 0.7,
    paddingTop: 20,
  },
  walletListingBanner: {flexDirection: 'row', alignItems: 'center'},
  walletAddText: {color: '#FFF', fontSize: 15, marginRight: 10},
  addIcon: {color: '#FFF'},
  walletList: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  bgColor: {backgroundColor: '#303030'},
});

export default WalletView;
