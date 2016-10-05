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
        <View>
          <TouchableOpacity
              onPress={this.onBackPress.bind(this)}
              style={{position: 'absolute', top: 30, right: 15, zIndex: 1}}>
            <Image style={{width: 20, height: 20}} source={require('../img/button_close.png')}/>
          </TouchableOpacity>
          <ScrollView style={styles.filterScrollView}bounces={false}>
            <Text style={styles.filterTitle}>Filter Parks</Text>
            {this.renderFilters()}
          </ScrollView>
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
    selectedFilters: state
  }
}

export default connect(mapStateToProps)(FilterList);