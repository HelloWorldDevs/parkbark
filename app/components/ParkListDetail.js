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
        <Text>0.0mi</Text>
      </Card>
      )
}


export default ParkListDetails;
