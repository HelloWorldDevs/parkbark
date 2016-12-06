import {Scene, Router} from 'react-native-router-flux';
import Map from '../routes/Map';
import Landing from '../routes/Landing';
import AdditionalFeatures from '../routes/AdditionalFeatures';
import ThankYou from '../routes/ThankYou';
import ParkDetail from '../routes/ParkDetail';
import Survey_ParkName from '../routes/survey/Survey_ParkName';
import Survey_ParkAddress from "../routes/survey/Survey_ParkAddress"
import Survey_NumDogs from '../routes/survey/Survey_NumDogs';
import Survey_DrinkingWater from '../routes/survey/Survey_DrinkingWater';
import Survey_Notes from '../routes/survey/Survey_Notes';
import FilterList from '../components/amenity_filter/FilterList';
import AdInterstitial from '../components/common/AdInterstitial'
import React, { Component } from 'react';
import { Navigator } from 'react-native';
import NetworkAlert from '../components/common/NetworkAlert';
import { connect } from 'react-redux';

// var ROUTES = {
//   landing: Landing,
//   features: AdditionalFeatures,
//   map: Map,
//   surveyNumDogs: Survey_NumDogs,
//   surveyDrinkingWater: Survey_DrinkingWater,
//   surveyNotes: Survey_Notes,
//   parkName: Survey_ParkName,
//   parkAddress: Survey_ParkAddress,
//   thanks: ThankYou,
//   parkdetail: ParkDetail,
//   filterlist: FilterList,
//   adCTA: AdInterstitial
// };


class NavigatorComponent extends Component {

  constructor() {
    super();
    this.navigator = null;
  }

  componentWillMount() {

  }

  render() {
    return <Router>
      <Scene key="root">
        <Scene hideNavBar={true}  key="landing" component={Landing} initial={true}/>
        <Scene hideNavBar={true} key="map" component={Map} />
        <Scene hideNavBar={true} key="surveyNumDogs" component={Survey_NumDogs}/>
        <Scene hideNavBar={true} key="surveyDrinkingWater" component={Survey_DrinkingWater}/>
        <Scene hideNavBar={true} key="surveyNotes" component={Survey_Notes} />
        <Scene hideNavBar={true} key="parkName" component={Survey_ParkName} />
        <Scene hideNavBar={true} key="parkAddress" component={Survey_ParkAddress} />
        <Scene hideNavBar={true} key="thanks" component={ThankYou} />
        <Scene hideNavBar={true} key="parkdetail" component={ParkDetail} />
        <Scene hideNavBar={true} key="adCTA" component={AdInterstitial} />
        <Scene hideNavBar={true} key="filterlist" component={FilterList} />
      </Scene>
    </Router>
  }

  /// Old Navigator Component Code  ///

  // componentDidMount() {
  //   BackAndroid.addEventListener('hardwareBackPress', () => {
  //     if (this.navigator && this.navigator.getCurrentRoutes().length > 1 && this.navigator.getCurrentRoutes().pop().name != 'map') {
  //       this.navigator.pop();
  //       return true;
  //     }
  //     if(this.navigator && this.navigator.getCurrentRoutes().length > 1 && this.navigator.getCurrentRoutes().pop().name === 'map') {
  //       this.navigator.popToTop();
  //       return true;
  //     }
  //     return false;
  //   });
  // }

  // renderScene(route, navigator) {
  //   if(this.navigator){
  //     console.log(this.navigator.getCurrentRoutes());
  //   }
  //   var Component = ROUTES[route.name];
  //   return <Component route={route} navigator={navigator} />
  // }

  // render() {
  //   return (
  //       <Navigator
  //           ref={(nav) => { this.navigator = nav; }}
  //           initialRoute={{name: 'landing'}}
  //           renderScene={this.renderScene.bind(this)}
  //           configureScene={()=> {
  //             return Navigator.SceneConfigs.FloatFromRight
  //           }}
  //       />
  //   )
  // }


}


export default NavigatorComponent;
