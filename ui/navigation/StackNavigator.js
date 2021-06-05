import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CryptoDetail from '../src/components/Listing/ListingCryptoDetail';
import ListingScreen from '../src/components/Listing/ListingTab';
import ListingAdminAppScreen from '../src/components/Listing/ListingTabAdminApp';
import ListingAdminExtScreen from '../src/components/Listing/ListingTabAdminExt';
import WalletScreen from '../src/components/Wallet/WalletTab';
import WalletCryptoScreen from '../src/components/Wallet/WalletCrypto';

import ProfileScreen from '../src/components/Profile/ProfileTab';

import LoginScreen from '../src/components/Login/LoginSignUp';
import SignUpScreen from '../src/components/Login/SignUp';

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
