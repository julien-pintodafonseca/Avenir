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
      </Form>
      <Button block style={styles.button}>
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
  button: {margin: 15, marginTop: 25, backgroundColor: '#FF7F50'},
});

export default Connexion;
