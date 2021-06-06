import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Container,
  Text,
  Form,
  Content,
  Title,
  Header,
  Left,
  Icon,
  Body,
  Right,
  Subtitle,
  Item,
  Input,
} from 'native-base';
import {AuthContext} from '../../Context';
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {logIn} = useContext(AuthContext);
  const {BACKEND} = useContext(AuthContext);

  function submitSignUpForm() {
    if (
      email &&
      password &&
      email === confirmEmail &&
      password === confirmPassword
    ) {
      fetch(`${BACKEND}/account/registration`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: `${JSON.stringify({
          email,
          password,
          password2: confirmPassword,
        })}`,
      })
        .then(response => response.json())
        .then(data => {
          if (data.msg) {
            logIn(email, password);
          }
        })
        .catch(error => console.log(error));
    }
  }

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
            <View>
              <Text style={styles.sectionTitle}>E-mail</Text>
              <Item>
                <Input
                  style={styles.text}
                  placeholder="E-mail"
                  value={email}
                  onChangeText={setEmail}
                />
              </Item>
              <Item>
                <Input
                  style={styles.text}
                  placeholder="Confirm E-mail"
                  value={confirmEmail}
                  onChangeText={setConfirmEmail}
                />
              </Item>
            </View>
          </View>
          <View style={styles.spacing}>
            <View>
              <Text style={styles.sectionTitle}>Password</Text>
              <Item>
                <Input
                  style={styles.text}
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </Item>
              <Item>
                <Input
                  style={styles.text}
                  placeholder="Confirm Password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </Item>
            </View>
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
            submitSignUpForm();
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
