import React from 'react';
import {View, ScrollView} from 'react-native';
import Button from './common/Button.js';


import ParkListDetail from './ParkListDetail.js';


renderParkListDetails = (props) => {
  console.log('hi')
  // return props.parkdetails.map(parkdetail => <ParkListDetail key={parkdetail.title} title={parkdetail.title} address={parkdetail.address} distance={parkdetail.distance}/>)
};

const ParkList = (props) => {
  return (
      <ScrollView style={styles.scrollView}>
        <View>
          <Button style={styles.listShowButton} text={' See Parks List '} onPress={renderParkListDetails}/>
        </View>
      </ScrollView>
  )
};

const styles = {
  scrollView : {
  height: 200,
  position: 'absolute',
  zIndex: 2,
  bottom: 10,
  left: 0,
  right: 0,
  // flex: 1,
  // alignItems: 'stretch',
  },
  listShowButton: {
    backgroundColor: 'blue'
  }
};


export default ParkList;

