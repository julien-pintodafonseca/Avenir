import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
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

import CryptoDetail from './CryptoDetail';

import createStackNavigator from '@react-navigation/stack';

const Stack = createStackNavigator();

const navOptionsHandler = () => ({
  headerShown: false,
});

const ListingStack = () => {
  return (
    <Stack.Navigator initialRouteName="Listing">
      <Stack.Screen
        name="Listing"
        component={ListingScreen}
        options={navOptionsHandler}
      />
      <Stack.Screen
        name="CryptoDetail"
        component={CryptoDetail}
        options={navOptionsHandler}
      />
    </Stack.Navigator>
  );
};

const Cryptos = [
  {
    id: 1,
    stockSymbol: 'BTC',
    fullname: 'Bitcoin',
    symbol: 'U+20BF',
    graph: 'pathtograph',
    rawValue: 25,
    variation: 2,
  },
  {
    id: 2,
    stockSymbol: 'DOGE',
    symbol: 'U+20BF',
    fullname: 'Doge',
    graph: 'pathtograph',
    rawValue: 2,
    variation: 4,
  },
  {
    id: 3,
    stockSymbol: 'ETH',
    fullname: 'Etherum',
    symbol: 'U+20BF',
    graph: 'pathtograph',
    rawValue: 225,
    variation: 6,
  },
  {
    id: 4,
    stockSymbol: 'CHA',
    fullname: 'Chia',
    symbol: 'U+20BF',
    graph: 'pathtograph',
    rawValue: 12,
    variation: -1,
  },
  {
    id: 5,
    stockSymbol: 'SHBA',
    fullname: 'Shiba',
    symbol: 'U+20BF',
    graph: 'pathtograph',
    rawValue: 25,
    variation: -4,
  },
];

const ListingScreen = ({navigation}) => {
  const [listData, setListData] = useState(
    Cryptos.map((CryptoItem, index) => ({
      key: `${index}`,
      stockSymbol: CryptoItem.stockSymbol,
      fullname: CryptoItem.fullname,
      symbol: CryptoItem.symbol,
      graph: CryptoItem.graph,
      rawValue: CryptoItem.rawValue,
      variation: CryptoItem.variation,
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
            navigation.navigate('CryptoDetail', {item: data.item.key});
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
              {data.item.symbol}
            </Text>
            <View style={{marginLeft: 20, width: 70}}>
              <Text style={styles.stockSymbol} numberOfLines={1}>
                {data.item.stockSymbol}
              </Text>
              <Text style={styles.fullname} numberOfLines={1}>
                {data.item.fullname}
              </Text>
            </View>
            <Text
              style={{backgroundColor: 'red', marginLeft: 20, width: 100}}
              numberOfLines={1}>
              {data.item.graph}
            </Text>
            <View style={{marginLeft: 'auto', width: 50}}>
              <Text style={styles.rawValue} numberOfLines={1}>
                {data.item.rawValue}$
              </Text>
              <Text
                style={
                  data.item.variation >= 0 ? {color: 'green'} : {color: 'red'}
                }
                numberOfLines={1}>
                {data.item.variation}%
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
      <StatusBar barStyle="dark-content" />
      {/* <StatusBar backgroundColor="#FF6347" barStyle="light-content"/> */}
      <Header style={{backgroundColor: 'black'}}>
        {/* <Left/> */}
        <Body>
          <Title
            style={{
              color: 'orange',
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            Markets
          </Title>
        </Body>
        <Right />
      </Header>

      <Header
        searchBar
        rounded
        style={{
          backgroundColor: 'black',
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          margin: 5,
          paddingBottom: 20,
        }}>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
        <Btn transparent>
          <Text>Search</Text>
        </Btn>
      </Header>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        disableLeftSwipe
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
        style={{backgroundColor: 'black'}}
      />
    </View>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#000000',
    borderRadius: 5,
    height: 60,
    margin: 5,
    // marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#000000',
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
  },
  fullname: {
    fontSize: 12,
    color: '#999',
  },
});
