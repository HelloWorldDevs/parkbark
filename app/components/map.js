import React, { Component } from 'react';
import {
  View,
  MapView,
  StyleSheet


export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        coords: {
          latitude: 45.513752,
          longitude: -122.661654
        }
      },
      markers: [{
        latitude: 45.513752,
        longitude: -122.661654,
        title: 'Howe is here!',
        subtitle: 'Come see us!',
        description: 'Come see us!'
      }]
    }
  }

  render() {
    <View style={styles.mapContainer}>
      <MapView
          style={styles.map}
          region={{
            latitude: this.state.position.coords.latitude,
            latitudeDelta: 0.001,
            longitude: this.state.position.coords.longitude,
            longitudeDelta: 0.001
          }}
          type="MapView"
          ref="theMap"
          annotations={this.state.markers}
      >
      </MapView>
    </View>
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            position: {
              coords: {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude)
              }
            },
            markers: [{
              latitude: parseFloat(position.coords.latitude),
              longitude: parseFloat(position.coords.longitude)
            }]
          });
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition((position) => {
      this.setState({
        position: {
          coords: {
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude)
          }
        },
        markers: [{
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude)
        }]
      });
      ;
    });
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

