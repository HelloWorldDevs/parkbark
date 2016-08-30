import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Map from '../components/map';
import FindParksButton from '../components/find_parks_button';



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
          </Text>
          <FindParksButton/>
        </View>
    );
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
  },
  coords: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24
  },
});
