import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../shared/colors';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import MapScreen from '../screens/MapScreen';


const Tab = createBottomTabNavigator();

const mapStateToProps = state => {
  return {
      cart: state.cart
  };
};

class BottomNavigator extends Component {
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          style: {
            height: 55,
            borderTopWidth: 0,
            elevation: 0,
          },
          showLabel: false,
          activeTintColor: COLORS.primary,
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="home-filled" color={color} size={28} />
            ),
          }}
        />
        <Tab.Screen
          name="LocalMall"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="local-mall" color={color} size={28} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={MapScreen}
          options={{
            tabBarIcon: ({color}) => (
              <View
                style={{
                  height: 60,
                  width: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.primary,
                  borderWidth: 2,
                  borderRadius: 30,
                  top: -25,
                  elevation: 5,
                }}>
                <Icon name="search" color={COLORS.primary} size={28} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="favorite" color={color} size={28} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({color}) => (
              <View style={{ padding: 5 }}>

                { /* Put a red circle on top of shopping cart icon if items have been selected */
                this.props.cart.cartItems.length ?
                  <View style={{
                    position: 'absolute', height: 30, width: 30, 
                    borderRadius: 15, backgroundColor: 'rgba(255,0,0,0.7)',
                    right: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000
                  }}>
                    <Text style={{ color: 'white', fontWeight: 'bold'}}>
                      { this.props.cart.cartItems.map(cartItem => cartItem.quantity).reduce(((prev, next) => prev + next),0) }

                    </Text>
                  </View>
                  :
                  /* Put an empty placeholder on top of cart icon if the cart is empty */
                  <View style={{
                    position: 'absolute', height: 30, width: 30, 
                    right: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000
                  }}> 
                  </View>
                }

                <Icon name="shopping-cart" color={color} size={28} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
}

export default connect(mapStateToProps, null)(BottomNavigator);
