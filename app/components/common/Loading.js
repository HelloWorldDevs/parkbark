import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default Loading = (props) => {
    // This needs to go in the parent component, must be a class
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       animating: true,
    //     };
    // }
    //
    // componentWillUnmount() {
    //     clearTimeout(this._timer);
    // }
    //
    // setToggleTimeout() {
    //     this._timer = setTimeout(() => {
    //       this.setState({animating: !this.state.animating});
    //       this.setToggleTimeout();
    //     }, 1000);
    // }
    //
    // componentDidMount() {
    //     this.setToggleTimeout();
    // }

   return (
      <View style = {styles.container}>
         <ActivityIndicator animating = {props.animating}
           style = {styles.activityIndicator} size = "small" color = '#f0382c'
         />
      </View>
   );
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   activityIndicator: {
      justifyContent: 'center',
      alignItems: 'center',
   }
});
