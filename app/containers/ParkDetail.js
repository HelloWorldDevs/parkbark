import React, { Component } from 'react';
import {fromJS} from 'immutable';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
var ResponsiveImage = require('react-native-responsive-image');
import Card from '../components/common/Card.js';
import CardSection from '../components/common/CardSection.js';
import { connect } from 'react-redux';


class ParkDetail extends Component {
  constructor(props){
    super(props);
  }


  componentDidMount(){
    const {currentPark} = this.props;
    console.log(currentPark);
  }

  onPress(){
    this.props.navigator.pop();
  }

  render(){
    const {currentPark} = this.props;
    return (
        <View>
            <Text onPress={this.onPress.bind(this)}>Back</Text>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
                <ResponsiveImage
                    source={{uri: currentPark.image}}
                     initHeight="225"
                />
              </View>
            <Card>
              <CardSection>
                <View>
                  <Text>
                    Hello ParkList Detail
                  </Text>
                </View>
                <View>
                  <Text>
                    Hello ParkList Detail
                  </Text>
                </View>
              </CardSection>
            </Card>
            <Card>
            <CardSection>
              <View>
                <Text>
                  Hello ParkList Detail
                </Text>
              </View>
              <View>
                <Text>
                  Hello ParkList Detail
                </Text>
              </View>
            </CardSection>
          </Card>
        </View>
    )
  }

};

const styles = {
  imageWrapper: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1,
    height: 20
  }
}

const mapStateToProps = (state) => {
  return {
    currentPark: state.getIn(['location', 'parks']).find((park) => park['title'] === state.get('current_park'))
  }
}

export default connect(mapStateToProps)(ParkDetail);
