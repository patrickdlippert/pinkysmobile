import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import COLORS from '../../../shared/colors';
import {PrimaryButton} from '../components/Button';
import { dropCart, postCartItem, removeCartItem } from '../../../redux/ActionCreators';

const mapStateToProps = state => {
  return {
      foods: state.foods,
      cart: state.cart,
      locations: state.locations
  };
};

const mapDispatchToProps = {
  dropCart: () => (dropCart()),
  postCartItem: foodItem => (postCartItem(foodItem)),
  removeCartItem: foodItem => (removeCartItem(foodItem))
};

class CartScreen extends Component {

  handleCheckout = () => {

    this.props.navigation.navigate("LogInScreen");
    this.props.dropCart();
    /*Alert.alert(
        "Order Submitted",
        "Thanks subumitting your order. We'll have it ready in approximately 10 minutes!",
        [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate('HomeScreen'),
            style: 'cancel'
          },
        ],
        { cancelable: false }
    );
    */
  }

 
  render() {
    const CartCard = ({item}) => {
      return (
        <View style={styles.cartCard}>
          <Image source={item.image} style={{height: 80, width: 80}} />
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 20,
              flex: 1,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
            <Text style={{fontSize: 13, color: COLORS.grey}}>
              {item.ingredients}
            </Text>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.price}</Text>
          </View>
          <View style={{marginRight: 20, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.quantity}</Text>
            <View style={styles.actionBtn}>
              <Icon name="remove" size={25} color={COLORS.white} 
                onPress={() => this.props.removeCartItem(item)}  
              />
              <Icon name="add" size={25} color={COLORS.white} 
                onPress={() => this.props.postCartItem(item)}  
              />
            </View>
          </View>
        </View>
      );
    };


 

    /* Pull out the ids from the cart objects to make a simple array is Ids for sorting */
    let cartData = [];
    for(let i=0; i < this.props.cart.cartItems.length; i++) {
      cartData[i] = this.props.cart.cartItems[i].id;
    }

    /* Pull out the complete information for each food item that's found in the cart */
    const foodData = this.props.foods.foods.filter(
    food => this.props.cart.cartItems.find(cartItem => cartItem.id == food.id));

    /* sort the food items to be in the exact order as the shopping cart */
    foodData.sort((a,b) => cartData.indexOf(a.id) - cartData.indexOf(b.id));

    /* Construct the combined array of objects for FlatList since two data sets cannot be passed in. */
    let newData = [];
    for(let i=0; i < foodData.length; i++) {
      newData.push({
        id: foodData[i].id,
        name:  foodData[i].name,
        ingredients: foodData[i].ingredients,
        price: foodData[i].price,
        image: foodData[i].image,
        quantity: this.props.cart.cartItems[i].quantity});
    }
    

      return (
        <SafeAreaView style={{backgroundColor: COLORS.lighter, flex: 1}}>
          <View style={styles.header}>
            <Icon name="arrow-back-ios" size={28} onPress={this.props.navigation.goBack} />
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
          </View>


          {this.props.cart.cartItems.length ? 
            <Animatable.View animation='fadeInRightBig' duration={1500} >
            <Text style={{fontSize: 14, marginLeft: 20, marginBottom: 10, fontWeight: 'bold'}}>Location: {this.props.locations.selectedLocation.address}</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 80}}

              data = {newData}
              keyExtractor={item => item.id.toString()}

              renderItem={({item}) => <CartCard item={item} />}
              ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
              ListFooterComponent={() => (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 15,
                    }}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      Subtotal
                    </Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>${this.props.cart.total.toFixed(2)}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 15,
                    }}>
                    <Text style={{color: COLORS.primary}} onPress={() => this.props.dropCart()}>Clear Shopping Cart</Text>
                  </View>
                  <View style={{marginHorizontal: 30}}>
                    <PrimaryButton title="CHECKOUT" 
                     onPress={() => this.handleCheckout()} /> 
                  </View>
                </View>
              )}
            />
            </Animatable.View>

            : 

            <View style={styles.textContainer}>
                <Text style={styles.textItem}>Your cart is empty.</Text>
            </View>
    
        }
        </SafeAreaView>
      );
  }
}


const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  textContainer: {
    flex:1,
    margin: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  textItem: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
