import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import PositionMarker from '../components/PositionMarker';
import ParkMarkers from '../components/ParkMarkers';
import SearchField from '../components/Search_Field.js';
import {updateParksAction} from '../src/map_core';
import ParkList from '../components/ParkList.js';


class ParkMap extends Component {

    componentDidMount() {
        console.log(this.props)
    }

  componentWillReceiveProps(props) {
      // console.log('recieving props', props)
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
            onRegionChangeComplete={this.annotationUpdate.bind(this)}
        >
          <PositionMarker/>
          <ParkMarkers/>
        </MapView>
      </View>
        <ParkList navigator={this.props.navigator}/>
    </View>
    )
  }



//onPress={this.scrollToMarker.bind(this)}
//
// scrollToMarker(region) {
//     // this.map.animateToCoordinate(region.nativeEvent.coordinate, 100);
//   }

  regionShow() {
    this.props.dispatch({type:'MAP_HIDE', state: true})
  }

  annotationUpdate(region) {
      console.log('annotation update');
      console.log(region);
      var DIST = Math.ceil(region.latitudeDelta * 69/2);
      var LAT = region.latitude;
      var LNG = region.longitude;
      console.log('lat: ' + LAT, 'long: ' + LNG, 'dist: ' + DIST);
      updateParksAction(LAT , LNG, DIST).done((state) => {
        console.log('updateParksAction DONE!')
        this.props.dispatch({type: 'UPDATE_ANNOTATIONS', state: state});
      });
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
    coords: state.getIn(['map','location', 'coords'])
  }
}

export default connect(mapStateToProps)(ParkMap);
