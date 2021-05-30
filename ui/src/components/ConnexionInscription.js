import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Title, Content} from 'native-base';
import Connexion from './Connexion';
import Inscription from './Inscription';

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

class ConnexionInscription extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Title style={styles.title}>{this.props.appName}</Title>
          <Connexion onConnect={this.props.onConnect} />
          <Inscription />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303030',
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 69,
    color: 'orange',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  separator: {
    borderTopColor: 'white',
    color: 'white',
  },
});

export default ConnexionInscription;
