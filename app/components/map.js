import React, { Component } from 'react';
import {
    View,
    MapView,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';


class Map extends Component {
  log(){
    console.log(this.props.location);
  }
  render() {
    return (
      <View style={styles.mapContainer}>
      <MapView
          style={styles.map}
          region={{
            latitude: this.props.location.coords.latitude,
            latitudeDelta: 0.001,
            longitude: this.props.location.coords.latitude,
            longitudeDelta: 0.001
          }}
          type='MapView'
          ref='theMap'
          annotations={this.props.location.markers}
      >
      </MapView>
    </View>
    )
  }
  componentDidMount() {
    this.log();
  }
};

var styles = StyleSheet.create({
  mapContainer: {
    margin: 5,
    flex: 5,
    alignSelf: 'stretch',
    justifyContent : 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#008eff'
  },
  map: {
    position: 'absolute',
    // 'alignSelf': 'stretch',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    margin: 10,
    borderWidth: 1,
    borderColor: '#7ac4ff',
    borderRadius: 5
  },
})


const mapStateToProps = (state) => {
  return {
    location: state.get('location'),
  }
}

export default connect(mapStateToProps)(Map);
