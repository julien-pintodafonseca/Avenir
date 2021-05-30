import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListingScreen from '../screens/Listing';
import WalletScreen from '../screens/Wallet';
import SettingScreen from '../screens/Setting';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

const CustomWalletTabButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#e32f45',
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
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
        component={ListingScreen}
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
      {/* <Tab.Screen name="Wallet" component={WalletScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <IoniconsIcons
                        name="wallet"
                        color={focused ? color : '#FF0000'}
                        size={size*1.5}
                        style={{
                            marginLeft: 5
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <CustomWalletTabButton { ...props } />
                ),
            }}/> */}
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
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
        component={SettingScreen}
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

export default Tabs;
