import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../../src/survey_core';
import Button from '../../components/common/Button.js';
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
    //   this.props.navigator.push({name: 'surveyNotes'});
      // If last question...
      // Wait for dispatch to UPDATE_SURVEY to complete
          this.sendFormData().done(() => {
            // console.log('sendFormData done');
            this.props.navigator.push({name: 'thanks'})
      });
  }

  sendFormData() {
      // console.log('sendFormData')
      const formData = this.props.parkForm;
      // console.log(formData)
      return sendSurveyResponses(formData);
  }

  componentDidMount() {
    // console.log(this.props);
  }

    render() {
        return (
            <View
                ref='surveyForm'
                style={styles.container}
            >
                <Text style={styles.question}>Is there drinking water for dogs here?</Text>
                       <Form
                           ref='surveyFormDrinkingWater'
                           style={styles.wrapper}
                       >

                           <Button
                                bgimage={require('../../img/orange-circle.png')}
                                text={'YES'}
                                textColor={'#fff'}
                                fontSize={42}
                                font={'Source Sans Pro 900'}
                                onPress={this.clickYes.bind(this)}
                                ref='drinking_water'
                           />
                           <Button
                                bgimage={require('../../img/orange-circle.png')}
                                text={'NO'}
                                textColor={'#fff'}
                                fontSize={42}
                                font={'Source Sans Pro 900'}
                                onPress={this.clickNo.bind(this)}
                                ref='drinking_water_no'
                           />

                      </Form>
                      <Button
                        bgimage={require('../../img/transparent.png')}
                        text={"I don't know"}
                        textColor={'#8b8b8b'}
                        fontSize={15}
                        font={'Source Sans Pro 200'}
                        // onPress={this.props.navigator.push({name: 'thanks'})}
                    />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
    },
    question: {
        color: '#f58120',
        fontSize: 48,
        fontFamily: 'Source Sans Pro 200',
    },
    wrapper: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const mapStateToProps = (state) => {
  return {
    parkForm: state.getIn(['survey', 'park_form']).toJS()
  }
}

export default connect(mapStateToProps)(Survey_DrinkingWater);
