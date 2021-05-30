import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Header, Left, Body, Right, Title} from 'native-base';
const WalletView = ({navigation}) => {
  return (
    <View>
      <Header>
        <Left />
        <Body>
          <Title>Wallet</Title>
        </Body>
        <Right />
      </Header>
      <Text>Wallet</Text>
      <Button title="Click" onPress={() => alert('button clicked')} />
    </View>
  );
};
export default WalletView;
