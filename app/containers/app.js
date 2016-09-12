import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Map from './map';
import FindParksButton from '../components/find_parks_button';
import { connect } from 'react-redux';
import {fetchParksAction} from '../src/core';



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
          <FindParksButton fetchParks={this.fetchParks.bind(this)}/>
        </View>
    );
  }

  fetchParks() {
    // console.log(this.props);
    fetchParksAction().done((state) => {
      this.props.dispatch({type: 'UPDATE_ANNOTATIONS', state: state});
      // console.log(this.props);
    });
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


const mapStateToProps = (state) => {
  return {
    coords: state.getIn(['location', 'coords']),
    markers: state.getIn(['location', 'markers'])
  };
}

export default connect(mapStateToProps)(App);