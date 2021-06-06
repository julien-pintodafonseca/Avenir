import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Container, Button, Form, Input, Item} from 'native-base';
import Header from '../Custom/Header';
import ConfirmInputItem from '../Custom/ConfirmInputItem';
import {AuthContext} from '../../Context';
const user = {};
const ProfileView = ({navigation}) => {
  const {logOut} = useContext(AuthContext);

  return (
    <Container style={styles.bgColor}>
      <Header title="Profile" />
      <Container style={{backgroundColor: '#303030', margin: 10}}>
        <View style={styles.border}>
          <Form>
            <ConfirmInputItem
              placeholder="Password"
              secureTextEntry="true"
              title="Reset password"
            />
          </Form>
          <Button
            onPress={() => console.log('pressed')}
            block
            style={styles.button}>
            <Text style={styles.text}>Change password</Text>
          </Button>
        </View>
        {!user.is_admin && (
          <View style={styles.border}>
            <Text style={styles.sectionTitle}>Voucher</Text>
            <Form>
              <Item>
                <Input style={styles.text} placeholder="Voucher code" />
              </Item>
            </Form>
            <Button
              onPress={() => console.log('pressed')}
              block
              style={styles.button}>
              <Text style={styles.text}>Confirm</Text>
            </Button>
          </View>
        )}
        <View>
          <Button onPress={() => logOut()} block style={styles.logOutButton}>
            <Text style={styles.text}>Log Out</Text>
          </Button>
        </View>
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
  headerBanner: {
    backgroundColor: '#303030',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  title: {
    color: '#FF7F50',
    fontSize: 20,
    fontWeight: 'bold',
  },
  border: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {margin: 15, marginTop: 25, backgroundColor: '#FF7F50'},
  logOutButton: {margin: 15, marginTop: 25, backgroundColor: '#FF3C50'},
  text: {
    color: '#FFF',
  },
  bgColor: {backgroundColor: '#303030'},
});

export default ProfileView;
