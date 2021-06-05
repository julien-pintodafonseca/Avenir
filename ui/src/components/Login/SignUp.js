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
        <Header style={styles.headerBanner}>
          <Left>
            <Button
              style={styles.center}
              transparent
              onPress={() => navigation.goBack()}>
              <Icon style={{color: '#FF7F50'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Avenir</Title>
            <Subtitle style={styles.subtitle}>Signing up</Subtitle>
          </Body>
          <Right />
        </Header>

        <Form>
          <View
            style={{
              paddingTop: 20,
            }}>
            <Text style={styles.sectionTitle}>E-Mail</Text>
            <Item>
              <Input style={styles.text} placeholder="E-mail" />
            </Item>
            <Item>
              <Input style={styles.text} placeholder="Confirm E-mail" />
            </Item>
          </View>
          <View style={styles.spacing}>
            <Text style={styles.sectionTitle}>Password</Text>
            <Item>
              <Input
                style={styles.text}
                secureTextEntry
                placeholder="Password"
              />
            </Item>
            <Item>
              <Input
                style={styles.text}
                secureTextEntry
                placeholder="Confirm Password"
              />
            </Item>
            <Text style={styles.infoText}>
              The password must contain at least three character categories
              among the following: Uppercase characters (A-Z) Lowercase
              characters (a-z) Digits (0-9)
            </Text>
          </View>
        </Form>
        <Button
          block
          style={styles.button}
          onPress={() => {
            console.log('Element touched sending form');
            navigation.goBack();
          }}>
          <Text style={styles.text}>CONFIRM & SIGN UP</Text>
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
  headerBanner: {
    backgroundColor: '#303030',
    height: 150,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  center: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  subtitle: {
    fontFamily: 'Helvetica',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 150,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  spacing: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },
  text: {
    color: '#FFF',
  },
  infoText: {
    color: 'gray',
    fontSize: 12,
    margin: 15,
    marginBottom: 0,
  },
  button: {margin: 15, backgroundColor: '#FF7F50'},
});

export default SignUp;
