import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';


class ParkMarkers extends Component {
  componentWillMount() {
    console.log('parkMarkersMount!')
  }

  render() {
    return (
        <View>
          {this.props.markers.map((marker, i)=> (
            <MapView.Marker
                key={marker.title}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.address_display + ' ' + marker.distance}
                image={require('../img/map-pin@2x.png')}
            />))}
          </View>
    )
  }

};



const mapStateToProps = (state) => {
  return {
    markers: state.getIn(['map', 'location', 'parks'])
  }
}

export default connect(mapStateToProps)(ParkMarkers);