import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../src/core';
import Button from './common/Button.js';
import { Form, InputField } from 'react-native-form-generator';

class Survey_NumDogs extends Component {
    constructor(props){
    super(props);
    this.state = {
      formData:{},
    }
  }
  handleFormChange(formData){
    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  saveFormData() {
      const updateValue = {};
      updateValue.title = 'num_dogs';
      updateValue.value = this.state.formData.num_dogs;
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
                           ref='surveyFormNumDogs'
                           onChange={this.handleFormChange.bind(this)}
                       >
                           <InputField
                               ref='num_dogs'
                               placeholder='Number of Dogs'
                           />
                      </Form>
              <Button bgcolor={'#E79C23'} text={' -->'} onPress={this.saveFormData.bind(this)}/>
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
    parkForm: state.get('park_form').toJS()
  }
}

export default connect(mapStateToProps)(Survey_NumDogs);
