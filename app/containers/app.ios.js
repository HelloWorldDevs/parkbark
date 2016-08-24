import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    MapView,
    TouchableHighlight
} from 'react-native';
import Map from '../components/map';



export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title} type="text">
              Park Bark
            </Text>
          </View>
          <Map />
          <Text style={styles.coords}>
            {/*{this.state.position.coords.latitude}, {this.state.position.coords.longitude}*/}
          </Text>
          <View style={styles.buttonWrapper}>
            {this.findParks()}
          </View>
        </View>
    );
  }


  findParks(){
    return <TouchableHighlight
        style={styles.button}
        underlayColor="gray"
        onPress={this._onPressButton}>
      <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
        Search
        Parks
      </Text>
    </TouchableHighlight>
  }

  // _onPressButton(){
  //   fetch('', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       'location_lat': this.state.position.coords.latitude,
  //       'location_lat': this.state.position.coords.longitude
  //     })
  //   })
  //       .then(function(res) {
  //         return res.json();
  //       })
  //       .then(function(resJson) {
  //         console.log(resJson);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  // }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#008eff'
  },
  titleWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#7ac4ff',
    margin: 5
  },
  title: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#4f4f4f'
    // borderWidth: 1,
    // borderColor: 'orange'
    // marginTop: 20,
  },
  coords: {
    // fontWeight: 'bold',
    fontSize: 20,
    // color: '#dddddd',
    textAlign: 'center',
    // alignSelf: 'flex-end',
    marginBottom: 24
  },
  button: {
    borderWidth: 1,
    borderColor: '#1095ff',
    height: 75,
    width: 75,
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
    backgroundColor: '#e5e5e5',
    borderRadius: 6,
  }
});
