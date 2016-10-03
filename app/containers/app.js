import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Navigator from '../navigation/Navigator';



class App extends Component {

  render() {
    return (
        <Navigator />
    );
  }
};



var styles = StyleSheet.create({
  coords: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24
  },
});

//
const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(App);
