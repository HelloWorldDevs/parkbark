import React, { Component } from 'react';
import { View, Image, StyleSheet , Text} from 'react-native';
import TimerMixin from 'react-timer-mixin';


const ThankYou = React.createClass ({
  mixins: [TimerMixin],
  componentDidMount: function () {
    this.setTimeout(this.changeScene, 7000)
  },

  render: function () {
    return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={require('../img/survey-pup@2x.png')}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} type="text">Thank You!.</Text>
          </View>
        </View>
    );
  },

  changeScene: function () {
    console.log('push map')
    this.props.navigator.push({name: 'map'});
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  imageContainer: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    padding: 1
  },
  title: {
    color: '#f0382c',
    fontSize: 30,
    fontWeight: "200"
  },
  text: {
    color: "#f0382c"
  }
});


export default ThankYou;
