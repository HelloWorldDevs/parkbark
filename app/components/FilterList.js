import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Card from '../components/common/Card';
import FilterListDetail from './FilterDetail';
import { connect } from 'react-redux';

class FilterList extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const {currentPark} = this.props;
  }



  renderFilters(){
    const currentFilters = [
      'Fenced',
      'Small dog area',
      'Water available',
      'Off-leash',
      'Dog swimming area',
      'Trails',
      'Benches',
      'Restrooms'
    ];
    return currentFilters.map(filter => <FilterListDetail key={filter} filter={filter}/>)
  }

  onBackPress(){
    this.props.navigator.pop();
  }

  render(){
    return (
        <ScrollView bounces={false}>
          <TouchableOpacity
              onPress={this.onBackPress.bind(this)}
              style={{position: 'absolute', top: 20, left: 20, zIndex: 1}}>
            <Image style={{width: 25, height: 25, padding: 10}} source={require('../img/back-arrow@3x.png')}/>
          </TouchableOpacity>
            {this.renderFilters()}
        </ScrollView>
    )
  }

};

const styles = {
  // imageWrapper: {
  //   flex: 1,
  //   alignItems: 'stretch'
  // },
  // image: {
  //   flex: 1,
  //   height: 20
  // },
  // detailTitle: {
  //   fontWeight: 'bold'
  // }
}

const mapStateToProps = (state) => {
  return {
    state: state
    // currentPark: state.getIn(['location', 'parks']).find((park) => park['title'] === state.get('current_park'))
  }
}

export default connect(mapStateToProps)(FilterList);