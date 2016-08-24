//will import app container and add tie all component state with react-redux Provider

import React, { Component } from 'react';
import App from './containers/app';
import {Provider} from 'react-redux';
import makeStore from './redux/store';
import reducer from './redux/reducer';

const store = makeStore(reducer);

store.dispatch({
  type: 'SET_LOCATION',
  state: {
    coords: {
      latitude: 45.513752,
      longitude: -122.661654
    },
    markers: {
      latitude: 45.513752,
      longitude: -122.661654
    }
  }
});



class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default Main;

