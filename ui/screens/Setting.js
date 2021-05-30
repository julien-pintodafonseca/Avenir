import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Header, Left, Body, Right, Title} from 'native-base';
const SettingView = ({navigation}) => {
  return (
    <View>
      <Header>
        <Left />
        <Body>
          <Title>Settings</Title>
        </Body>
        <Right />
      </Header>
      <Text>Setting</Text>
      <Button title="Click" onPress={() => alert('button clicked')} />
    </View>
  );
};
export default SettingView;
