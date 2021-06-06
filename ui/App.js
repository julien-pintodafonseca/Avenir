/**
 * Avenir
 * https://gitlab.ensimag.fr/pintodaj/avenir
 */
import React, {useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   BottomTabNavigator,
//   BottomTabNavigatorAdmin,
// } from './src/navigation/TabNavigator';
// import {LoginStack} from './src/navigation/StackNavigator';

import {Splash} from './src/components/Custom/Splash';
import {AuthContext} from './src/Context';
import RootStackScreen from './src/navigation/RootStack';

const BACKEND = 'http://10.0.2.2:5000';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const authContext = useMemo(() => {
    return {
      logIn: (email, password) => {
        connect(email, password);
      },
      logOut: () => {
        setIsLoading(true);
        setUserToken(null);
        setIsAdmin(null);
      },
      BACKEND,
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);

  if (isLoading) {
    return <Splash />;
  }

  function connect(email, password) {
    fetch(`${BACKEND}/account/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: `${JSON.stringify({email, password})}`,
    })
      .then(response => response.json())
      .then(data => {
        setIsLoading(data.token ? true : false);
        setUserToken(data.token ? data.token : null);
        setIsAdmin(data.is_admin);
        AsyncStorage.setItem(
          '@userToken',
          JSON.stringify(data.token),
        );
        if (data.is_admin) {
          AsyncStorage.setItem(
            '@is_admin',
            JSON.stringify(data.is_admin),
          );
        }
        if (data.is_premium) {
          AsyncStorage.setItem(
            '@is_premium',
            JSON.stringify(data.is_premium),
          );
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/* {!userToken ? <LoginStack/> : !user.is_admin ? <BottomTabNavigator/>: <BottomTabNavigatorAdmin/>} */}
        <RootStackScreen userToken={userToken} isAdmin={isAdmin} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
