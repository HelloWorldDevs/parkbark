import React, { Component } from 'react';
import App from './app';
import {Provider} from 'react-redux';
import store from './redux/store';
import Geolocator from './components/map/Geolocator';


const geolocator = new Geolocator(store);


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

