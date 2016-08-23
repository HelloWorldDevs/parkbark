import React, { Component } from 'react';
import {
    View,
    MapView,
    StyleSheet
} from 'react-native';
import makeStore from '../redux/store';
import reducer from '../redux/reducer';

const store = makeStore(reducer);

store.dispatch({
  type: 'SET_LOCATION',
  state: {
    coords: {
      latitude: 45.513752,
      longitude: -122.661654
    },
    markers: {
      latitude: 45.513752,
      longitude: -122.661654
    }
  }
});

console.log(store.getState());
console.log(store.get(location.coords.markers));


export default class Map extends Component {
  render() {
    return <View style={styles.mapContainer}>
      <MapView
          style={styles.map}
          region={{
            latitude: 45.513752,
            latitudeDelta: 0.001,
            longitude: 122.661654,
            longitudeDelta: 0.001
          }}
          type='MapView'
          ref='theMap'

      >
      </MapView>
    </View>
  }
};

var styles = StyleSheet.create({
  mapContainer: {
    margin: 5,
    flex: 5,
    alignSelf: 'stretch',
    justifyContent : 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#008eff'
  },
  map: {
    position: 'absolute',
    // 'alignSelf': 'stretch',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    margin: 10,
    borderWidth: 1,
    borderColor: '#7ac4ff',
    borderRadius: 5
  },
})

