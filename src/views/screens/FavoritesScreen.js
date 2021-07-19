import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import COLORS from '../../../shared/colors';
import {PrimaryButton} from '../components/Button';
import * as Animatable from 'react-native-animatable';
import { deleteFavorite } from '../../../redux/ActionCreators';
import { SwipeRow} from 'react-native-swipe-list-view';

const mapStateToProps = state => {
    return {
        foods: state.foods,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    deleteFavorite: foodId => (deleteFavorite(foodId))
};


class FavoritesScreen extends Component {
 
  render() {
    const { navigate } = this.props.navigation;
    const foods = this.props.foods.foods;


    const renderFavoriteItem = ({item}) => {
        console.log(item);
        return (
            <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
                <View style={styles.deleteView}>
                    <TouchableOpacity
                        style={styles.deleteTouchable}
                        onPress={() => 
                            Alert.alert(
                                'Delete Favorite?',
                                'Are you sure you want to delete: ' + item.name + '?',
                                [
                                    {
                                        text: 'Cancel',
                                           onPress: () => console.log(item.name + ' Not Deleted'),
                                           style: 'cancel'
                                    },
                                    {
                                        text: 'OK',
                                           onPress: () => this.props.deleteFavorite(item.id)
                                    }
                                ],
                                { cancelable: false }
                            )
                        }
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity  
                  style={styles.cartCard}
                  onPress={() => navigate('DetailsScreen', item)}
                >
                  <Image source={item.image} style={{ height: 50, width: 50 }} />
                  <View
                    style={{
                      height: 80,
                      marginLeft: 10,
                      paddingVertical: 20,
                      flex: 1,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ fontSize: 13, color: COLORS.grey }}>
                      {item.ingredients}
                    </Text>
                    </View>
                    <View>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${item.price}</Text>
                  </View>
                  
                </TouchableOpacity>
             </SwipeRow>
        );
    };


    return (


          <Animatable.View animation='fadeInRightBig' duration={2000} >
          <View style={styles.header}>
            <Icon name="arrow-back-ios" size={28} onPress={this.props.navigation.goBack} />
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Favorites</Text>
          </View>
          <FlatList
              data={this.props.foods.foods}
              renderItem={renderFavoriteItem}
              keyExtractor={item => item.id.toString()}
          />
      </Animatable.View>

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
    height: 80,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  deleteView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  },
  deleteTouchable: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
    height: 80,
    justifyContent: 'center'
  },
  deleteText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
    width: 100
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
