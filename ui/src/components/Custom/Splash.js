import {Title} from 'native-base';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
const ScreenContainer = ({children}) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303030',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
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
  loadingText: {
    fontFamily: 'Helvetica',
    fontSize: 22,
    color: '#FFF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export const Splash = () => (
  <ScreenContainer>
    <Title style={styles.title}>AVENIR</Title>
    <Text style={styles.loadingText}>Loading...</Text>
  </ScreenContainer>
);
