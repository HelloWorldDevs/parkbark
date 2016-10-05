import  React, {Component} from 'react';
import {View, TouchableOpacity, Text, Animated, Easing} from 'react-native';
import { connect } from 'react-redux';
import Card from './common/Card.js'
import CardSection from './common/CardSection.js'


export default class ParkListDetails extends Component {
  constructor(props) {
    super(props)
    this.colorValue = new Animated.Value(0);
    this.state = {
      red : false
    }
  }

  colorFade() {
    if (!this.state.red) {
      Animated.timing(
          this.colorValue,
          {
            toValue: 1,
            duration: 500,
            easing: Easing.elastic(1)
          }
      ).start()
      this.setState({red: true})
    } else {
      Animated.timing(
          this.colorValue,
          {
            toValue: 0,
            duration: 500,
            easing: Easing.elastic(1)
          }
      ).start();
      this.setState({red: false})
    }
  }

  onPress(){
    console.log('press');
    this.colorFade()
  }

  render() {
    const color = this.colorValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#5e5e5e', '#ef3a39']
    });

    return (
        <View>
            <Card>
                <Animated.Text onPress={this.onPress.bind(this)} style={{color, borderWidth: 1}} >{this.props.filter}</Animated.Text>
            </Card>
        </View>
    )
  }

}