import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {
  LoginStack,
  ListingStack,
  WalletStack,
  SettingStack,
} from './StackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Wallet"
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          elevation: 0,
          borderColor: 'blue',
          height: 60,
          backgroundColor: 'black',
        },
      }}>
      <Tab.Screen
        name="Listing"
        component={ListingStack}
        options={{
          tabBarIcon: ({focused, size}) => (
            <IoniconsIcons
              name="stats-chart"
              color={focused ? '#FF7F50' : '#fef6ef'}
              size={focused ? size * 1.5 : size * 1.2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletStack}
        options={{
          tabBarIcon: ({focused, size}) => (
            <IoniconsIcons
              name="wallet"
              color={focused ? '#FF7F50' : '#fef6ef'}
              style={{
                marginLeft: 5,
              }}
              size={focused ? size * 1.5 : size * 1.2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingStack}
        options={{
          tabBarIcon: ({focused, size}) => (
            <IoniconsIcons
              name="person"
              color={focused ? '#FF7F50' : '#fef6ef'}
              size={focused ? size * 1.5 : size * 1.2}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabNavigator;
