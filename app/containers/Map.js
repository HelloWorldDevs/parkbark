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
import {updateParksByFilterAction} from '../src/filter_core';
import ParkList from '../components/ParkList.js';


class ParkMap extends Component {

    componentDidMount() {
        console.log(this.props)
        console.log(this.props.filterSet)
    }

  componentWillReceiveProps(props) {
      // console.log('recieving props', props)
    }

  showFilters(){
    this.props.navigator.push({name: 'filterlist'});
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchField onPress={this.showFilters.bind(this)}/>
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
    if(this.props.selectedFilters) {
      console.log(this.props.selectedFilters)
    }
  }


  annotationUpdate(region) {
    console.log(this.props.coords);
    this.props.dispatch({type:'RECORD_LOCATION', state: region})
    this.regionShow();
    const dist = Math.ceil(region.latitudeDelta * 69/2);
    const coords = region.latitude + ',' + region.longitude;
    if (!this.props.filterSet) {
      updateParksAction(coords, dist).done((state) => {
        console.log('updateParksAction DONE!')
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
    filterQuery: state.getIn(['filter','filter-query'])
  }
}

export default connect(mapStateToProps)(ParkMap);
