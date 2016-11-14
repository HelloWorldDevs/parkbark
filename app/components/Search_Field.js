import React, { Component } from 'react';
import { Map } from 'immutable';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import { connect } from 'react-redux';
import {fetchLocationAction} from '../src/search_core';
import {googleapi} from '../api/googleapi.js';




class SearchFieldComponent extends Component {
  render() {
    return (
        <View style={styles.fieldContainer}>
          <View style={styles.inputWrapper}>
            {this.searchParksInput()}
            <TextInput
                onChangeText={this.handleChange.bind(this)} placeholder="Address, Zip, City" style={styles.input}
                onSubmitEditing={this.fetchParks.bind(this)}
            />
            {this.searchParksFilter()}
          </View>
        </View>
    )
  }

  handleChange(text) {
    this.props.dispatch({
      type: 'UPDATE_SEARCH',
      state: {
        search: text
      }
    });
  }

  searchParksInput() {
    return <TouchableOpacity
        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
        underlayColor="gray"
        onPress={this.fetchParks.bind(this)}>
      <Image source={require('../img/magnify@3x.png')} style={styles.searchIcon}/>
    </TouchableOpacity>
  }

  searchParksFilter(){
   return <TouchableOpacity
        underlayColor="gray"
        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
        onPress={this.props.onPress}
        style={styles.filterIconWrapper}>
      <Image source={require('../img/empty_filter@3x.png')} style={styles.filterIcon}/>
    </TouchableOpacity>
  }


  fetchParks() {
    if (this.props.search != undefined) {
      fetchLocationAction(this.props.search.search, googleapi).done((state) => {
        if (state === 'no location alert') {
          Alert.alert(
              'No Location Found',
              'Your location was not found, please try another search',
              [
                {text: 'OK', onPress: () => {return}},
              ]
          )
        } else {
          this.props.dispatch({type: 'UPDATE_REGION', state: state});
        }
      });
    }
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
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2 },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 2
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
    fontSize: 13,
    paddingTop: 0,
    paddingBottom: 0,
    color: '#5e5e5e',
    fontFamily: 'Source Sans Pro 200',
    lineHeight: 23
  }
});

const mapStateToProps = (state) => {
  return {
       search: state.getIn(['search', 'search'])
  };
}

export default connect(mapStateToProps)(SearchFieldComponent);
