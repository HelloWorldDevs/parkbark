import React, { Component } from 'react';
import { View, Image, StyleSheet , Text, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import Button from '../components/common/Button.js';
import {fetchAmenitiesAction} from '../src/map_core';


const Landing = React.createClass ({

  componentWillMount: function() {
    //TODO: Set notifications set check for android.
    if (Platform.OS === 'ios') {
      PushNotification.checkPermissions((response) => {
        for (var item in response) {
          if (response[item]) {
            this.props.dispatch({type: 'SET_NOTIFICATIONS', state: true})
            break
          }
        }
      })
    }
  },

  componentDidMount: function() {
    console.log(this.props);
    fetchAmenitiesAction().done((amenities) => this.props.dispatch({type: 'SET_AMENITIES', state: amenities}));
  },
  render:function() {
    return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Text style={styles.title}>Welcome to Park Bark</Text>
            <Image source={require('../img/welcomePup@2x.png')}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} type="text">Find dog parks near you.</Text>
            <Text style={styles.text}>
              Looking for just the perfect place to let your dog run free? Fenced? Water available? We've got all of the
              details you're looking for.
            </Text>
            <Button bgcolor={'#E79C23'} text={' --> '} onPress={this.onNextPress}/>
          </View>
        </View>
    );
  },

  onNextPress: function() {
    // console.log(this.props);

    if (this.props.notificationState) {
      this.props.navigator.push({name: 'map'});
    } else {
      this.props.navigator.push({name: 'features'});
    }
},

})


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#008eff',
    backgroundColor: '#F1F1F1'
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
    color: '#E79C23',
    fontSize: 30,
    fontWeight: "200"

  },
  text: {
    color: "#8E8E8E"
  }
});


const mapStateToProps = (state) => {
  return {
    state: state,
    markers: state.getIn(['map', 'location', 'parks']),
    notificationState: state.getIn(['core','notifications'])
  }
}

export default connect(mapStateToProps)(Landing);