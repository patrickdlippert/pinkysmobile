import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import COLORS from '../../../shared/colors';


const mapStateToProps = state => {
  return {
      flavors: state.flavors
  };
};


class FlavorsScreen extends Component {
 
  render() {
    const FlavorCard = ({item}) => {
      return (
        <View style={styles.flavorCard}>
          <Image source={item.image} style={{height: 120, width: 80}} />
          <View
            style={{
              height: 200,
              marginLeft: 10,
              paddingVertical: 20,
              flex: 1,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
            <Text style={{fontSize: 13, color: COLORS.grey}}>{item.description}</Text>
          </View>
        </View>
      );
    };


    

      return (
        <SafeAreaView style={{backgroundColor: COLORS.lighter, flex: 1}}>
          <View style={styles.header}>
            <Icon name="arrow-back-ios" size={28} onPress={this.props.navigation.goBack} />
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Flavors</Text>
          </View>

          {this.props.flavors.flavors.length ? 
            <Animatable.View animation='fadeInRightBig' duration={1500} >
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 80}}

              data = {this.props.flavors.flavors}
              keyExtractor={item => item.id.toString()}

              renderItem={({item}) => <FlavorCard item={item} />}
              ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
              ListFooterComponent={() => (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 15,
                    }}>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 15,
                    }}>
                  </View>
                </View>
              )}
            />
            </Animatable.View>

            : 

            <View style={styles.textContainer}>
                <Text style={styles.textItem}>No current flavors</Text>
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
  flavorCard: {
    height: 200,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
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

export default connect(mapStateToProps, null)(FlavorsScreen);
