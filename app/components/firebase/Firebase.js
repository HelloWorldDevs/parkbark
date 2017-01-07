import React, { Component } from 'react'
import FCM from 'react-native-fcm';
var Analytics = require('react-native-firebase-analytics');


class Firebase {
  constructor() {
    FCM.on('notification', (notif) => {

      //check for remote notification avoid repetition in presentLocalNotification
      if (!notif.local_notification) {
        FCM.presentLocalNotification({
          body: notif.fcm.body,
          priority: "high",
          title: notif.fcm.title,
          sound: "default",
          show_in_foreground: true,
        });
      }
    })
  }

};


const fireBase = new Firebase();
export default fireBase;