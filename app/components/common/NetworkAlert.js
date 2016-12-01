import React, { Component } from 'react';
import { NetInfo, Alert, View} from 'react-native';

class NetworkAlert extends Component {
    state = {
        connectionInfo: null,
    };

    componentDidMount() {
        NetInfo.addEventListener(
            'change',
            this._handleConnectionInfoChange
        );
        NetInfo.fetch().done(
            (connectionInfo) => {
                this.setState({connectionInfo});
                console.log('status', this.state.connectionInfo);
                if (this.state.connectionInfo == 'NONE') {
                    Alert.alert(
                        'Network Offline'
                    )
                }
            }
        );
    }
    _handleConnectionInfoChange = (connectionInfo) => {
        this.setState({ connectionInfo, });
    };

    render() {
        return (
            <View></View>
        )
    }
};
export default NetworkAlert;
