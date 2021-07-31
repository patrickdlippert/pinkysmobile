import React, { Component } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text,  View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import COLORS from '../../../shared/colors';
import MapView, { Marker } from 'react-native-maps';

const mapStateToProps = state => {
    return {
        locations: state.locations
    };
  };



class MapScreen extends Component {
  
    

  render() {
    const mapRegion = {
        latitude: 47.037872,
        longitude: -122.900696,
        latitudeDelta: 0.1844,
        longitudeDelta: 0.0842,
      };
    
    return (
        <SafeAreaView style={{backgroundColor: COLORS.lighter, flex: 1}}>
            <View style={styles.header}>
                <Icon name="arrow-back-ios" size={28} onPress={this.props.navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Map</Text>
            </View>
            <View style={styles.container}>
                <MapView
                    style={{ alignSelf: 'stretch', height: '100%' }}
                    region={mapRegion}
                >
                {this.props.locations.locations.map((location, index) => (
                    <Marker
                        key={index}
                        coordinate= {location.latlng}
                        title={location.title}
                        description={location.description}
                        image={location.image}
                    />
                ))}

                </MapView>
            </View>
        </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.secondary
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 40,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.secondary,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, null)(MapScreen);
