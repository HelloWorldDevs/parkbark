import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    Platform,
    BackAndroid,
    NetInfo,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import Button from '../components/common/Button.js';
import {fetchAmenitiesAction} from '../src/filter_core';
import networkAlert from '../components/common/NetworkAlert';




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
    fetchAmenitiesAction().done((amenities) => {
      if (!amenities) {
        return networkAlert.checkConnection();
      }
      this.props.dispatch({type: 'SET_AMENITIES', state: amenities})
    });
    BackAndroid.addEventListener('hardwareBackPress', () => {
      BackAndroid.exitApp();
      return true
    });
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
      Actions.map();
    } else {
      // TODO:Handle notification check for IOS
      // this.props.navigator.push({name: 'features'});
    }
},

})


var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1
  },
  imageContainer: {
      flex: .10,
      marginTop: 5,
  },
  title: {
    color: '#F58120',
    fontSize: 48,
    fontFamily: 'Source Sans Pro 200',
    lineHeight: 56,
    flex: .55,
  },
  text: {
    fontFamily: 'Source Sans Pro 200',
    color: '#5e5e5e',
    lineHeight: 23,
    fontSize: 16,
    flex: .30,
  }
});


const mapStateToProps = (state) => {
  return {
    notificationState: state.getIn(['core','notifications'])
  }
}

export default connect(mapStateToProps)(Landing);
