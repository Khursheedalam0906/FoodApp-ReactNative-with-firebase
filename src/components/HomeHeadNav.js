import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, titles} from '../globals/style';

const HomeHeadNav = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FontAwesome
        name="navicon"
        size={24}
        color="black"
        style={styles.myicon}
      />
      <View style={styles.containerin}>
        <Text style={styles.mytext}>Foodie</Text>
        <MaterialCommunityIcons
          name="food-outline"
          size={26}
          color="black"
          style={styles.myicon}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <FontAwesome5
          name="user-circle"
          size={26}
          color="black"
          style={styles.myicon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeadNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    backgroundColor: colors.col1,
    elevation: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mytext: {
    fontSize: 24,
    marginRight: 7,
  },
  myicon: {
    color: colors.text1,
    fontSize: 24,
  },
});
