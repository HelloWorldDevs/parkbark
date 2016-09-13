import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';


class Map extends Component {
  render() {
    return (
      <View style={styles.mapContainer}>
      <MapView
          style={styles.map}
          initialRegion={this.props.coords}
          onRegionChangeComplete={this.onRegionChangeComplete}
      >
        {this.props.markers.map(marker => (
            <MapView.Marker
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
            />
        ))}
      </MapView>
    </View>
    )
  }


  onRegionChangeComplete(region) {
    console.log(region);
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
    coords: state.getIn(['location', 'coords']),
    markers: state.getIn(['location', 'markers'])
  }
}

export default connect(mapStateToProps)(Map);
