import {Map} from 'immutable';
import {updateSearch} from '../src/search_core';


export default function(state = Map({}), action) {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return updateSearch(state, action.state);
  }
  return state;
}
