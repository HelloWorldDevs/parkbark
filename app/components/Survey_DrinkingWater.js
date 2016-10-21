import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../src/survey_core';
import Button from './common/Button.js';
import { Form, InputField } from 'react-native-form-generator';

class Survey_DrinkingWater extends Component {
    constructor(props){
    super(props);
    this.state = {
      formData:{},
    }
  }

  clickYes() {
      const updateValue = {};
      updateValue.title = 'drinking_water';
      // Drinking Water TID for api
      updateValue.value = 2;
      this.saveFormData(updateValue);
  }

  clickNo() {
      const updateValue = {};
      updateValue.title = 'drinking_water';
      updateValue.value = 0;
      this.saveFormData(updateValue);
  }

  saveFormData(updateValue) {
      this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
      this.props.navigator.push({name: 'surveyNotes'});
  }


  componentDidMount() {
    // console.log(this.props);
  }

    render() {
        return (
            <View
                ref='surveyForm'
                style={styles.form}
            >
                       <Form
                           ref='surveyFormDrinkingWater'
                       >
                           <Text>Is there drinking water for dogs here?</Text>

                           <Button
                            bgcolor={'#E79C23'}
                            text={'YES'}
                            onPress={this.clickYes.bind(this)}
                            ref='drinking_water'
                           />
                           <Button
                            bgcolor={'#E79C23'}
                            text={'NO'}
                            onPress={this.clickNo.bind(this)}
                            ref='drinking_water_no'
                           />

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
});

const mapStateToProps = (state) => {
  return {
    parkForm: state.getIn(['survey', 'park_form']).toJS()
  }
}

export default connect(mapStateToProps)(Survey_DrinkingWater);
