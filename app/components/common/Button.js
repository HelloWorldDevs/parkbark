import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet , Text} from 'react-native';

export default class Button extends Component {
  render() {
    const styles = {
      button: {
        backgroundColor: this.props.bgcolor,
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
    }

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


