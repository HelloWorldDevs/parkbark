import React, { Component } from 'react';
import {fromJS} from 'immutable';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
var ResponsiveImage = require('react-native-responsive-image');
import Button from '../components/common/Button';
import Card from '../components/common/Card.js';
import CardSection from '../components/common/CardSection.js';
import Amenity from '../components/common/Amenity.js';
import ParkListDetail from '../components/ParkListDetail.js'
import stylesheet from '../styles/styles.js'
import { connect } from 'react-redux';


class ParkDetail extends Component {
  constructor(props){
    super(props);
  }


  componentDidMount(){
    const {currentPark} = this.props;
    console.log(currentPark);
  }

  renderAmenities({amenities}){
    console.log(amenities);
    return amenities.split(',').map(amenity => <Amenity key={amenity} amenity={amenity}/>)
  }

  onBackPress(){
    this.props.navigator.pop();
  }

  surveyPress() {
    console.log(this.props);
    const title = this.props.currentPark.title;
    this.props.dispatch({type: 'SET_PARK_SURVEY', state: title});
    this.props.navigator.push({name: 'survey'});
}

  render(){
    const {currentPark} = this.props;
    return (
        <ScrollView bounces={false}>
          <TouchableOpacity
              onPress={this.onBackPress.bind(this)}
              style={{position: 'absolute', top: 20, left: 20, zIndex: 1}}>
            <Image style={{width: 25, height: 25, padding: 10}} source={require('../img/back-arrow@3x.png')}/>
          </TouchableOpacity>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
            <ResponsiveImage
                source={{uri: currentPark.image}}
                 initHeight="225"
            />
          </View>
          <ParkListDetail key={currentPark.title} title={currentPark.title} address={currentPark.address} distance={currentPark.distance}/>
          <Card>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <CardSection>
                  <Text style={styles.detailsTitle}>PARK DETAILS</Text>
                  <Text>{currentPark.details}</Text>
              </CardSection>
            </View>
          </Card>
          <Card>
            {this.renderAmenities(currentPark)}
          </Card>
          <Button bgcolor={'#E79C23'} text={'Survey'} onPress={this.surveyPress.bind(this)} />
        </ScrollView>
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
  },
  detailTitle: {
    fontWeight: 'bold'
  }
}

const mapStateToProps = (state) => {
  return {
    currentPark: state.getIn(['location', 'parks']).find((park) => park['title'] === state.get('current_park'))
  }
}

export default connect(mapStateToProps)(ParkDetail);
