import {Map} from 'immutable';
import {updateSelectedPark} from '../src/parkdetail_core';


export default function(state = Map({}), action) {
  switch (action.type) {
    case 'UPDATE_SElECTED_PARK':
        return updateSelectedPark(state, action.state);
  }
  return state;
}
