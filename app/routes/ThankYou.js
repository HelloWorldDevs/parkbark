import React, { Component } from 'react';
import { View, Image, StyleSheet , Text} from 'react-native';
import { Actions } from 'react-native-router-flux';


const ThankYou = React.createClass ({
  componentDidMount: function () {
    setTimeout(this.changeScene, 3000)
  },

  render: function () {
    return (
          <View style={styles.imageContainer}>
            <Image source={require('../img/survey_pup@3x.png')}/>
          </View>
    );
  },

  changeScene: function () {
    if(this.props.suggestPark) {
      return Actions.popTo('map')
    }
    Actions.popTo('parkdetail');
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
