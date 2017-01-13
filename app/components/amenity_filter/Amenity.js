import React from 'react';
import {View, Text, Image} from 'react-native';
import CardSection from '../common/CardSection.js';

const Amenity = (props) => {
    // Map icons to amenities
    switch (props.amenity) {
        case 'Agility Course':
            var icon = require('../../img/amenities/agility@3x.png');
            break;
        case 'Benches':
            var icon = require('../../img/amenities/benches@3x.png');
            break;
        case 'Covered Area':
            var icon = require('../../img/amenities/covered_area@3x.png');
            break;
        case 'Fenced Area':
            var icon = require('../../img/amenities/fenced@3x.png');
            break;
        case 'Off Leash':
            var icon = require('../../img/amenities/off_leash@3x.png');
            break;
        case 'Poop Bags':
            var icon = require('../../img/amenities/poop_bags@3x.png');
            break;
        case 'Restrooms':
            var icon = require('../../img/amenities/restrooms@3x.png');
            break;
        case 'Shade':
            var icon = require('../../img/amenities/shade@3x.png');
            break;
        case 'Small Dogs Park':
            var icon = require('../../img/amenities/small_dog@3x.png');
            break;
        case 'Swimming Area':
            var icon = require('../../img/amenities/swimming_area@3x.png');
            break;
        case 'Hiking Trails':
            var icon = require('../../img/amenities/trails@3x.png');
            break;
        case 'Water Available':
            var icon = require('../../img/amenities/water@3x.png');
            break;
        default:
            if(__DEV__) {
                console.log('no amenity icon');
            }
    }

    var topAmenities;
    if (props.index < 3){
        topAmenities =
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 95}}>
            <Image style={{width: 50, height: 50, resizeMode: 'contain'}}source={icon}/>
            <Text style={{fontSize: 11, color: '#5e5e5e', fontFamily: 'Source Sans Pro 200', lineHeight: 23}}>
               {props.amenity}
             </Text>
        </View>
    }
  return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <CardSection>
         { topAmenities }
        </CardSection>
      </View>
  )
}

export default Amenity;
