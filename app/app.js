import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigator from './navigation/navigator';



class App extends Component {

  render() {
    return (
        <Navigator />
    );
  }
};

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(App);
