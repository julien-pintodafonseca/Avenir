/**
 * Avenir
 * https://gitlab.ensimag.fr/pintodaj/avenir
 */
import React, {useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {
//   BottomTabNavigator,
//   BottomTabNavigatorAdmin,
// } from './src/navigation/TabNavigator';
// import {LoginStack} from './src/navigation/StackNavigator';

import {Splash} from './src/components/Custom/Splash';
import {AuthContext} from './src/Context';
import RootStackScreen from './src/navigation/RootStack';
const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState({});

  const authContext = useMemo(() => {
    return {
      logIn: (username, password) => {
        connect(username, password);
      },
      signUp: (username, password) => {
        connect(username, password);
      },
      logOut: () => {
        setIsLoading(true);
        setUserToken(null);
        setUser({});
      },
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
  // const TokenContext = React.createContext(false);
  // function getUser(){
  //   setUser();
  // }
  function connect(username, password) {
    console.log('login', username, password);
    // fetch(`${BACKEND}/login`, {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: `${JSON.stringify({login: username, password})}`,
    // })
    // .then(response => response.json())
    // .then(data => {
    //   setIsLoading(data.msg==="ok"?true:false);
    //   setToken(data.msg==="ok"?data.token:null)}
    //   )
    // .catch(error => console.log(error));
    setIsLoading(true);
    setUserToken('null');
    setUser({
      id: 2,
      is_admin: 0,
    });
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/* {!userToken ? <LoginStack/> : !user.is_admin ? <BottomTabNavigator/>: <BottomTabNavigatorAdmin/>} */}
        <RootStackScreen userToken={userToken} user={user} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
