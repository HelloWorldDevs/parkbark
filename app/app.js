import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigator from './navigation/Navigator';
import FCM from 'react-native-fcm';



class App extends Component {
  componentDidMount() {
    FCM.on('notification', (notif) => {
      console.log(notif);
      FCM.presentLocalNotification({
        body: notif.fcm.body,
        priority: "high",
        title: notif.fcm.title,
        sound: "default",
        show_in_foreground: true,
      });
    })

  }
  render() {
    return (
          <Navigator />
    );
  }
};



export default App;
