import  React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import { connect } from 'react-redux';
import Card from './common/Card.js';
import CardSection from './common/CardSection.js'


export default class FilterDetail extends Component {

  componentWillMount() {
    const { staged, selected } = this.props.currentFilter;
    if (selected || staged === 'add') {
         this.fontFamily = 'Source Sans Pro 700';
         this.image = require('../img/Ok@3x.png');
    } else {
        this.fontFamily = 'Source Sans Pro 200';
    }
  }

  //adds staged for add or remove prop to park amenity object in immutable state.
  onPress() {
      const {currentFilterIndex} = this.props;
      const { staged, selected } = this.props.currentFilter;
      if(!staged || staged === 'remove') {
        this.props.dispatch({type: 'ADD_STAGED_FILTER', state: currentFilterIndex});
        this.fontFamily = 'Source Sans Pro 700';
        this.image = require('../img/Ok@3x.png');
      }
      if(staged === 'add' || selected) {
        this.props.dispatch({type: 'REMOVE_STAGED_FILTER', state: currentFilterIndex});
        this.fontFamily = 'Source Sans Pro 200';
        this.image = null;
      }
  }

  render() {
    return (
        <View>
            <TouchableOpacity
                disabled={this.props.disabled}
                onPress={this.onPress.bind(this)}>
              <Card>
                  <Text  style={{fontFamily: this.fontFamily}} >{this.props.filter}</Text>
                  <View style={{borderRadius: 10, overflow: 'hidden'}}>
                    <Image style={{ width: 20, height: 20, overflow: 'hidden'}} source={this.image || null} />
                  </View>
              </Card>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = {

}


const mapStateToProps = (state, ownProps) => {
  return {
    currentFilterIndex: state.getIn(['filter','amenities']).toJS().findIndex(a => a['name'] === ownProps.filter),
    currentFilter: state.getIn(['filter','amenities']).toJS().find((a) => a['name'] === ownProps.filter)
  }
}

export default connect(mapStateToProps)(FilterDetail);
