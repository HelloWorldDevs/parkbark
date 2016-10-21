import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../src/survey_core';
import Button from './common/Button.js';
import { Form, InputField } from 'react-native-form-generator';

class Survey_ParkAddress extends Component {
    constructor(props){
    super(props);
    this.state = {
      formData:{}
    }
  }
  handleFormChange(formData){
    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  saveFormData() {
      const updateValue = {};
      updateValue.title = 'suggested_park';
      updateValue.value = this.state.formData.park_address;
      this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
      this.props.navigator.push({name: 'surveyNotes'});
  }


  componentDidMount() {
    //   console.log(this.props.parkForm);

  }

    render() {
        return (
            <View ref='suggest_park' style={styles.form}>
                    <Form ref='SuggestedPark' onChange={this.handleFormChange.bind(this)}>
                       <Text>Where is this park?</Text>
                       <InputField
                           ref='park_address'
                           placeholder='Park address'
                       />
                      <Button bgcolor={'#E79C23'} text={' -->'} onPress={this.saveFormData.bind(this)}/>
                    </Form>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    form: {
        flex: 0,
        padding: 30,
    },
    close: {
        marginTop: 30,
        textAlign: 'right',
        marginRight: 10,
    },
    container: {
      flex: 0,
      justifyContent: 'center',
      padding: 50,
    }
})

const mapStateToProps = (state) => {
  return {
    parkForm: state.getIn(['survey', 'park_form']).toJS() || {}
  }
}

export default connect(mapStateToProps)(Survey_ParkAddress);
