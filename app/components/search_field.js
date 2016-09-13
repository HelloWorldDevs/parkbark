import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {fetchParksAction} from '../src/core';



class SearchFieldComponent extends Component {
  render() {
    return (
        <View style={styles.fieldContainer}>
          {this.searchParksInput()}
          <TextInput placeholder="Search for dog parks near..." style={styles.input}/>
        </View>
    )
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
    fetchParksAction().done((state) => {
      this.props.dispatch({type: 'UPDATE_ANNOTATIONS', state: state});
    });
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
    // coords: state.getIn(['location', 'coords']),
    // markers: state.getIn(['location', 'markers'])
  };
}

export default connect(mapStateToProps)(SearchFieldComponent);

