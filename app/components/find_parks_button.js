import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';



export default class FindParksButton extends Component {
  render(){
    return (
        <View style={styles.buttonWrapper}>
          {this.parksButton()}
        </View>
    )
  }

  parksButton(){
   return <TouchableHighlight
            style={styles.button}
            underlayColor="gray"
            onPress={this._fetchParks}>
             <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
               Search
               Parks
             </Text>
          </TouchableHighlight>
  }

  _fetchParks(){
    fetch('http://parkbark-api.bfdig.com/parks', {
      method: 'get',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
        .then(function(res) {
          return res.json();
        })
        .then(function(resJson) {
          console.log(resJson);
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
  }
}

var styles = StyleSheet.create({
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
})

