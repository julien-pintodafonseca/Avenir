import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {
  ListingStack,
  WalletStack,
  ProfileStack,
  ListingAdminAppStack,
  ListingAdminExtStack,
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
          backgroundColor: '#303030',
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
        name="Profile"
        component={ProfileStack}
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

const BottomTabNavigatorAdmin = () => {
  return (
    <Tab.Navigator
      initialRouteName="ListingApp"
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          elevation: 0,
          borderColor: 'blue',
          height: 60,
          backgroundColor: '#303030',
        },
      }}>
      <Tab.Screen
        name="ListingExt"
        component={ListingAdminExtStack}
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
        name="ListingApp"
        component={ListingAdminAppStack}
        options={{
          tabBarIcon: ({focused, size}) => (
            <IoniconsIcons
              name="star"
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
        name="Profile"
        component={ProfileStack}
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

export {BottomTabNavigator, BottomTabNavigatorAdmin};
