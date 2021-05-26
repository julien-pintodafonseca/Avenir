/**
 * Avenir
 * https://gitlab.ensimag.fr/pintodaj/avenir
 */

import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App: () => Node = () => {
  const appName = 'Avenir';

  return (
    <View style={styles.mainView}>
        <Text style={styles.title}>{appName}</Text>
        <TextInput style={styles.input}
            value=""
            placeholder="Login"
        />
        <Text></Text>
        <TextInput style={styles.input}
            value=""
            placeholder="Password"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#303030',
    height: '100%',
    width: '100%',
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 69,
    color: 'orange',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  input: {
    color: 'pink',
    backgroundColor: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    width: 200,
  }
});

export default App;
