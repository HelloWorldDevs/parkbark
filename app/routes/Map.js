import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    BackAndroid
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Loading from '../components/common/Loading';
import PositionMarker from '../components/map/PositionMarker';
import ParkMarkers from '../components/map/ParkMarkers';
import SearchField from '../components/search/Search_Field.js';
import {updateParksAction} from '../src/map_core';
import {updateParksByFilterAction} from '../src/filter_core';
import ParkList from '../components/park_list/ParkList.js'
import { Actions } from 'react-native-router-flux';
import networkAlert from '../components/common/NetworkAlert';



class ParkMap extends Component {

  componentWillMount() {
    this.annotationUpdate(this.props.coords);
  }

  showFilters() {
    Actions.filterlist();
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchField onPress={this.showFilters.bind(this)}/>
        <View style={styles.mapContainer}>
          <Loading />
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
            <ParkMarkers/>
          </MapView>
        </View>
        <ParkList />
    </View>
    )
  }


  regionShow() {
    this.props.dispatch({type:'MAP_HIDE', state: true});
  }


  annotationUpdate(region) {
    this.props.dispatch({type: 'SET_LOADING', state: true});
    this.props.dispatch({type:'RECORD_LOCATION', state: region});
    this.regionShow();
    const dist = Math.ceil(region.latitudeDelta * 69/2);
    const coords = region.latitude + 0.1E-3 + ',' + (region.longitude - -0.1E-3);
    if (!this.props.filterSet) {
      updateParksAction(coords, dist).done((parks) => {
        if (!parks) {
          return networkAlert.checkConnection();
        }
        this.props.dispatch({type: 'UPDATE_ANNOTATIONS', state: parks});
        this.props.dispatch({type: 'SET_LOADING', state: false});
      });
    } else if (this.props.filterSet) {
      updateParksByFilterAction(coords, dist, this.props.filterQuery).done((parks) => {
        if (!parks) {
          return networkAlert.checkConnection();
        }
        this.props.dispatch({type: 'UPDATE_ANNOTATIONS', state: parks});
        this.props.dispatch({type: 'SET_LOADING', state: false});
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
    zIndex: 0,
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
