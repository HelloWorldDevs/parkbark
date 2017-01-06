import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';


class Loading extends Component {

   render() {
      var zIndex = null;
      if (this.props.loading) {
         zIndex = 1;
         return (
             <View style = {[styles.container, {zIndex: zIndex}]}>
                <ActivityIndicator animating = {true}
                                   style = {[styles.activityIndicator, {zIndex: zIndex}]} size="large" color = '#f0382c'
                />
             </View>
         );
      }
       else {
         zIndex = 0;
         return (
             null
         )
      }
   }

}

const styles = StyleSheet.create ({
   container: {
      position: 'absolute',
      zIndex: 1,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
   },
   activityIndicator: {
      // justifyContent: 'center',
      // alignItems:'center',

   }
});


const mapStateToProps = (state) => {
   return {
      loading: state.getIn(['core', 'loading'])
   }
}

export default connect(mapStateToProps)(Loading);
