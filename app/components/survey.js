import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { Form, InputField } from 'react-native-form-generator';

export default class Survey extends Component {
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
  handleFormFocus(e, component){
    // console.log(e, component);
  }

    render() {
        console.log('state: ', this.state.formData);
        return (
            <Form
                ref='surveyForm'
                onFocus={this.handleFormFocus.bind(this)}
                onChange={this.handleFormChange.bind(this)}
                style={styles.form}
            >
                <InputField
                    multiline={true}
                    ref='notes'
                    placeholder='Notes'
                />
                <InputField
                    ref='num_dogs'
                    placeholder='Number of Dogs'
                />
            </Form>
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
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    }
})
