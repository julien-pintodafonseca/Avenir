import React, {Component, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Item, Input, Form, Text} from 'native-base';

function connect(mail, password) {
  console.log('login', mail, password);
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

const Connexion = props => {
  const [mail, setMail] = useState('');
  const [password, setPWD] = useState('');
  return (
    <View>
      <Form>
        <Item>
          <Input placeholder="E-mail" value="" />
        </Item>
        <Item>
          <Input placeholder="Password" secureTextEntry value="" />
        </Item>
        <Button
          transparent
          light
          onPress={() => {
            console.log('Forgot PWD');
          }}>
          <Text>Forgot my password</Text>
        </Button>
      </Form>
      <Button
        onPress={() => props.onConnect(mail, password)}
        block
        style={{margin: 15, marginTop: 25}}>
        <Text>Log In</Text>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  forgotPwd: {
    fontFamily: 'Helvetica',
    color: 'orange',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 20,
  },
});

export default Connexion;
