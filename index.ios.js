/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    MapView,
    TouchableHighlight
} from 'react-native';


class App extends Component {
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
      return (
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title} type="text">
              Park Bark
            </Text>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={{
                latitude: this.state.position.coords.latitude,
                latitudeDelta: 0.001,
                longitude: this.state.position.coords.longitude,
                longitudeDelta: 0.001
              }}
              type= "MapView"
              ref="theMap"
              annotations={this.state.markers}
             >
             </MapView>
           </View>
           <Text style={styles.coords}>
             {this.state.position.coords.latitude}, {this.state.position.coords.longitude}
           </Text>
           <View style={styles.buttonWrapper}>
            {this.findParks()}
           </View>
         </View>
      );
    }

    componentDidMount(){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          this.setState({
            position : {
              coords: {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude)
              }
            },
            markers : [{
              latitude : parseFloat(position.coords.latitude),
              longitude : parseFloat(position.coords.longitude)
            }]
          });
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      navigator.geolocation.watchPosition((position) => {
      this.setState({
        position : {
          coords: {
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude)
          }
        },
        markers : [{
          latitude : parseFloat(position.coords.latitude),
          longitude : parseFloat(position.coords.longitude)
        }]
      });;
     });
   }

  findParks(){
      return <TouchableHighlight
      style={styles.button}
      underlayColor="gray"
      onPress={this._onPressButton}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            See
            Dog
            Parks
          </Text>
      </TouchableHighlight>
  }

  _onPressButton(){
    console.log('yeahboy!')
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'green'
  },
  titleWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    margin: 5
  },
  title: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'orange'
    // marginTop: 20,
  },
  mapContainer: {
    margin: 5,
    flex: 5,
    alignSelf: 'stretch',
    justifyContent : 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'red'
  },
  coords: {
    // fontWeight: 'bold',
    fontSize: 20,
    // color: '#dddddd',
    textAlign: 'center',
    // alignSelf: 'flex-end',
    marginBottom: 24
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
    borderColor: 'yellow',
    borderRadius: 5
  },
  button: {
    borderWidth: 2,
    borderColor: 'purple',
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 1,
    // flexDirection: 'row',
    margin: 5,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue'
  }
});

AppRegistry.registerComponent('parkBark', () => App);
