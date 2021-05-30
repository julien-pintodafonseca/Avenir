import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CryptoDetail from '../screens/CryptoDetail';
import ListingScreen from '../screens/Listing';
import WalletScreen from '../screens/Wallet';
import SettingScreen from '../screens/Setting';
// import Home from "../screens/Home";
// import About from "../screens/About";

const Stack = createStackNavigator();

const navOptionsHandler = () => ({
  headerShown: false,
});

const screenOptionStyle = {
  headerShown: false,
  // headerStyle: {
  //   backgroundColor: '#9AC4F8',
  // },
  // headerTintColor: 'white',
  // headerBackTitle: 'Back',
};

// const MainStackNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="About" component={About} />
//     </Stack.Navigator>
//   );
// }

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

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

const WalletStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Wallet" component={WalletScreen} />
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
  // MainStackNavigator,
  LoginStack,
  ListingStack,
  WalletStack,
  SettingStack,
};
