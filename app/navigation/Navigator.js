import Map from '../containers/Map';
import Landing from '../containers/Landing';
import AdditionalFeatures from '../containers/AdditionalFeatures';
import ParkDetail from '../containers/ParkDetail';
import Survey_NumDogs from '../components/Survey_NumDogs';
import Survey_DrinkingWater from '../components/Survey_DrinkingWater';
import Survey_Notes from '../components/Survey_Notes';
import FilterList from '../components/FilterList';
import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { connect } from 'react-redux';


var ROUTES = {
  landing: Landing,
  features: AdditionalFeatures,
  map: Map,
  surveyNumDogs: Survey_NumDogs,
  surveyDrinkingWater: Survey_DrinkingWater,
  surveyNotes: Survey_Notes,
  parkdetail: ParkDetail,
  filterlist: FilterList
};


export default React.createClass ({
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />
  },

  render: function() {
    return (
        <Navigator
            initialRoute={{name: 'landing'}}
            renderScene={this.renderScene}
            configureScene={()=> {
              return Navigator.SceneConfigs.FloatFromRight
            }}
        />
    )
  },


});



//TODO Dispatch Navigator Properties to Redux Store?

// setNavigatorProps(route, navigator) {
//   this.props.dispatch({
//     type: 'SET_NAVIGATOR_PROPS',
//     state: {
//       navigator: navigator,
//       route: route
//     }
//   });
// }


// const mapStateToProps = (state) => {
//   return {
//     navigator_props: state.get('navigator_props')
//   };
// }
//
// export default connect(mapStateToProps)(NavigatorComponent);
