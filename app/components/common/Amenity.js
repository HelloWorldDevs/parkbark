import React from 'react';
import {View, Text} from 'react-native';
import CardSection from './CardSection.js'

const Amenity = (props) => {
  return (
      <View style={{flex: 1, flexDirection: 'column', margin: 3, alignSelf: 'stretch'}}>
        <CardSection>
          <Text style={{textAlign: 'center'}}>
            {props.amenity}
          </Text>
        </CardSection>
      </View>
  )
}

export default Amenity;
