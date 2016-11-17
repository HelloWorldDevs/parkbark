import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../../src/survey_core';
import Button from '../../components/common/Button.js';
import { Form, InputField } from 'react-native-form-generator';

class Survey_ParkName extends Component {
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
      updateValue.title = 'title';
      updateValue.value = this.state.formData.title;
      this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
      this.props.navigator.push({name: 'parkAddress'});
  }

  componentDidMount() {
    //   console.log(this.props.parkForm);

  }

    render() {
        return (
            <View ref='suggest_park' style={styles.container}>
                <Text style={styles.question}>What's this park called?</Text>
                    <Form style={styles.wrapper} ref='SuggestedPark' onChange={this.handleFormChange.bind(this)}>
                       <InputField
                           ref='title'
                           placeholder='Park name'
                           underlineColorAndroid='#fff'
                           style={styles.input}
                       />
                      <Button
                        bgimage={require('../../img/orange-gradient.png')}
                        icon={require('../../img/forward-arrow@3x.png')}
                        alignSelf={'center'}
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
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    },
    input: {
        flex: 1
    }
})


const mapStateToProps = (state) => {
  return {
    parkForm: state.getIn(['survey', 'park_form']).toJS() || {}
  }
}

export default connect(mapStateToProps)(Survey_ParkName);
