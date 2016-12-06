import React, { Component } from 'react';
import {
    Text,
    View,
    Linking,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {googledistanceapi} from '../../api/googleapi.js';
import {getDistance} from '../../src/map_core';
import { Actions } from 'react-native-router-flux';



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
    this.props.dispatch({type: 'UPDATE_SElECTED_PARK', state: title});
    // this.props.navigator.push({name:'parkdetail'});
    Actions.parkdetail();
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
                image={require('../../img/map-pin@2x.png')}
                title={marker.title}
                description={marker.address_display + ' apx. ' + getDistance(this.props.coords.latitude, this.props.coords.longitude, marker.latlng.latitude, marker.latlng.longitude) + ' mi'}
                onCalloutPress={() => {this.onCalloutPress(marker.title)}}
            >
            </MapView.Marker>
             ))}
          </View>
    )
  }
};

// {/*<MapView.Callout style={styles.callout}>*/}
//   {/*<View>*/}
//     {/*<View style={styles.top}>*/}
//       {/*<Text style={styles.title}>{marker.title}</Text>*/}
//       {/*<Text style={styles.distance}>{getDistance(this.props.coords.latitude, this.props.coords.longitude, marker.latlng.latitude, marker.latlng.longitude) + 'mi'}</Text>*/}
//     {/*</View>*/}
//     {/*<Text style={styles.address}>{marker.address_display}</Text>*/}
//   {/*</View>*/}
// {/*</MapView.Callout>*/}

var styles = StyleSheet.create({
    callout: {
        backgroundColor: '#fff',
        padding: 2,
        borderRadius: 2,
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        elevation: 4,
        shadowColor: 'rgba(0,0,0,.24)',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Source Sans Pro regular',
        fontSize: 14,
        color: '#131313',
        lineHeight: 23
    },
    address: {
        fontFamily: 'Source Sans Pro 200',
        fontSize: 12,
        color: '#5e5e5e',
        lineHeight: 23
    },
    distance: {
        color: '#f58120',
        fontSize: 14,
        fontFamily: 'Source Sans Pro regular',
        lineHeight: 23,
        marginLeft: 5
    }
});

const mapStateToProps = (state) => {
  return {
    coords: state.getIn(['map','location', 'coords']),
    markers: state.getIn(['map', 'location', 'parks'])
  }
}

export default connect(mapStateToProps)(ParkMarkers);
