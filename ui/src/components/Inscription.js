import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';

class Inscription extends Component {
  render() {
    return (
      <View>
        <Button block style={{margin: 15}}>
          <Text>Sign In</Text>
        </Button>
      </View>
    );
  }
}

export default Inscription;
