import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import SearchField from '../components/Search_Field.js';
import {updateParksAction} from '../src/core';
import ParkList from '../components/ParkList.js';


class Map extends Component {

  render() {
    return (
      <View style={styles.container}>
        <SearchField navigator={this.props.navigator}/>
        <View style={styles.mapContainer}>
        <MapView
            ref={ref => { this.map = ref; }}
            style={styles.map}
            region={this.props.coords}
            onRegionChange={this.regionUpdate.bind(this)}
            onRegionChangeComplete={this.annotationUpdate.bind(this)}
        >
          {this.props.markers.map((marker)=> (
              <MapView.Marker
                  key={marker.title}
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.address_display + ' ' + marker.distance}
                  image={require('../img/marker_blue.png')}
              />
          ))}
        </MapView>
      </View>
        {this.parkListRender()}
    </View>
    )
  }


//onPress={this.scrollToMarker.bind(this)}

scrollToMarker(region) {
    this.map.animateToCoordinate(region.nativeEvent.coordinate, 100);
  }


  regionUpdate(region){
    console.log('updating region')
      this.props.dispatch({
        type: 'UPDATE_REGION',
        state: region
      });
  }

  annotationUpdate(region){
    setTimeout(()=>{
      console.log('updating annotations');
      var DIST = Math.ceil(this.props.coords.latitudeDelta * 69/2);
      var LAT = this.props.coords.latitude;
      var LNG = this.props.coords.longitude;
      console.log('lat: ' + LAT, 'long: ' + LNG, 'dist: ' + DIST);
      updateParksAction(LAT , LNG, DIST).done((state) => {
        this.props.dispatch({type: 'UPDATE_ANNOTATIONS', state: state});
      });
    }, 2000)
  }

  parkListRender(){
    return(
        <ParkList navigator={this.props.navigator}/>
    )
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
    borderColor: '#008eff'
  },
  mapContainer: {
    // margin: 5,
    // marginTop: 5,
    // marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,
    flex: 5,
    alignSelf: 'stretch',
    justifyContent : 'center',
    alignItems: 'center',
    // borderWidth: 2,
    borderColor: '#008eff'
  },
  map: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    // margin: 10,
    borderWidth: 1,
    borderColor: '#7ac4ff',
    borderRadius: 5
  },
})


const mapStateToProps = (state) => {
  return {
    coords: state.getIn(['location', 'coords']),
    markers: state.getIn(['location', 'parks'])
  }
}

export default connect(mapStateToProps)(Map);
