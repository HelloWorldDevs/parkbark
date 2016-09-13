import Map from '../containers/map';
import Landing from '../components/landing';
import React, { Component } from 'react';
import { Navigator } from 'react-native';
import makeStore from '../redux/store';
// import reducer from '../redux/reducer';
import { connect } from 'react-redux';

const store = makeStore();

var ROUTES = {
  landing: Landing,
  map: Map
};


export default class NavigatorComponent extends Component {
  renderScene(route, navigator) {
    store.dispatch({
      type: 'SET_NAVIGATOR_PROPS',
      state: {
        navigator: navigator,
        route: route
      }
    });
    var Component = ROUTES[route.name];
    return <Component />
  }

  render() {
    return (
        <Navigator
            initialRoute={{name: 'landing'}}
            renderScene={this.renderScene}
            configureScene={()=> {
              return Navigator.SceneConfigs.FloatFromRight
            }}
        />
    )
  }
  componentDidMount(){
    console.log(this.props);
  }
}


const mapStateToProps = (state) => {
  return {
    navigator: state.getIn(['navigator_props', 'navigator']),
    route: state
  };
}

export default connect(mapStateToProps)(NavigatorComponent);




