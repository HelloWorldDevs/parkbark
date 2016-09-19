//will import app container and add tie all component state with react-redux Provider

import React, { Component } from 'react';
import App from './containers/app';
import { Map } from 'immutable';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import makeStore from './redux/store';
// import reducer from './redux/reducer';
// import thunk from 'redux-thunk';

const store = makeStore();



store.dispatch({
  type: 'SET_LOCATION',
  state : Map({
    coords:{
      latitude: 45.513752,
      longitude: -122.661654,
      latitudeDelta: .1,
      longitudeDelta: .1
    },
    markers: [{
      latlng: {
        latitude:45.513752,
        longitude: -122.661654
      },
      title: 'NXT Lab',
      description: 'Here we are at HelloWorld building parkBark!'
    }]
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

