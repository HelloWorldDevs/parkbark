import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../src/core';
import { RNDeviceInfo } from 'react-native-device-info';
import Button from './common/Button.js';
import { Form, InputField } from 'react-native-form-generator';

export default class Survey extends Component {
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

  saveFormData(formData) {
     // sendSurveyResponses(formData);
  }


    render() {
        return (
            <View ref='surveyForm' style={styles.form}>
                    <Form ref='surveyFormNotes' onChange={this.handleFormChange.bind(this)}>
                       <Text>Tell Us About The Park</Text>
                      <Button bgcolor={'#E79C23'} text={' Yes'} onPress={this.saveFormDataYes.bind(this)}/>
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
    state: state
  }
}

export default connect(mapStateToProps)(Survey);
