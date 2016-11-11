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
      slideValue: new Animated.Value(0),
      sliding: false,
      listHeight: null,
      listYHeight: null
    };

    // this.panResponder = PanResponder.create({
    //     onStartShouldSetPanResponder : () => true,
    //     onMoveShouldSetResponderCapture: () => true,
    //     onStartShouldSetResponderCapture: () => true,
    //     onMoveShouldSetPanResponderCapture: (evt, gestureState) => !!this.getTouchTravel(gestureState),
    //     onPanResponderGrant: (e, gestureState) => {
    //       this.state.pan.setOffset({y: this.state.pan.y._value});
    //       this.state.pan.setValue({x: 0, y: 0});
    //     },
    //     onPanResponderMove : (e, gestureState) => {
    //       // if (this.state.pan.y._value) {
    //       console.log(this.state.pan.y._value);
    //         Animated.event([null, {
    //           dy: this.state.pan.y
    //         }])(e, gestureState);
    //       // }
    //     },
    //     onPanResponderRelease : (e, gesture) => {
    //       this.state.pan.flattenOffset();
    //     }
    // });
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    if(this.props.hideState) {
      this.slideOut();
    }
  }

  renderParkListDetails(parks){
    let parkIndex = 0;
    return parks.map((park, i) => <ParkListDetail onPress={() => this.onDetailPress(park.title)} touchable={true} navigator={this.props.navigator} index={parkIndex++} key={i} title={park.title} address={park.address} address_display={park.address_display} distance={park.distance} amenities={park.amenities} />)
  };


  slideIn = () => {
    console.log('slide in');
    this.props.dispatch({type:'MAP_HIDE', state: false});
    Animated.timing(
        this.state.slideValue,
        {
          toValue: 1,
          duration: 1500,
          easing: Easing.elastic(1)
        }
    ).start();

  };

  slideOut = () => {
    console.log('slide out');
    this.props.dispatch({type:'MAP_HIDE', state: false})
    Animated.timing(
        this.state.slideValue,
            {
              toValue: 0,
              duration: 1500,
              easing: Easing.elastic(1)
            }
        ).start();
  };


  onNextPress = () => {
      this.props.dispatch({type: 'SET_PARK_SURVEY', state: 'Suggest a Park'});
      this.props.navigator.push({name: 'parkName'});
  };

  onDetailPress = (title) => {
    this.props.dispatch({type: 'UPDATE_SElECTED_PARK', state: title});
    this.props.navigator.push({name:'parkdetail'});
  };

  layoutSet = (event) => {
    var {x, y, width, height} = event.nativeEvent.layout;
    this.setState({listHeight: height, listYHeight: y})
  };



  render() {
    const bottom = this.state.slideValue.interpolate({
             inputRange: [0, 1],
              outputRange: [-Dimensions.get('window').height/2, 0]
        });

    return (
        <View style={styles.scrollConainer}>
          <Button bgcolor={'#fff'} text={' See Parks List '} onPress={this.slideIn}/>
          <Animated.View
                 style={{position: 'absolute', zIndex: 2, alignItems: 'stretch', left: 0, right: 0, bottom}}
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
    height: Dimensions.get('window').height/2,
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
};

export default connect(mapStateToProps)(ParkList);
