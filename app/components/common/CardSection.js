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
    padding: 5,
    // backgroundColor: '#fff4ea',
    // borderColor: '#ddd',
    // borderWidth: 1,
  }
}

export default CardSection;

