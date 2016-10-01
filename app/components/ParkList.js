import React from 'react';
import {View} from 'react-native';

import ParkListDetail from './ParkListDetail.js';


// renderParkListItems() {
//   return props.parkdetails.map(parkdetail => <ParkListDetail key={parkdetail.title}/>)
// }

const ParkList = (props) => {
  return (
      <View style={styles.containerStyle}>
        <ParkListDetail/>
      </View>
  )
};

const styles = {
  containerStyle : {
  position: 'absolute',
  zIndex: 2,
  bottom: 10,
  left: 0,
  right: 0,
  flex: 1,
  alignItems: 'stretch',
  }
}

export default ParkList;

