import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import COLORS from '../../../shared/colors';
import {PrimaryButton} from '../components/Button';
import { dropCart } from '../../../redux/ActionCreators';

const mapStateToProps = state => {
  return {
      foods: state.foods,
      cart: state.cart
  };
};

const mapDispatchToProps = {
  dropCart: () => (dropCart())
};

class CartScreen extends Component {

 
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
              <Icon name="remove" size={25} color={COLORS.white} />
              <Icon name="add" size={25} color={COLORS.white} />
            </View>
          </View>
        </View>
      );
    };

    /* Construct an array of objects that combines the selected food items with the quantity
       so that FlatList iterates over one data collection  */
    const foodData = this.props.foods.foods.filter(
      food => this.props.cart.cartItems.find(cartItem => cartItem.id == food.id));

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
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
          <View style={styles.header}>
            <Icon name="arrow-back-ios" size={28} onPress={this.props.navigation.goBack} />
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
          </View>

          {this.props.cart.cartItems.length ? 
          
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 80}}

              data = {newData}


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
                    <PrimaryButton title="CHECKOUT" />
                  </View>
                </View>
              )}
            />

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
