import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Item, Input, Text} from 'native-base';

const ConfirmInputItem = props => {
  const confirmPlaceholder = `Confirm ${props.placeholder}`;
  const ItemInput = p => {
    return (
      <Item>
        <Input
          style={styles.text}
          placeholder={p.title}
          secureTextEntry={props.secureTextEntry ? true : false}
        />
      </Item>
    );
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>{props.title}</Text>
      <ItemInput title={props.placeholder} />
      <ItemInput title={confirmPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontFamily: 'Helvetica',
  },
  sectionTitle: {
    color: '#FFF',
    fontFamily: 'Helvetica',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ConfirmInputItem;
