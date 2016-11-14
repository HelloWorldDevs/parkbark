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
    };

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
          easing: Easing.elastic(0)
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


  render() {
    const bottom = this.state.slideValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-Dimensions.get('window').height - 180, 0]
      });

    return (
        <View style={styles.scrollConainer}>
          <Button
            bgimage={require('../img/transparent.png')}
            bgcolor={'#fff'}
            alignSelf={'flex-start'}
            text={' See Parks List '}
            textColor={'#131313'}
            font={'Source Sans Pro regular'}
            fontSize={14}
            onPress={this.slideIn}
          />
          <Animated.View
                 style={{position: 'absolute', zIndex: 2, alignItems: 'stretch', left: 0, right: 0, bottom}}
          >
            <View style={styles.scrollViewHeader}>
                  <Button
                    bgimage={require('../img/transparent.png')}
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
                    bgimage={require('../img/transparent.png')}
                    bgcolor={'#ef3a39'}
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
  scrollConainer: {
    alignSelf: 'stretch',
    padding: 5
  },
  noResults: {
    color: '#f88b8e',
    textAlign: 'center',
    fontSize: 30
  },
};

const mapStateToProps = (state) => {
  return {
    parks: state.getIn(['map', 'location', 'parks']),
    hideState: state.getIn(['map', 'hide'])
  }
};

export default connect(mapStateToProps)(ParkList);
