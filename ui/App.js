/**
 * Avenir
 * https://gitlab.ensimag.fr/pintodaj/avenir
 */
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import Tabs from './navigation/tabs';
import ConnexionInscription from './src/components/ConnexionInscription';
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
  return (token === '' ? (
    <ConnexionInscription onConnect={connect} />
  ) : (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  ));
};

export default App;
