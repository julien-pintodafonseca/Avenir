import React, {Component, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Item, Input, Form, Text} from 'native-base';

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
        {/* <Button
          transparent
          light
          onPress={() => {
            console.log('Forgot PWD');
          }}>
          <Text>Forgot my password</Text>
        </Button> */}
      </Form>
      <Button
        // onPress={() => props.onConnect(mail, password)}
        block
        style={{margin: 15, marginTop: 25, backgroundColor: '#FF7F50'}}>
        <Text>Log In</Text>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  forgotPwd: {
    fontFamily: 'Helvetica',
    color: '#FF7F50',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 20,
  },
});

export default Connexion;
