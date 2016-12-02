import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../../src/survey_core';
import Button from '../../components/common/Button.js';
import { Form, InputField } from 'react-native-form-generator';
import { Actions } from 'react-native-router-flux';


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

  onClosePress(formData) {
      const updateValue = {};
      updateValue.title = 'notes';
      updateValue.value = this.state.formData.notes;
      this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
      this.sendFormData().done(() => {
        Actions.thanks();
      });
  }

  saveFormData() {
    const updateValue = {};
    updateValue.title = 'notes';
    updateValue.value = this.state.formData.notes;
    this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
    this.sendFormData().done(() => {
      Actions.thanks();
    });
  }

  sendFormData() {
      const formData = this.props.parkForm;
      console.log(formData)
      return sendSurveyResponses(formData);
  }

  // componentDidUpdate(props) {
  //     this.sendFormData().done(() => {
  //       Actions.thanks();
  //     });
  // }


    render() {
        return (
            <View ref='surveyForm' style={styles.container}>
                <TouchableOpacity
                    onPress={this.onClosePress.bind(this)}
                    style={{position: 'absolute', top: 30, right: 15, zIndex: 1}}
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                >
                  <Image style={{width: 20, height: 20, opacity: 0.67}} source={require('../../img/button_close.png')}/>
                </TouchableOpacity>
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
