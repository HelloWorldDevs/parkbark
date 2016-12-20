import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';


class PositionMarker extends Component {
  componentWillMount() {
    console.log('position marker mount ', this.props.position)
  }

  render() {
    return (
      <MapView.Marker
          key={'user_location'}
          coordinate={this.props.position ? this.props.position : this.props.default_position}
          image={require('../../img/user_location.png')}
      />
    )
  }
};


const mapStateToProps = (state) => {
  return {
    default_position: state.getIn(['map', 'location', 'default_position']),
    position: state.getIn(['map','position'])
  }
}

export default connect(mapStateToProps)(PositionMarker);
