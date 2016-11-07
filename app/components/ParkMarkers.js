import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {googledistanceapi} from '../api/googleapi.js';
import {getDistance} from '../src/map_core';



class ParkMarkers extends Component {
  constructor() {
    super();
    this.selectedMarker = {};
    this.state = {selected: null}
  }

  componentDidUpdate() {
    // console.log(this.state);
    // console.log(this.selectedMarker[this.state.selected]);
    if(this.state.selected !== null && this.selectedMarker[this.state.selected] !== null) {
      this.selectedMarker[this.state.selected].showCallout();
    }
  }

  // retrieveDistance(startlat, startlng, markerlat, markerlng) {
  //   fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${startlat},${startlng}&destinations=${markerlat},${markerlng}&key=${googledistanceapi}`)
  //       .then(function(res) {
  //         return res.json();
  //       })
  //       .then(function(resJson) {
  //         if(resJson){
  //          console.log(resJson.rows[0].elements[0].distance.text);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       })
  // }

  render() {
    return (
        <View>
          {this.props.markers.map((marker, i)=> (
            <MapView.Marker
                ref={(ref) => { this.selectedMarker[marker.title] = ref }}
                onPress={() => {
                  this.setState({selected: marker.title})
                }}
                key={marker.title}
                coordinate={marker.latlng}
                image={require('../img/map-pin@2x.png')}
                title={marker.title}
                description={marker.address_display + ' approx ' + getDistance(this.props.coords.latitude, this.props.coords.longitude, marker.latlng.latitude, marker.latlng.longitude) + 'mi'}
            />
             ))}
          </View>
    )
  }
};


const mapStateToProps = (state) => {
  return {
    coords: state.getIn(['map','location', 'coords']),
    markers: state.getIn(['map', 'location', 'parks'])
  }
}

export default connect(mapStateToProps)(ParkMarkers);