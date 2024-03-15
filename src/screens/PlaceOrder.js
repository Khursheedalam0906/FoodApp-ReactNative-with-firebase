import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {btn1, colors, hr80, navbtn, navbtnin} from '../globals/style';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const PlaceOrder = ({navigation, route}) => {
  const cartdata = route.params;
  const [orderdata, setOrderdata] = useState([]);
  const [totalCost, setTotalCost] = useState([]);
  const [userLoggeduid, setUserLoggeduid] = useState(null);
  const [userData, setUserData] = useState(null);

  console.log('Hello', cartdata);

  // useEffect(() => {
  //   setOrderdata(JSON.parse(cartdata));
  // }, []);

  useEffect(() => {
    if (cartdata != null) {
      const foodprice = JSON.parse(cartdata).cart;
      let totalfoodprice = 0;
      foodprice.map(item => {
        // console.log(item.data.foodPrice)
        totalfoodprice =
          parseInt(item.data.foodPrice) * parseInt(item.Foodquantity) +
          parseInt(item.data.foodAddonPrice) * parseInt(item.Addonquantity) +
          totalfoodprice;
      });
      // console.log(totalfoodprice)
      setTotalCost(JSON.stringify(totalfoodprice));
    }
  }, [cartdata]);

  // userData-----------------

  useEffect(() => {
    const checkLogin = () => {
      auth().onAuthStateChanged(user => {
        if (user) {
          setUserLoggeduid(user.uid);
          //  console.log(user);
        } else {
          setUserLoggeduid(null);
          // console.log('No user logged in');
          // navigation.navigate('login');
        }
      });
    };
    checkLogin();
  }, []);

  // console.log(userLoggeduid);

  useEffect(() => {
    const getuserdata = async () => {
      const docRef = firestore()
        .collection('UserData')
        .where('uid', '==', userLoggeduid);
      const doc = await docRef.get();
      if (!doc.empty) {
        doc.forEach(doc => {
          setUserData(doc.data());
        });
      } else {
        // navigation.navigate('login');
        console.log('No Such Document!');
      }
    };
    getuserdata();
  }, [userLoggeduid]);

  // console.log(userData);

  const placenow = () => {
    const docRef = firestore()
      .collection('UserOrders')
      .doc(new Date().getTime().toString());
    docRef
      .set({
        orderid: docRef.id,
        orderdata: orderdata.cart,
        orderstatus: 'pending',
        ordercost: totalCost,
        orderdate: firestore.FieldValue.serverTimestamp(),
        orderaddress: userData.address,
        orderphone: userData.phone,
        ordername: userData.name,
        orderuseruid: userLoggeduid,
        orderpayment: 'online',
        paymentstatus: 'paid',
      })
      .then(() => {
        alert('Order Placed');
      });
  };

  return (
    <ScrollView
      style={styles.containerout}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} colors="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      <Text style={styles.head1}>Your Order Summary</Text>
      <View style={styles.container}>
        <FlatList
          style={styles.c1}
          data={orderdata.cart}
          renderItem={({item}) => {
            return (
              <View style={styles.rowout}>
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.qty}>{item.Foodquantity}</Text>
                    <Text style={styles.title}>{item.data.foodName}</Text>
                    <Text style={styles.price}>Rs {item.data.foodPrice}</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.totalPrice}>
                      Rs
                      {parseInt(item.Foodquantity) *
                        parseInt(item.data.foodPrice)}
                    </Text>
                  </View>
                </View>
                {item.Addonquantity > 0 && (
                  <View style={styles.row}>
                    <View style={styles.left}>
                      <Text style={styles.qty}>{item.Addonquantity}</Text>
                      <Text style={styles.title}>{item.data.foodAddon}</Text>
                      <Text style={styles.price1}>
                        Rs {item.data.foodAddonPrice}
                      </Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.totalPrice}>
                        Rs{' '}
                        {parseInt(item.Addonquantity) *
                          parseInt(item.data.foodAddonPrice)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />
        <View style={hr80}></View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.title}>Order Total :</Text>
          </View>
          <View style={styles.left}>
            <View style={styles.left}>
              <Text style={styles.totalPrice}>Rs {totalCost}</Text>
            </View>
          </View>
        </View>
        <View style={hr80}></View>
        <View style={styles.userdataout}>
          <Text style={styles.head1}>Your Details</Text>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Name :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Email :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.email}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Phone :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.address}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Address :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.address}</Text>
            </View>
          </View>
        </View>
        <View style={hr80}></View>
        <View style={{marginBottom: 20}}>
          <TouchableOpacity style={[btn1]} onPress={() => placenow()}>
            <Text style={styles.btntext}>Process to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  head1: {
    fontSize: 30,
    fontWeight: '400',
    color: colors.text1,
    margin: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  rowout: {
    flexDirection: 'column',
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },
  qty: {
    width: 40,
    height: 30,
    backgroundColor: colors.text1,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
    color: colors.col1,
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
    color: colors.text2,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
    color: colors.text1,
  },
  price1: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
    color: colors.text1,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  btntext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.col1,
    margin: 10,
  },
});
