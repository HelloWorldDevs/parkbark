import {Scene, Router} from 'react-native-router-flux';
import {View} from 'react-native';
import React, { Component } from 'react';
import Map from '../routes/Map';
import Landing from '../routes/Landing';
import AdditionalFeatures from '../routes/AdditionalFeatures';
import ThankYou from '../routes/ThankYou';
import ParkDetail from '../routes/ParkDetail';
import Survey_ParkName from '../routes/survey/Survey_ParkName';
import Survey_ParkAddress from "../routes/survey/Survey_ParkAddress"
import Survey_NumDogs from '../routes/survey/Survey_NumDogs';
import Survey_FencedArea from '../routes/survey/Survey_FencedArea';
import Survey_DrinkingWater from '../routes/survey/Survey_DrinkingWater';
import Survey_AgilityCourse from '../routes/survey/Survey_AgilityCourse';
import Survey_Shade from '../routes/survey/Survey_Shade';
import Survey_Benches from '../routes/survey/Survey_Benches';
import Survey_CoveredArea from '../routes/survey/Survey_CoveredArea';
import Survey_HikingTrails from '../routes/survey/Survey_HikingTrails';
import Survey_OffLeash from '../routes/survey/Survey_OffLeash';
import Survey_PoopBags from '../routes/survey/Survey_PoopBags';
import Survey_Restrooms from '../routes/survey/Survey_Restrooms';
import Survey_SmallDogs from '../routes/survey/Survey_SmallDogs';
import Survey_Notes from '../routes/survey/Survey_Notes';
import FilterList from '../components/amenity_filter/FilterList';
import AdInterstitial from '../components/common/AdInterstitial'



class NavigatorComponent extends Component {

  constructor() {
    super();
  }

  componentWillMount() {

  }


  render() {
    return <Router>
      <Scene key="root">
        <Scene hideNavBar={true}  key="landing" component={Landing} initial={true}/>
        <Scene hideNavBar={true} key="map" component={Map} />
        <Scene hideNavBar={true} key="surveyNumDogs" component={Survey_NumDogs}/>
        <Scene hideNavBar={true} key="surveyFencedArea" component={Survey_FencedArea}/>
        <Scene hideNavBar={true} key="surveyOffLeash" component={Survey_OffLeash}/>
        <Scene hideNavBar={true} key="surveySmallDogs" component={Survey_SmallDogs}/>
        <Scene hideNavBar={true} key="surveyDrinkingWater" component={Survey_DrinkingWater}/>
        <Scene hideNavBar={true} key="surveyPoopBags" component={Survey_PoopBags}/>
        <Scene hideNavBar={true} key="surveyHikingTrails" component={Survey_HikingTrails}/>
        <Scene hideNavBar={true} key="surveyShade" component={Survey_Shade}/>
        <Scene hideNavBar={true} key="surveyBenches" component={Survey_Benches}/>
        <Scene hideNavBar={true} key="surveyCoveredArea" component={Survey_CoveredArea}/>
        <Scene hideNavBar={true} key="surveyRestrooms" component={Survey_Restrooms}/>
        <Scene hideNavBar={true} key="surveyAgilityCourse" component={Survey_AgilityCourse}/>
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


}


export default NavigatorComponent;
