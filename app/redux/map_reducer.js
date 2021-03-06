import {Map} from 'immutable';
import {setLocations, recordLocation, setPosition, updateAnnotations, mapHide, updateRegion} from '../src/map_core';

export default function(state = Map({}), action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return setLocations(state, action.state);
    case 'RECORD_LOCATION':
      return recordLocation(state, action.state);
    case 'SET_POSITION':
      return setPosition(state, action.state);
    case 'SET_NAVIGATOR_PROPS':
      return setNavigatorProps(state, action.state);
    case 'UPDATE_ANNOTATIONS':
      return updateAnnotations(state, action.state);
    case 'MAP_HIDE':
      return mapHide(state, action.state);
    case 'UPDATE_REGION':
      return updateRegion(state, action.state);
  }
  return state;
}