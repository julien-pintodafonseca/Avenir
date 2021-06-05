/**
 * Avenir
 * https://gitlab.ensimag.fr/pintodaj/avenir
 */
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabNavigator,
  BottomTabNavigatorAdmin,
} from './navigation/TabNavigator';
import {LoginStack} from './navigation/StackNavigator';
const App = () => {
  function connect(username, password) {
    console.log('login', username, password);
    // fetch(`${BACKEND}/login`, {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: `${JSON.stringify({login: username, password})}`,
    // })
    // .then(response => response.json())
    // .then(data => setToken(data.msg==="ok"?data.token:''))
    // .catch(error => console.log(error));
    setToken('ok');
  }

  const [token, setToken] = useState('');
  return (
    <NavigationContainer>
      {/* {token === '' ? (
        // <ConnexionInscription onConnect={connect} />
        <LoginStack onConnect={connect} />
      ) : ( */}
      {/* // <LoginStack/> */}
      <BottomTabNavigator />
      {/* <BottomTabNavigatorAdmin /> */}
      {/* )} */}
    </NavigationContainer>
  );
};

export default App;
