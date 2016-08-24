import {Map} from 'immutable';

export const INITIAL_STATE = Map();


export function setLocations(state, locations) {
  console.log('inside of setLocation');
  return state.set('coords', locations);
}

export function updateLocations(state, newState) {
  return state.merge(newState);
}
