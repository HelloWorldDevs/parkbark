import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Button from './common/Button';
import FilterListDetail from './FilterDetail';
import {updateParksByFilterAction} from '../src/core';


class FilterList extends Component {
  constructor(props){
    super(props);
  }

  renderFilters(){
    return this.props.amenities.map(filter => <FilterListDetail key={filter.name} filter={filter.name}/>)
  }

  onBackPress(){
    this.props.navigator.pop();
  }

  onFilterPress() {
    console.log('filter');
    console.log(this.props.selectedFilters);
    const filterQuery = this.props.selectedFilters.reduce((p, n, i) => {
      if ( i !== 0) {
        return p + ',' + n.name
      }
      return p + n.name
    }, '');
    const coords = this.props.coords.latitude + ',' + this.props.coords.longitude;
    updateParksByFilterAction(coords, filterQuery).done((state) => {
      this.props.dispatch({type: 'UPDATE_ANNOTATIONS', state: state});
      this.props.navigator.pop()
    });
  }

  onClearFiltersPress() {
    console.log('clear filters')
  }
  render(){
    return (
        <View>
          <TouchableOpacity
              onPress={this.onBackPress.bind(this)}
              style={{position: 'absolute', top: 30, right: 15, zIndex: 1}}>
            <Image style={{width: 20, height: 20}} source={require('../img/button_close.png')}/>
          </TouchableOpacity>
          <View style={styles.filterScrollView}>
            <Text style={styles.filterTitle}>Filter Parks</Text>
            {this.renderFilters()}
            <Button bgcolor={'transparent'} text={'Clear Filters'} onPress={this.onClearFiltersPress}/>
            <Button bgcolor={'#f0382c'} text={'Filter'} onPress={this.onFilterPress.bind(this)}/>
          </View>
        </View>
    )
  }

};

const styles = {
  filterScrollView: {
    marginTop: 50,
    padding: 10
  },
  filterTitle: {
    color: '#ef3a39',
    fontWeight: 'bold'
  }
}


const mapStateToProps = (state) => {
  return {
    amenities: state.get('amenities').toJS(),
    selectedFilters: state.get('amenities').toJS().filter((a) => a['selected'] === true),
    coords: state.getIn(['location', 'coords'])
  }
}

export default connect(mapStateToProps)(FilterList);