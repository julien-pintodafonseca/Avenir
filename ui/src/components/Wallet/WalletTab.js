import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Container, Icon, Button} from 'native-base';
import CustomCryptoList from './WalletListing';

import Header from '../Custom/Header';
// fetch de user selon l'iduser
// const userWallet = {
//   id: 1,
//   totalAssets: 2034,
//   assets: [
//     {
//       id: 1,
//       stockSymbol: 'BTC',
//       fullname: 'Bitcoin',
//       symbol: 'U+20BF',
//       amount: 10,
//       amountConverted: 272727,
//     },
//     {
//       id: 2,
//       stockSymbol: 'ETH',
//       fullname: 'ether',
//       symbol: 'U+20BF',
//       amount: 20,
//       amountConverted: 272,
//     },
//     {
//       id: 3,
//       stockSymbol: 'doge',
//       fullname: 'doge',
//       symbol: 'U+20BF',
//       amount: 20,
//       amountConverted: 272,
//     },
//   ],
// };

const WalletView = ({navigation}) => {
  return (
    <Container style={styles.bgColor}>
      <Header title="Total Balance" />
      <Container style={{backgroundColor: '#303030', margin: 10}}>
        <View style={styles.walletAsset}>
          <Text style={styles.subtitle}>Asset Allocation</Text>
          <Text style={styles.tmpText}> path to graph</Text>
        </View>
        <View style={styles.walletListing}>
          <View style={styles.walletListingBanner}>
            <Text style={styles.subtitle}>Assets</Text>
            <Button
              iconRight
              transparent
              style={{marginLeft: 'auto'}}
              onPress={() => {
                console.log('pressed');
                navigation.navigate('WalletListingAdd', {AddCryptoRoute: true});
              }}>
              <Text style={styles.walletAddText}>Add</Text>
              <Icon style={styles.addIcon} size={40} name="add-circle" />
            </Button>
          </View>
          <CustomCryptoList style={styles.walletList} navigation={navigation} />
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
  general: {
    backgroundColor: '#303030',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  title: {
    color: '#FF7F50',
    fontSize: 20,
    fontWeight: 'bold',
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
  },
  subtitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  walletListing: {
    height: 250,
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
