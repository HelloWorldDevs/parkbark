import React from 'react';
import {View, Text} from 'react-native';
import Card from './common/Card.js'
import CardSection from './common/CardSection.js'


const ParkListDetails = (props) => {
  return(
      <Card>
        <CardSection>
          <Text>Park Title</Text>
          <Text>Park Address</Text>
        </CardSection>
        <Text style={styles.parkDistance}>0.0mi</Text>
      </Card>
      )
}


const styles = {
  // parkTitle :{
  //
  // },
  // parkAddress: {
  //
  // },
  parkDistance: {
    flex: 1,
    color: '#f58120',
    textAlign: 'right',
    backgroundColor: '#e1f6ff'
    // alignItems: 'flex-end',
    // flexDirection: 'row',
    // alignSelf: 'flex-end',
    // right: 0
  }
}


export default ParkListDetails;
