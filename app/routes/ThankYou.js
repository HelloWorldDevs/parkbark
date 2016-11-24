import React, { Component } from 'react';
import { View, Image, StyleSheet , Text} from 'react-native';
import TimerMixin from 'react-timer-mixin';


const ThankYou = React.createClass ({
  mixins: [TimerMixin],
  componentDidMount: function () {
    this.setTimeout(this.changeScene, 8000)
  },

  render: function () {
    return (
          <View style={styles.imageContainer}>
            <Image source={require('../img/survey_pup@3x.png')}/>
          </View>
    );
  },

  changeScene: function () {
    console.log('push map')
    this.props.navigator.push({name: 'map'});
  },

});


var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default ThankYou;
