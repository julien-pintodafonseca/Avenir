import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CryptoDetail from '../components/Listing/ListingCryptoDetail';
import ListingScreen from '../components/Listing/ListingTab';
import ListingAdminAppScreen from '../components/Listing/ListingTabAdminApp';
import ListingAdminExtScreen from '../components/Listing/ListingTabAdminExt';
import WalletScreen from '../components/Wallet/WalletTab';
import WalletCryptoDetailScreen from '../components/Wallet/WalletCryptoDetail';

import ProfileScreen from '../components/Profile/ProfileTab';

import LoginScreen from '../components/Login/LoginSignUp';
import SignUpScreen from '../components/Login/SignUp';

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
      <Stack.Screen name="WalletCryptoDetail" component={WalletCryptoDetailScreen} />
      <Stack.Screen name="WalletListingAdd" component={ListingScreen} />
      <Stack.Screen
        name="WalletListingAddAmount"
        component={WalletCryptoDetailScreen}
      />
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
