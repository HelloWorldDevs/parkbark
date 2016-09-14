import React, { Component } from 'react';
import { Map } from 'immutable';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {fetchParksAction} from '../src/core';



class SearchFieldComponent extends Component {
  render() {
    return (
        <View style={styles.fieldContainer}>
          {this.searchParksInput()}
          <TextInput onChangeText={this.handleChange.bind(this)} placeholder="Address, Zip, City" style={styles.input}/>
        </View>
    )
  }

  handleChange(text) {
    console.log(text);
    this.props.dispatch({
      type: 'UPDATE_SEARCH',
      state: Map({
        search: text
      })
    });
    console.log(this.props);
  }

  searchParksInput() {
    return <TouchableOpacity
        underlayColor="gray"
        onPress={this.fetchParks.bind(this)}>
      <Image source={require('../img/search.png')} style={styles.searchIcon}/>
    </TouchableOpacity>
  }

  fetchParks() {
    console.log(this.props);
    // fetchLocationAction().done((state) => {
    //   this.props.dispatch({type: 'UPDATE_REGION', state: state});
    // });
  }
}



var styles = StyleSheet.create({
  fieldContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    paddingTop: 10,
    paddingBottom: 10
  },
  searchIcon: {
    marginRight: 5
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 300
  }
});

const mapStateToProps = (state) => {
  return {
       state: state,
       search: state.getIn(['search', 'search'])
    // coords: state.getIn(['location', 'coords']),
    // markers: state.getIn(['location', 'markers'])
  };
}

export default connect(mapStateToProps)(SearchFieldComponent);

