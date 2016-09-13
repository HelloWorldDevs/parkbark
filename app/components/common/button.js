import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet , Text} from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'gray'}
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }

}


var styles = StyleSheet.create({

  button: {
    backgroundColor: '#E79C23',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
    marginTop: 20
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 15,
  }

});