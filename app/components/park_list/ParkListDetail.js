import  React, {Component} from 'react';
import {View, TouchableOpacity, Text, Animated, Easing} from 'react-native';
import { connect } from 'react-redux';
import { AdMobBanner } from 'react-native-admob';
import Card from '../common/Card.js'
import CardSection from '../common/CardSection.js'


export const ParkListDetails = (props) => {
  let ads = <View />;
  if (props.index == 0) {
    ads = (
      <Card>
        <AdMobBanner
          bannerSize="banner"
          //   adUnitID="ca-app-pub-3940256099942544/6300978111" // test
          adUnitID="ca-app-pub-7642882868968646/7528844815" //Park Bark test
          testDeviceID="EMULATOR"
        />
      </Card>
    );
  }

  return(
    <TouchableOpacity onPress={props.onPress}>
      <Card>
        <CardSection>
          <Text style={styles.parkTitle}>{props.title}</Text>
          <Text style={styles.parkAddress}>{props.address_display}</Text>
        </CardSection>
        <CardSection>
          <Text style={styles.parkDistance}>{'apx ' + props.distance + 'mi'}</Text>
        </CardSection>
      </Card>
      { props.adsRemoved ? null: ads }
    </TouchableOpacity>
  )
};

const styles = {
  parkTitle :{
    fontSize: 14,
    color: '#131313',
    fontFamily: 'Source Sans Pro regular',
    lineHeight: 18,
    width: 200
  },
  parkAddress: {
    width: 200,
    fontFamily: 'Souce Sans Pro 200',
    color: '#5e5e5e',
    fontSize: 12
  },
  parkDistance: {
    color: '#f58120',
    textAlign: 'right',
    fontSize: 14,
    lineHeight: 18,
    textAlignVertical: 'top',
    fontFamily: 'Source Sans Pro regular'
  }
}


const mapStateToProps = (state) => {
  return {
    parks: state.getIn(['map', 'location', 'parks']),
    adsRemoved: state.getIn(['core', 'adsRemove'])
  }
}

export default connect(mapStateToProps)(ParkListDetails);
