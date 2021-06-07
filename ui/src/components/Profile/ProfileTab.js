import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Container, Button, Form, Input, Item} from 'native-base';
import Header from '../Custom/Header';
import {AuthContext} from '../../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileView = ({navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const {logOut} = useContext(AuthContext);
  const {BACKEND} = useContext(AuthContext);
  const [token, setToken] = useState('');
  const [is_admin, setIsAdmin] = useState('');
  const [is_premium, setIsPremium] = useState('');
  const [voucher, setVoucher] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('@userToken').then(data => {
      setToken(JSON.parse(data));
    });
    AsyncStorage.getItem('@is_admin').then(data => {
      setIsAdmin(JSON.parse(data));
    });
    AsyncStorage.getItem('@is_premium').then(data => {
      setIsPremium(JSON.parse(data));
    });
  }, []);
  function changePassword() {
    if (newPassword && newPassword === confirmNewPassword) {
      fetch(`${BACKEND}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${token}`,
        },
        body: `${JSON.stringify({
          password: newPassword,
          password2: confirmNewPassword,
        })}`,
      })
        .then(response => response.json())
        .then(data => {
          if (data.msg === 'ok') {
            /* eslint-disable no-alert */
            alert('SUCCESS');
          }
        })
        .catch(error => alert(error));
    }
  }
  function verifyVoucher() {
    if (voucher) {
      fetch(`${BACKEND}/api/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${token}`,
        },
        body: `${JSON.stringify({
          voucher,
        })}`,
      })
        .then(response => response.json())
        .then(data => {
          if (data.msg === 'ok') {
            alert('SUCCESS');
            return;
          }
          alert(data.error);
        })
        .catch(error => alert(error));
    }
  }

  return (
    <Container style={styles.bgColor}>
      <Header title={is_premium ? 'Premium Profile' : 'Profile'} />
      <Container style={{backgroundColor: '#303030', margin: 10}}>
        <View style={styles.border}>
          <Form>
            <View>
              <Text style={styles.sectionTitle}>Change Password</Text>
              <Item>
                <Input
                  style={styles.text}
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
              </Item>
              <Item>
                <Input
                  style={styles.text}
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                  secureTextEntry
                />
              </Item>
            </View>
          </Form>
          <Button onPress={() => changePassword()} block style={styles.button}>
            <Text style={styles.text}>Change password</Text>
          </Button>
        </View>
        {!is_admin && (
          <View style={styles.border}>
            <Text style={styles.sectionTitle}>Voucher</Text>
            <Form>
              <Item>
                <Input
                  style={styles.text}
                  placeholder="Voucher code"
                  value={voucher}
                  onChangeText={setVoucher}
                />
              </Item>
            </Form>
            <Button onPress={() => verifyVoucher()} block style={styles.button}>
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
    fontFamily: 'Helvetica',
  },
  rawValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF',
    fontFamily: 'Helvetica',
  },
  fullname: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Helvetica',
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
    fontFamily: 'Helvetica',
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
    fontFamily: 'Helvetica',
  },
  button: {margin: 15, marginTop: 25, backgroundColor: '#FF7F50'},
  logOutButton: {margin: 15, marginTop: 25, backgroundColor: '#FF3C50'},
  text: {
    color: '#FFF',
    fontFamily: 'Helvetica',
  },
  bgColor: {backgroundColor: '#303030'},
});

export default ProfileView;
