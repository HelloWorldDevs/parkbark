import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Animated,
    PanResponder,
    Easing,
    Text,
    Dimensions
} from 'react-native'
import Card from './common/Card.js'
import CardSection from './common/CardSection.js';
import { connect } from 'react-redux';
import Button from './common/Button.js';
import ParkListDetail from './ParkListDetail.js';


class ParkList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      listHeight: null
    };

    this.panResponder = PanResponder.create({    //Step 2
        onStartShouldSetPanResponder : () => true,
        onMoveShouldSetResponderCapture: () => true,
        onStartShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => !!this.getTouchTravel(gestureState),
        onPanResponderGrant: (e, gestureState) => {
          this.state.pan.setOffset({y: this.state.pan.y._value});
          this.state.pan.setValue({x: 0, y: 0});
        },
        onPanResponderMove : Animated.event([null,{
          dy : this.state.pan.y
        }]),
        onPanResponderRelease : (e, gesture) => {
          this.state.pan.flattenOffset();
        }
    });
  }

  componentDidMount() {
    console.log('mounting');
    this.state.pan.setValue({y: Dimensions.get('window').height + 50});
  }

  componentDidUpdate() {
    var height = Dimensions.get('window').height;
    var listHeight = this.state.listHeight;
    // console.log('height: ', height , 'pan height: ', this.state.pan.y._value, 'list height: ', listHeight);

    if(this.props.hideState && this.state.pan.y._value < height) {
      this.slideOut();
    }

    if (listHeight < height/2 && !this.props.hideState && this.state.pan.y._value < -listHeight +50) {
      console.log('less than half list out of wack');
      Animated.timing(
          this.state.pan,
          {
            toValue: {x: 0, y: -listHeight +50},
            duration: 0
          }
      ).start();
    }
  }

  getTouchTravel({ moveX, moveY, dx, dy, vy}) {
    var scrollState = null
    if(dy > 5 ||dy < -5) {
      scrollState = true;
    } else {
      scrollState = false;
    }
    return scrollState;
};


  renderParkListDetails(parks){
    let parkIndex = 0;
    return parks.map((park, i) => <ParkListDetail onPress={() => this.onDetailPress(park.title)} touchable={true} navigator={this.props.navigator} index={parkIndex++} key={i} title={park.title} address={park.address} address_display={park.address_display} distance={park.distance} amenities={park.amenities} />)
  };

  slideValue = new Animated.Value(0);

  slideIn = () => {
    var height = Dimensions.get('window').height;
    var listHeight = this.state.listHeight;
    this.props.dispatch({type:'MAP_HIDE', state: false});
    if (listHeight < height/2) {
      Animated.timing(
          this.state.pan,
          {
            toValue: {x: 0, y: -listHeight + 50 },
            duration: 1500,
            easing: Easing.elastic(0)
          }
      ).start();
    } else {
      Animated.timing(
          this.state.pan,
          {
            toValue: {x: 0, y: -height/2 },
            duration: 1500,
            easing: Easing.elastic(0)
          }
      ).start();
    }
  }

  slideOut = () => {
    var listHeight = this.state.listHeight;
    var height = Dimensions.get('window').height;
    if (listHeight < height/2) {
      Animated.timing(
          this.state.pan,
          {
            toValue: {x: 0, y: listHeight + 50 },
            duration: 200,
            easing: Easing.elastic(1)
          }
      ).start();
    } else {
      Animated.timing(
          this.state.pan,
          {
            toValue: {x: 0, y: height/2},
            duration: 200,
            easing: Easing.elastic(1)
          }
      ).start();
    }
  }



  onNextPress = () => {
      this.props.dispatch({type: 'SET_PARK_SURVEY', state: 'Suggest a Park'});
      this.props.navigator.push({name: 'parkName'});
  }

  onDetailPress = (title) => {
    this.props.dispatch({type: 'UPDATE_SElECTED_PARK', state: title});
    this.props.navigator.push({name:'parkdetail'});
  }

  layoutSet = (event) => {
    var {x, y, width, height} = event.nativeEvent.layout;
    this.setState({listHeight: height})
  }


  render() {

    return (
        <View style={styles.scrollConainer}>
          <Button bgcolor={'#fff'} text={' See Parks List '} onPress={this.slideIn}/>
          <Animated.View
              {...this.panResponder.panHandlers}
                 style={[this.state.pan.getLayout(), {position: 'absolute', zIndex: 2, alignItems: 'stretch', left: 0, right: 0}]}
              onLayout={(event) => {this.layoutSet(event)}}
          >
            <ScrollView bounces={false} style={styles.scrollView}
              scrollEnabled={true}
            >
              <Button bgcolor={'#fff'} text={' Close '} onPress={this.slideOut}/>

              {this.renderParkListDetails(this.props.parks)}
              <Button bgcolor={'#f0382c'} text={'Suggest a park'} onPress={this.onNextPress.bind(this)}/>
            </ScrollView>
          </Animated.View>
        </View>
    )
  }
}



const styles = {
  scrollViewTitle: {
    alignSelf: 'center',
    fontSize: 15
  },
  scrollView : {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollConainer: {
    alignSelf: 'stretch',
    padding: 5
  }
};

const mapStateToProps = (state) => {
  return {
    parks: state.getIn(['map', 'location', 'parks']),
    hideState: state.getIn(['map', 'hide'])
  }
}

export default connect(mapStateToProps)(ParkList);
