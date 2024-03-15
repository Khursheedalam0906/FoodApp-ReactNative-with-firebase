import {StyleSheet, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../globals/style';
import {useNavigation} from '@react-navigation/native';

const BottomNav = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.btncon1}>
          <AntDesign
            name="home"
            size={30}
            color={'black'}
            style={styles.icon1}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
        <View style={styles.btncon2}>
          <AntDesign
            name="search1"
            size={30}
            color={'black'}
            style={styles.icon2}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
        <View style={styles.btncon1}>
          <AntDesign
            name="shoppingcart"
            size={30}
            color={'black'}
            style={styles.icon1}
            onPress={() => navigation.navigate('Cart')}
          />
        </View>
        <View style={styles.btncon1}>
          <FontAwesome5
            name="map-marked-alt"
            size={30}
            color={'black'}
            style={styles.icon1}
            onPress={() => navigation.navigate('TrackOrder')}
          />
        </View>
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    elevation: 20,
    borderTopColor: colors.text1,
    borderTopWidth: 0.5,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  icon1: {
    color: colors.text1,
  },
  btncon2: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -15,
    backgroundColor: colors.text1,
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  icon2: {
    color: colors.col1,
  },
  btncon1: {
    backgroundColor: colors.col1,
    elevation: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
