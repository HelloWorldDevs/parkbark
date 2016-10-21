import  React, {Component} from 'react';
import {View, TouchableOpacity, Text, Animated, Easing} from 'react-native';
import { connect } from 'react-redux';
import { AdMobBanner } from 'react-native-admob';
import Card from './common/Card.js'
import CardSection from './common/CardSection.js'


class ParkListDetails extends Component{
  constructor(props) {
    super(props)
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

  componentDidMount(){
    this.fadeIn();
  }

  componentWillUnmount(){
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
               adUnitID="ca-app-pub-3940256099942544/6300978111" //fake id
               testDeviceID="EMULATOR"
               didFailToReceiveAdWithError={this.bannerError}/></Card>;
    }

    return(
      <Animated.View style={{opacity}}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Card>
            <CardSection>
              <Text>{this.props.title}</Text>
              <Text style={styles.parkAddress}>{this.props.address_display}</Text>
            </CardSection>
            <Text style={styles.parkDistance}>{this.props.distance}</Text>
          </Card>
          { ads }
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = {
  // parkTitle :{
  //
  // },
  parkAddress: {
    width: 200
  },
  parkDistance: {
    flex: 1,
    color: '#f58120',
    textAlign: 'right',
  }
}


const mapStateToProps = (state) => {
  return {
    parks: state.getIn(['map', 'location', 'parks'])
  }
}

export default connect(mapStateToProps)(ParkListDetails);
