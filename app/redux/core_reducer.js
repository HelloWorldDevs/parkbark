import {Map} from 'immutable';
import {setNotifcations, setLoading} from '../src/core';

export default function(state = Map({}), action) {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return setNotifcations(state, action.state);
    case 'SET_LOADING':
      return setLoading(state, action.state)
  }
  return state;
}