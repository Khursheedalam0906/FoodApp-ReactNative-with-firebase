import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import {colors} from '../globals/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

{
  /*   const carousaldata = [
  {
    id: 1,
    image: "../../assets/OfferSliderimg/img1.png",
  },
  {
    id: 2,
    image: "../../assets/OfferSliderimg/img2.png",
  },
  {
    id: 3,
    image: "../../assets/OfferSliderimg/img2.png",
  },
];     */
}

const OfferSlider = () => {
  return (
    <View>
      <View style={styles.OfferSlider}>
        <Swiper
          autoplay={true}
          autoplayTimeout={5}
          showsButtons={true}
          dotColor={colors.text2}
          activeDotColor={colors.text1}
          prevButton={
            <FontAwesome
              name="arrow-left"
              size={24}
              color={colors.text1}
              style={styles.buttonicon}
            />
          }
          nextButton={
            <FontAwesome
              name="arrow-right"
              size={24}
              color={colors.text1}
              style={styles.buttonicon}
            />
          }>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/OfferSliderimg/img1.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/OfferSliderimg/img2.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/OfferSliderimg/img3.jpg')}
              style={styles.image}
            />
          </View>
        </Swiper>
      </View>
    </View>
  );
};

export default OfferSlider;

const styles = StyleSheet.create({
  OfferSlider: {
    width: '100%',
    height: 200,
    backgroundColor: colors.col1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  slide: {
    width: '100%',
    height: 200,
    backgroundColor: colors.col1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  buttonicon: {
    color: colors.text1,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
  },
});
