import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../shared/colors';
import {SecondaryButton} from '../components/Button';
import { connect } from 'react-redux';
import { postFavorite, deleteFavorite } from '../../../redux/ActionCreators';

const mapStateToProps = state => {
  return {
      favorites: state.favorites
  };
};

const mapDispatchToProps = {
  postFavorite: foodId => (postFavorite(foodId)),
  deleteFavorite: foodId => (deleteFavorite(foodId))
};

class DetailsScreen extends Component {
  render() {
    const item = this.props.route.params;
    const favorite = this.props.favorites.includes(item.id);

    return (
      <SafeAreaView style={{backgroundColor: COLORS.white}}>
        <View style={style.header}>
          <Icon name="arrow-back-ios" size={28} onPress={this.props.navigation.goBack} />
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 280,
            }}>
            <Image source={item.image} style={{height: 250, width: 250}} />
          </View>
          <View style={style.details}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>
                {item.name}
              </Text>
              <View style={style.iconContainer}>
                <Icon 
                  name={favorite ? 'favorite' : 'favorite-border'}
                  color={COLORS.primary} size={25} 
                  onPress={() => favorite ? 
                    this.props.deleteFavorite(item.id) : this.props.postFavorite(item.id)}
                />
          
              </View>
            </View>
            <Text style={style.detailsText}>
              {item.description}
            </Text>
            <View style={{marginTop: 40, marginBottom: 40}}>
              <SecondaryButton title="Add To Cart" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
