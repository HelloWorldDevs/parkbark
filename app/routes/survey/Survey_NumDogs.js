import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../../src/survey_core';
import Button from '../../components/common/Button.js';
import { Form, InputField } from 'react-native-form-generator';
import { Actions } from 'react-native-router-flux';


class Survey_NumDogs extends Component {
    constructor(props){
    super(props);
    this.state = {
      formData:{
          num_dogs: 5
      },
    }
  }

  onClosePress(formData) {
      const updateValue = {};
      updateValue.title = 'num_dogs';
      updateValue.value = this.state.formData.num_dogs;
      this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
      this.sendFormData().done(() => {
        Actions.pop();
      });
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
      Actions.surveyDrinkingWater();
  }

  sendFormData() {
      const formData = this.props.parkForm;
      return sendSurveyResponses(formData);
  }

  addNumber(formData) {
      var newFormData = this.state.formData;
      newFormData.num_dogs = parseInt(this.state.formData.num_dogs) + 1;
      this.setState({formData: newFormData});
      this.refs.surveyFormNumDogs.refs.num_dogs.setValue(this.state.formData.num_dogs.toString());
  }

  subtractNumber(formData) {
      var newFormData = this.state.formData;
      newFormData.num_dogs = parseInt(this.state.formData.num_dogs) - 1;
      this.setState({formData: newFormData});
      this.refs.surveyFormNumDogs.refs.num_dogs.setValue(this.state.formData.num_dogs.toString());
  }

  componentDidMount() {
    // console.log(this.state.formData);
  }

    render() {
        let value = this.state.formData.num_dogs.toString();
        return (
            <View
                ref='surveyForm'
                style={styles.container}
            >
                <TouchableOpacity
                    onPress={this.onClosePress.bind(this)}
                    style={{position: 'absolute', top: 30, right: 15, zIndex: 1}}
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                >
                  <Image style={{width: 20, height: 20, opacity: 0.67}} source={require('../../img/button_close.png')}/>
                </TouchableOpacity>
                <Text style={styles.question}>How many dogs do you see at the park?</Text>
                   <Form
                       ref='surveyFormNumDogs'
                       onChange={this.handleFormChange.bind(this)}
                       style={styles.wrapper}
                   >
                           <Button
                                bgimage={require('../../img/Minus.png')}
                                onPress={this.subtractNumber.bind(this)}
                           />
                           <InputField
                               ref='num_dogs'
                               value={value}
                               keyboardType= 'numeric'
                               underlineColorAndroid='#fff'
                               style={styles.input}
                           />
                           <Button
                                bgimage={require('../../img/Plus.png')}
                                onPress={this.addNumber.bind(this)}
                            />
                  </Form>
              <Button
                bgimage={require('../../img/red-gradient.png')}
                text={' OK '}
                fontSize={15}
                font={'Source Sans Pro 700'}
                textColor={'#fff'}
                onPress={this.saveFormData.bind(this)}
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
      color: '#ef3a39',
      fontFamily: 'Source Sans Pro 200',
      fontSize: 48,
      lineHeight: 51,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
      flex: 1,
      fontSize: 140,
      fontFamily: 'Source Sans Pro 900',
      color: '#ef3a39',
      lineHeight: 51,
  }
});

const mapStateToProps = (state) => {
  return {
    parkForm: state.getIn(['survey', 'park_form']).toJS()
  }
}

export default connect(mapStateToProps)(Survey_NumDogs);
