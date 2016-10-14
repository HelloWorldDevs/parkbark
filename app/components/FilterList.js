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

//renders all FilterDetail components
  renderFilters(){
    return this.props.amenities.map(filter => <FilterListDetail disabled={false} key={filter.name} filter={filter.name}/>)
  }

  //clears staged when back is press, does not clear selected
  onBackPress(){
    this.props.dispatch({type: 'CLEAR_STAGED', state: false})
    this.props.navigator.pop();
  }



  //filters according to staged and selected, filter button must be pressed to add staged to selected
  onFilterPress() {
    const {navigator, dispatch, stagedFilters, stagedFiltersRemove} = this.props;
    dispatch({type: 'CLEAR_STAGED', state: false});
    stagedFilters.forEach(i => dispatch({type: 'ADD_FILTER', state: i}));
    stagedFiltersRemove.forEach(i => dispatch({type: 'REMOVE_FILTER', state: i}));
    navigator.pop()
  }


  //concatenates selected filters, sends query to db with action, and updates annotations (markers) on complete
  componentWillUnmount() {
    const {selectedFilters, dispatch, coords} = this.props;
      const filterQuery = selectedFilters.reduce((p, n, i) => {
        if (i !== 0) {
          return p + ',' + n.name
        }
        return p + n.name
      }, '');
      console.log(filterQuery);
      const filteredCoords = coords.latitude + ',' + coords.longitude;
      updateParksByFilterAction(filteredCoords, filterQuery).done((state) => {
        dispatch({type: 'UPDATE_ANNOTATIONS', state: state});
      })
    }



  //clears all staged and selected on press
  onClearFiltersPress() {
    this.props.dispatch({type: 'CLEAR_FILTERS', state: false})
    this.props.dispatch({type: 'CLEAR_STAGED', state: false})
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
            <Button bgcolor={'transparent'} text={'Clear Filters'} onPress={this.onClearFiltersPress.bind(this)}/>
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
    stagedFilters: state.get('amenities').toJS().reduce((a, e, i) => {
      if(e['staged'] === 'add')
        a.push(i);
        return a
    },[]),
    stagedFiltersRemove: state.get('amenities').toJS().reduce((a, e, i) => {
      if(e['staged'] === 'remove')
        a.push(i);
      return a
    },[]),
    coords: state.getIn(['location', 'coords'])
  }
}

export default connect(mapStateToProps)(FilterList);