import  React, {Component} from 'react';
import {View, TouchableOpacity, Text, Animated, Easing} from 'react-native';
import { connect } from 'react-redux';
import { AdMobBanner } from 'react-native-admob';
import {getDistance} from '../../src/map_core';
import Card from '../common/Card.js'
import CardSection from '../common/CardSection.js'


class ParkListDetails extends Component{
  constructor(props) {
    super(props);
    this.fadeValue = new Animated.Value(0);
  }


  fadeIn() {
    this.fadeValue.setValue(0);
    Animated.timing(
      this.fadeValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1)
      }
    ).start()
  }

  fadeOut() {
    this.fadeValue.setValue(1);
    Animated.timing(
        this.fadeValue,
        {
          toValue: 0,
          duration: 1000,
          easing: Easing.elastic(1)
        }
    ).start()
  }

  componentDidMount() {
    this.fadeIn();
  }

  componentWillUnmount() {
    this.fadeOut();
  }


  render(){
    const opacity = this.fadeValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    var ads;
    if (this.props.index == 0) {
        ads = <Card><AdMobBanner
               bannerSize="banner"
               adUnitID="ca-app-pub-7642882868968646/7528844815" //Park Bark test
               testDeviceID="EMULATOR"
               didFailToReceiveAdWithError={this.bannerError}/></Card>;
        console.log(this.bannerError);
    }

    const parkCoords = this.props.address.split(',');

    return(
      <Animated.View style={{opacity}}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Card>
            <CardSection>
              <Text style={styles.parkTitle}>{this.props.title}</Text>
              <Text style={styles.parkAddress}>{this.props.address_display}</Text>
            </CardSection>
            <Text style={styles.parkDistance}>{'apx ' + getDistance(this.props.coords.latitude, this.props.coords.longitude, parkCoords[0], parkCoords[1]) + 'mi'}</Text>
          </Card>
          { ads }
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = {
  parkTitle :{
    fontSize: 14,
    color: '#131313',
    fontFamily: 'Source Sans Pro regular',
    lineHeight: 23
  },
  parkAddress: {
    width: 200,
    fontFamily: 'Souce Sans Pro 200',
    color: '#5e5e5e',
    fontSize: 12
  },
  parkDistance: {
    flex: 1,
    color: '#f58120',
    textAlign: 'right',
    fontSize: 14,
    fontFamily: 'Source Sans Pro regular'
  }
}


const mapStateToProps = (state) => {
  return {
    coords: state.getIn(['map','location', 'coords']),
    parks: state.getIn(['map', 'location', 'parks'])
  }
}

export default connect(mapStateToProps)(ParkListDetails);
