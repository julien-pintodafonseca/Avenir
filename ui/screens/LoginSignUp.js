import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Container, Title, Content, Button} from 'native-base';
import Login from './Login';
import SignUp from './SignUp';

const appName = 'Avenir';

// const ConnexionInscription = props => {
//   return (
//     <Container style={styles.container}>
//       <Content>
//         <Title style={styles.title}>{appName}</Title>
//         <Connexion></Connexion>
//         <Text style={styles.separator}></Text>
//         <Inscription></Inscription>
//       </Content>
//     </Container>
//   );
// };
const LoginSignup = props => {
  console.log(props.onConnect);
  return (
    <Container style={styles.container}>
      <Content>
        <Title style={styles.title}>Avenir</Title>
        <Login />
        <View style={{borderColor: 'gray', borderWidth: 1, margin: 30}} />
        <View>
          <Button
            block
            style={{margin: 15, backgroundColor: '#FF7F50'}}
            onPress={() => {
              console.log('Element touched sending form');
              props.navigation.navigate('SignUp');
            }}>
            <Text style={{color: '#FFF'}}>SIGN UP</Text>
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
  separator: {
    borderTopColor: 'white',
    color: 'white',
  },
});

export default LoginSignup;
