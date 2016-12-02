import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    BackAndroid
} from 'react-native';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import PositionMarker from '../components/map/PositionMarker';
import ParkMarkers from '../components/map/ParkMarkers';
import SearchField from '../components/search/Search_Field.js';
import {updateParksAction} from '../src/map_core';
import {updateParksByFilterAction} from '../src/filter_core';
import ParkList from '../components/park_list/ParkList.js'
import { Actions } from 'react-native-router-flux';
import NetworkAlert from '../components/common/NetworkAlert';



class ParkMap extends Component {
  componentWillUnmount() {
    console.log(' map unmount')
  }

  componentDidMount() {
    console.log(this.props);
    if(this.props.type === "REACT_NATIVE_ROUTER_FLUX_RESET"){
      BackAndroid.addEventListener('hardwareBackPress', () => {
        Actions.landing({direction: 'leftToRight'});
         return true
        });
    }
  }

  showFilters() {
    // this.props.navigator.push({name: 'filterlist'});
    Actions.filterlist();
  }

  render() {
    return (
      <View style={styles.container}>
        <NetworkAlert />
        <SearchField onPress={this.showFilters.bind(this)}/>
        <View style={styles.mapContainer}>
        <MapView
            ref={ref => { this.map = ref; }}
            style={styles.map}
            region={this.props.coords}
            onPress={this.regionShow.bind(this)}
            onRegionChangeComplete={this.annotationUpdate.bind(this)}
            onRegionChange={this.regionShow.bind(this)}
            loadingEnabled={true}
        >
          <PositionMarker/>
          <ParkMarkers navigator={this.props.navigator}/>
        </MapView>
      </View>
        <ParkList navigator={this.props.navigator}/>
    </View>
    )
  }


  regionShow() {
    this.props.dispatch({type:'MAP_HIDE', state: true})
  }


  annotationUpdate(region) {
    // console.log(this.props.coords);
    this.props.dispatch({type:'RECORD_LOCATION', state: region})
    this.regionShow();
    const dist = Math.ceil(region.latitudeDelta * 69/2);
    // console.log(region.latitude, region.longitude);
    const coords = region.latitude + 0.1E-3 + ',' + (region.longitude - -0.1E-3);
    // console.log(coords);
    if (!this.props.filterSet) {
      updateParksAction(coords, dist).done((state) => {
        this.props.dispatch({type: 'UPDATE_ANNOTATIONS', state: state});
      });
    } else if (this.props.filterSet) {
      updateParksByFilterAction(coords, dist, this.props.filterQuery).done((state) => {
        this.props.dispatch({type: 'UPDATE_ANNOTATIONS', state: state});
      })
    }
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
    filterSet: state.getIn(['filter','filter-set']),
    filterQuery: state.getIn(['filter','filter-query']),
  }
}

export default connect(mapStateToProps)(ParkMap);
