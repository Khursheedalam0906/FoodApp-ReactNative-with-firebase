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
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({navigation}) => {
  const [namefocus, setNamefocus] = useState(false);
  const [emailfocus, setEmailfocus] = useState(false);
  const [phonefocus, setPhonefocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cPasswordfocus, setcPasswordfocus] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);
  const [addressfocus, setAddressfocus] = useState(false);

  // taking form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [address, setAddress] = useState('');

  //error check
  const [customError, setCustomError] = useState('');
  const [successmsg, setSuccessmsg] = useState(null);

  const handleSignup = () => {
    if (password != cpassword) {
      //  Alert("Password doesn't match");
      setCustomError("Password does't match");
      return;
    } else if (phone.length != 10) {
      setCustomError('Phone number should be 10 digit');
      return;
    }
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          //console.log(userCredentials);
          // console.log('User Created');

          // store all information in firestore
          const userRef = firestore().collection('UserData');
          if (userCredentials?.user.uid) {
            userRef
              .add({
                name,
                email,
                phone,
                password,
                address,
                uid: userCredentials?.user.uid,
              })
              .then(() => {
                //   console.log('Data added to firestore');
                setSuccessmsg('User created successfully');
              })
              .catch(error => {
                console.log('firestore error', error.message);
              });
          }
        })
        .catch(error => {
          console.log('sign up firebase error', error.message);
          if (
            error.message ==
            '[auth/email-already-in-use] The email address is already in use by another account.'
          ) {
            setCustomError('Email already exist');
          } else if (
            error.message ==
            '[auth/invalid-email] The email address is badly formatted.'
          ) {
            setCustomError('Invalid Email');
          } else if (
            error.message ==
            '[auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]'
          ) {
            setCustomError('Password should be at least 6 character');
          } else {
            setCustomError(error.message);
          }
        });
    } catch (error) {
      console.log('sign up system error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {successmsg == null ? (
        <View style={styles.container}>
          <Text style={styles.head1}>Sign Up</Text>
          {customError !== '' && (
            <Text style={styles.errormsg}>{customError}</Text>
          )}

          {/* Name Start */}
          <View style={styles.inputout}>
            <AntDesign
              name="user"
              size={24}
              color={namefocus === true ? colors.text1 : colors.text2}
            />
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Full Name"
              onFocus={() => {
                setNamefocus(true);
                setEmailfocus(false);
                setPhonefocus(false);
                setPasswordfocus(false);
                setShowPassword(false);
                setcPasswordfocus(false);
                setShowcPassword(false);
                setAddressfocus(false);
                setCustomError('');
              }}
              onChangeText={text => setName(text)}
            />
          </View>
          {/* Name end */}

          {/* Email Start */}
          <View style={styles.inputout}>
            <Entypo
              name="email"
              size={24}
              color={emailfocus === true ? colors.text1 : colors.text2}
            />
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Email"
              onFocus={() => {
                setNamefocus(false);
                setEmailfocus(true);
                setPhonefocus(false);
                setPasswordfocus(false);
                setShowPassword(false);
                setcPasswordfocus(false);
                setShowcPassword(false);
                setAddressfocus(false);
                setCustomError('');
              }}
              onChangeText={text => setEmail(text)}
            />
          </View>
          {/* Email end */}

          {/* Phone Start */}
          <View style={styles.inputout}>
            <Feather
              name="smartphone"
              size={24}
              color={phonefocus === true ? colors.text1 : colors.text2}
            />
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Phone No"
              onFocus={() => {
                setNamefocus(false);
                setEmailfocus(false);
                setPhonefocus(true);
                setPasswordfocus(false);
                setShowPassword(false);
                setcPasswordfocus(false);
                setShowcPassword(false);
                setAddressfocus(false);
                setCustomError('');
              }}
              onChangeText={text => setPhone(text)}
            />
          </View>
          {/* Phone End */}

          {/* Password Start */}
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
                setNamefocus(false);
                setEmailfocus(false);
                setPhonefocus(false);
                setPasswordfocus(true);
                setcPasswordfocus(false);
                setShowcPassword(false);
                setAddressfocus(false);
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

          <View style={styles.inputout}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color={cPasswordfocus == true ? colors.text1 : colors.text2}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={showcPassword === false ? true : false}
              onFocus={() => {
                setNamefocus(false);
                setEmailfocus(false);
                setPhonefocus(false);
                setPasswordfocus(false);
                setShowPassword(false);
                setcPasswordfocus(true);
                setAddressfocus(false);
                setCustomError('');
              }}
              onChangeText={text => setcPassword(text)}
            />
            <Octicons
              name={showcPassword == false ? 'eye-closed' : 'eye'}
              size={24}
              color="back"
              onPress={() => setShowcPassword(!showcPassword)}
            />
          </View>
          {/* Password End */}

          <Text style={styles.address}>Please enter your address</Text>
          <View style={styles.inputout}>
            <FontAwesome
              name="home"
              size={24}
              color={addressfocus == true ? colors.text1 : colors.text2}
            />
            <TextInput
              style={styles.input}
              placeholder="Please enter your Address"
              onFocus={() => {
                setNamefocus(false);
                setEmailfocus(false);
                setPhonefocus(false);
                setPasswordfocus(false);
                setShowPassword(false);
                setcPasswordfocus(false);
                setShowcPassword(false);
                setAddressfocus(true);
                setCustomError('');
              }}
              onChangeText={text => setAddress(text)}
            />
          </View>

          <TouchableOpacity style={btn1} onPress={handleSignup}>
            <Text
              style={{
                color: colors.col1,
                fontSize: titles.btntext,
                fontWeight: 'bold',
              }}>
              Sign up
            </Text>
          </TouchableOpacity>

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
            Already have an account?
            <Text
              style={styles.signup}
              onPress={() => navigation.navigate('Login')}>
              {' '}
              Sign In
            </Text>
          </Text>
        </View>
      ) : (
        <View style={styles.container1}>
          <Text style={styles.successmsg}>{successmsg}</Text>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: colors.col1,
                fontSize: titles.btntext,
                fontWeight: 'bold',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => setSuccessmsg(null)}>
            <Text
              style={{
                color: colors.col1,
                fontSize: titles.btntext,
                fontWeight: 'bold',
              }}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    // justifyContent: "center",
    //marginTop: 10,
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
    // paddingVertical: 3,
    //alignSelf: 'center',
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
    marginTop: 10,
    fontWeight: 'bold',
  },
  gftxt: {
    color: colors.text2,
    marginVertical: 7,
    fontSize: 25,
  },
  gf: {
    flexDirection: 'row',
  },
  gficon: {
    backgroundColor: 'white',
    width: 50,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 20,
  },
  signup: {
    color: colors.text1,
  },
  address: {
    fontSize: 18,
    color: colors.text2,
    textAlign: 'center',
    marginTop: 7,
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
  container1: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 50,
  },
  btn1: {
    width: '80%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    color: 'white',
    marginBottom: 20,
  },
  successmsg: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    margin: 15,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
