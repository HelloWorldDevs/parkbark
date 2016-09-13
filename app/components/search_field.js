import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput} from 'react-native';



export default class SearchField extends Component {
  render() {
    return (
        <View style={styles.fieldContainer}>
          <Text><Image source={require('../img/search.png')} style={styles.searchIcon} /></Text>
          <Text><TextInput style={styles.input} /></Text>
        </View>
    )
  }
}


var styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  searchIcon: {
    margin: 5
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    width: 300
  }
});

