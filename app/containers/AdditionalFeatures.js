import React, { Component } from 'react';
import { View, Image, StyleSheet , Text, AppState} from 'react-native';
import PushController from '../components/pushController';
import PushNotification from 'react-native-push-notification';
import Button from '../components/common/Button.js';
export default React.createClass ({


  render:function() {
    return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={require('../img/construction_pup@2x.png')}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} type="text">We're working on some cool stuff for you.</Text>
            <Text style={styles.text}>
              We don't want you to get left out from seeing when your friends are at the park and popular park times.
            </Text>
            <Button bgcolor={'transparent'} text={'I don\'t want cool features'} onPress={this.onNextPress}/>
            <Button bgcolor={'#f0382c'} text={'I want cool features'} onPress={this.onFeaturesPress}/>
          </View>
        </View>
    );
  },

  onNextPress: function() {
    this.props.navigator.push({name: 'map'});
  },

  onFeaturesPress(){
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('notification: ', notification)
      },
      requestPermissions: true
    })
    // PushNotification.requestPermissions();
    PushNotification.localNotificationSchedule({
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + (5 * 1000)) // in 5 secs
    });
  }


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
    color: '#f0382c',
    fontSize: 30,
    fontWeight: "200"

  },
  text: {
    color: "#f0382c"
  }
});