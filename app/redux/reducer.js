import {Map} from 'immutable';
import {setLocations, updateSearch, updateAnnotations, updateRegion, updateSelectedPark} from '../src/core';


export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return setLocations(state, action.state);
    case 'SET_NAVIGATOR_PROPS':
        return setNavigatorProps(state, action.state);
    case 'UPDATE_ANNOTATIONS':
      return updateAnnotations(state, action.state);
    case 'UPDATE_REGION':
      return updateRegion(state, action.state);
    case 'UPDATE_SEARCH':
      return updateSearch(state, action.state);
    case 'UPDATE_SElECTED_PARK':
        return updateSelectedPark(state, action.state)
  }
  return state;
}

