import  React, {Component} from 'react';
import {View, TouchableOpacity, Text, Animated, Easing} from 'react-native';
import { connect } from 'react-redux';
import Card from './common/Card.js';
import CardSection from './common/CardSection.js'


export default class FilterDetail extends Component {

  //assigns colorValue for animation on component mount depending on staged or selected
  componentWillMount() {
    const { staged, selected } = this.props.currentFilter;
    if (selected || staged === 'add') {
      this.colorValue = new Animated.Value(1);
    } else {
      this.colorValue = new Animated.Value(0);
    }
  }



  //colorFade in or out depending on staged or selected props
  colorFade() {
    const { staged, selected } = this.props.currentFilter;
    if (!staged || staged === 'remove') {
      Animated.timing(
          this.colorValue,
          {
            toValue: 1,
            duration: 500,
            easing: Easing.elastic(1)
          }
      ).start()
    }
    if(staged === 'add' || selected) {
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


  //adds staged for add or remove prop to park amenity object in immutable state.
  onPress() {
      const {currentFilterIndex} = this.props;
      const { staged, selected } = this.props.currentFilter;
      if(!staged || staged === 'remove') {
        this.props.dispatch({type: 'ADD_STAGED_FILTER', state: currentFilterIndex});
      }
      if(staged === 'add' || selected) {
        this.props.dispatch({type: 'REMOVE_STAGED_FILTER', state: currentFilterIndex});
      }
      this.colorFade();
  }



  render() {
    //double check for staged or selected on re-render
    const { staged, selected } = this.props.currentFilter;
    if(!staged && !selected) {
      Animated.timing(
          this.colorValue,
          {
            toValue: 0,
            duration: 500,
            easing: Easing.elastic(1)
          }
      ).start();
    }
    const color = this.colorValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#5e5e5e', '#ef3a39']
    });
    const backgroundColor = this.colorValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#fff', '#ef3a39']
    });
    return (
        <View>
            <TouchableOpacity
                disabled={this.props.disabled}
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
    currentFilterIndex: state.getIn(['filter','amenities']).toJS().findIndex(a => a['name'] === ownProps.filter),
    currentFilter: state.getIn(['filter','amenities']).toJS().find((a) => a['name'] === ownProps.filter)
  }
}

export default connect(mapStateToProps)(FilterDetail);