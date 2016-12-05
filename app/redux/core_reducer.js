import {Map} from 'immutable';
import {setNotifcations} from '../src/core';

export default function(state = Map({}), action) {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return setNotifcations(state, action.state);
  }
  return state;
}