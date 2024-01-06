import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {btn1, colors, hr80, titles} from '../../globals/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // store input field data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customError, setCustomError] = useState('');

  const handleLogin = () => {
    const LoginData = {
      email,
      password,
    };
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        var user = userCredentials.user;
        console.log('Logged in Successfully');
        //  console.log(user);
        navigation.navigate('Welcomepage');
      })
      .catch(error => {
        var errorMessage = error.message;
        console.log(errorMessage);
        if (
          errorMessage ==
          '[auth/invalid-email] The email address is badly formatted.'
        ) {
          setCustomError('Please enter a valid email');
        } else {
          setCustomError('Incorrect email and password');
        }
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.head1}>Sign In</Text>
      {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
      <View style={styles.inputout}>
        <AntDesign
          name="user"
          size={24}
          color={emailfocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={() => {
            setEmailfocus(true);
            setPasswordfocus(false);
            setShowPassword(false);
            setCustomError('');
          }}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputout}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={24}
          color={passwordfocus == true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={showPassword === false ? true : false}
          onFocus={() => {
            setEmailfocus(false);
            setPasswordfocus(true);
            setCustomError('');
          }}
          onChangeText={text => setPassword(text)}
        />
        <Octicons
          name={showPassword == false ? 'eye-closed' : 'eye'}
          size={24}
          color="back"
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <TouchableOpacity style={btn1} onPress={() => handleLogin()}>
        <Text
          style={{
            color: colors.col1,
            fontSize: titles.btntext,
            fontWeight: 'bold',
          }}>
          Sign in
        </Text>
      </TouchableOpacity>
      <Text style={styles.forgot}>Forgot Password</Text>
      <Text style={styles.or}>OR</Text>
      <Text style={styles.gftxt}>Sign In With</Text>
      <View style={styles.gf}>
        <TouchableOpacity>
          <View style={styles.gficon}>
            <AntDesign name="google" size={24} color="#EA4335"></AntDesign>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.gficon}>
            <FontAwesome5
              name="facebook-f"
              size={24}
              color="#426782"></FontAwesome5>
          </View>
        </TouchableOpacity>
      </View>
      <View style={hr80}></View>
      <Text>
        Don't have an account?{' '}
        <Text
          style={styles.signup}
          onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    //justifyContent: "center",
    marginTop: 150,
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    marginVertical: 10,
  },
  inputout: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    // alignSelf: "center",
    elevation: 20,
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
  },
  forgot: {
    color: colors.text2,
    marginTop: 20,
    marginBottom: 10,
  },
  or: {
    color: colors.text1,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  gftxt: {
    color: colors.text2,
    marginVertical: 10,
    fontSize: 25,
  },
  gf: {
    flexDirection: 'row',
  },
  gficon: {
    backgroundColor: 'white',
    width: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 20,
  },
  signup: {
    color: colors.text1,
  },
  errormsg: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
