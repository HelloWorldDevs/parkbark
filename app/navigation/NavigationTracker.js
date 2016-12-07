//May not be needed with routing to ParkDetail after ThankYou

// import { connect } from 'react-redux';
// import React, { Component } from 'react';
// import {BackAndroid} from 'react-native';
// import { Actions } from 'react-native-router-flux';
//
//
//
// class NavigationTracker extends Component {
//   constructor() {
//     super();
//     // this.backAndroidHandlerMap = this.backAndroidHandlerMap.bind(this);
//     // console.log('navigator tracker constructor', this.props);
//   }
//
//   backAndroidHandlerMap() {
//     // if (this.props.scene === 'map') {
//     //   console.log('back on map');
//     //   Actions.landing({direction: 'leftToRight'});
//     //   return true
//     // }
//     // if (this.props.scene === 'landing' || this.props.scene === 'map_unmount') {
//     //   console.log('exit App!');
//     //   return BackAndroid.exitApp();
//     // }
//     // else {
//     //   Actions.pop();
//     //   return true;
//     // }
//   }
//
//   componentDidUpdate() {
//     // console.log('Navigation Tracker Update', this.props);
//     // if(this.props.scene === 'landing') {
//     //   console.log('Navigation Tracker on Landing', this.props.scene);
//     // }
//
//   }
//
//
//
//
//   componentDidMount() {
//     // BackAndroid.removeEventListener('hardwareBackPress', this.backAndroidHandlerMap);
//     // BackAndroid.addEventListener('hardwareBackPress', this.backAndroidHandlerMap);
//     // console.log('add backAndroid!');
//   }
//
//   render() {
//     return null;
//   }
// };
//
//
//
//
//
// const mapStateToProps = (state) => {
//   return {
//     scene: state.getIn(['navigation', 'scene'])
//   };
// };
//
//
// export default connect(mapStateToProps)(NavigationTracker);

