import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Form,
  Label,
  Input,
  Item,
} from 'native-base';
const user = {};
const ProfileView = ({navigation}) => {
  return (
    <Container style={{backgroundColor: '#303030'}}>
      <Header
        style={{
          backgroundColor: '#303030',
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
        }}>
        <Left />
        <Body>
          <Title
            style={{
              color: '#FF7F50',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Profile
          </Title>
        </Body>
        <Right />
      </Header>
      <Container style={{backgroundColor: '#303030', margin: 10}}>
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Reset password
          </Text>
          <Form>
            <Item stackedLabel>
              <Input
                style={{color: '#FFF'}}
                secureTextEntry
                placeholder="Password"
              />
            </Item>
            <Item stackedLabel>
              <Input
                style={{color: '#FFF'}}
                secureTextEntry
                placeholder="Confirm Password"
              />
            </Item>
          </Form>
          <Button
            onPress={() => console.log('pressed')}
            block
            style={{margin: 15, marginTop: 25, backgroundColor: '#FF7F50'}}>
            <Text style={{color: '#FFF'}}>Change password</Text>
          </Button>
        </View>
        {!user.is_admin ? (
          <View
            style={{
              marginTop: 20,
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Voucher
            </Text>
            <Form>
              <Item>
                <Input style={{color: '#FFF'}} placeholder="Voucher code" />
              </Item>
            </Form>
            <Button
              onPress={() => console.log('pressed')}
              block
              style={{margin: 15, marginTop: 25, backgroundColor: '#FF7F50'}}>
              <Text style={{color: '#FFF'}}>Confirm</Text>
            </Button>
          </View>
        ) : (
          ''
        )}
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF',
  },
  rawValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF',
  },
  fullname: {
    fontSize: 12,
    color: '#999',
  },
  rowFrontVisible: {
    backgroundColor: '#000000',
    borderRadius: 5,
    height: 60,
    padding: 10,
  },
});

export default ProfileView;
