import React, { Component } from 'react';
import { View, Image, StyleSheet , Text, Platform, PermissionsAndroid} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Button from '../components/common/Button.js';
import {fetchAmenitiesAction} from '../src/filter_core';


const Landing = React.createClass ({

  //overwrite default position and set parks in location state
  componentWillMount: function() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('get current position', position)
          this.props.dispatch({
            type: 'SET_LOCATION',
            state : Map({
              coords:{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: .1,
                longitudeDelta: .1
              },
              parks: []
            })
          });
          const userLatLng = {latitude: position.coords.latitude, longitude: position.coords.longitude};
          // console.log(userLatLng);
          this.props.dispatch({type: 'SET_POSITION', state: userLatLng})
        },
        (error) => {console.log(error)},
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
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
    fetchAmenitiesAction().done((amenities) => this.props.dispatch({type: 'SET_AMENITIES', state: amenities}));
  },
  render:function() {
    return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={require('../img/welcomePup@2x.png')}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} type="text">Find dog parks near you.</Text>
            <Text style={styles.text}>
              Looking for just the perfect place to let your dog run free? Fenced? Water available? We've got all of the
              details you're looking for.
            </Text>
            <Button bgimage={require('../img/orange-gradient.png')} icon={require('../img/forward-arrow@3x.png')} alignSelf={'center'} onPress={this.onNextPress}/>
          </View>
        </View>
    );
  },

  onNextPress: function() {
    if (this.props.notificationState || Platform.OS === 'android') {
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
    padding: 30
  },
  title: {
    color: '#F58120',
    fontSize: 48,
    fontFamily: 'Source Sans Pro 200',
    lineHeight: 56,
    paddingBottom: 15
  },
  text: {
    fontFamily: 'Source Sans Pro 200',
    color: '#5e5e5e',
    lineHeight: 23,
    fontSize: 16,
    marginBottom: 5,
  }
});


const mapStateToProps = (state) => {
  return {
    notificationState: state.getIn(['core','notifications'])
  }
}

export default connect(mapStateToProps)(Landing);
