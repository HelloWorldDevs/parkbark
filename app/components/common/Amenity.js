import React from 'react';
import {View, Text} from 'react-native';
import CardSection from './CardSection.js';

const Amenity = (props) => {
    var topAmenities;
    if (props.index < 3){
        topAmenities =  <Text style={{textAlign: 'center', alignSelf: 'stretch'}}>
           {props.amenity}
         </Text>
    }
  return (
      <View style={{flex: 1, flexDirection: 'column', margin: 3, alignSelf: 'stretch'}}>
        <CardSection>
         { topAmenities }
        </CardSection>
      </View>
  )
}

export default Amenity;
