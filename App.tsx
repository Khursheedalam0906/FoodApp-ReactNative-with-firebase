import {StyleSheet, Text, View} from 'react-native';
import WelcomeScreen from './src/screens/loginSignUpScreens/WelcomeScreen';
import LoginScreen from './src/screens/loginSignUpScreens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/loginSignUpScreens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import UserProfile from './src/screens/UserProfile';
import ProductPage from './src/screens/ProductPage';
import UserCart from './src/screens/UserCart';
import PlaceOrder from './src/screens/PlaceOrder';
import TrackOrder from './src/screens/TrackOrder';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcomepage">
        <Stack.Screen
          name="Welcomepage"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={UserProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductPage"
          component={ProductPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={UserCart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PlaceOrder"
          component={PlaceOrder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TrackOrder"
          component={TrackOrder}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
