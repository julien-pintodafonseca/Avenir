import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Container, Title, Content, Button} from 'native-base';
import Login from './Login';
import SignUp from './SignUp';

const appName = 'Avenir';

const LoginSignup = props => {
  console.log(props.onConnect);
  return (
    <Container style={styles.container}>
      <Content>
        <Title style={styles.title}>Avenir</Title>
        <Login />
        <View style={styles.separator} />
        <View>
          <Button
            block
            style={styles.button}
            onPress={() => {
              console.log('Element touched sending form');
              props.navigation.navigate('SignUp');
            }}>
            <Text style={styles.text}>SIGN UP</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303030',
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 69,
    color: '#FF7F50',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  separator: {borderColor: 'gray', borderWidth: 1, margin: 30},
  text: {
    color: '#FFF',
  },
  button: {margin: 15, backgroundColor: '#FF7F50'},
});

export default LoginSignup;
