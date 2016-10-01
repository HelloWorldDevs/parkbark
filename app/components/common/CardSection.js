import React from 'react';
import {View} from 'react-native';


const CardSection = (props) => {
  return (
      <View style={styles.containerStyle}>
        {props.children}
      </View>
  )
}

const styles = {
  containerStyle: {
    // backgroundColor: '#fff',
    padding: 5,
    backgroundColor: '#fdcfa9',
    borderColor: '#ddd',
    borderBottomWidth: 1,
  }
}

export default CardSection;

