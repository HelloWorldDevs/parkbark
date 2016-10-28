import React, { Component } from 'react';
import { Map } from 'immutable';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {fetchLocationAction} from '../src/search_core';
import {googleapi} from '../api/googleapi.js';




class SearchFieldComponent extends Component {
  render() {
    return (
        <View style={styles.fieldContainer}>
          <View style={styles.inputWrapper}>
            {this.searchParksInput()}
            <TextInput onChangeText={this.handleChange.bind(this)} placeholder="Address, Zip, City" style={styles.input}/>
            {this.searchParksFilter()}
          </View>
        </View>
    )
  }

  handleChange(text) {
    console.log(text)
    this.props.dispatch({
      type: 'UPDATE_SEARCH',
      state: {
        search: text
      }
    });
  }

  searchParksInput() {
    return <TouchableOpacity
        underlayColor="gray"
        onPress={this.fetchParks.bind(this)}>
      <Image source={require('../img/magnify@3x.png')} style={styles.searchIcon}/>
    </TouchableOpacity>
  }

  searchParksFilter(){
   return <TouchableOpacity
        underlayColor="gray"
        onPress={this.showFilters.bind(this)}
        style={styles.filterIconWrapper}>
      <Image source={require('../img/empty_filter@3x.png')} style={styles.filterIcon}/>
    </TouchableOpacity>
  }


  showFilters(){
    this.props.navigator.push({name: 'filterlist'});
}

  fetchParks() {
    fetchLocationAction(this.props.search.search, googleapi).done((state) => {
      this.props.dispatch({type: 'UPDATE_REGION', state: state});
    });
  }
}



var styles = StyleSheet.create({
  fieldContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    zIndex: 1,
    top: 20,
    left: 0,
    right: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  inputWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1
  },
  searchIcon: {
    marginRight: 5
  },
  filterIconWrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 1
  },
  filterIcon: {
    marginLeft: 5
  },
  input: {
    width: 250,
    fontSize: 16,
    paddingTop: 0,
    paddingBottom: 0
  }
});

const mapStateToProps = (state) => {
  return {
       search: state.getIn(['search', 'search'])
  };
}

export default connect(mapStateToProps)(SearchFieldComponent);
