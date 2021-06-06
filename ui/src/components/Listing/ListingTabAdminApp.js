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
    return fetch(`${BACKEND}/api/admin/symbols`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', authorization: assToken},
    })
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          setListData(
            data.data.map((CryptoItem, index) => ({
              key: `${index}`,
              id: CryptoItem.id,
              stockSymbol: CryptoItem.symbol,
              fullname: CryptoItem.name,
              link: `https://s2.coinmarketcap.com/static/img/coins/64x64/${CryptoItem.id}.png`,
              is_active: CryptoItem.is_active,
            })),
          );
          return;
        }
        alert(data.error);
      })
      .catch(error => alert(error));
  }

  function update(rowItem, value) {
    fetch(`${BACKEND}/api/admin/${rowItem.id}/${value}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', authorization: token},
    })
      .then(response => response.json())
      .then(data => {
        if (data.msg === 'ok') {
          return data.msg;
        }
        alert(data.error);
      })
      .catch(error => alert({error}));
    return 'ok';
  }

  useEffect(() => {
    const init = async () => {
      await AsyncStorage.getItem('@userToken').then(data => {
        setToken(JSON.parse(data));
        return navigation.addListener('focus', () => {
          getCryptos(JSON.parse(data));
        });
      });
    };
    init();
  }, [navigation]);

  const closeRow = (rowMap, rowItem) => {
    if (rowMap[rowItem.key]) {
      rowMap[rowItem.key].closeRow();
    }
  };

  const updateRow = (rowMap, rowItem, value) => {
    if (rowMap[rowItem.key]) {
      rowMap[rowItem.key].closeRow();
      if (update(rowItem, value) === 'ok') {
        closeRow(rowMap, rowItem.key);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowItem.key);
        newData[prevIndex].is_active = value;
        setListData(newData);
      }
    }
  };

  const VisibleItem = props => {
    const {data, rowHeightAnimatedValue} = props;

    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <TouchableHighlight
          style={
            data.item.is_active
              ? styles.rowFrontVisibleGreen
              : styles.rowFrontVisibleRed
          }
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
        removeRow={() => updateRow(rowMap, data.item, 0)}
        activateRow={() => updateRow(rowMap, data.item, 1)}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onDelete,
      onAdd,
    } = props;

    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        <Animated.View
          style={[
            styles.backLeftBtn,
            styles.backleftBtnLeft,
            {
              flex: 1,
              width: rowActionAnimatedValue,
            },
          ]}>
          <TouchableOpacity
            style={[styles.backleftBtnLeft, styles.backLeftBtn]}
            onPress={onAdd}>
            <Animated.View
              style={[
                styles.trash,
                {
                  transform: [
                    {
                      scale: swipeAnimatedValue.interpolate({
                        inputRange: [45, 90],
                        outputRange: [0, -1],
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
                name="close-circle-outline"
                size={25}
                color="#fff"
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
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
        onDelete={() => updateRow(rowMap, data.item, 0)}
        onAdd={() => updateRow(rowMap, data.item, 1)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Our Crypto" />
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        leftActivationValue={100}
        rightActivationValue={-100}
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
    borderRadius: 5,
    margin: 5,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisibleRed: {
    backgroundColor: '#3F3030',
    borderRadius: 5,
    height: 60,
    padding: 10,
  },
  rowFrontVisibleGreen: {
    backgroundColor: '#303F30',
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
  backLeftBtn: {
    alignItems: 'flex-start',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingLeft: 17,
  },
  backleftBtnLeft: {
    backgroundColor: 'green',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
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
  imageSize: {
    width: 30,
    height: 30,
  },
  cryptoName: {marginLeft: 20, width: 70},
});
