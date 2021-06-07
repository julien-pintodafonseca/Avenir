/* eslint-disable no-alert, react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button, Container, Form, Item, Input} from 'native-base';

import Header from '../Custom/Header';

import {AuthContext} from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletCryptoDetail = ({route, navigation}) => {
  const {idCrypto, stockSymbol, fullname, quantity} = route.params;
  const {BACKEND} = useContext(AuthContext);
  const [amount, setAmount] = useState('0');
  const [token, setToken] = useState('');

  async function registerCrypto(tkn) {
    return fetch(`${BACKEND}/api/wallet/${idCrypto}/${amount}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', authorization: tkn},
    })
      .then(response => response.json())
      .then(data => {
        if (data.msg === 'ok') {
          return 1;
        }
        alert('Please enter a valid number (>0)');
        return 0;
      })
      .catch(error => console.log(error));
  }

  async function updateCrypto(tkn) {
    return fetch(`${BACKEND}/api/wallet/${idCrypto}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', authorization: tkn},
      body: `${JSON.stringify({amount: amount})}`,
    })
      .then(response => response.json())
      .then(data => {
        if (data.msg === 'ok') {
          return data.msg;
        }
        alert('Please enter a valid number (>0)');
      })
      .catch(error => console.log(error));
  }
  useEffect(() => {
    const init = async () => {
      await AsyncStorage.getItem('@userToken').then(data => {
        setToken(JSON.parse(data));
      });
    };
    init();
    quantity && setAmount(`${quantity}`);
  }, [navigation]);

  return (
    <Container style={styles.bgColor}>
      <Header navigation={navigation} title="Amount" />
      <Container style={{backgroundColor: '#303030', margin: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.subtitle}>
            {stockSymbol} {fullname}
          </Text>
        </View>
        <View>
          <Form>
            <Item>
              <Input
                style={{color: '#FFF', fontFamily: 'Helvetica'}}
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
              />
            </Item>
          </Form>
          <Button
            onPress={() => {
              if (route.params.AddCryptoRoute) {
                registerCrypto(token) && navigation.navigate('Wallet');
              } else {
                updateCrypto(token) && navigation.goBack();
              }
            }}
            block
            style={styles.button}>
            <Text style={{color: '#FFF', fontFamily: 'Helvetica'}}>
              Confirm
            </Text>
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
    fontFamily: 'Helvetica',
  },
  subtitle: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Helvetica',
  },
  button: {margin: 15, marginTop: 25, backgroundColor: '#FF7F50'},
});

export default WalletCryptoDetail;
