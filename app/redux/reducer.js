import {Map} from 'immutable';
import {setLocations} from '../src/core';



export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return setLocations(state, action.state);
  }
  return state;
}