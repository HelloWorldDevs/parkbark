import React, { Component } from 'react';
import { NetInfo, Alert, View, BackAndroid} from 'react-native';


class NetworkAlert {
    constructor() {
        this.isConnected = null;
        this._handleConnectionInfoChange = (connectionInfo) => {
            this.isConnected = connectionInfo;
            if (this.isConnected === false || this.isConnected === 'NONE') {
                Alert.alert(
                    'Network Offline',
                    'Sorry, but WIFI is necessary to use our app',
                    [
                        {text: 'OK', onPress: () => {BackAndroid.exitApp()}},
                    ],
                    {
                        cancelable: false
                    }
                )
            }
        };
        NetInfo.addEventListener('change', this._handleConnectionInfoChange);
    }


    checkConnection() {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.isConnected = isConnected;
            if (this.isConnected === false ) {
                Alert.alert(
                    'Network Offline',
                    'Sorry, but WIFI is necessary to use our app',
                    [
                        {text: 'OK', onPress: () => {BackAndroid.exitApp()}},
                    ],
                    {
                        cancelable: false
                    }
                )
            }
        });
    }

};




const networkAlert = new NetworkAlert();
export default networkAlert;
