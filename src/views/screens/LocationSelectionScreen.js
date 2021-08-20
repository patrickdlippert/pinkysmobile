import React, { Component } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text,  View, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import COLORS from '../../../shared/colors';
import { selectLocation } from '../../../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        locations: state.locations
    };
  };

  const mapDispatchToProps = {
    selectLocation: location => (selectLocation(location))
  };
  

class LocationSelectionScreen extends Component {

    handleLocation = (location) => {
        this.props.selectLocation(location);  
        //this.props.navigation.navigate('Home');
    }
    

  render() {
    const LocationCard = ({item}) => {
        let selected = (this.props.locations.selectedLocation == item); 

        
        return (
        <TouchableOpacity
            onPress={() => this.handleLocation(item)} > 
          <View style={selected ? styles.locationCard : styles.locationCardNS}>
                <Image source={item.image} style={{height: 80, width: 80}} />
                <Icon name="navigation" color={COLORS.primary} size={28} />
                <View
                style={{
                    height: 140,
                    marginLeft: 10,
                    paddingVertical: 20,
                    flex: 1,
                }}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>{item.title}</Text>
                    <Text style={{fontSize: 13, color: COLORS.dark}}>{item.description}</Text>
                    <Text style={{fontSize: 13, color: COLORS.grey}}>{item.address}</Text>
                    <Text style={{fontSize: 13, color: COLORS.grey}}>Open: {item.open} Close: {item.close}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 16}} onPress={() =>this.props.navigation.navigate('Home')}>ORDER FROM HERE</Text>
                </View>

            </View>
          </TouchableOpacity>
        );
      };
    console.log(this.props.locations);
    return (
        <SafeAreaView style={{backgroundColor: COLORS.lighter, flex: 1}}>
            <View style={styles.header}>
                <Icon name="arrow-back-ios" size={28} onPress={this.props.navigation.goBack} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Locations</Text>
            </View>

            {this.props.locations.locations.length ? 
                <Animatable.View animation='fadeInRightBig' duration={1500} >
                <Text style={{fontSize: 20, marginLeft: 20, fontWeight: 'bold'}}>Select a location</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 80}}
                    data={this.props.locations.locations}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <LocationCard item={item} />}
                />
                </Animatable.View>

            : 

                <View style={styles.textContainer}>
                    <Text style={styles.textItem}>There are no Pinky's locations near you.</Text>
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
    // Card when the location is selected
    locationCard: {
      height: 140,
      elevation: 15,
      borderRadius: 10,
      backgroundColor: COLORS.secondary,
      marginVertical: 10,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    // Card when location is not selected
    locationCardNS: {
        height: 140,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.light,
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationSelectionScreen);
