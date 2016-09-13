import Map from '../containers/map';
import Landing from '../components/landing';
import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { connect } from 'react-redux';


var ROUTES = {
  landing: Landing,
  map: Map
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




