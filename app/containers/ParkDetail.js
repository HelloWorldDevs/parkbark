import React, { Component } from 'react';
import {fromJS} from 'immutable';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Card from '../components/common/Card.js';
import CardSection from '../components/common/CardSection.js';
import { connect } from 'react-redux';


class ParkDetail extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const selectedPark = this.props.selectedPark;
    console.log(this.props);
    console.log(selectedPark);
  }

  onPress(){
    this.props.navigator.pop();
  }


  render(){
    return (

        <View>
          <Card>
            <Text onPress={this.onPress.bind(this)}>Back</Text>
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

const mapStateToProps = (state) => {
  return {
    state: state,
    selectedPark: state.get('current_park'),
    parks: state.getIn(['location', 'parks']),
    currentPark: state.getIn(['location', 'parks']).find((park) => park['title'] === state.get('current_park'))
  }
}

export default connect(mapStateToProps)(ParkDetail);
