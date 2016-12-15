import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../../src/survey_core';
import Button from '../../components/common/Button.js';
import { Form, InputField } from 'react-native-form-generator';
import { Actions } from 'react-native-router-flux';

class Survey_ParkName extends Component {
    constructor(props){
    super(props);
    this.state = {
      formData:{
          title: 'Unknown'
      }
    }
  }
  handleFormChange(formData){
    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
    console.log(formData);
  }
  onClosePress(formData) {
      const updateValue = {};
      updateValue.title = 'title';
      updateValue.value = this.state.formData.title;
      this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
      Actions.pop();
  }
  saveFormData() {
      const updateValue = {};
      updateValue.title = 'title';
      updateValue.value = this.state.formData.title;
      this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
      Actions.parkAddress();
  }

    render() {
        const B = (props) => <Text style={{fontFamily: 'Source Sans Pro 600'}}>{props.children}</Text>
        return (
            <View ref='suggest_park' style={styles.container}>
                <TouchableOpacity
                    onPress={this.onClosePress.bind(this)}
                    style={{position: 'absolute', top: 30, right: 15, zIndex: 1}}
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                >
                  <Image style={{width: 20, height: 20, opacity: 0.67}} source={require('../../img/button_close.png')}/>
                </TouchableOpacity>
                <Text style={styles.question}>What is the <B>name</B> of this dog park?</Text>
                    <Form style={styles.form} ref='SuggestedPark' onChange={this.handleFormChange.bind(this)}>
                       <InputField
                           ref='title'
                           placeholder='Type Park Name'
                           underlineColorAndroid='#EF3A39'
                           style={styles.input}
                       />
                       <View style={styles.wrapper}>
                           <Button
                             bgimage={require('../../img/transparent.png')}
                             text={"I don't know"}
                             textColor={'#8b8b8b'}
                             fontSize={15}
                             font={'Source Sans Pro 200'}
                             alignSelf={'center'}
                             onPress={this.saveFormData.bind(this)}
                         />
                          <Button
                            bgimage={require('../../img/red-gradient.png')}
                            text={' OK '}
                            textColor={'#fff'}
                            alignSelf={'center'}
                            onPress={this.saveFormData.bind(this)}
                          />
                      </View>
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
        color: '#EF3A39',
        fontSize: 48,
        fontFamily: 'Source Sans Pro 200',
        marginBottom: 100
    },
    form: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    // input: {
    //     flex: 1,
    //     justifyContent: 'flex-end'
    // },
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end'
    }
})


const mapStateToProps = (state) => {
  return {
    parkForm: state.getIn(['survey', 'park_form']).toJS() || {}
  }
}

export default connect(mapStateToProps)(Survey_ParkName);
