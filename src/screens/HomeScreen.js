import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeadNav from '../components/HomeHeadNav';
import Categories from '../components/Categories';
import OfferSlider from '../components/OfferSlider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../globals/style';
import firestore from '@react-native-firebase/firestore';
import CardSlider from '../components/CardSlider';
import BottomNav from '../components/BottomNav';

const HomeScreen = ({navigation}) => {
  const [foodData, setFoodData] = useState([]);
  const [vegData, setVegData] = useState([]);
  const [nonVegData, setNonVegData] = useState([]);
  const [search, setSearch] = useState('');

  const foodRef = firestore().collection('FoodData');

  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  useEffect(() => {
    setVegData(foodData.filter(item => item.foodType == 'veg'));
    setNonVegData(foodData.filter(item => item.foodType == 'non-veg'));
  }, [foodData]);

  // console.log(nonVegData);
  //console.log(search);

  return (
    <View style={styles.container}>
      <HomeHeadNav navigation={navigation} />
      <View style={styles.BottomNav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView>
        <View style={styles.searchbox}>
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={styles.searchicon}
          />
          <TextInput
            placeholder="search"
            style={styles.input}
            onChangeText={text => setSearch(text)}
          />
        </View>
        {search != '' && (
          <View style={styles.searchresultouter}>
            <FlatList
              style={styles.searchresultinner}
              data={foodData}
              renderItem={({item}) => {
                if (
                  item.foodName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return (
                    <View style={styles.searchresult}>
                      <AntDesign name="arrowright" size={24} color="red" />
                      <Text style={styles.searchresulttext}>
                        {item.foodName}
                      </Text>
                    </View>
                  );
                }
              }}
            />
          </View>
        )}
        <Categories />
        <OfferSlider />
        <CardSlider
          title={"Today's Special"}
          data={foodData}
          navigation={navigation}
        />
        <CardSlider
          title={'Non-Veg Lover'}
          data={nonVegData}
          navigation={navigation}
        />
        <CardSlider
          title={'Veg Lover'}
          data={vegData}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    // alignItems: 'center',
    width: '100%',
  },
  searchbox: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    margin: 20,
    elevation: 10,
  },
  input: {
    marginLeft: 10,
    width: '90%',
    fontSize: 18,
    color: colors.text1,
  },
  searchicon: {
    color: colors.text1,
  },
  searchresultouter: {
    width: '100%',
    height: '100%',
    marginHorizontal: 30,
    backgroundColor: colors.col1,
  },
  searchresultinner: {
    width: '100%',
  },
  searchresult: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  searchresulttext: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
  },
  BottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.col1,
    zIndex: 20,
  },
});
