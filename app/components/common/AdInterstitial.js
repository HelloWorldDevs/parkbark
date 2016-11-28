import React, { Component } from 'react';
import { AdMobBanner } from 'react-native-admob';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import Button from './Button';


class AdInterstitial extends Component {

    onClose() {
        this.props.navigator.push({name: 'map'});
    }

    keepAds() {
        console.log('keep ads')
        this.props.navigator.push({name: 'map'})
    }

    removeAds() {
        console.log('remove ads')
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.onClose.bind(this)}
                    style={{position: 'absolute', top: 30, right: 15, zIndex: 1}}
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                >
                  <Image style={{width: 20, height: 20, opacity: 0.67}} source={require('../../img/button_close.png')}/>
                </TouchableOpacity>
                <Text style={styles.text}>
                    Ads help us keep this app free
                </Text>
                <AdMobBanner
                  bannerSize="mediumRectangle"
                  adUnitID="ca-app-pub-3940256099942544/6300978111" // test
                //   adUnitID="ca-app-pub-7642882868968646/2620967210" //Park Bark test
                  testDeviceID="EMULATOR"
                  didFailToReceiveAdWithError={this.bannerError} />
                      <Button
                          bgimage={require('../../img/transparent.png')}
                          text={'Keep ads '}
                          textColor={'#8b8b8b'}
                          alignSelf={'center'}
                          fontSize={15}
                          font={'Source Sans Pro 200'}
                          onPress={this.keepAds.bind(this)}
                        />
                        <Button
                            bgimage={require('../../img/red-gradient.png')}
                            text={'Remove ads '}
                            alignSelf={'stretch'}
                            textColor={'#fff'}
                            font={'Source Sans Pro 700'}
                            fontSize={15}
                            onPress={this.removeAds.bind(this)}
                          />
            </View>
        )
    }
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
},
  text: {
      color: '#ef3a39',
      fontSize: 48,
      fontFamily: 'Source Sans Pro 200',
      flex: 1,
      alignSelf: 'center'
  },
});

export default AdInterstitial;
