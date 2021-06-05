import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Left, Icon, Body, Title, Right} from 'native-base';

const Header = props => {
  return (
    <Header style={styles.general}>
      {props.goBack ? (
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={styles.Icon} name="arrow-back" />
          </Button>
        </Left>
      ) : (
        <Left />
      )}
      <Body>
        <Title style={styles.title}>{props.title}</Title>
      </Body>
      <Right />
    </Header>
  );
};

const styles = StyleSheet.create({
  general: {
    backgroundColor: '#303030',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  arrow: {
    color: '#FF7F50',
  },
  title: {
    color: '#FF7F50',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
