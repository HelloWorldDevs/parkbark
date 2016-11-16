import React from 'react';
import {View} from 'react-native';


const Card = (props) => {
  return (
      <View style={styles.containerStyle}>
        {props.children}
      </View>
  )
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingLeft: 10,
    paddingBottom: 15,
    paddingRight: 10,
    // borderWidth: 1,
    // borderRadius: 2,
    borderColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    // shadowColor: '#000',
    backgroundColor: '#fff',
    // shadowOffset: {width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 1,
    marginLeft: 5,
    marginRight: 5
  }
}

export default Card;
