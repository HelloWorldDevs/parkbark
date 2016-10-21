import {Map} from 'immutable';
import {setParkSurvey, updateParkSurvey} from '../src/survey_core';


export default function(state = Map({}), action) {
  switch (action.type) {
    case 'SET_PARK_SURVEY':
      return setParkSurvey(state, action.state);
    case 'UPDATE_SURVEY':
      return updateParkSurvey(state, action.state);
  }
  return state;
}
