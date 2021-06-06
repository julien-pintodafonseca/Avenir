import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginStack} from './StackNavigator';
import {BottomTabNavigator, BottomTabNavigatorAdmin} from './TabNavigator';

const RootStack = createStackNavigator();

const RootStackScreen = ({userToken, user}) => {
  console.log({userToken, user});
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
      ) : !user.is_admin ? (
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
