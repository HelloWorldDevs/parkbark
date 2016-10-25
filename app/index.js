//will import app container and add tie all component state with react-redux Provider

import React, { Component } from 'react';
import App from './containers/app';
import { Map } from 'immutable';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import makeStore from './redux/store';


const store = makeStore();


//set default position
store.dispatch({
  type: 'SET_LOCATION',
  state : Map({
    coords:{
      latitude: 45.523031,
      longitude: -122.676772,
      latitudeDelta: .1,
      longitudeDelta: .1
    },
    default_position: {
      latitude: 45.523031,
      longitude: -122.676772
    },
    parks: []
  })
});



const AppProvider = (
    <Provider store={store}>
      <App />
    </Provider>
);


class Main extends Component {
  render() {
    return (
        AppProvider
    )
  }
}

export default Main;

