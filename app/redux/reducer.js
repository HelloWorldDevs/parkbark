import {Map} from 'immutable';
import {setLocations, updateSearch, updateAnnotations, mapHide, updateRegion, updateSelectedPark, setParkSurvey, updateParkSurvey, setAmenities, addStagedFilter, removeStagedFilter, addFilter, removeFilter, clearFilters, clearStaged} from '../src/core';


export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return setLocations(state, action.state);
    case 'SET_NAVIGATOR_PROPS':
        return setNavigatorProps(state, action.state);
    case 'UPDATE_ANNOTATIONS':
      return updateAnnotations(state, action.state);
    case 'MAP_HIDE':
      return mapHide(state, action.state);
    case 'UPDATE_REGION':
      return updateRegion(state, action.state);
    case 'UPDATE_SEARCH':
      return updateSearch(state, action.state);
    case 'UPDATE_SElECTED_PARK':
        return updateSelectedPark(state, action.state);
    case 'SET_PARK_SURVEY':
      return setParkSurvey(state, action.state);
    case 'UPDATE_SURVEY':
      return updateParkSurvey(state, action.state);
    case 'SET_AMENITIES' :
      return setAmenities(state, action.state);
    case 'ADD_STAGED_FILTER' :
      return addStagedFilter(state, action.state);
    case 'REMOVE_STAGED_FILTER' :
      return removeStagedFilter(state, action.state);
    case 'ADD_SELECTED_FILTERS' :
      return addSelectedFilters(state, action.state);
    case 'ADD_FILTER' :
      return addFilter(state, action.state);
    case 'REMOVE_FILTER' :
        return removeFilter(state, action.state);
    case 'CLEAR_FILTERS' :
      return clearFilters(state, action.state);
    case 'CLEAR_STAGED' :
      return clearStaged(state, action.state);
  }
  return state;
}
