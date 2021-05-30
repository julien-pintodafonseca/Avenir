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
  const Item = ({
    id,
    stockSymbol,
    fullname,
    symbol,
    amount,
    amountConverted,
  }) => (
    <View>
      <TouchableHighlight
        style={styles.rowFrontVisible}
        onPress={() => {
          console.log('Element touched');
          // navigation.navigate('CryptoDetail', {cryptoId: id});
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
          <View style={{marginLeft: 'auto', width: 50}}>
            <Text style={styles.rawValue} numberOfLines={1}>
              {amount}
            </Text>
            <Text style={styles.rawValue} numberOfLines={1}>
              ${amountConverted}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      id={item.id}
      stockSymbol={item.stockSymbol}
      fullname={item.fullname}
      symbol={item.symbol}
      amount={item.amount}
      amountConverted={item.amountConverted}
    />
  );

  return (
    <Container style={{backgroundColor: 'black'}}>
      <Header
        style={{
          backgroundColor: 'black',
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
        }}>
        <Left />
        <Body>
          <Title
            style={{
              color: 'orange',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Total Balance
          </Title>
        </Body>
        <Right />
      </Header>
      <Container style={{backgroundColor: 'black', margin: 10}}>
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
            // borderBottomColor: 'gray',
            // borderBottomWidth: 1,
            // paddingBottom: 20,
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
                <Button iconRight transparent style={{marginLeft:'auto'}} onPress={() => console.log('pressed')}>
                  <Text style={{color:"#FFF", fontSize: 15, marginRight: 10}}>Add</Text>
                  <Icon style={{color: '#FFF'}} size={40} name="add-circle" />
                </Button>
            </View>
          {/* <FlatList
            data={userWallet.assets}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{backgroundColor: 'black'}}
          /> */}
          <CustomCryptoList style={{
            // height: 250,
            // borderBottomColor: 'gray',
            // borderBottomWidth: 1,
            paddingBottom: 20,
            paddingTop: 20,
            
          }}
          navigation={navigation}
          />
        </View>
        {/* <View
          style={{
            paddingTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Button
            style={{backgroundColor: 'orange'}}
            transparent
            onPress={() => console.log('pressed')}>
            <Icon style={{color: '#FFF'}} name="remove" />
          </Button>
          <Button
            style={{backgroundColor: 'orange'}}
            transparent
            onPress={() => console.log('pressed')}>
            <Icon style={{color: '#FFF'}} name="create-outline" />
          </Button>
          <Button
            style={{backgroundColor: 'orange'}}
            transparent
            onPress={() => console.log('pressed')}>
            <Icon style={{color: '#FFF'}} name="add" />
          </Button>
        </View> */}
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
