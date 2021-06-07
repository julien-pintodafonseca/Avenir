import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginStack} from './StackNavigator';
import {BottomTabNavigator, BottomTabNavigatorAdmin} from './TabNavigator';

const RootStack = createStackNavigator();

const RootStackScreen = ({userToken, isAdmin}) => {
  return (
    <RootStack.Navigator headerMode="none">
      {!userToken ? (
        <RootStack.Screen
          name="logScreen"
          component={LoginStack}
          options={{
            animationEnabled: false,
          }}
        />
      ) : !isAdmin ? (
        <RootStack.Screen
          name="userScreen"
          component={BottomTabNavigator}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="adminScreen"
          component={BottomTabNavigatorAdmin}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
