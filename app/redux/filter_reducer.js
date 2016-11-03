import {Map} from 'immutable';
import {setAmenities, filterSet, querySet, addStagedFilter, removeStagedFilter, addFilter, removeFilter, clearFilters, clearStaged} from '../src/filter_core';

export default function(state = Map({}), action) {
  switch (action.type) {
    case 'SET_AMENITIES' :
      return setAmenities(state, action.state);
    case 'FILTER_SET':
      return filterSet(state, action.state);
    case 'QUERY_SET':
      return querySet(state, action.state);
    case 'ADD_STAGED_FILTER' :
      return addStagedFilter(state, action.state);
    case 'REMOVE_STAGED_FILTER' :
      return removeStagedFilter(state, action.state);
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