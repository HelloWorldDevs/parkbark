import React, { Component } from 'react';
import {
    Text,
    View,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {googledistanceapi} from '../api/googleapi.js';
import {getDistance} from '../src/map_core';



class ParkMarkers extends Component {
  constructor() {
    super();
    this.onCalloutPress.bind(this);
    this.selectedMarker = {};
    this.state = {selected: null}
  }

  componentDidUpdate() {
    if(this.state.selected !== null && this.selectedMarker[this.state.selected] !== null) {
      this.selectedMarker[this.state.selected].showCallout();
    }
  }

  onCalloutPress(title) {
    console.log(this.props);
    this.props.dispatch({type: 'UPDATE_SElECTED_PARK', state: title});
    this.props.navigator.push({name:'parkdetail'});
  }

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
                onCalloutPress={() => {this.onCalloutPress(marker.title)}}
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