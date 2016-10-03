import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../src/core';
import { RNDeviceInfo } from 'react-native-device-info';
import { Form, InputField } from 'react-native-form-generator';

export default class Survey extends Component {
    constructor(props){
    super(props);
    this.state = {
      formData:{},
      notesModalVisible: true,
      numModalVisibile: true,
    }
  }
  handleFormChange(formData){
    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  saveFormData(formData) {
     sendSurveyResponses(formData);
     console.log(formData)
  }

  setNotesModalVisible(visible, formData) {
      this.setState({notesModalVisible: visible});
      this.saveFormData(formData);
  }
  setNumModalVisible(visible, formData) {
      this.setState({numModalVisible: visible});
      this.saveFormData(formData);
  }

    render() {
        // console.log('Device Unique: ', RNDeviceInfo.getUniqueID());
        return (
            <View
                ref='surveyForm'
                style={styles.form}
            >
                <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.notesModalVisible}
                >
                    <Form
                        ref='surveyFormNotes'
                        onChange={this.handleFormChange.bind(this)}
                    >
                        <InputField
                            multiline={true}
                            ref='notes'
                            placeholder='Notes'
                        />
                        <TouchableHighlight
                            onPress={() => {
                                 this.setNotesModalVisible(!this.state.notesModalVisible, this.state.formData)
                               }}
                        >
                             <Text>Hide Modal</Text>
                       </TouchableHighlight>
                   </Form>
                   <Modal
                       animationType={"fade"}
                       transparent={false}
                       visible={this.state.numModalVisible}
                   >
                       <Form
                           ref='surveyFormNumDogs'
                           onChange={this.handleFormChange.bind(this)}
                       >
                           <InputField
                               ref='num_dogs'
                               placeholder='Number of Dogs'
                           />
                           <TouchableHighlight
                               onPress={() => {
                                    this.setNumModalVisible(!this.state.numModalVisible, this.state.formData)
                                  }}
                           >
                                <Text>Hide Modal</Text>
                          </TouchableHighlight>
                      </Form>
                   </Modal>
                </Modal>


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
