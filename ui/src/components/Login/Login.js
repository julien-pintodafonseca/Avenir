import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Item, Input, Form, Text} from 'native-base';
import {AuthContext} from '../../Context';
const Connexion = props => {
  const [mail, setMail] = useState('guestpremium@avenir.fr');
  const [password, setPWD] = useState('Azerty123!');
  const {logIn} = useContext(AuthContext);

  return (
    <View>
      <Form>
        <Item>
          <Input
            style={styles.text}
            placeholder="E-mail"
            onChangeText={setMail}
            value={mail}
          />
        </Item>
        <Item>
          <Input
            style={styles.text}
            onChangeText={setPWD}
            placeholder="Password"
            secureTextEntry
            value={password}
          />
        </Item>
      </Form>
      <Button
        block
        style={styles.button}
        onPress={() => {
          logIn(mail, password);
        }}>
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
  text: {
    color: '#FFF',
    fontFamily: 'Helvetica',
  },
});

export default Connexion;
