import  React, {Component} from 'react';
import {View, TouchableOpacity, Text, Animated, Easing} from 'react-native';
import { connect } from 'react-redux';
import Card from './common/Card.js';
import CardSection from './common/CardSection.js'


export default class FilterDetail extends Component {
  constructor(props) {
    super(props)
    if (this.props.currentFilter.selected) {
      this.colorValue = new Animated.Value(1);
    } else {
      this.colorValue = new Animated.Value(0);
    }
  }

  colorFade() {
    if (!this.props.currentFilter.selected) {
      Animated.timing(
          this.colorValue,
          {
            toValue: 1,
            duration: 500,
            easing: Easing.elastic(1)
          }
      ).start()
    } else {
      Animated.timing(
          this.colorValue,
          {
            toValue: 0,
            duration: 500,
            easing: Easing.elastic(1)
          }
      ).start();
    }
  }

  onPress(){
    if(!this.props.currentFilter.selected) {
      this.props.dispatch({type: 'ADD_FILTER', state: this.props.currentFilterIndex});
    }
    else {
      this.props.dispatch({type: 'REMOVE_FILTER', state: this.props.currentFilterIndex});
    }
    this.colorFade();
  }

  render() {
    const color = this.colorValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#5e5e5e', '#ef3a39']
    });

    const backgroundColor = this.colorValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#fff', '#ef3a39']
    })
    return (
        <View>
            <TouchableOpacity
                onPress={this.onPress.bind(this)}>
              <Card>
                  <Animated.Text  style={{color}} >{this.props.filter}</Animated.Text>
                  <Animated.Image style={{backgroundColor, borderRadius: 10, width: 20, height: 20}} source={require('../img/Ok@3x.png')} />
              </Card>
          </TouchableOpacity>
        </View>
    )
  }

}

const styles = {
  filterButton: {
    // flex: 1,
    // alignItems: 'stretch',
    // borderWidth: 1
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    currentFilterIndex: state.get('amenities').toJS().findIndex(a => a['name'] === ownProps.filter),
    currentFilter: state.get('amenities').toJS().find((a) => a['name'] === ownProps.filter)
  }
}

export default connect(mapStateToProps)(FilterDetail);