import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../../src/survey_core';
import Button from '../../components/common/Button.js';
import { Form, InputField } from 'react-native-form-generator';


class Survey_Notes extends Component {
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
    updateValue.title = 'notes';
    updateValue.value = this.state.formData.notes;
    this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
    // If last question...
    // Wait for dispatch to UPDATE_SURVEY to complete
        this.sendFormData().done(() => {
          console.log('sendFormData done');
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
    //   console.log(this.props.parkForm);
  }

    render() {
        return (
            <View ref='surveyForm' style={styles.container}>
                    <Form ref='surveyFormNotes' onChange={this.handleFormChange.bind(this)}>
                       <Text style={styles.question}>Tell Us About The Park</Text>
                       <InputField
                           ref='notes'
                           placeholder='Notes'
                       />
                      <Button
                        bgcolor={'#E79C23'}
                        bgimage={require('../../img/transparent.png')}
                        text={' -->'}
                        onPress={this.saveFormData.bind(this)}
                      />
                    </Form>
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
        lineHeight: 51
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
})


const mapStateToProps = (state) => {
  return {
    parkForm: state.getIn(['survey', 'park_form']).toJS() || {}
  }
}

export default connect(mapStateToProps)(Survey_Notes);
