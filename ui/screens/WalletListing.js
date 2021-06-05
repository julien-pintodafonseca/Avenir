import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Header,
  Body,
  Right,
  Title,
  Icon,
  Item,
  Input,
  Button as Btn,
} from 'native-base';

const Cryptos = [
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
    stockSymbol: 'DOGE',
    symbol: 'U+20BF',
    fullname: 'Doge',
    amount: 10,
    amountConverted: 272727,
  },
  {
    id: 3,
    stockSymbol: 'ETH',
    fullname: 'Etherum',
    symbol: 'U+20BF',
    amount: 10,
    amountConverted: 272727,
  },
  {
    id: 4,
    stockSymbol: 'CHA',
    fullname: 'Chia',
    symbol: 'U+20BF',
    amount: 10,
    amountConverted: 272727,
  },
  {
    id: 5,
    stockSymbol: 'SHBA',
    fullname: 'Shiba',
    symbol: 'U+20BF',
    amount: 10,
    amountConverted: 272727,
  },
];

const ListingScreen = ({navigation}) => {
  const [listData, setListData] = useState(
    Cryptos.map((CryptoItem, index) => ({
      key: `${index}`,
      id: CryptoItem.id,
      stockSymbol: CryptoItem.stockSymbol,
      fullname: CryptoItem.fullname,
      link: `https://s2.coinmarketcap.com/static/img/coins/64x64/${CryptoItem.id}.png`,
      amount: CryptoItem.amount,
      amountConverted: CryptoItem.amountConverted,
    })),
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = rowKey => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };

  const VisibleItem = props => {
    const {data, rowHeightAnimatedValue, removeRow, rightActionState} = props;
    // console.log(props);
    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <TouchableHighlight
          style={styles.rowFrontVisible}
          onPress={() => {
            console.log('Element touched');
            navigation.navigate('WalletCrypto', {cryptoId: data.item.id});
          }}
          underlayColor={'#aaa'}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: data.item.link}} style={{
              width: 30,
              height: 30,
            }}/>
            <View style={{marginLeft: 20, width: 70}}>
              <Text style={styles.stockSymbol} numberOfLines={1}>
                {data.item.stockSymbol}
              </Text>
              <Text style={styles.fullname} numberOfLines={1}>
                {data.item.fullname}
              </Text>
            </View>
            {/* <View style={{marginLeft: 'auto', width: 50}}> */}
            <Text style={styles.rawValue} numberOfLines={1}>
              {data.item.amount}
            </Text>
            <Text style={styles.rawValue} numberOfLines={1}>
              ${data.item.amountConverted}
            </Text>
            {/* </View> */}
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        <Text>Left</Text>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        // disableLeftSwipe
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />
    </View>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303030',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    // backgroundColor: '#303030',
    borderRadius: 5,
    // height: 60,
    margin: 5,
    // marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#303030',
    borderRadius: 5,
    height: 60,
    padding: 10,
    // marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
    // height: 60
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
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
    marginLeft: 30,
  },
  fullname: {
    fontSize: 12,
    color: '#999',
  },
});
