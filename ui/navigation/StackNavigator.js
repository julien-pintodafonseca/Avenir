import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CryptoDetail from '../screens/ListingCryptoDetail';
import ListingScreen from '../screens/ListingTab';
import ListingAdminAppScreen from '../screens/ListingTabAdminApp';
import ListingAdminExtScreen from '../screens/ListingTabAdminExt';
import WalletScreen from '../screens/WalletTab';
import WalletCryptoScreen from '../screens/WalletCrypto';

import ProfileScreen from '../screens/ProfileTab';

import LoginScreen from '../screens/LoginSignUp';
import SignUpScreen from '../screens/SignUp';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

const LoginStack = props => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptionStyle}>
      {/* <Stack.Screen name="Login" component={LoginScreen} onConnect={props.onConnect}/> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const ListingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Listing"
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="Listing" component={ListingScreen} />
      <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
    </Stack.Navigator>
  );
};

const ListingAdminExtStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ListingAdminExt"
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="ListingAdminExt" component={ListingAdminExtScreen} />
    </Stack.Navigator>
  );
};

const ListingAdminAppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ListingAdminApp"
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="ListingAdminApp" component={ListingAdminAppScreen} />
    </Stack.Navigator>
  );
};

const WalletStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Wallet"
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="WalletCrypto" component={WalletCryptoScreen} />
      <Stack.Screen name="WalletListingAdd" component={ListingScreen} />
      <Stack.Screen
        name="WalletListingAddAmount"
        component={WalletCryptoScreen}
      />
      {/* <Stack.Screen
        name="Listing"
        component={WalletCryptoAddScreen}
      />
      <Stack.Screen
        name="WalletCryptoAddAmount"
        component={WalletCryptoAddAmountScreen}
      /> */}
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export {
  LoginStack,
  ListingStack,
  WalletStack,
  ProfileStack,
  ListingAdminAppStack,
  ListingAdminExtStack,
};
