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
import { connect } from 'react-redux';
import Button from '../common/Button.js';
import ParkListDetail from './ParkListDetail.js';
import { Actions } from 'react-native-router-flux';
import {getDistance} from '../../src/map_core';




class ParkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideValue: new Animated.Value(0),
    };
  }


  componentDidUpdate() {
    if(this.props.hideState) {
      this.slideOut();
    }
  }

  renderParkListDetails(parks) {
    let parkIndex = 0;

    var default_position = {
      latitude: 45.523031,
      longitude: -122.676772
    };

    var position = this.props.coords || default_position;

    //sort all parks by distance from users coordinates and include distance prop :)
    var parksSorted = parks.map((park) => {
      var parkCoords = park.address.split(',');
      park.distance = getDistance(position.latitude, position.longitude, parkCoords[0], parkCoords[1]);
      return park;
    })
      .sort(function(a, b) {
      return a.distance - b.distance
    });

    return parksSorted.map((park, i) => <ParkListDetail onPress={() => this.onDetailPress(park.title)} touchable={true} navigator={this.props.navigator} index={parkIndex++} key={i} title={park.title} address={park.address} address_display={park.address_display} distance={park.distance} amenities={park.amenities} />)
  };


  slideIn = () => {
    this.props.dispatch({type:'MAP_HIDE', state: false});
    Animated.timing(
        this.state.slideValue,
        {
          toValue: 1,
          duration: 1500,
          easing: Easing.elastic(0)
        }
    ).start();
  };

  slideOut = () => {
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
      const updateValue = {};
      updateValue.title = 'type';
      updateValue.value = 0;
      this.props.dispatch({type: 'SET_PARK_SURVEY', state: 'Suggest a Park'});
      this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
      Actions.parkName({suggestPark: true});
  };

  onDetailPress = (title) => {
    this.props.dispatch({type: 'UPDATE_SElECTED_PARK', state: title});
    Actions.parkdetail()
  };

  render() {
    const bottom = this.state.slideValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-Dimensions.get('window').height - 180, 0]
      });

    return (
        <View style={styles.scrollConainer}>
          <View style={[styles.scrollViewHeader, styles.overlay, {bottom: 0}]}>
            <Button
                bgimage={require('../../img/transparent.png')}
                bgcolor={'#fff'}
                alignSelf={'flex-start'}
                text={' See Parks List '}
                textColor={'#131313'}
                font={'Source Sans Pro regular'}
                fontSize={14}
                onPress={this.slideIn}
            />
          </View>
          <Animated.View
                 style={[styles.overlay, {bottom}]}
          >
            <View style={styles.scrollViewHeader}>
                  <Button
                    bgimage={require('../../img/transparent.png')}
                    alignSelf={'flex-start'}
                    bgcolor={'#fff'}
                    text={' Show Map '}
                    textColor={'#131313'}
                    font={'Source Sans Pro regular'}
                    fontSize={14}
                    onPress={this.slideOut}
                  />
              </View>
              <ScrollView
                bounces={false} style={styles.scrollView}
                scrollEnabled={true}
              >
                { this.props.parks.length ? this.renderParkListDetails(this.props.parks) :
                    <Text style={styles.noResults}>No Parks Found</Text>}
                <Button
                    bgimage={require('../../img/red-gradient.png')}
                    text={'Suggest a park'}
                    alignSelf={'stretch'}
                    textColor={'#fff'}
                    font={'Source Sans Pro 700'}
                    fontSize={15}
                    onPress={this.onNextPress.bind(this)}
                />
              </ScrollView>
          </Animated.View>
        </View>
    )
  }
}

const styles = {
  scrollConainer: {
    alignSelf: 'stretch',
    padding: 5
  },
  scrollViewTitle: {
    alignSelf: 'center',
    fontSize: 15
  },
  scrollViewHeader: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  scrollView : {
    height: Dimensions.get('window').height -180,
    backgroundColor: '#fff'
  },
  overlay: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0
  },
  noResults: {
    color: '#f88b8e',
    textAlign: 'center',
    fontSize: 30
  },
};

const mapStateToProps = (state) => {
  return {
    coords: state.getIn(['map','location', 'coords']),
    parks: state.getIn(['map', 'location', 'parks']),
    hideState: state.getIn(['map', 'hide'])
  }
};

export default connect(mapStateToProps)(ParkList);
