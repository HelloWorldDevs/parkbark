import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class Survey extends Component {
    render() {
        return (
            <View style={styles.fieldContainer}>
            <Text>Hello World</Text>
            <TextInput />
            </View>
        )
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
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 300
  }
});

export default (Survey);
