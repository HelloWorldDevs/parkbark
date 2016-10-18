import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Animated,
    PanResponder,
    Easing,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import Button from './common/Button.js';
import ParkListDetail from './ParkListDetail.js';


class ParkList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  renderParkListDetails(parks){
    let parkIndex = 0;
    return parks.map((park, i) => <ParkListDetail onPress={() => this.onDetailPress(park.title)} touchable={true} navigator={this.props.navigator} index={parkIndex++} key={i} title={park.title} address={park.address} address_display={park.address_display} distance={park.distance} amenities={park.amenities} />)
  };

  slideValue = new Animated.Value(0);

  slideIn = () => {
    this.props.dispatch({type:'MAP_HIDE', state: false})
    Animated.timing(
        this.slideValue,
        {
          toValue: 1,
          duration: 1500,
          easing: Easing.elastic(1)
        }
    ).start()
  }

  slideOut = () => {
    Animated.timing(
        this.slideValue,
        {
          toValue: 0,
          duration: 1500,
          easing: Easing.elastic(1)
        }
    ).start()
  }

  onNextPress = () => {
      this.props.dispatch({type: 'SET_PARK_SURVEY', state: 'Suggest a Park'});
      this.props.navigator.push({name: 'parkName'});
  }

  onDetailPress = (title) => {
    this.props.dispatch({type: 'UPDATE_SElECTED_PARK', state: title});
    this.props.navigator.push({name:'parkdetail'});
  }



  render() {

    if(this.props.hideState) {
      this.slideOut();
    }

    const bottom = this.slideValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-400, 0]
    });


    return (
        <View style={styles.scrollConainer}>
          <Button bgcolor={'#fff'} text={' See Parks List '} onPress={this.slideIn.bind(this)}/>
          <Animated.View
              style={ { position: 'absolute', zIndex: 2, bottom, left: 0, right: 0, }}
          >
            <ScrollView bounces={false} style={styles.scrollView}>
              <Button bgcolor={'#fff'} text={'Close'} onPress={this.slideOut}/>
              {this.renderParkListDetails(this.props.parks)}
              <Button bgcolor={'#f0382c'} text={'Suggest a park'} onPress={this.onNextPress.bind(this)}/>
            </ScrollView>
          </Animated.View>
        </View>
    )
  }
};

const styles = {
  scrollView : {
    height: 300,
    backgroundColor: '#fff'
  },
  scrollConainer: {
    alignSelf: 'stretch',
    padding: 5
  }
};

const mapStateToProps = (state) => {
  return {
    parks: state.getIn(['location', 'parks']),
    hideState: state.get('hide')
  }
}

export default connect(mapStateToProps)(ParkList);
