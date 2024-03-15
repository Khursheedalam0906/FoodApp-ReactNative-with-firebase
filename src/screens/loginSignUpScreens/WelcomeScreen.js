import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, hr80} from '../../globals/style';
import auth from '@react-native-firebase/auth';

const WelcomeScreen = ({navigation}) => {
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    const checkLogin = () => {
      auth().onAuthStateChanged(user => {
        if (user) {
          //  console.log(user);
          setUserLogged(user);
        } else {
          setUserLogged(null);
          console.log('No user logged in');
        }
      });
    };
    checkLogin();
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        setUserLogged(null);
        // console.log('User Logged out');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  //console.log(userLogged);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Foodie</Text>
      <View style={styles.logoout}>
        <Image
          source={require('../../../assets/logo1.png')}
          style={styles.logo}
        />
      </View>
      <View style={hr80} />
      <Text style={styles.text}>
        Find the best food around you at lowest price.
      </Text>
      <View style={hr80} />
      {userLogged == null ? (
        <View style={styles.btnout}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.btn}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btn}>Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.logged}>
          <Text style={styles.textlog}>
            Signed in as{' '}
            <Text style={styles.textlogin}>{userLogged.email}</Text>
          </Text>
          <View style={styles.btnout}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.btn}>Go to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout()}>
              <Text style={styles.btn}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4242',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    color: colors.col1,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '200',
  },
  logoout: {
    width: '80%',
    height: '30%',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    width: '80%',
    color: colors.col1,
    textAlign: 'center',
  },
  btnout: {
    flexDirection: 'row',
  },
  btn: {
    fontSize: 20,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: '700',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  logged: {
    alignItems: 'center',
  },
  textlog: {
    fontSize: 18,
    color: colors.col1,
  },
  textlogin: {
    fontSize: 19,
    color: colors.col1,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
