import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CryptoDetail from '../screens/CryptoDetail';
import ListingScreen from '../screens/Listing';
import WalletScreen from '../screens/Wallet';
import WalletCryptoScreen from '../screens/WalletCrypto';
import SettingScreen from '../screens/Setting';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

const ListingStack = () => {
  return (
    <Stack.Navigator initialRouteName="Listing" screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Listing"
        component={ListingScreen}
      />
      <Stack.Screen
        name="CryptoDetail"
        component={CryptoDetail}
      />
    </Stack.Navigator>
  );
};

const WalletStack = () => {
  return (
    <Stack.Navigator initialRouteName="Wallet" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="WalletCrypto" component={WalletCryptoScreen} />
    </Stack.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export {
  LoginStack,
  ListingStack,
  WalletStack,
  SettingStack,
};
