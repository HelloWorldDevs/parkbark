import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet , Text, Image} from 'react-native';

export default class Button extends Component {

  componentDidMount() {
    // console.log('text ', this.props.text);
  }

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
        flexDirection: 'column'
      },
      buttonText: {
        alignSelf: 'center',
        fontSize: this.props.fontSize,
        color: this.props.textColor,
        fontFamily: this.props.font,
        marginTop: 3
    },
    buttonIcon: {
        alignSelf: 'center',
        height: 12,
        width: 15,
        marginTop: 0
    }
    }

    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'#fff'}
        onPress={this.props.onPress}
    >
        <Image source={this.props.bgimage}>
            <Text style={styles.buttonText}>{this.props.text}</Text>
            <Image style={styles.buttonIcon} source={this.props.icon} />
        </Image>
      </TouchableHighlight>
    );
  }

}
