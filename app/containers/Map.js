import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import PositionMarker from '../components/PositionMarker';
import SearchField from '../components/Search_Field.js';
import {updateParksAction} from '../src/map_core';
import ParkList from '../components/ParkList.js';


class ParkMap extends Component {

    componentDidMount() {
        console.log(this.props)
    }

  render() {
    return (
      <View style={styles.container}>
        <SearchField navigator={this.props.navigator}/>
        <View style={styles.mapContainer}>
        <MapView
            ref={ref => { this.map = ref; }}
            style={styles.map}
            region={this.props.coords}
            onPress={this.regionShow.bind(this)}
            onRegionChange={this.regionUpdate.bind(this)}
            onRegionChangeComplete={this.annotationUpdate.bind(this)}
        >
          <PositionMarker/>
          {this.props.markers.map((marker, i)=> (
              <MapView.Marker
                  key={i}
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.address_display + ' ' + marker.distance}
              />
          ))}
        </MapView>
      </View>
        <ParkList navigator={this.props.navigator}/>
    </View>
    )
  }

//  image={require('../img/map-pin@2x.png')}


//onPress={this.scrollToMarker.bind(this)}
//
// scrollToMarker(region) {
//     // this.map.animateToCoordinate(region.nativeEvent.coordinate, 100);
//   }

  regionShow() {
    this.props.dispatch({type:'MAP_HIDE', state: true})
  }

  regionUpdate(region) {
      this.props.dispatch({
        type: 'UPDATE_REGION',
        state: region
      });
  }

  annotationUpdate(region) {
    setTimeout(()=> {
      // console.log('updating annotations');
      var DIST = Math.ceil(this.props.coords.latitudeDelta * 69/2);
      var LAT = this.props.coords.latitude;
      var LNG = this.props.coords.longitude;
      // console.log('lat: ' + LAT, 'long: ' + LNG, 'dist: ' + DIST);
      updateParksAction(LAT , LNG, DIST).done((state) => {
        this.props.dispatch({type: 'UPDATE_ANNOTATIONS', state: state});
      });
    }, 2000)
  }

};

var styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
  },
  mapContainer: {
    marginLeft: 0,
    marginRight: 0,
    flex: 5,
    alignSelf: 'stretch',
    justifyContent : 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
})


const mapStateToProps = (state) => {
  return {
    coords: state.getIn(['map','location', 'coords']),
    position: state.getIn(['map','position']),
    markers: state.getIn(['map', 'location', 'parks'])
  }
}

export default connect(mapStateToProps)(ParkMap);
