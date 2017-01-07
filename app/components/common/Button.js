import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet , Text, Image} from 'react-native';

export default class Button extends Component {

  render() {
    const styles = {
      button: {
        backgroundColor: this.props.bgcolor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: this.props.alignSelf,
        borderRadius: 15,
        padding: 5,
        margin: 10,
        flexDirection: 'column',
      },
      wrapper: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center'
      },
      buttonText: {
        alignSelf: 'center',
        fontSize: this.props.fontSize,
        color: this.props.textColor,
        fontFamily: this.props.font,
        marginTop: 0
    },
      buttonIcon: {
        alignSelf: 'center',
        minHeight: 12,
        minWidth: 15,
    }
    }

    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'transparent'}
        onPress={this.props.onPress}
    >
        <Image source={this.props.bgimage} style={styles.wrapper}>
            <Text style={styles.buttonText}>{this.props.text}</Text>
            <Image style={styles.buttonIcon} source={this.props.icon} />
        </Image>
      </TouchableHighlight>
    );
  }

}
