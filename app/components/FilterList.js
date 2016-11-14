import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Button from './common/Button';
import FilterListDetail from './FilterDetail';
import {updateParksByFilterAction} from '../src/filter_core';


class FilterList extends Component {
  constructor(props) {
    super(props);
  }

//renders all FilterDetail components
  renderFilters() {
    return this.props.amenities.map(filter => <FilterListDetail disabled={false} key={filter.name} filter={filter.name}/>)
  }

  //clears staged when back is press, does not clear selected
  onBackPress() {
    this.props.dispatch({type: 'CLEAR_STAGED', state: false})
    this.props.navigator.pop();
  }



  //filters according to staged and selected, filter button must be pressed to add staged to selected
  onFilterPress() {
    const {navigator, dispatch, stagedFilters, stagedFiltersRemove} = this.props;
    dispatch({type: 'CLEAR_STAGED', state: false});
    stagedFilters.forEach(i => dispatch({type: 'ADD_FILTER', state: i}));
    stagedFiltersRemove.forEach(i => dispatch({type: 'REMOVE_FILTER', state: i}));
    dispatch({type: 'FILTER_SET', state: true});
    navigator.pop()
  }

  componentWillMount() {
    console.log(this.props.selectedFilters);
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
      dispatch({type: 'QUERY_SET', state: filterQuery});
      const dist = Math.ceil(coords.latitudeDelta * 69/2);
      const filteredCoords = coords.latitude + ',' + coords.longitude;
      updateParksByFilterAction(filteredCoords, dist, filterQuery).done((state) => {
        dispatch({type: 'UPDATE_ANNOTATIONS', state: state});
      })
    }


  //clears all staged and selected on press
  onClearFiltersPress() {
    this.props.dispatch({type: 'CLEAR_FILTERS', state: false});
    this.props.dispatch({type: 'CLEAR_STAGED', state: false});
    this.props.dispatch({type: 'FILTER_SET', state: false});
  }

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity
              onPress={this.onBackPress.bind(this)}
              style={{position: 'absolute', top: 30, right: 15, zIndex: 1}}
              hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
          >
            <Image style={{width: 20, height: 20, opacity: 0.67}} source={require('../img/button_close.png')}/>
          </TouchableOpacity>
          <ScrollView style={styles.filterScrollView}>
            <Text style={styles.filterTitle}>Filter Parks</Text>
            {this.renderFilters()}
            <View style={styles.buttonWrapper}>
                <Button
                    bgimage={require('../img/transparent.png')}
                    bgcolor={'#fff'}
                    text={'Clear Filters'}
                    alignSelf={'center'}
                    font={'Source Sans Pro 200'}
                    textColor={'#8b8b8b'}
                    fontSize={15}
                    onPress={this.onClearFiltersPress.bind(this)}
                />
                <Button
                    bgimage={require('../img/transparent.png')}
                    bgcolor={'#ef3a39'}
                    text={'Filter'}
                    alignSelf={'stretch'}
                    textColor={'#fff'}
                    fontSize={15}
                    fontFamily={'Source Sans Pro 700'}
                    onPress={this.onFilterPress.bind(this)}
                />
            </View>
          </ScrollView>
        </View>
    )
  }
};

const styles = {
  container: {
    backgroundColor: '#fff'
},
  filterScrollView: {
    height: Dimensions.get('window').height -100,
    padding: 10,
    marginTop: 50,
    marginBottom: 20
  },
  filterTitle: {
    color: '#ef3a39',
    fontFamily: 'ArchivoNarrow-Bold',
    fontSize: 12,
    lineHeight: 19
  },
  buttonWrapper: {
    marginTop: 20
  }
}


const mapStateToProps = (state) => {
  return {
    amenities: state.getIn(['filter','amenities']).toJS(),
    selectedFilters: state.getIn(['filter','amenities']).toJS().filter((a) => a['selected'] === true),
    stagedFilters: state.getIn(['filter','amenities']).toJS().reduce((a, e, i) => {
      if(e['staged'] === 'add')
        a.push(i);
        return a
    },[]),
    stagedFiltersRemove: state.getIn(['filter','amenities']).toJS().reduce((a, e, i) => {
      if(e['staged'] === 'remove')
        a.push(i);
      return a
    },[]),
    coords: state.getIn(['map', 'new_coords']),
  }
}

export default connect(mapStateToProps)(FilterList);
