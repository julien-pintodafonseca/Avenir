import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Container,
  Text,
  Item,
  Label,
  Input,
  Form,
  Content,
  Title,
  Login,
  Header,
  Left,
  Icon,
  Body,
  Right,
  Subtitle,
} from 'native-base';

const SignUp = ({navigation}) => {
  return (
    <Container style={styles.container}>
      <Content style={{margin: 10}}>
        <Header
          style={{
            backgroundColor: '#303030',
            height: 150,
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}>
          <Left>
            <Button
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
              transparent
              onPress={() => navigation.goBack()}>
              <Icon style={{color: '#FF7F50'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Avenir</Title>
            <Subtitle
              style={{
                fontFamily: 'Helvetica',
                fontSize: 30,
                color: 'white',
                textAlign: 'center',
                textAlignVertical: 'center',
                width: 150,
              }}>
              Signing up
            </Subtitle>
          </Body>
          <Right />
        </Header>

        <Form>
          <View
            style={{
              paddingTop: 20,
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              E-Mail
            </Text>
            <Item>
              <Input style={{color: '#FFF'}} placeholder="E-mail" />
            </Item>
            <Item>
              <Input style={{color: '#FFF'}} placeholder="Confirm E-mail" />
            </Item>
          </View>
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              paddingBottom: 20,
              paddingTop: 20,
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Password
            </Text>
            <Item>
              <Input
                style={{color: '#FFF'}}
                secureTextEntry
                placeholder="Password"
              />
            </Item>
            <Item>
              <Input
                style={{color: '#FFF'}}
                secureTextEntry
                placeholder="Confirm Password"
              />
            </Item>
            <Text
              style={{
                color: 'gray',
                fontSize: 12,
                margin: 15,
                marginBottom: 0,
              }}>
              The password must contain at least three character categories
              among the following: Uppercase characters (A-Z) Lowercase
              characters (a-z) Digits (0-9)
            </Text>
          </View>
        </Form>
        {/* <Button
            onPress={() => console.log('pressed')}
            block
            style={{margin: 15, marginTop: 25, backgroundColor: '#FF7F50'}}>
            <Text style={{color: '#FFF'}}>Change password</Text>
          </Button> */}
        <Button
          block
          style={{margin: 15, backgroundColor: '#FF7F50'}}
          onPress={() => {
            console.log('Element touched sending form');
            navigation.goBack();
          }}>
          <Text style={{color: '#FFF'}}>CONFIRM & SIGN UP</Text>
        </Button>
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
    width: 200,
    margin: 'auto',
  },
  separator: {
    borderTopColor: 'white',
    color: 'white',
  },
});

export default SignUp;
