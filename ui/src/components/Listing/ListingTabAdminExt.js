/* eslint-disable no-alert, react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../Custom/Header';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ListingScreen = ({navigation}) => {
  const [listData, setListData] = useState({});
  const {BACKEND} = useContext(AuthContext);
  const [token, setToken] = useState('');

  async function getCryptos(assToken) {
    return fetch(`${BACKEND}/api/admin`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', authorization: assToken},
    })
      .then(response => response.json())
      .then(data => {
        if (data.list_crypto) {
          setListData(
            data.list_crypto.map((CryptoItem, index) => ({
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

  function saveCrypto(rowItem) {
    fetch(
      `${BACKEND}/api/admin/${rowItem.id}/${rowItem.fullname}/${rowItem.stockSymbol}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json', authorization: token},
      },
    )
      .then(response => response.json())
      .then(data => {
        if (data.msg === 'ok') {
          return data.msg;
        }
        alert(data.error);
      })
      .catch(error => alert(error));
    return 'ok';
  }
  useEffect(() => {
    const init = async () => {
      await AsyncStorage.getItem('@userToken').then(data => {
        setToken(JSON.parse(data));
        return getCryptos(JSON.parse(data));
      });
    };
    init();
  }, []);

  const closeRow = (rowMap, rowItem) => {
    if (rowMap[rowItem.key]) {
      rowMap[rowItem.key].closeRow();
    }
  };

  const deleteRow = (rowMap, rowItem) => {
    if (saveCrypto(rowItem) === 'ok') {
      closeRow(rowMap, rowItem.key);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowItem.key);
      newData.splice(prevIndex, 1);
      setListData(newData);
    }
  };

  const VisibleItem = props => {
    const {data, rowHeightAnimatedValue, removeRow, rightActionState} = props;
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
          underlayColor={'#aaa'}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: data.item.link}} style={styles.imageSize} />
            <View style={styles.cryptoName}>
              <Text style={styles.stockSymbol} numberOfLines={1}>
                {data.item.stockSymbol}
              </Text>
              <Text style={styles.fullname} numberOfLines={1}>
                {data.item.fullname}
              </Text>
            </View>
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
        removeRow={() => deleteRow(rowMap, data.item)}
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
                  name="plus-circle-outline"
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
        onClose={() => closeRow(rowMap, data.item)}
        onDelete={() => deleteRow(rowMap, data.item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="All Crypto" />
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
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
    fontFamily: 'Helvetica',
  },
  rowFront: {
    borderRadius: 5,
    margin: 5,
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
    backgroundColor: 'green',
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
    fontFamily: 'Helvetica',
  },
  rawValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF',
    marginLeft: 30,
    fontFamily: 'Helvetica',
  },
  fullname: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Helvetica',
  },
  imageSize: {
    width: 30,
    height: 30,
  },
  cryptoName: {marginLeft: 20, width: 70, fontFamily: 'Helvetica'},
});
